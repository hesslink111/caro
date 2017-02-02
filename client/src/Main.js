"use strict";
const EntryPage_1 = require("./page/EntryPage");
const PageLoader_1 = require("./page/PageLoader");
const BasePage_1 = require("./page/BasePage");
window.onload = function () { Main.main(); };
class Main {
    constructor() {
        PageLoader_1.PageLoader.render(BasePage_1.BasePage);
        PageLoader_1.PageLoader.render(EntryPage_1.EntryPage);
        //PageLoader.render(MatchPage);
        //PageLoader.render(MatchFoundPage);
        //PageLoader.render(MatchReportPage);
        //PageLoader.render(MatchPage);
    }
    static main() {
        new Main();
    }
}
//# sourceMappingURL=Main.js.map