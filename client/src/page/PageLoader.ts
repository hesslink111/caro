import {Page} from "./Page";

export class PageLoader {

    private static currentPage: Page;
    
    public static render(PageClass: new () => Page, oldPage?: Page) {

        if(oldPage) {
            oldPage.hidePage();
        }

        this.currentPage = new PageClass();
        this.currentPage.showPage();
    }

    public static getCurrentPage(): Page {
        return this.currentPage;
    }
    
}