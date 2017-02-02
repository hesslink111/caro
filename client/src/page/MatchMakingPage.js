"use strict";
const Page_1 = require("./Page");
const Socket_1 = require("../socket/Socket");
const PageLoader_1 = require("./PageLoader");
const MatchFoundPage_1 = require("./MatchFoundPage");
const PlayerHelper_1 = require("../player/PlayerHelper");
const Player_1 = require("../player/Player");
class MatchMakingPage extends Page_1.Page {
    showPage() {
        super.showTemplate('matchmaking-page-main-row');
        PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
        this.socket = Socket_1.Socket.getInstance();
        this.socket.addSocketListener(this);
        this.socket.sendObject("MatchMakingRequest");
    }
    hidePage() {
        this.socket.removeSocketListener(this);
        super.hideTemplate('matchmaking-page-main-row');
    }
    onSocketObjectReceived(messageObject) {
        if (messageObject.type == "MatchFound") {
            var otherPlayerData = messageObject.data;
            var otherPlayer = new Player_1.Player(otherPlayerData.icon, otherPlayerData.name, otherPlayerData.wins, otherPlayerData.losses);
            Player_1.Player.setOpponentPlayerInstance(otherPlayer);
            PageLoader_1.PageLoader.render(MatchFoundPage_1.MatchFoundPage, this);
        }
    }
    onSocketClosed() {
    }
    onSocketOpened() {
    }
}
exports.MatchMakingPage = MatchMakingPage;
//# sourceMappingURL=MatchMakingPage.js.map