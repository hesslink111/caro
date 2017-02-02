"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page_1 = require("./Page");
var PageLoader_1 = require("./PageLoader");
var MatchMakingPage_1 = require("./MatchMakingPage");
var EntryPage_1 = require("./EntryPage");

var MatchReportPage = function (_Page_1$Page) {
    _inherits(MatchReportPage, _Page_1$Page);

    function MatchReportPage() {
        _classCallCheck(this, MatchReportPage);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MatchReportPage).apply(this, arguments));
    }

    _createClass(MatchReportPage, [{
        key: "showPage",
        value: function showPage() {
            var _this2 = this;

            _get(Object.getPrototypeOf(MatchReportPage.prototype), "showTemplate", this).call(this, 'match-report-page-main-row');
            _get(Object.getPrototypeOf(MatchReportPage.prototype), "setTemplateEventHandler", this).call(this, "match-report-card", ".match-report-card-back-button", "click", function (template) {
                PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, _this2);
            });
            _get(Object.getPrototypeOf(MatchReportPage.prototype), "setTemplateEventHandler", this).call(this, "match-report-card", ".match-report-card-new-match-button", "click", function (template) {
                PageLoader_1.PageLoader.render(MatchMakingPage_1.MatchMakingPage, _this2);
            });
        }
    }, {
        key: "hidePage",
        value: function hidePage() {
            _get(Object.getPrototypeOf(MatchReportPage.prototype), "hideTemplate", this).call(this, 'match-report-page-main-row');
        }
    }]);

    return MatchReportPage;
}(Page_1.Page);

exports.MatchReportPage = MatchReportPage;
//# sourceMappingURL=MatchReportPage.js.map
//# sourceMappingURL=MatchReportPage.js.map