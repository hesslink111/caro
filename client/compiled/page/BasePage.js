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
//# sourceMappingURL=BasePage.js.map
//# sourceMappingURL=BasePage.js.map