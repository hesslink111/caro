"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player_1 = require("./Player");

var PlayerHelper = function () {
    function PlayerHelper() {
        _classCallCheck(this, PlayerHelper);
    }

    _createClass(PlayerHelper, null, [{
        key: "updateCurrentPlayerView",
        value: function updateCurrentPlayerView(pageContext) {
            pageContext.updateElementAttribute("[data-instance-identity='current-player'] .player-icon", "src", "images/player/" + Player_1.Player.getPlayerInstance().getIcon() + ".svg");
            pageContext.updateElementText("[data-instance-identity='current-player'] .player-name", Player_1.Player.getPlayerInstance().getUsername());
            pageContext.updateElementText("[data-instance-identity='current-player'] .player-wins", "Wins: " + Player_1.Player.getPlayerInstance().getWins().toString());
            pageContext.updateElementText("[data-instance-identity='current-player'] .player-losses", "Losses : " + Player_1.Player.getPlayerInstance().getLosses().toString());
        }
    }, {
        key: "updateOpponentPlayerView",
        value: function updateOpponentPlayerView(pageContext) {
            pageContext.updateElementAttribute("[data-instance-identity='other-player'] .player-icon", "src", "images/player/" + Player_1.Player.getOpponentPlayerInstance().getIcon() + ".svg");
            pageContext.updateElementText("[data-instance-identity='other-player'] .player-name", Player_1.Player.getOpponentPlayerInstance().getUsername());
            pageContext.updateElementText("[data-instance-identity='other-player'] .player-wins", "Wins: " + Player_1.Player.getOpponentPlayerInstance().getWins().toString());
            pageContext.updateElementText("[data-instance-identity='other-player'] .player-losses", "Losses : " + Player_1.Player.getOpponentPlayerInstance().getLosses().toString());
        }
    }]);

    return PlayerHelper;
}();

exports.PlayerHelper = PlayerHelper;
//# sourceMappingURL=PlayerHelper.js.map
//# sourceMappingURL=PlayerHelper.js.map