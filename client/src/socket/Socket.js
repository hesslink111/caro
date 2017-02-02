"use strict";
const List_1 = require("../util/collection/List");
const MessageObject_1 = require("./message/MessageObject");
const Player_1 = require("../player/Player");
class Socket {
    constructor() {
        this.createSocketAndSetHandlers();
        this.socketListeners = new List_1.List();
        this.socketSendQueue = new List_1.List();
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Socket();
        }
        return this.instance;
    }
    createSocketAndSetHandlers() {
        this.socket = new WebSocket(Socket.SOCKET_ADDRESS);
        this.socket.onopen = (event) => {
            this.onOpen();
        };
        this.socket.onmessage = (messageEvent) => {
            this.onMessage(messageEvent.data);
        };
        this.socket.onerror = (event) => {
            this.onError();
        };
        this.socket.onclose = (event) => {
            this.onClose();
        };
    }
    onOpen() {
        this.socketSendQueue.forEach((messageObject) => {
            this.send(messageObject);
        });
        if (Player_1.Player.isLoggedIn()) {
            this.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
        }
        this.socketListeners.forEach((listener) => {
            listener.onSocketOpened();
        });
    }
    onMessage(jsonMessage) {
        var object = JSON.parse(jsonMessage);
        console.log("Socket message received");
        console.log(object);
        this.socketListeners.forEach((listener) => {
            listener.onSocketObjectReceived(object);
        });
    }
    onError() {
        console.log("Socket Error");
    }
    onClose() {
        this.socketListeners.forEach((listener) => {
            listener.onSocketClosed();
        });
        console.log("Socket closed");
        setTimeout(() => {
            this.createSocketAndSetHandlers();
        }, 5000);
    }
    addSocketListener(listener) {
        this.socketListeners.add(listener);
    }
    removeSocketListener(listener) {
        this.socketListeners.remove(listener);
    }
    sendObject(type, data) {
        var messageObject = this.createMessageObject(type, data);
        if (this.socket.readyState == WebSocket.OPEN) {
            this.send(messageObject);
        }
        else {
            this.socketSendQueue.add(messageObject);
        }
    }
    createMessageObject(type, data) {
        var message = new MessageObject_1.MessageObject();
        message.type = type;
        if (data) {
            message.data = data;
        }
        return message;
    }
    send(messageObject) {
        this.socket.send(JSON.stringify(messageObject));
        console.log("Sent message");
        console.log(JSON.stringify(messageObject));
    }
}
Socket.SOCKET_ADDRESS = "ws://localhost:2000";
exports.Socket = Socket;
//# sourceMappingURL=Socket.js.map