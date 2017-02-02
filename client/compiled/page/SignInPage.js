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
//# sourceMappingURL=SignInPage.js.map
//# sourceMappingURL=SignInPage.js.map