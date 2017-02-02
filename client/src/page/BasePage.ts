import {Page} from "./Page";
import {Socket} from "../socket/Socket";
import {SocketListener} from "../socket/SocketListener";
import {MessageObject} from "../socket/message/MessageObject";
import {PageLoader} from "./PageLoader";
import {EntryPage} from "./EntryPage";

export class BasePage extends Page implements SocketListener {

    private socket: Socket;

    showPage(): void {
        super.showTemplate("navbar");
        super.showTemplate("footer");
        super.showTemplate("modal");

        this.socket = Socket.getInstance();
        this.socket.addSocketListener(this);
    }

    hidePage(): void {
    }

    onSocketOpened(): void {
        super.hideModal('#server-disconnected-modal');
    }
    
    onSocketClosed(): void {
        super.showModal('#server-disconnected-modal');

        PageLoader.render(EntryPage, PageLoader.getCurrentPage());
    }

    onSocketObjectReceived(messageObject: MessageObject): void {
    }

}