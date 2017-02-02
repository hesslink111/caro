(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntryPage_1 = require("./page/EntryPage");
var PageLoader_1 = require("./page/PageLoader");
var BasePage_1 = require("./page/BasePage");
window.onload = function () {
    Main.main();
};

var Main = function () {
    function Main() {
        _classCallCheck(this, Main);

        PageLoader_1.PageLoader.render(BasePage_1.BasePage);
        PageLoader_1.PageLoader.render(EntryPage_1.EntryPage);
        //PageLoader.render(MatchPage);
        //PageLoader.render(MatchFoundPage);
        //PageLoader.render(MatchReportPage);
        //PageLoader.render(MatchPage);
    }

    _createClass(Main, null, [{
        key: "main",
        value: function main() {
            new Main();
        }
    }]);

    return Main;
}();


},{"./page/BasePage":3,"./page/EntryPage":4,"./page/PageLoader":9}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateUtils_1 = require("./util/TemplateUtils");

var Template = function () {
    function Template(templateName) {
        _classCallCheck(this, Template);

        this.templateElement = TemplateUtils_1.TemplateUtils.createElement(templateName);
    }

    _createClass(Template, [{
        key: "getElement",
        value: function getElement() {
            return this.templateElement;
        }
    }]);

    return Template;
}();

exports.Template = Template;


},{"./util/TemplateUtils":16}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var Socket_1 = require("../socket/Socket");
var PageLoader_1 = require("./PageLoader");
var EntryPage_1 = require("./EntryPage");

var BasePage = function (_Page_1$Page) {
    _inherits(BasePage, _Page_1$Page);

    function BasePage() {
        _classCallCheck(this, BasePage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BasePage).apply(this, arguments));
    }

    _createClass(BasePage, [{
        key: "showPage",
        value: function showPage() {
            _get(Object.getPrototypeOf(BasePage.prototype), "showTemplate", this).call(this, "navbar");
            _get(Object.getPrototypeOf(BasePage.prototype), "showTemplate", this).call(this, "footer");
            _get(Object.getPrototypeOf(BasePage.prototype), "showTemplate", this).call(this, "modal");
            this.socket = Socket_1.Socket.getInstance();
            this.socket.addSocketListener(this);
        }
    }, {
        key: "hidePage",
        value: function hidePage() {}
    }, {
        key: "onSocketOpened",
        value: function onSocketOpened() {
            _get(Object.getPrototypeOf(BasePage.prototype), "hideModal", this).call(this, '#server-disconnected-modal');
        }
    }, {
        key: "onSocketClosed",
        value: function onSocketClosed() {
            _get(Object.getPrototypeOf(BasePage.prototype), "showModal", this).call(this, '#server-disconnected-modal');
            PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, PageLoader_1.PageLoader.getCurrentPage());
        }
    }, {
        key: "onSocketObjectReceived",
        value: function onSocketObjectReceived(messageObject) {}
    }]);

    return BasePage;
}(Page_1.Page);

exports.BasePage = BasePage;


},{"../socket/Socket":13,"./EntryPage":4,"./Page":8,"./PageLoader":9}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var PageLoader_1 = require("./PageLoader");
var MatchMakingPage_1 = require("./MatchMakingPage");
var Player_1 = require("../player/Player");
var PlayerHelper_1 = require("../player/PlayerHelper");
var SignInPage_1 = require("./SignInPage");

var EntryPage = function (_Page_1$Page) {
    _inherits(EntryPage, _Page_1$Page);

    function EntryPage() {
        _classCallCheck(this, EntryPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(EntryPage).apply(this, arguments));
    }

    _createClass(EntryPage, [{
        key: "showPage",
        value: function showPage() {
            var _this2 = this;

            _get(Object.getPrototypeOf(EntryPage.prototype), "showTemplate", this).call(this, 'entry-page-main-row');
            if (Player_1.Player.isLoggedIn()) {
                _get(Object.getPrototypeOf(EntryPage.prototype), "showTemplate", this).call(this, 'player-card');
                PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
                _get(Object.getPrototypeOf(EntryPage.prototype), "removeElementClass", this).call(this, ".main-menu-matchmaking-button", "inactive");
                _get(Object.getPrototypeOf(EntryPage.prototype), "removeElementClass", this).call(this, ".main-menu-matchmaking-button", "grey-text");
                _get(Object.getPrototypeOf(EntryPage.prototype), "addElementClass", this).call(this, ".main-menu-matchmaking-button", "waves-effect");
                _get(Object.getPrototypeOf(EntryPage.prototype), "addElementClass", this).call(this, ".main-menu-matchmaking-button", "waves-dark");
                _get(Object.getPrototypeOf(EntryPage.prototype), "addElementClass", this).call(this, ".main-menu-matchmaking-button", "grey-text");
                _get(Object.getPrototypeOf(EntryPage.prototype), "addElementClass", this).call(this, ".main-menu-matchmaking-button", "text-darken-4");
            } else {
                _get(Object.getPrototypeOf(EntryPage.prototype), "showTemplate", this).call(this, 'tic-tac-toe-icon');
            }
            _get(Object.getPrototypeOf(EntryPage.prototype), "setTemplateEventHandler", this).call(this, "main-menu", ".main-menu-sign-in-button", "click", function (element) {
                PageLoader_1.PageLoader.render(SignInPage_1.SignInPage, _this2);
            });
            _get(Object.getPrototypeOf(EntryPage.prototype), "setTemplateEventHandler", this).call(this, "main-menu", ".main-menu-matchmaking-button", "click", function (element) {
                if (_get(Object.getPrototypeOf(EntryPage.prototype), "checkElementHasClass", _this2).call(_this2, ".main-menu-matchmaking-button", "inactive")) {
                    return;
                }
                PageLoader_1.PageLoader.render(MatchMakingPage_1.MatchMakingPage, _this2);
            });
        }
    }, {
        key: "hidePage",
        value: function hidePage() {
            _get(Object.getPrototypeOf(EntryPage.prototype), "hideTemplate", this).call(this, 'entry-page-main-row');
        }
    }]);

    return EntryPage;
}(Page_1.Page);

exports.EntryPage = EntryPage;


},{"../player/Player":11,"../player/PlayerHelper":12,"./MatchMakingPage":6,"./Page":8,"./PageLoader":9,"./SignInPage":10}],5:[function(require,module,exports){
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


},{"../player/PlayerHelper":12,"../socket/Socket":13,"./MatchPage":7,"./Page":8,"./PageLoader":9}],6:[function(require,module,exports){
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


},{"../player/Player":11,"../player/PlayerHelper":12,"../socket/Socket":13,"./MatchFoundPage":5,"./Page":8,"./PageLoader":9}],7:[function(require,module,exports){
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


},{"../player/Player":11,"../player/PlayerHelper":12,"../socket/Socket":13,"../socket/message/MatchMove":14,"./EntryPage":4,"./MatchMakingPage":6,"./Page":8,"./PageLoader":9}],8:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateUtils_1 = require("../util/TemplateUtils");
var List_1 = require("../util/collection/List");
var Template_1 = require("../Template");

var Page = function () {
    function Page() {
        _classCallCheck(this, Page);

        this.templateInstances = new Map();
    }

    _createClass(Page, [{
        key: "setTemplateEventHandler",
        value: function setTemplateEventHandler(templateName, templateElementSelector, event, handler) {
            var templates = this.templateInstances.get(templateName);
            if (templates == null) {
                throw "Could not set template event: Template " + templateName + " not found";
            }
            templates.forEach(function (template) {
                var elements = template.getElement().querySelectorAll(templateElementSelector);
                for (var i = 0; i < elements.length; i++) {
                    elements.item(i).addEventListener(event, function (event) {
                        handler(event.target);
                    });
                }
            });
        }
    }, {
        key: "showTemplate",
        value: function showTemplate(templateName) {
            var _this = this;

            var dummyElements = TemplateUtils_1.TemplateUtils.getDummyElements(templateName);
            if (dummyElements.size() == 0) {
                throw "Could not show template: Template " + templateName + " not found";
            }
            dummyElements.forEach(function (dummyElement) {
                var templateInstanceIdentity = dummyElement.getAttribute("data-template-instance-identity");
                var template = new Template_1.Template(templateName);
                if (templateInstanceIdentity) {
                    template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
                }
                var templateList = _this.templateInstances.get(templateName);
                if (templateList == null) {
                    templateList = new List_1.List();
                    _this.templateInstances.set(templateName, templateList);
                }
                templateList.add(template);
                dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
                template.getElement();
                _this.showChildElements(template.getElement());
            });
        }
    }, {
        key: "showChildElements",
        value: function showChildElements(element) {
            var _this2 = this;

            var dummyElements = TemplateUtils_1.TemplateUtils.getChildDummyElements(element);
            dummyElements.forEach(function (dummyElement) {
                var templateNameAttribute = dummyElement.getAttribute("data-template-name");
                var templateNoAutoShowAttribute = dummyElement.getAttribute("data-template-noautoshow");
                var templateInstanceIdentity = dummyElement.getAttribute("data-template-instance-identity");
                if (templateNoAutoShowAttribute) {
                    return;
                }
                var template = new Template_1.Template(templateNameAttribute);
                if (templateInstanceIdentity) {
                    template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
                }
                var templateList = _this2.templateInstances.get(templateNameAttribute);
                if (templateList == null) {
                    templateList = new List_1.List();
                    _this2.templateInstances.set(templateNameAttribute, templateList);
                }
                templateList.add(template);
                dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
                template.getElement();
                _this2.showChildElements(template.getElement());
            });
        }
    }, {
        key: "hideTemplate",
        value: function hideTemplate(templateName) {
            var templates = this.templateInstances.get(templateName);
            if (templates == null) {
                throw "Could not remove template: Template " + templateName + " not found";
            }
            templates.forEach(function (template) {
                var dummyElement = document.createElement("div");
                dummyElement.setAttribute("class", "template-dummy");
                dummyElement.setAttribute("data-template-name", templateName);
                if (template.getElement()['data-instance-identity'] !== null) {
                    dummyElement.setAttribute("data-template-instance-identity", template.getElement()['data-instance-identity']);
                }
                template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
            });
        }
    }, {
        key: "hideAllTemplates",
        value: function hideAllTemplates() {
            this.templateInstances.forEach(function (templateList, templateName) {
                templateList.forEach(function (template) {
                    var dummyElement = document.createElement("div");
                    dummyElement.setAttribute("class", "template-dummy");
                    dummyElement.setAttribute("data-template-name", templateName);
                    template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
                });
            });
        }
    }, {
        key: "updateElementText",
        value: function updateElementText(elementSelector, updatedText) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not update element: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i).textContent = updatedText;
            }
        }
    }, {
        key: "getElementAttribute",
        value: function getElementAttribute(elementSelector, attribute) {
            var element = document.querySelector(elementSelector);
            if (element == null) {
                throw "Could not get element text: " + elementSelector + " could not be found.";
            }
            if (element[attribute] == null) {
                throw "Could not get attribute: " + elementSelector + " does not have attribute " + attribute;
            }
            return element[attribute];
        }
    }, {
        key: "updateElementStyle",
        value: function updateElementStyle(elementSelector, style, value) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not update element: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                if (elementList.item(i).style[style] === undefined) {
                    throw "Could not update element style: " + style + " not valid";
                }
                elementList.item(i).style[style] = value;
            }
        }
    }, {
        key: "updateElementAttribute",
        value: function updateElementAttribute(elementSelector, attribute, value) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not update element: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i)[attribute] = value;
            }
        }
    }, {
        key: "addElementClass",
        value: function addElementClass(elementSelector, className) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not add class: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i).classList.add(className);
            }
        }
    }, {
        key: "checkElementHasClass",
        value: function checkElementHasClass(elementSelector, className) {
            var element = document.querySelector(elementSelector);
            if (element == null) {
                throw "Could not check class: Element " + elementSelector + " not found";
            }
            return element.classList.contains(className);
        }
    }, {
        key: "removeElementClass",
        value: function removeElementClass(elementSelector, className) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not remove class: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i).classList.remove(className);
            }
        }
    }, {
        key: "showModal",
        value: function showModal(modalSelector) {
            if (!$(modalSelector).length) {
                throw "Cannot show modal: " + modalSelector + " could not be found";
            }
            $(modalSelector).openModal({
                dismissible: false,
                opacity: .5,
                in_duration: 300,
                out_duration: 200
            });
        }
    }, {
        key: "hideModal",
        value: function hideModal(modalSelector) {
            if (!$(modalSelector).length) {
                throw "Cannot hide modal: " + modalSelector + " could not be found";
            }
            $(modalSelector).closeModal();
        }
    }]);

    return Page;
}();

exports.Page = Page;


},{"../Template":2,"../util/TemplateUtils":16,"../util/collection/List":17}],9:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageLoader = function () {
    function PageLoader() {
        _classCallCheck(this, PageLoader);
    }

    _createClass(PageLoader, null, [{
        key: "render",
        value: function render(PageClass, oldPage) {
            if (oldPage) {
                oldPage.hidePage();
            }
            this.currentPage = new PageClass();
            this.currentPage.showPage();
        }
    }, {
        key: "getCurrentPage",
        value: function getCurrentPage() {
            return this.currentPage;
        }
    }]);

    return PageLoader;
}();

exports.PageLoader = PageLoader;


},{}],10:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var PageLoader_1 = require("./PageLoader");
var Player_1 = require("../player/Player");
var EntryPage_1 = require("./EntryPage");
var Socket_1 = require("../socket/Socket");

var SignInPage = function (_Page_1$Page) {
    _inherits(SignInPage, _Page_1$Page);

    function SignInPage() {
        _classCallCheck(this, SignInPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SignInPage).apply(this, arguments));
    }

    _createClass(SignInPage, [{
        key: "showPage",
        value: function showPage() {
            var _this2 = this;

            _get(Object.getPrototypeOf(SignInPage.prototype), "showTemplate", this).call(this, 'sign-in-page-main-row');
            _get(Object.getPrototypeOf(SignInPage.prototype), "updateElementAttribute", this).call(this, ".player-icon", "src", "images/player/" + Player_1.Player.getPlayerInstance().getIcon() + ".svg");
            _get(Object.getPrototypeOf(SignInPage.prototype), "updateElementText", this).call(this, ".player-name", Player_1.Player.getPlayerInstance().getUsername());
            _get(Object.getPrototypeOf(SignInPage.prototype), "updateElementAttribute", this).call(this, "#username-field", "value", Player_1.Player.getPlayerInstance().getUsername());
            //Edit Icon
            _get(Object.getPrototypeOf(SignInPage.prototype), "setTemplateEventHandler", this).call(this, "sign-in-page-main-row", ".edit-player-icon-button", "click", function (element) {
                _get(Object.getPrototypeOf(SignInPage.prototype), "showModal", _this2).call(_this2, '#edit-player-icon-modal');
            });
            //Select Icon
            var selectedIcon = null;
            _get(Object.getPrototypeOf(SignInPage.prototype), "setTemplateEventHandler", this).call(this, "edit-player-icon-modal-template", ".player-icon-choice", "click", function (icon) {
                if (selectedIcon != null) {
                    selectedIcon.setAttribute('data-player-icon-selected', 'false');
                }
                selectedIcon = icon;
                icon.setAttribute('data-player-icon-selected', 'true');
                _get(Object.getPrototypeOf(SignInPage.prototype), "removeElementClass", _this2).call(_this2, ".edit-player-icon-submit-button", "disabled");
            });
            //Save Icon
            _get(Object.getPrototypeOf(SignInPage.prototype), "setTemplateEventHandler", this).call(this, "edit-player-icon-modal-template", ".edit-player-icon-submit-button", "click", function (button) {
                if (button.classList.contains("disabled")) {
                    return;
                }
                var player = Player_1.Player.getPlayerInstance();
                var icon = selectedIcon.getAttribute('data-player-icon');
                player.setIcon(icon);
                _get(Object.getPrototypeOf(SignInPage.prototype), "updateElementAttribute", _this2).call(_this2, ".player-icon", "src", "images/player/" + Player_1.Player.getPlayerInstance().getIcon() + ".svg");
                _this2.socket.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
                _get(Object.getPrototypeOf(SignInPage.prototype), "hideModal", _this2).call(_this2, '#edit-player-icon-modal');
            });
            //Edit Profile
            _get(Object.getPrototypeOf(SignInPage.prototype), "setTemplateEventHandler", this).call(this, "sign-in-page-main-row", ".edit-player-profile-button", "click", function (element) {
                _get(Object.getPrototypeOf(SignInPage.prototype), "showModal", _this2).call(_this2, '#edit-player-profile-modal');
            });
            //Save Profile
            _get(Object.getPrototypeOf(SignInPage.prototype), "setTemplateEventHandler", this).call(this, "edit-player-profile-modal-template", ".edit-player-profile-submit-button", "click", function (element) {
                var player = Player_1.Player.getPlayerInstance();
                var username = _get(Object.getPrototypeOf(SignInPage.prototype), "getElementAttribute", _this2).call(_this2, "#username-field", "value");
                player.setUsername(username);
                _get(Object.getPrototypeOf(SignInPage.prototype), "updateElementText", _this2).call(_this2, ".player-name", Player_1.Player.getPlayerInstance().getUsername());
                _this2.socket.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
                _get(Object.getPrototypeOf(SignInPage.prototype), "hideModal", _this2).call(_this2, '#edit-player-profile-modal');
            });
            _get(Object.getPrototypeOf(SignInPage.prototype), "setTemplateEventHandler", this).call(this, "sign-in-page-main-row", ".player-editor-menu-button", "click", function (element) {
                _get(Object.getPrototypeOf(SignInPage.prototype), "updateElementText", _this2).call(_this2, ".player-name", Player_1.Player.getPlayerInstance().getUsername());
                _this2.socket.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
                PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, _this2);
            });
            this.socket = Socket_1.Socket.getInstance();
        }
    }, {
        key: "hidePage",
        value: function hidePage() {
            _get(Object.getPrototypeOf(SignInPage.prototype), "hideModal", this).call(this, '#edit-player-icon-modal');
            _get(Object.getPrototypeOf(SignInPage.prototype), "hideModal", this).call(this, '#edit-player-profile-modal');
            _get(Object.getPrototypeOf(SignInPage.prototype), "hideTemplate", this).call(this, 'sign-in-page-main-row');
        }
    }]);

    return SignInPage;
}(Page_1.Page);

exports.SignInPage = SignInPage;


},{"../player/Player":11,"../socket/Socket":13,"./EntryPage":4,"./Page":8,"./PageLoader":9}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
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


},{"./Player":11}],13:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List_1 = require("../util/collection/List");
var MessageObject_1 = require("./message/MessageObject");
var Player_1 = require("../player/Player");

var Socket = function () {
    function Socket() {
        _classCallCheck(this, Socket);

        this.createSocketAndSetHandlers();
        this.socketListeners = new List_1.List();
        this.socketSendQueue = new List_1.List();
    }

    _createClass(Socket, [{
        key: "createSocketAndSetHandlers",
        value: function createSocketAndSetHandlers() {
            var _this = this;

            this.socket = new WebSocket(Socket.SOCKET_ADDRESS);
            this.socket.onopen = function (event) {
                _this.onOpen();
            };
            this.socket.onmessage = function (messageEvent) {
                _this.onMessage(messageEvent.data);
            };
            this.socket.onerror = function (event) {
                _this.onError();
            };
            this.socket.onclose = function (event) {
                _this.onClose();
            };
        }
    }, {
        key: "onOpen",
        value: function onOpen() {
            var _this2 = this;

            this.socketSendQueue.forEach(function (messageObject) {
                _this2.send(messageObject);
            });
            if (Player_1.Player.isLoggedIn()) {
                this.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
            }
            this.socketListeners.forEach(function (listener) {
                listener.onSocketOpened();
            });
        }
    }, {
        key: "onMessage",
        value: function onMessage(jsonMessage) {
            var object = JSON.parse(jsonMessage);
            console.log("Socket message received");
            console.log(object);
            this.socketListeners.forEach(function (listener) {
                listener.onSocketObjectReceived(object);
            });
        }
    }, {
        key: "onError",
        value: function onError() {
            console.log("Socket Error");
        }
    }, {
        key: "onClose",
        value: function onClose() {
            var _this3 = this;

            this.socketListeners.forEach(function (listener) {
                listener.onSocketClosed();
            });
            console.log("Socket closed");
            setTimeout(function () {
                _this3.createSocketAndSetHandlers();
            }, 5000);
        }
    }, {
        key: "addSocketListener",
        value: function addSocketListener(listener) {
            this.socketListeners.add(listener);
        }
    }, {
        key: "removeSocketListener",
        value: function removeSocketListener(listener) {
            this.socketListeners.remove(listener);
        }
    }, {
        key: "sendObject",
        value: function sendObject(type, data) {
            var messageObject = this.createMessageObject(type, data);
            if (this.socket.readyState == WebSocket.OPEN) {
                this.send(messageObject);
            } else {
                this.socketSendQueue.add(messageObject);
            }
        }
    }, {
        key: "createMessageObject",
        value: function createMessageObject(type, data) {
            var message = new MessageObject_1.MessageObject();
            message.type = type;
            if (data) {
                message.data = data;
            }
            return message;
        }
    }, {
        key: "send",
        value: function send(messageObject) {
            this.socket.send(JSON.stringify(messageObject));
            console.log("Sent message");
            console.log(JSON.stringify(messageObject));
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            if (this.instance == null) {
                this.instance = new Socket();
            }
            return this.instance;
        }
    }]);

    return Socket;
}();

Socket.SOCKET_ADDRESS = "ws://localhost:2000";
exports.Socket = Socket;


},{"../player/Player":11,"../util/collection/List":17,"./message/MessageObject":15}],14:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MatchMove = function MatchMove() {
  _classCallCheck(this, MatchMove);
};

exports.MatchMove = MatchMove;


},{}],15:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageObject = function MessageObject() {
  _classCallCheck(this, MessageObject);
};

exports.MessageObject = MessageObject;


},{}],16:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List_1 = require("./collection/List");

var TemplateUtils = function () {
    function TemplateUtils() {
        _classCallCheck(this, TemplateUtils);
    }

    _createClass(TemplateUtils, null, [{
        key: "createElement",
        value: function createElement(templateName) {
            if (!this.templateCache.has(templateName)) {
                this.templateCache.set(templateName, this.readTemplate(templateName));
            }
            return document.importNode(this.templateCache.get(templateName).content, true).firstElementChild;
        }
    }, {
        key: "readTemplate",
        value: function readTemplate(templateName) {
            var template = document.getElementById(templateName);
            if (template == null) {
                throw "Template '" + templateName + "' could not be loaded";
            }
            return document.getElementById(templateName);
        }
    }, {
        key: "getDummyElements",
        value: function getDummyElements(templateName) {
            var selector = ".template-dummy";
            if (templateName) {
                selector = "[data-template-name=" + templateName + "]" + selector;
            }
            var dummyElements = document.querySelectorAll(selector);
            var htmlElements = new List_1.List();
            for (var i = 0; i < dummyElements.length; i++) {
                htmlElements.add(dummyElements.item(i));
            }
            return htmlElements;
        }
    }, {
        key: "getChildDummyElements",
        value: function getChildDummyElements(element) {
            var dummyElements = element.querySelectorAll(".template-dummy");
            var htmlElements = new List_1.List();
            for (var i = 0; i < dummyElements.length; i++) {
                htmlElements.add(dummyElements.item(i));
            }
            return htmlElements;
        }
    }]);

    return TemplateUtils;
}();

TemplateUtils.templateCache = new Map();
exports.TemplateUtils = TemplateUtils;


},{"./collection/List":17}],17:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
    function List() {
        _classCallCheck(this, List);

        this.items = [];
    }

    _createClass(List, [{
        key: "size",
        value: function size() {
            return this.items.length;
        }
    }, {
        key: "add",
        value: function add(value) {
            this.items.push(value);
        }
    }, {
        key: "addAll",
        value: function addAll(values) {
            for (var i = 0; i < values.size(); i++) {
                this.items.push(values.get(i));
            }
        }
    }, {
        key: "contains",
        value: function contains(value) {
            var index = this.items.indexOf(value);
            return index != -1;
        }
    }, {
        key: "get",
        value: function get(index) {
            return this.items[index];
        }
    }, {
        key: "remove",
        value: function remove(value) {
            var index = this.items.indexOf(value);
            if (index != -1) {
                this.items.splice(index, 1);
            }
        }
    }, {
        key: "forEach",
        value: function forEach(fn) {
            for (var i = 0; i < this.items.length; i++) {
                fn(this.items[i]);
            }
        }
    }]);

    return List;
}();

exports.List = List;


},{}]},{},[1]);
