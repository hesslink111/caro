import {TemplateUtils} from "../util/TemplateUtils";
import {List} from "../util/collection/List";
import {Template} from "../Template";

export abstract class Page {

    private templateInstances: Map<string, List<Template>>;

    constructor() {
        this.templateInstances = new Map<string, List<Template>>();
    }

    public setTemplateEventHandler(templateName: string, templateElementSelector: string, event: string, handler: (HTMLElement) => any): void {

        var templates: List<Template> = this.templateInstances.get(templateName);
        if(templates == null) {
            throw "Could not set template event: Template " + templateName + " not found";
        }

        templates.forEach((template: Template) => {
            var elements = template.getElement().querySelectorAll(templateElementSelector);

            for(var i=0; i<elements.length; i++) {
                elements.item(i).addEventListener(event, (event: Event) => {
                    handler(event.target);
                });
            }
        });
    }

    public showTemplate(templateName: string): void {
        
        var dummyElements: List<Element> = TemplateUtils.getDummyElements(templateName);
        if(dummyElements.size() == 0) {
            throw "Could not show template: Template " + templateName + " not found";
        }

        dummyElements.forEach((dummyElement) => {
            var templateInstanceIdentity: string = dummyElement.getAttribute("data-template-instance-identity");

            var template: Template = new Template(templateName);

            if(templateInstanceIdentity) {
                template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
            }

            var templateList: List<Template> = this.templateInstances.get(templateName);
            if(templateList == null) {
                templateList = new List<Template>();
                this.templateInstances.set(templateName, templateList);
            }
            templateList.add(template);

            dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
            template.getElement();
            this.showChildElements(template.getElement());
        });
    }

    private showChildElements(element: Element) {
        var dummyElements: List<Element> = TemplateUtils.getChildDummyElements(element);

        dummyElements.forEach((dummyElement) => {
            var templateNameAttribute: string = dummyElement.getAttribute("data-template-name");
            var templateNoAutoShowAttribute: string = dummyElement.getAttribute("data-template-noautoshow");
            var templateInstanceIdentity: string = dummyElement.getAttribute("data-template-instance-identity");

            if(templateNoAutoShowAttribute) {
                return;
            }
            var template: Template = new Template(templateNameAttribute);

            if(templateInstanceIdentity) {
                template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
            }

            var templateList: List<Template> = this.templateInstances.get(templateNameAttribute);
            if(templateList == null) {
                templateList = new List<Template>();
                this.templateInstances.set(templateNameAttribute, templateList);
            }
            templateList.add(template);

            dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
            template.getElement();
            this.showChildElements(template.getElement());
        });
    }

    public hideTemplate(templateName: string) {
        var templates: List<Template> = this.templateInstances.get(templateName);
        if(templates == null) {
            throw "Could not remove template: Template " + templateName + " not found";
        }

        templates.forEach((template: Template) => {
            var dummyElement: Element = document.createElement("div");
            dummyElement.setAttribute("class", "template-dummy");
            dummyElement.setAttribute("data-template-name", templateName);
            if(template.getElement()['data-instance-identity'] !== null) {
                dummyElement.setAttribute("data-template-instance-identity", template.getElement()['data-instance-identity']);
            }
            template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
        });
    }

    public hideAllTemplates(): void {
        this.templateInstances.forEach((templateList: List<Template>, templateName: string) => {
            templateList.forEach((template: Template) => {
                var dummyElement: Element = document.createElement("div");
                dummyElement.setAttribute("class", "template-dummy");
                dummyElement.setAttribute("data-template-name", templateName);
                template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
            });
        });
    }

    public updateElementText(elementSelector: string, updatedText: string): void {
        var elementList: NodeListOf<Element> = document.querySelectorAll(elementSelector);

        if(elementList.length == 0) {
            throw "Could not update element: Element " + elementSelector + " not found";
        }

        for(var i=0; i<elementList.length; i++) {
            elementList.item(i).textContent = updatedText;
        }
    }

    public getElementAttribute(elementSelector: string, attribute: string): string {
        var element: Element = document.querySelector(elementSelector);
        if(element == null) {
            throw "Could not get element text: " + elementSelector + " could not be found.";
        }

        if(element[attribute] == null) {
            throw "Could not get attribute: " + elementSelector + " does not have attribute " + attribute;
        }

        return element[attribute];
    }

    public updateElementStyle(elementSelector: string, style: string, value: string): void {
        var elementList: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll(elementSelector);

        if(elementList.length == 0) {
            throw "Could not update element: Element " + elementSelector + " not found";
        }

        for(var i=0; i<elementList.length; i++) {
            if(elementList.item(i).style[style] === undefined) {
                throw "Could not update element style: " + style + " not valid";
            }

            elementList.item(i).style[style] = value;
        }
    }

    public updateElementAttribute(elementSelector: string, attribute: string, value: string): void {
        var elementList: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll(elementSelector);

        if(elementList.length == 0) {
            throw "Could not update element: Element " + elementSelector + " not found";
        }

        for(var i=0; i<elementList.length; i++) {
            elementList.item(i)[attribute] = value;
        }
    }

    public addElementClass(elementSelector: string, className: string): void {
        var elementList: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll(elementSelector);

        if(elementList.length == 0) {
            throw "Could not add class: Element " + elementSelector + " not found";
        }

        for(var i=0; i<elementList.length; i++) {
            elementList.item(i).classList.add(className);
        }
    }

    public checkElementHasClass(elementSelector: string, className: string): boolean {
        var element = document.querySelector(elementSelector);

        if(element == null) {
            throw "Could not check class: Element " + elementSelector + " not found";
        }

        return element.classList.contains(className);
    }

    public removeElementClass(elementSelector: string, className: string): void {
        var elementList: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>document.querySelectorAll(elementSelector);

        if(elementList.length == 0) {
            throw "Could not remove class: Element " + elementSelector + " not found";
        }

        for(var i=0; i<elementList.length; i++) {
            elementList.item(i).classList.remove(className);
        }
    }

    public showModal(modalSelector: string): void {
        if(!$(modalSelector).length) {
            throw "Cannot show modal: " + modalSelector + " could not be found";
        }

        $(modalSelector).openModal({
            dismissible: false,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
        });
    }

    public hideModal(modalSelector: string): void {
        if(!$(modalSelector).length) {
            throw "Cannot hide modal: " + modalSelector + " could not be found";
        }

        $(modalSelector).closeModal();
    }

    abstract showPage(): void;

    abstract hidePage(): void;

}