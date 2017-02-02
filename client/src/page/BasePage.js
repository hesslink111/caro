"use strict";
const Page_1 = require("./Page");
const Socket_1 = require("../socket/Socket");
const PageLoader_1 = require("./PageLoader");
const EntryPage_1 = require("./EntryPage");
class BasePage extends Page_1.Page {
    showPage() {
        super.showTemplate("navbar");
        super.showTemplate("footer");
        super.showTemplate("modal");
        this.socket = Socket_1.Socket.getInstance();
        this.socket.addSocketListener(this);
    }
    hidePage() {
    }
    onSocketOpened() {
        super.hideModal('#server-disconnected-modal');
    }
    onSocketClosed() {
        super.showModal('#server-disconnected-modal');
        PageLoader_1.PageLoader.render(EntryPage_1.EntryPage, PageLoader_1.PageLoader.getCurrentPage());
    }
    onSocketObjectReceived(messageObject) {
    }
}
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map