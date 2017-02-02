"use strict";
class PageLoader {
    static render(PageClass, oldPage) {
        if (oldPage) {
            oldPage.hidePage();
        }
        this.currentPage = new PageClass();
        this.currentPage.showPage();
    }
    static getCurrentPage() {
        return this.currentPage;
    }
}
exports.PageLoader = PageLoader;
//# sourceMappingURL=PageLoader.js.map