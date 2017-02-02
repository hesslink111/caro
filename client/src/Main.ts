import {EntryPage} from "./page/EntryPage";
import {PageLoader} from "./page/PageLoader";
import {BasePage} from "./page/BasePage";
import {MatchPage} from "./page/MatchPage";
import {MatchFoundPage} from "./page/MatchFoundPage";
import {MatchReportPage} from "./page/MatchReportPage";

window.onload = function() {Main.main();};

class Main {

    public static main(): void {
        new Main();
    }

    constructor() {
        PageLoader.render(BasePage);
        PageLoader.render(EntryPage);
        //PageLoader.render(MatchPage);
        //PageLoader.render(MatchFoundPage);
        //PageLoader.render(MatchReportPage);
        //PageLoader.render(MatchPage);
    }
}