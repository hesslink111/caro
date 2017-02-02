import {MessageObject} from "./message/MessageObject";

export interface SocketListener {
    onSocketObjectReceived(messageObject: MessageObject): void;
    onSocketClosed(): void;
    onSocketOpened(): void;
}