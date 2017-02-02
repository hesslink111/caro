import {Page} from "./Page";
import {Socket} from "../socket/Socket";
import {SocketListener} from "../socket/SocketListener";
import {MessageObject} from "../socket/message/MessageObject";
import {PageLoader} from "./PageLoader";
import {MatchPage} from "./MatchPage";
import {PlayerHelper} from "../player/PlayerHelper";

export class MatchFoundPage extends Page implements SocketListener {

    private socket: Socket;
    private intervalId: number;
    private startTimeS: number;
    private intervalCleared: boolean;

    public showPage(): void {
        super.showTemplate('match-found-page-main-row');
        PlayerHelper.updateCurrentPlayerView(this);
        PlayerHelper.updateOpponentPlayerView(this);
        
        this.intervalCleared = true;

        this.socket = Socket.getInstance();
        this.socket.addSocketListener(this);
    }

    public hidePage(): void {
        if(!this.intervalCleared) {
            clearInterval(this.intervalId);
        }

        this.socket.removeSocketListener(this);

        super.hideTemplate('match-found-page-main-row');
    }

    onSocketObjectReceived(messageObject: MessageObject): void {
        if(messageObject.type == "MatchStartInMs") {
            var startTimeMs: number = messageObject.data.startTimeMs;
            this.startTimeS = startTimeMs / 1000;

            super.showTemplate('match-start-count-down');

            super.updateElementText('.match-count-down-header', 'Match starts in ' + this.startTimeS);

            this.intervalId = setInterval(() => {
                this.startTimeS--;
                if(this.startTimeS == 0) {
                    clearInterval(this.intervalId);
                    super.updateElementText('.match-count-down-header', 'Starting match...');
                } else {
                    super.updateElementText('.match-count-down-header', 'Match starts in ' + this.startTimeS);
                }
            }, 1000);
            this.intervalCleared = false;
            
        } else if(messageObject.type == "MatchStart") {
            PageLoader.render(MatchPage, this);
            
        } else if(messageObject.type == "MatchCancelled") {
            PageLoader.render(MatchFoundPage, this);
        }
    }

    onSocketClosed():void {
    }

    onSocketOpened():void {
    }

}