"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var Socket_1 = require("../socket/Socket");
var MatchMove_1 = require("../socket/message/MatchMove");
var PageLoader_1 = require("./PageLoader");
var EntryPage_1 = require("./EntryPage");
var MatchMakingPage_1 = require("./MatchMakingPage");
var PlayerHelper_1 = require("../player/PlayerHelper");
var Player_1 = require("../player/Player");

var MatchPage = function (_Page_1$Page) {
    _inherits(MatchPage, _Page_1$Page);

    function MatchPage() {
        _classCallCheck(this, MatchPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchPage).apply(this, arguments));
    }

    _createClass(MatchPage, [{
        key: "showPage",
        value: function showPage() {
            var _this2 = this;

            _get(Object.getPrototypeOf(MatchPage.prototype), "showTemplate", this).call(this, 'match-page-main-row');
            PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
            PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
            this.socket = Socket_1.Socket.getInstance();
            this.socket.addSocketListener(this);
            this.socket.sendObject("MatchReady");
            _get(Object.getPrototypeOf(MatchPage.prototype), "setTemplateEventHandler", this).call(this, 'board', ".board-container .board-row .board-square-piece", 'click', function (element) {
                var x = parseInt(element.parentElement.getAttribute("data-instance-identity"));
                var y = parseInt(element.parentElement.parentElement.getAttribute("data-instance-identity"));
                var data = new MatchMove_1.MatchMove();
                data.x = x;
                data.y = y;
                _this2.socket.sendObject("MatchMoveRequest", data);
            });
            _get(Object.getPrototypeOf(MatchPage.prototype), "setTemplateEventHandler", this).call(this, 'match-ended-modal-template', '.match-ended-modal-menu-button', 'click', function (element) {
                _get(Object.getPrototypeOf(MatchPage.prototype), "hideModal", _this2).call(_this2, '#match-ended-modal');
                PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, _this2);
            });
            _get(Object.getPrototypeOf(MatchPage.prototype), "setTemplateEventHandler", this).call(this, 'match-ended-modal-template', '.match-ended-modal-new-match-button', 'click', function (element) {
                _get(Object.getPrototypeOf(MatchPage.prototype), "hideModal", _this2).call(_this2, '#match-ended-modal');
                PageLoader_1.PageLoader.render(MatchMakingPage_1.MatchMakingPage, _this2);
            });
        }
    }, {
        key: "hidePage",
        value: function hidePage() {
            _get(Object.getPrototypeOf(MatchPage.prototype), "hideModal", this).call(this, '#match-ended-modal');
            _get(Object.getPrototypeOf(MatchPage.prototype), "hideTemplate", this).call(this, 'match-page-main-row');
        }
    }, {
        key: "showMove",
        value: function showMove(x, y, piece) {
            _get(Object.getPrototypeOf(MatchPage.prototype), "updateElementText", this).call(this, ".board-container [data-instance-identity='" + y + "'] [data-instance-identity='" + x + "'] .board-square-piece-char", piece);
        }
    }, {
        key: "onSocketObjectReceived",
        value: function onSocketObjectReceived(messageObject) {
            if (messageObject.type == "MatchBegin") {
                var currentPlayerPiece = messageObject.data.currentPlayerPiece;
                var otherPlayerPiece = messageObject.data.otherPlayerPiece;
                _get(Object.getPrototypeOf(MatchPage.prototype), "updateElementText", this).call(this, "[data-instance-identity='current-player'] .player-piece", "Piece: " + currentPlayerPiece.toUpperCase());
                _get(Object.getPrototypeOf(MatchPage.prototype), "removeElementClass", this).call(this, "[data-instance-identity='current-player'] .player-piece", "hide");
                _get(Object.getPrototypeOf(MatchPage.prototype), "updateElementText", this).call(this, "[data-instance-identity='other-player'] .player-piece", "Piece: " + otherPlayerPiece.toUpperCase());
                _get(Object.getPrototypeOf(MatchPage.prototype), "removeElementClass", this).call(this, "[data-instance-identity='other-player'] .player-piece", "hide");
            } else if (messageObject.type == "MatchMove") {
                var x = messageObject.data.x;
                var y = messageObject.data.y;
                var piece = messageObject.data.piece;
                this.showMove(x, y, piece);
            } else if (messageObject.type == "MatchWon") {
                _get(Object.getPrototypeOf(MatchPage.prototype), "updateElementText", this).call(this, "#match-ended-modal .modal-text", "You Won!");
                Player_1.Player.getPlayerInstance().setWins(Player_1.Player.getPlayerInstance().getWins() + 1);
                Player_1.Player.getOpponentPlayerInstance().setLosses(Player_1.Player.getOpponentPlayerInstance().getLosses() + 1);
                PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
                PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
                _get(Object.getPrototypeOf(MatchPage.prototype), "showModal", this).call(this, "#match-ended-modal");
            } else if (messageObject.type == "MatchLost") {
                _get(Object.getPrototypeOf(MatchPage.prototype), "updateElementText", this).call(this, "#match-ended-modal .modal-text", "Match Lost");
                Player_1.Player.getOpponentPlayerInstance().setWins(Player_1.Player.getOpponentPlayerInstance().getWins() + 1);
                Player_1.Player.getPlayerInstance().setLosses(Player_1.Player.getPlayerInstance().getLosses() + 1);
                PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
                PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
                _get(Object.getPrototypeOf(MatchPage.prototype), "showModal", this).call(this, "#match-ended-modal");
            } else if (messageObject.type == "MatchEnd") {
                _get(Object.getPrototypeOf(MatchPage.prototype), "updateElementText", this).call(this, "#match-ended-modal .modal-text", "Match Ended");
                _get(Object.getPrototypeOf(MatchPage.prototype), "showModal", this).call(this, "#match-ended-modal");
            } else if (messageObject.type == "CurrentPlayerUpdate") {
                if (messageObject.data.currentPlayer == "current") {
                    _get(Object.getPrototypeOf(MatchPage.prototype), "removeElementClass", this).call(this, "[data-instance-identity='current-player'] .player-turn-indicator", "hide");
                    _get(Object.getPrototypeOf(MatchPage.prototype), "addElementClass", this).call(this, "[data-instance-identity='other-player'] .player-turn-indicator", "hide");
                } else if (messageObject.data.currentPlayer == "opponent") {
                    console.log("Setting indicator");
                    _get(Object.getPrototypeOf(MatchPage.prototype), "removeElementClass", this).call(this, "[data-instance-identity='other-player'] .player-turn-indicator", "hide");
                    _get(Object.getPrototypeOf(MatchPage.prototype), "addElementClass", this).call(this, "[data-instance-identity='current-player'] .player-turn-indicator", "hide");
                }
            }
        }
    }, {
        key: "onSocketClosed",
        value: function onSocketClosed() {}
    }, {
        key: "onSocketOpened",
        value: function onSocketOpened() {}
    }]);

    return MatchPage;
}(Page_1.Page);

exports.MatchPage = MatchPage;
//# sourceMappingURL=MatchPage.js.map
//# sourceMappingURL=MatchPage.js.map