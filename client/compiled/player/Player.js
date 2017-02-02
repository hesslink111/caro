"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(icon, username, wins, losses) {
        _classCallCheck(this, Player);

        this.icon = icon;
        this.username = username;
        this.wins = wins;
        this.losses = losses;
    }

    _createClass(Player, [{
        key: "getIcon",
        value: function getIcon() {
            return this.icon;
        }
    }, {
        key: "setIcon",
        value: function setIcon(icon) {
            this.icon = icon;
        }
    }, {
        key: "getUsername",
        value: function getUsername() {
            return this.username;
        }
    }, {
        key: "setUsername",
        value: function setUsername(username) {
            this.username = username;
        }
    }, {
        key: "getWins",
        value: function getWins() {
            return this.wins;
        }
    }, {
        key: "setWins",
        value: function setWins(wins) {
            this.wins = wins;
        }
    }, {
        key: "getLosses",
        value: function getLosses() {
            return this.losses;
        }
    }, {
        key: "setLosses",
        value: function setLosses(losses) {
            this.losses = losses;
        }
    }], [{
        key: "isLoggedIn",
        value: function isLoggedIn() {
            return this.loggedIn;
        }
    }, {
        key: "getPlayerInstance",
        value: function getPlayerInstance() {
            if (this.currentPlayerInstance == null) {
                //Default user for now
                this.currentPlayerInstance = new Player("boy-0", "Bob", 0, 0);
                this.loggedIn = true;
            }
            return this.currentPlayerInstance;
        }
    }, {
        key: "getOpponentPlayerInstance",
        value: function getOpponentPlayerInstance() {
            if (this.opponentPlayerInstance == null) {
                //Default user for now
                this.opponentPlayerInstance = new Player("girl-0", "Claire", 0, 0);
                this.loggedIn = true;
            }
            return this.opponentPlayerInstance;
        }
    }, {
        key: "setCurrentPlayerInstance",
        value: function setCurrentPlayerInstance(player) {
            this.currentPlayerInstance = player;
            this.loggedIn = true;
        }
    }, {
        key: "deleteCurrentPlayerInstance",
        value: function deleteCurrentPlayerInstance() {
            this.currentPlayerInstance = null;
            this.loggedIn = false;
        }
    }, {
        key: "setOpponentPlayerInstance",
        value: function setOpponentPlayerInstance(player) {
            this.opponentPlayerInstance = player;
            this.loggedIn = true;
        }
    }, {
        key: "deleteOpponentPlayerInstance",
        value: function deleteOpponentPlayerInstance() {
            this.opponentPlayerInstance = null;
            this.loggedIn = false;
        }
    }]);

    return Player;
}();

Player.loggedIn = false;
exports.Player = Player;
//# sourceMappingURL=Player.js.map
//# sourceMappingURL=Player.js.map