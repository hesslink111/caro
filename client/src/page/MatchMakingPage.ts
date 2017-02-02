import {Page} from "./Page";
import {Socket} from "../socket/Socket";
import {SocketListener} from "../socket/SocketListener";
import {MessageObject} from "../socket/message/MessageObject";
import {PageLoader} from "./PageLoader";
import {MatchFoundPage} from "./MatchFoundPage";
import {PlayerHelper} from "../player/PlayerHelper";
import {Player} from "../player/Player";

export class MatchMakingPage extends Page implements SocketListener {

    private socket: Socket;

    public showPage(): void {
        super.showTemplate('matchmaking-page-main-row');
        PlayerHelper.updateCurrentPlayerView(this);

        this.socket = Socket.getInstance();
        this.socket.addSocketListener(this);
        this.socket.sendObject("MatchMakingRequest");
    }

    public hidePage(): void {
        this.socket.removeSocketListener(this);
        
        super.hideTemplate('matchmaking-page-main-row');
    }

    onSocketObjectReceived(messageObject: MessageObject): void {
        if(messageObject.type == "MatchFound") {
            
            var otherPlayerData = messageObject.data;
            var otherPlayer = new Player(otherPlayerData.icon, otherPlayerData.name, otherPlayerData.wins, otherPlayerData.losses);
            Player.setOpponentPlayerInstance(otherPlayer);

            PageLoader.render(MatchFoundPage, this);
        }
    }

    onSocketClosed():void {
    }

    onSocketOpened():void {
    }
    
}