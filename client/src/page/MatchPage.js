"use strict";
const Page_1 = require("./Page");
const Socket_1 = require("../socket/Socket");
const MatchMove_1 = require("../socket/message/MatchMove");
const PageLoader_1 = require("./PageLoader");
const EntryPage_1 = require("./EntryPage");
const MatchMakingPage_1 = require("./MatchMakingPage");
const PlayerHelper_1 = require("../player/PlayerHelper");
const Player_1 = require("../player/Player");
class MatchPage extends Page_1.Page {
    showPage() {
        super.showTemplate('match-page-main-row');
        PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
        PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
        this.socket = Socket_1.Socket.getInstance();
        this.socket.addSocketListener(this);
        this.socket.sendObject("MatchReady");
        super.setTemplateEventHandler('board', ".board-container .board-row .board-square-piece", 'click', (element) => {
            var x = parseInt(element.parentElement.getAttribute("data-instance-identity"));
            var y = parseInt(element.parentElement.parentElement.getAttribute("data-instance-identity"));
            var data = new MatchMove_1.MatchMove();
            data.x = x;
            data.y = y;
            this.socket.sendObject("MatchMoveRequest", data);
        });
        super.setTemplateEventHandler('match-ended-modal-template', '.match-ended-modal-menu-button', 'click', (element) => {
            super.hideModal('#match-ended-modal');
            PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, this);
        });
        super.setTemplateEventHandler('match-ended-modal-template', '.match-ended-modal-new-match-button', 'click', (element) => {
            super.hideModal('#match-ended-modal');
            PageLoader_1.PageLoader.render(MatchMakingPage_1.MatchMakingPage, this);
        });
    }
    hidePage() {
        super.hideModal('#match-ended-modal');
        super.hideTemplate('match-page-main-row');
    }
    showMove(x, y, piece) {
        super.updateElementText(".board-container [data-instance-identity='" + y + "'] [data-instance-identity='" + x + "'] .board-square-piece-char", piece);
    }
    onSocketObjectReceived(messageObject) {
        if (messageObject.type == "MatchBegin") {
            var currentPlayerPiece = messageObject.data.currentPlayerPiece;
            var otherPlayerPiece = messageObject.data.otherPlayerPiece;
            super.updateElementText("[data-instance-identity='current-player'] .player-piece", "Piece: " + currentPlayerPiece.toUpperCase());
            super.removeElementClass("[data-instance-identity='current-player'] .player-piece", "hide");
            super.updateElementText("[data-instance-identity='other-player'] .player-piece", "Piece: " + otherPlayerPiece.toUpperCase());
            super.removeElementClass("[data-instance-identity='other-player'] .player-piece", "hide");
        }
        else if (messageObject.type == "MatchMove") {
            var x = messageObject.data.x;
            var y = messageObject.data.y;
            var piece = messageObject.data.piece;
            this.showMove(x, y, piece);
        }
        else if (messageObject.type == "MatchWon") {
            super.updateElementText("#match-ended-modal .modal-text", "You Won!");
            Player_1.Player.getPlayerInstance().setWins(Player_1.Player.getPlayerInstance().getWins() + 1);
            Player_1.Player.getOpponentPlayerInstance().setLosses(Player_1.Player.getOpponentPlayerInstance().getLosses() + 1);
            PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
            PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
            super.showModal("#match-ended-modal");
        }
        else if (messageObject.type == "MatchLost") {
            super.updateElementText("#match-ended-modal .modal-text", "Match Lost");
            Player_1.Player.getOpponentPlayerInstance().setWins(Player_1.Player.getOpponentPlayerInstance().getWins() + 1);
            Player_1.Player.getPlayerInstance().setLosses(Player_1.Player.getPlayerInstance().getLosses() + 1);
            PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
            PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
            super.showModal("#match-ended-modal");
        }
        else if (messageObject.type == "MatchEnd") {
            super.updateElementText("#match-ended-modal .modal-text", "Match Ended");
            super.showModal("#match-ended-modal");
        }
        else if (messageObject.type == "CurrentPlayerUpdate") {
            if (messageObject.data.currentPlayer == "current") {
                super.removeElementClass("[data-instance-identity='current-player'] .player-turn-indicator", "hide");
                super.addElementClass("[data-instance-identity='other-player'] .player-turn-indicator", "hide");
            }
            else if (messageObject.data.currentPlayer == "opponent") {
                console.log("Setting indicator");
                super.removeElementClass("[data-instance-identity='other-player'] .player-turn-indicator", "hide");
                super.addElementClass("[data-instance-identity='current-player'] .player-turn-indicator", "hide");
            }
        }
    }
    onSocketClosed() {
    }
    onSocketOpened() {
    }
}
exports.MatchPage = MatchPage;
//# sourceMappingURL=MatchPage.js.map