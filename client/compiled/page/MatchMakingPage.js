"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var Socket_1 = require("../socket/Socket");
var PageLoader_1 = require("./PageLoader");
var MatchFoundPage_1 = require("./MatchFoundPage");
var PlayerHelper_1 = require("../player/PlayerHelper");
var Player_1 = require("../player/Player");

var MatchMakingPage = function (_Page_1$Page) {
    _inherits(MatchMakingPage, _Page_1$Page);

    function MatchMakingPage() {
        _classCallCheck(this, MatchMakingPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchMakingPage).apply(this, arguments));
    }

    _createClass(MatchMakingPage, [{
        key: "showPage",
        value: function showPage() {
            _get(Object.getPrototypeOf(MatchMakingPage.prototype), "showTemplate", this).call(this, 'matchmaking-page-main-row');
            PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
            this.socket = Socket_1.Socket.getInstance();
            this.socket.addSocketListener(this);
            this.socket.sendObject("MatchMakingRequest");
        }
    }, {
        key: "hidePage",
        value: function hidePage() {
            this.socket.removeSocketListener(this);
            _get(Object.getPrototypeOf(MatchMakingPage.prototype), "hideTemplate", this).call(this, 'matchmaking-page-main-row');
        }
    }, {
        key: "onSocketObjectReceived",
        value: function onSocketObjectReceived(messageObject) {
            if (messageObject.type == "MatchFound") {
                var otherPlayerData = messageObject.data;
                var otherPlayer = new Player_1.Player(otherPlayerData.icon, otherPlayerData.name, otherPlayerData.wins, otherPlayerData.losses);
                Player_1.Player.setOpponentPlayerInstance(otherPlayer);
                PageLoader_1.PageLoader.render(MatchFoundPage_1.MatchFoundPage, this);
            }
        }
    }, {
        key: "onSocketClosed",
        value: function onSocketClosed() {}
    }, {
        key: "onSocketOpened",
        value: function onSocketOpened() {}
    }]);

    return MatchMakingPage;
}(Page_1.Page);

exports.MatchMakingPage = MatchMakingPage;
//# sourceMappingURL=MatchMakingPage.js.map
//# sourceMappingURL=MatchMakingPage.js.map