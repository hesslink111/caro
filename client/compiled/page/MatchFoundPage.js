"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var Socket_1 = require("../socket/Socket");
var PageLoader_1 = require("./PageLoader");
var MatchPage_1 = require("./MatchPage");
var PlayerHelper_1 = require("../player/PlayerHelper");

var MatchFoundPage = function (_Page_1$Page) {
    _inherits(MatchFoundPage, _Page_1$Page);

    function MatchFoundPage() {
        _classCallCheck(this, MatchFoundPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchFoundPage).apply(this, arguments));
    }

    _createClass(MatchFoundPage, [{
        key: "showPage",
        value: function showPage() {
            _get(Object.getPrototypeOf(MatchFoundPage.prototype), "showTemplate", this).call(this, 'match-found-page-main-row');
            PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
            PlayerHelper_1.PlayerHelper.updateOpponentPlayerView(this);
            this.intervalCleared = true;
            this.socket = Socket_1.Socket.getInstance();
            this.socket.addSocketListener(this);
        }
    }, {
        key: "hidePage",
        value: function hidePage() {
            if (!this.intervalCleared) {
                clearInterval(this.intervalId);
            }
            this.socket.removeSocketListener(this);
            _get(Object.getPrototypeOf(MatchFoundPage.prototype), "hideTemplate", this).call(this, 'match-found-page-main-row');
        }
    }, {
        key: "onSocketObjectReceived",
        value: function onSocketObjectReceived(messageObject) {
            var _this2 = this;

            if (messageObject.type == "MatchStartInMs") {
                var startTimeMs = messageObject.data.startTimeMs;
                this.startTimeS = startTimeMs / 1000;
                _get(Object.getPrototypeOf(MatchFoundPage.prototype), "showTemplate", this).call(this, 'match-start-count-down');
                _get(Object.getPrototypeOf(MatchFoundPage.prototype), "updateElementText", this).call(this, '.match-count-down-header', 'Match starts in ' + this.startTimeS);
                this.intervalId = setInterval(function () {
                    _this2.startTimeS--;
                    if (_this2.startTimeS == 0) {
                        clearInterval(_this2.intervalId);
                        _get(Object.getPrototypeOf(MatchFoundPage.prototype), "updateElementText", _this2).call(_this2, '.match-count-down-header', 'Starting match...');
                    } else {
                        _get(Object.getPrototypeOf(MatchFoundPage.prototype), "updateElementText", _this2).call(_this2, '.match-count-down-header', 'Match starts in ' + _this2.startTimeS);
                    }
                }, 1000);
                this.intervalCleared = false;
            } else if (messageObject.type == "MatchStart") {
                PageLoader_1.PageLoader.render(MatchPage_1.MatchPage, this);
            } else if (messageObject.type == "MatchCancelled") {
                PageLoader_1.PageLoader.render(MatchFoundPage, this);
            }
        }
    }, {
        key: "onSocketClosed",
        value: function onSocketClosed() {}
    }, {
        key: "onSocketOpened",
        value: function onSocketOpened() {}
    }]);

    return MatchFoundPage;
}(Page_1.Page);

exports.MatchFoundPage = MatchFoundPage;
//# sourceMappingURL=MatchFoundPage.js.map
//# sourceMappingURL=MatchFoundPage.js.map