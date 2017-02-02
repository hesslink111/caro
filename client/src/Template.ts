import {TemplateUtils} from "./util/TemplateUtils";
export class Template {

    private templateElement: Element;

    constructor(templateName: string) {
        this.templateElement = TemplateUtils.createElement(templateName);
    }

    public getElement(): Element {
        return this.templateElement;
    }
}