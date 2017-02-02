import {Page} from "./Page";
import {Socket} from "../socket/Socket";
import {SocketListener} from "../socket/SocketListener";
import {MessageObject} from "../socket/message/MessageObject";
import {MatchMove} from "../socket/message/MatchMove";
import {PageLoader} from "./PageLoader";
import {EntryPage} from "./EntryPage";
import {MatchMakingPage} from "./MatchMakingPage";
import {PlayerHelper} from "../player/PlayerHelper";
import {Player} from "../player/Player";

export class MatchPage extends Page implements SocketListener {

    private socket: Socket;

    showPage(): void {
        super.showTemplate('match-page-main-row');
        PlayerHelper.updateCurrentPlayerView(this);
        PlayerHelper.updateOpponentPlayerView(this);

        this.socket = Socket.getInstance();
        this.socket.addSocketListener(this);
        this.socket.sendObject("MatchReady");

        super.setTemplateEventHandler('board', ".board-container .board-row .board-square-piece", 'click', (element: HTMLElement) => {
            var x: number = parseInt(element.parentElement.getAttribute("data-instance-identity"));
            var y: number = parseInt(element.parentElement.parentElement.getAttribute("data-instance-identity"));
            var data = new MatchMove();
            data.x = x;
            data.y = y;
            
            this.socket.sendObject("MatchMoveRequest", data);
        });

        super.setTemplateEventHandler('match-ended-modal-template', '.match-ended-modal-menu-button', 'click', (element: HTMLElement) => {
            super.hideModal('#match-ended-modal');
            PageLoader.render(EntryPage, this);
        });

        super.setTemplateEventHandler('match-ended-modal-template', '.match-ended-modal-new-match-button', 'click', (element: HTMLElement) => {
            super.hideModal('#match-ended-modal');
            PageLoader.render(MatchMakingPage, this);
        });
    }

    hidePage(): void {
        super.hideModal('#match-ended-modal');
        super.hideTemplate('match-page-main-row');
    }

    private showMove(x: number, y: number, piece: string): void {
        super.updateElementText(".board-container [data-instance-identity='"+y+"'] [data-instance-identity='"+x+"'] .board-square-piece-char", piece);
    }

    onSocketObjectReceived(messageObject: MessageObject): void {
        if(messageObject.type == "MatchBegin") {
            var currentPlayerPiece = messageObject.data.currentPlayerPiece;
            var otherPlayerPiece = messageObject.data.otherPlayerPiece;

            super.updateElementText("[data-instance-identity='current-player'] .player-piece", "Piece: " + currentPlayerPiece.toUpperCase());
            super.removeElementClass("[data-instance-identity='current-player'] .player-piece", "hide");

            super.updateElementText("[data-instance-identity='other-player'] .player-piece", "Piece: " + otherPlayerPiece.toUpperCase());
            super.removeElementClass("[data-instance-identity='other-player'] .player-piece", "hide");

        } else if(messageObject.type == "MatchMove") {
            var x: number = messageObject.data.x;
            var y: number = messageObject.data.y;
            var piece: string = messageObject.data.piece;
            this.showMove(x, y, piece);

        } else if(messageObject.type == "MatchWon") {
            super.updateElementText("#match-ended-modal .modal-text", "You Won!");
            Player.getPlayerInstance().setWins(Player.getPlayerInstance().getWins()+1);
            Player.getOpponentPlayerInstance().setLosses(Player.getOpponentPlayerInstance().getLosses()+1);

            PlayerHelper.updateCurrentPlayerView(this);
            PlayerHelper.updateOpponentPlayerView(this);

            super.showModal("#match-ended-modal");
            
        } else if(messageObject.type == "MatchLost") {
            super.updateElementText("#match-ended-modal .modal-text", "Match Lost");
            Player.getOpponentPlayerInstance().setWins(Player.getOpponentPlayerInstance().getWins()+1);
            Player.getPlayerInstance().setLosses(Player.getPlayerInstance().getLosses()+1);

            PlayerHelper.updateCurrentPlayerView(this);
            PlayerHelper.updateOpponentPlayerView(this);

            super.showModal("#match-ended-modal");
            
        } else if(messageObject.type == "MatchEnd") {
            super.updateElementText("#match-ended-modal .modal-text", "Match Ended");
            super.showModal("#match-ended-modal");

        } else if(messageObject.type == "CurrentPlayerUpdate") {

            if(messageObject.data.currentPlayer == "current") {
                super.removeElementClass("[data-instance-identity='current-player'] .player-turn-indicator", "hide");
                super.addElementClass("[data-instance-identity='other-player'] .player-turn-indicator", "hide");

            } else if(messageObject.data.currentPlayer == "opponent") {
                console.log("Setting indicator");
                super.removeElementClass("[data-instance-identity='other-player'] .player-turn-indicator", "hide");
                super.addElementClass("[data-instance-identity='current-player'] .player-turn-indicator", "hide");
            }

        }
    }

    onSocketClosed():void {
    }

    onSocketOpened():void {
    }

}