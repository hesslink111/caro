"use strict";
const Page_1 = require("./Page");
const Socket_1 = require("../socket/Socket");
const PageLoader_1 = require("./PageLoader");
const MatchPage_1 = require("./MatchPage");
const PlayerHelper_1 = require("../player/PlayerHelper");
class MatchFoundPage extends Page_1.Page {
    showPage() {
        super.showTemplate('match-found-page-main-row');
        PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
        PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
        this.intervalCleared = true;
        this.socket = Socket_1.Socket.getInstance();
        this.socket.addSocketListener(this);
    }
    hidePage() {
        if (!this.intervalCleared) {
            clearInterval(this.intervalId);
        }
        this.socket.removeSocketListener(this);
        super.hideTemplate('match-found-page-main-row');
    }
    onSocketObjectReceived(messageObject) {
        if (messageObject.type == "MatchStartInMs") {
            var startTimeMs = messageObject.data.startTimeMs;
            this.startTimeS = startTimeMs / 1000;
            super.showTemplate('match-start-count-down');
            super.updateElementText('.match-count-down-header', 'Match starts in ' + this.startTimeS);
            this.intervalId = setInterval(() => {
                this.startTimeS--;
                if (this.startTimeS == 0) {
                    clearInterval(this.intervalId);
                    super.updateElementText('.match-count-down-header', 'Starting match...');
                }
                else {
                    super.updateElementText('.match-count-down-header', 'Match starts in ' + this.startTimeS);
                }
            }, 1000);
            this.intervalCleared = false;
        }
        else if (messageObject.type == "MatchStart") {
            PageLoader_1.PageLoader.render(MatchPage_1.MatchPage, this);
        }
        else if (messageObject.type == "MatchCancelled") {
            PageLoader_1.PageLoader.render(MatchFoundPage, this);
        }
    }
    onSocketClosed() {
    }
    onSocketOpened() {
    }
}
exports.MatchFoundPage = MatchFoundPage;
//# sourceMappingURL=MatchFoundPage.js.map