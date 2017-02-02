"use strict";
const Player_1 = require("./Player");
class PlayerHelper {
    static updateCurrentPlayerView(pageContext) {
        pageContext.updateElementAttribute("[data-instance-identity='current-player'] .player-icon", "src", "images/player/" + Player_1.Player.getPlayerInstance().getIcon() + ".svg");
        pageContext.updateElementText("[data-instance-identity='current-player'] .player-name", Player_1.Player.getPlayerInstance().getUsername());
        pageContext.updateElementText("[data-instance-identity='current-player'] .player-wins", "Wins: " + Player_1.Player.getPlayerInstance().getWins().toString());
        pageContext.updateElementText("[data-instance-identity='current-player'] .player-losses", "Losses : " + Player_1.Player.getPlayerInstance().getLosses().toString());
    }
    static updateOpponentPlayerView(pageContext) {
        pageContext.updateElementAttribute("[data-instance-identity='other-player'] .player-icon", "src", "images/player/" + Player_1.Player.getOpponentPlayerInstance().getIcon() + ".svg");
        pageContext.updateElementText("[data-instance-identity='other-player'] .player-name", Player_1.Player.getOpponentPlayerInstance().getUsername());
        pageContext.updateElementText("[data-instance-identity='other-player'] .player-wins", "Wins: " + Player_1.Player.getOpponentPlayerInstance().getWins().toString());
        pageContext.updateElementText("[data-instance-identity='other-player'] .player-losses", "Losses : " + Player_1.Player.getOpponentPlayerInstance().getLosses().toString());
    }
}
exports.PlayerHelper = PlayerHelper;
//# sourceMappingURL=PlayerHelper.js.map