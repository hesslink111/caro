"use strict";
const Page_1 = require("./Page");
const PageLoader_1 = require("./PageLoader");
const Player_1 = require("../player/Player");
const EntryPage_1 = require("./EntryPage");
const Socket_1 = require("../socket/Socket");
class SignInPage extends Page_1.Page {
    showPage() {
        super.showTemplate('sign-in-page-main-row');
        super.updateElementAttribute(".player-icon", "src", "images/player/" + Player_1.Player.getPlayerInstance().getIcon() + ".svg");
        super.updateElementText(".player-name", Player_1.Player.getPlayerInstance().getUsername());
        super.updateElementAttribute("#username-field", "value", Player_1.Player.getPlayerInstance().getUsername());
        //Edit Icon
        super.setTemplateEventHandler("sign-in-page-main-row", ".edit-player-icon-button", "click", (element) => {
            super.showModal('#edit-player-icon-modal');
        });
        //Select Icon
        var selectedIcon = null;
        super.setTemplateEventHandler("edit-player-icon-modal-template", ".player-icon-choice", "click", (icon) => {
            if (selectedIcon != null) {
                selectedIcon.setAttribute('data-player-icon-selected', 'false');
            }
            selectedIcon = icon;
            icon.setAttribute('data-player-icon-selected', 'true');
            super.removeElementClass(".edit-player-icon-submit-button", "disabled");
        });
        //Save Icon
        super.setTemplateEventHandler("edit-player-icon-modal-template", ".edit-player-icon-submit-button", "click", (button) => {
            if (button.classList.contains("disabled")) {
                return;
            }
            var player = Player_1.Player.getPlayerInstance();
            var icon = selectedIcon.getAttribute('data-player-icon');
            player.setIcon(icon);
            super.updateElementAttribute(".player-icon", "src", "images/player/" + Player_1.Player.getPlayerInstance().getIcon() + ".svg");
            this.socket.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
            super.hideModal('#edit-player-icon-modal');
        });
        //Edit Profile
        super.setTemplateEventHandler("sign-in-page-main-row", ".edit-player-profile-button", "click", (element) => {
            super.showModal('#edit-player-profile-modal');
        });
        //Save Profile
        super.setTemplateEventHandler("edit-player-profile-modal-template", ".edit-player-profile-submit-button", "click", (element) => {
            var player = Player_1.Player.getPlayerInstance();
            var username = super.getElementAttribute("#username-field", "value");
            player.setUsername(username);
            super.updateElementText(".player-name", Player_1.Player.getPlayerInstance().getUsername());
            this.socket.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
            super.hideModal('#edit-player-profile-modal');
        });
        super.setTemplateEventHandler("sign-in-page-main-row", ".player-editor-menu-button", "click", (element) => {
            super.updateElementText(".player-name", Player_1.Player.getPlayerInstance().getUsername());
            this.socket.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
            PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, this);
        });
        this.socket = Socket_1.Socket.getInstance();
    }
    hidePage() {
        super.hideModal('#edit-player-icon-modal');
        super.hideModal('#edit-player-profile-modal');
        super.hideTemplate('sign-in-page-main-row');
    }
}
exports.SignInPage = SignInPage;
//# sourceMappingURL=SignInPage.js.map