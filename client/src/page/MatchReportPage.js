"use strict";
const Page_1 = require("./Page");
const PageLoader_1 = require("./PageLoader");
const MatchMakingPage_1 = require("./MatchMakingPage");
const EntryPage_1 = require("./EntryPage");
class MatchReportPage extends Page_1.Page {
    showPage() {
        super.showTemplate('match-report-page-main-row');
        super.setTemplateEventHandler("match-report-card", ".match-report-card-back-button", "click", (template) => {
            PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, this);
        });
        super.setTemplateEventHandler("match-report-card", ".match-report-card-new-match-button", "click", (template) => {
            PageLoader_1.PageLoader.render(MatchMakingPage_1.MatchMakingPage, this);
        });
    }
    hidePage() {
        super.hideTemplate('match-report-page-main-row');
    }
}
exports.MatchReportPage = MatchReportPage;
//# sourceMappingURL=MatchReportPage.js.map