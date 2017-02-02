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
//# sourceMappingURL=EntryPage.js.map
//# sourceMappingURL=EntryPage.js.map