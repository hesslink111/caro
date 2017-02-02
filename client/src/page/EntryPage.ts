import {Page} from "./Page";
import {Template} from "../Template";
import {PageLoader} from "./PageLoader";
import {MatchMakingPage} from "./MatchMakingPage";
import {Player} from "../player/Player";
import {PlayerHelper} from "../player/PlayerHelper";
import {SignInPage} from "./SignInPage";

export class EntryPage extends Page {
    
    public showPage(): void {
        super.showTemplate('entry-page-main-row');
        
        if(Player.isLoggedIn()) {
            super.showTemplate('player-card');
            PlayerHelper.updateCurrentPlayerView(this);

            super.removeElementClass(".main-menu-matchmaking-button", "inactive");
            super.removeElementClass(".main-menu-matchmaking-button", "grey-text");
            super.addElementClass(".main-menu-matchmaking-button", "waves-effect");
            super.addElementClass(".main-menu-matchmaking-button", "waves-dark");
            super.addElementClass(".main-menu-matchmaking-button", "grey-text");
            super.addElementClass(".main-menu-matchmaking-button", "text-darken-4");
        } else {
            super.showTemplate('tic-tac-toe-icon');
        }

        super.setTemplateEventHandler("main-menu", ".main-menu-sign-in-button", "click", (element: HTMLElement) => {
            PageLoader.render(SignInPage, this);
        });

        super.setTemplateEventHandler("main-menu", ".main-menu-matchmaking-button", "click", (element: HTMLElement) => {
            if(super.checkElementHasClass(".main-menu-matchmaking-button", "inactive")) {
                return;
            }
            
            PageLoader.render(MatchMakingPage, this);
        });
    }
    
    public hidePage(): void {
        super.hideTemplate('entry-page-main-row');
    }

}