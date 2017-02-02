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
//# sourceMappingURL=Main.js.map
//# sourceMappingURL=Main.js.map