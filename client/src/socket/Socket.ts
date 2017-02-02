import {SocketListener} from "./SocketListener";
import {List} from "../util/collection/List";
import {MessageObject} from "./message/MessageObject";
import {Player} from "../player/Player";

export class Socket {

    private static instance: Socket;
    private static SOCKET_ADDRESS = "ws://localhost:2000";

    private socket: WebSocket;
    private socketListeners: List<SocketListener>;

    private socketSendQueue: List<MessageObject>;

    public static getInstance(): Socket {
        if(this.instance == null) {
            this.instance = new Socket();
        }
        return this.instance;
    }

    constructor() {
        this.createSocketAndSetHandlers();

        this.socketListeners = new List<SocketListener>();
        this.socketSendQueue = new List<MessageObject>();
    }
    
    private createSocketAndSetHandlers(): void {
        this.socket = new WebSocket(Socket.SOCKET_ADDRESS);

        this.socket.onopen = (event: Event) => {
            this.onOpen();
        };

        this.socket.onmessage = (messageEvent: MessageEvent) => {
            this.onMessage(messageEvent.data);
        };

        this.socket.onerror = (event: Event) => {
            this.onError();
        };

        this.socket.onclose = (event: Event) => {
            this.onClose();
        };
    }

    public onOpen(): void {
        this.socketSendQueue.forEach((messageObject: MessageObject) => {
            this.send(messageObject);
        });

        if(Player.isLoggedIn()) {
            this.sendObject("PlayerUpdate", Player.getPlayerInstance());
        }

        this.socketListeners.forEach((listener: SocketListener) => {
            listener.onSocketOpened();
        });
    }

    public onMessage(jsonMessage: string): void {

        var object = JSON.parse(jsonMessage);

        console.log("Socket message received");
        console.log(object);

        this.socketListeners.forEach((listener: SocketListener) => {
            listener.onSocketObjectReceived(object);
        });
    }

    public onError(): void {
        console.log("Socket Error");
    }

    public onClose(): void {
        this.socketListeners.forEach((listener: SocketListener) => {
            listener.onSocketClosed();
        });
        console.log("Socket closed");
        
        setTimeout(() => {
            this.createSocketAndSetHandlers();
        }, 5000);
    }


    public addSocketListener(listener: SocketListener): void {
        this.socketListeners.add(listener);
    }

    public removeSocketListener(listener: SocketListener): void {
        this.socketListeners.remove(listener);
    }


    public sendObject(type: string, data?: Object): void {
        var messageObject = this.createMessageObject(type, data);

        if(this.socket.readyState == WebSocket.OPEN) {
            this.send(messageObject);
        } else {
            this.socketSendQueue.add(messageObject);
        }
    }

    private createMessageObject(type: string, data?: Object): MessageObject {
        var message = new MessageObject();

        message.type = type;
        if(data) {
            message.data = data;
        }

        return message;
    }

    private send(messageObject: MessageObject): void {
        this.socket.send(JSON.stringify(messageObject));
        console.log("Sent message");
        console.log(JSON.stringify(messageObject));
    }

}