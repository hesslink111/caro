import {Page} from "./Page";
import {PageLoader} from "./PageLoader";
import {MatchMakingPage} from "./MatchMakingPage";
import {Template} from "../Template";
import {EntryPage} from "./EntryPage";

export class MatchReportPage extends Page {

    public showPage(): void {
        super.showTemplate('match-report-page-main-row');

        super.setTemplateEventHandler("match-report-card", ".match-report-card-back-button", "click", (template: Template) => {
            PageLoader.render(EntryPage, this);
        });

        super.setTemplateEventHandler("match-report-card", ".match-report-card-new-match-button", "click", (template: Template) => {
            PageLoader.render(MatchMakingPage, this);
        });
    }

    public hidePage(): void {
        super.hideTemplate('match-report-page-main-row');
    }

}