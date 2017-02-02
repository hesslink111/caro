import {List} from "./collection/List";

export class TemplateUtils {

    private static templateCache: Map<string, HTMLTemplateElement> = new Map<string, HTMLTemplateElement>();

    public static createElement(templateName: string): Element {
        if(!this.templateCache.has(templateName)) {
            this.templateCache.set(templateName, this.readTemplate(templateName));
        }
        return (<Element>document.importNode(this.templateCache.get(templateName).content, true)).firstElementChild;
    }

    private static readTemplate(templateName: string): HTMLTemplateElement {
        var template = <HTMLTemplateElement>document.getElementById(templateName);
        if(template == null) {
            throw "Template '" + templateName + "' could not be loaded";
        }
        return <HTMLTemplateElement>document.getElementById(templateName);
    }

    public static getDummyElements(templateName?: string): List<Element> {
        var selector = ".template-dummy";
        if(templateName) {
            selector = "[data-template-name=" + templateName + "]" + selector;
        }
        var dummyElements: NodeListOf<Element> = document.querySelectorAll(selector);

        var htmlElements = new List<Element>();
        for(var i=0; i<dummyElements.length; i++) {
            htmlElements.add(<Element>dummyElements.item(i));
        }

        return htmlElements;
    }

    public static getChildDummyElements(element: Element): List<Element> {
        var dummyElements: NodeListOf<Element> = element.querySelectorAll(".template-dummy");

        var htmlElements = new List<Element>();
        for(var i=0; i<dummyElements.length; i++) {
            htmlElements.add(<Element>dummyElements.item(i));
        }

        return htmlElements;
    }
}