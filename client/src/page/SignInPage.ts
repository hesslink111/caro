import {Page} from "./Page";
import {Template} from "../Template";
import {PageLoader} from "./PageLoader";
import {MatchMakingPage} from "./MatchMakingPage";
import {Player} from "../player/Player";
import {PlayerHelper} from "../player/PlayerHelper";
import {EntryPage} from "./EntryPage";
import {Socket} from "../socket/Socket";

export class SignInPage extends Page {

    private socket: Socket;

    public showPage(): void {
        super.showTemplate('sign-in-page-main-row');

        super.updateElementAttribute(".player-icon",
            "src",
            "images/player/" + Player.getPlayerInstance().getIcon() + ".svg");

        super.updateElementText(".player-name",
            Player.getPlayerInstance().getUsername());
        super.updateElementAttribute("#username-field", "value",
            Player.getPlayerInstance().getUsername());


        //Edit Icon
        super.setTemplateEventHandler("sign-in-page-main-row",
            ".edit-player-icon-button",
            "click",
            (element: HTMLElement) => {
                super.showModal('#edit-player-icon-modal');
            }
        );

        //Select Icon
        var selectedIcon: HTMLElement = null;
        super.setTemplateEventHandler("edit-player-icon-modal-template",
            ".player-icon-choice",
            "click",
            (icon: HTMLElement) => {
                if(selectedIcon != null) {
                    selectedIcon.setAttribute('data-player-icon-selected', 'false');
                }

                selectedIcon = icon;
                icon.setAttribute('data-player-icon-selected', 'true');

                super.removeElementClass(".edit-player-icon-submit-button", "disabled");
            }
        );

        //Save Icon
        super.setTemplateEventHandler("edit-player-icon-modal-template",
            ".edit-player-icon-submit-button",
            "click",
            (button: HTMLElement) => {
                if(button.classList.contains("disabled")) {
                    return;
                }

                var player: Player = Player.getPlayerInstance();

                var icon: string = selectedIcon.getAttribute('data-player-icon');
                player.setIcon(icon);

                super.updateElementAttribute(".player-icon", "src",
                    "images/player/" + Player.getPlayerInstance().getIcon() + ".svg");

                this.socket.sendObject("PlayerUpdate", Player.getPlayerInstance());

                super.hideModal('#edit-player-icon-modal');
            }
        );


        //Edit Profile
        super.setTemplateEventHandler("sign-in-page-main-row",
            ".edit-player-profile-button",
            "click",
            (element: HTMLElement) => {
                super.showModal('#edit-player-profile-modal');
            }
        );

        //Save Profile
        super.setTemplateEventHandler("edit-player-profile-modal-template",
            ".edit-player-profile-submit-button",
            "click",
            (element: HTMLElement) => {
                var player: Player = Player.getPlayerInstance();

                var username: string = super.getElementAttribute("#username-field", "value");
                player.setUsername(username);

                super.updateElementText(".player-name",
                    Player.getPlayerInstance().getUsername());

                this.socket.sendObject("PlayerUpdate", Player.getPlayerInstance());

                super.hideModal('#edit-player-profile-modal');
            }
        );

        super.setTemplateEventHandler("sign-in-page-main-row",
            ".player-editor-menu-button",
            "click",
            (element: HTMLElement) => {
                super.updateElementText(".player-name",
                    Player.getPlayerInstance().getUsername());

                this.socket.sendObject("PlayerUpdate", Player.getPlayerInstance());

                PageLoader.render(EntryPage, this);
            }
        );

        this.socket = Socket.getInstance();

    }

    public hidePage(): void {
        super.hideModal('#edit-player-icon-modal');
        super.hideModal('#edit-player-profile-modal');
        super.hideTemplate('sign-in-page-main-row');
    }

}