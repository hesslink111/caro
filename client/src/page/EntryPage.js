"use strict";
const Page_1 = require("./Page");
const PageLoader_1 = require("./PageLoader");
const MatchMakingPage_1 = require("./MatchMakingPage");
const Player_1 = require("../player/Player");
const PlayerHelper_1 = require("../player/PlayerHelper");
const SignInPage_1 = require("./SignInPage");
class EntryPage extends Page_1.Page {
    showPage() {
        super.showTemplate('entry-page-main-row');
        if (Player_1.Player.isLoggedIn()) {
            super.showTemplate('player-card');
            PlayerHelper_1.PlayerHelper.updateCurrentPlayerView(this);
            super.removeElementClass(".main-menu-matchmaking-button", "inactive");
            super.removeElementClass(".main-menu-matchmaking-button", "grey-text");
            super.addElementClass(".main-menu-matchmaking-button", "waves-effect");
            super.addElementClass(".main-menu-matchmaking-button", "waves-dark");
            super.addElementClass(".main-menu-matchmaking-button", "grey-text");
            super.addElementClass(".main-menu-matchmaking-button", "text-darken-4");
        }
        else {
            super.showTemplate('tic-tac-toe-icon');
        }
        super.setTemplateEventHandler("main-menu", ".main-menu-sign-in-button", "click", (element) => {
            PageLoader_1.PageLoader.render(SignInPage_1.SignInPage, this);
        });
        super.setTemplateEventHandler("main-menu", ".main-menu-matchmaking-button", "click", (element) => {
            if (super.checkElementHasClass(".main-menu-matchmaking-button", "inactive")) {
                return;
            }
            PageLoader_1.PageLoader.render(MatchMakingPage_1.MatchMakingPage, this);
        });
    }
    hidePage() {
        super.hideTemplate('entry-page-main-row');
    }
}
exports.EntryPage = EntryPage;
//# sourceMappingURL=EntryPage.js.map