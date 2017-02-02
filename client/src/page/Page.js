"use strict";
const TemplateUtils_1 = require("../util/TemplateUtils");
const List_1 = require("../util/collection/List");
const Template_1 = require("../Template");
class Page {
    constructor() {
        this.templateInstances = new Map();
    }
    setTemplateEventHandler(templateName, templateElementSelector, event, handler) {
        var templates = this.templateInstances.get(templateName);
        if (templates == null) {
            throw "Could not set template event: Template " + templateName + " not found";
        }
        templates.forEach((template) => {
            var elements = template.getElement().querySelectorAll(templateElementSelector);
            for (var i = 0; i < elements.length; i++) {
                elements.item(i).addEventListener(event, (event) => {
                    handler(event.target);
                });
            }
        });
    }
    showTemplate(templateName) {
        var dummyElements = TemplateUtils_1.TemplateUtils.getDummyElements(templateName);
        if (dummyElements.size() == 0) {
            throw "Could not show template: Template " + templateName + " not found";
        }
        dummyElements.forEach((dummyElement) => {
            var templateInstanceIdentity = dummyElement.getAttribute("data-template-instance-identity");
            var template = new Template_1.Template(templateName);
            if (templateInstanceIdentity) {
                template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
            }
            var templateList = this.templateInstances.get(templateName);
            if (templateList == null) {
                templateList = new List_1.List();
                this.templateInstances.set(templateName, templateList);
            }
            templateList.add(template);
            dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
            template.getElement();
            this.showChildElements(template.getElement());
        });
    }
    showChildElements(element) {
        var dummyElements = TemplateUtils_1.TemplateUtils.getChildDummyElements(element);
        dummyElements.forEach((dummyElement) => {
            var templateNameAttribute = dummyElement.getAttribute("data-template-name");
            var templateNoAutoShowAttribute = dummyElement.getAttribute("data-template-noautoshow");
            var templateInstanceIdentity = dummyElement.getAttribute("data-template-instance-identity");
            if (templateNoAutoShowAttribute) {
                return;
            }
            var template = new Template_1.Template(templateNameAttribute);
            if (templateInstanceIdentity) {
                template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
            }
            var templateList = this.templateInstances.get(templateNameAttribute);
            if (templateList == null) {
                templateList = new List_1.List();
                this.templateInstances.set(templateNameAttribute, templateList);
            }
            templateList.add(template);
            dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
            template.getElement();
            this.showChildElements(template.getElement());
        });
    }
    hideTemplate(templateName) {
        var templates = this.templateInstances.get(templateName);
        if (templates == null) {
            throw "Could not remove template: Template " + templateName + " not found";
        }
        templates.forEach((template) => {
            var dummyElement = document.createElement("div");
            dummyElement.setAttribute("class", "template-dummy");
            dummyElement.setAttribute("data-template-name", templateName);
            if (template.getElement()['data-instance-identity'] !== null) {
                dummyElement.setAttribute("data-template-instance-identity", template.getElement()['data-instance-identity']);
            }
            template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
        });
    }
    hideAllTemplates() {
        this.templateInstances.forEach((templateList, templateName) => {
            templateList.forEach((template) => {
                var dummyElement = document.createElement("div");
                dummyElement.setAttribute("class", "template-dummy");
                dummyElement.setAttribute("data-template-name", templateName);
                template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
            });
        });
    }
    updateElementText(elementSelector, updatedText) {
        var elementList = document.querySelectorAll(elementSelector);
        if (elementList.length == 0) {
            throw "Could not update element: Element " + elementSelector + " not found";
        }
        for (var i = 0; i < elementList.length; i++) {
            elementList.item(i).textContent = updatedText;
        }
    }
    getElementAttribute(elementSelector, attribute) {
        var element = document.querySelector(elementSelector);
        if (element == null) {
            throw "Could not get element text: " + elementSelector + " could not be found.";
        }
        if (element[attribute] == null) {
            throw "Could not get attribute: " + elementSelector + " does not have attribute " + attribute;
        }
        return element[attribute];
    }
    updateElementStyle(elementSelector, style, value) {
        var elementList = document.querySelectorAll(elementSelector);
        if (elementList.length == 0) {
            throw "Could not update element: Element " + elementSelector + " not found";
        }
        for (var i = 0; i < elementList.length; i++) {
            if (elementList.item(i).style[style] === undefined) {
                throw "Could not update element style: " + style + " not valid";
            }
            elementList.item(i).style[style] = value;
        }
    }
    updateElementAttribute(elementSelector, attribute, value) {
        var elementList = document.querySelectorAll(elementSelector);
        if (elementList.length == 0) {
            throw "Could not update element: Element " + elementSelector + " not found";
        }
        for (var i = 0; i < elementList.length; i++) {
            elementList.item(i)[attribute] = value;
        }
    }
    addElementClass(elementSelector, className) {
        var elementList = document.querySelectorAll(elementSelector);
        if (elementList.length == 0) {
            throw "Could not add class: Element " + elementSelector + " not found";
        }
        for (var i = 0; i < elementList.length; i++) {
            elementList.item(i).classList.add(className);
        }
    }
    checkElementHasClass(elementSelector, className) {
        var element = document.querySelector(elementSelector);
        if (element == null) {
            throw "Could not check class: Element " + elementSelector + " not found";
        }
        return element.classList.contains(className);
    }
    removeElementClass(elementSelector, className) {
        var elementList = document.querySelectorAll(elementSelector);
        if (elementList.length == 0) {
            throw "Could not remove class: Element " + elementSelector + " not found";
        }
        for (var i = 0; i < elementList.length; i++) {
            elementList.item(i).classList.remove(className);
        }
    }
    showModal(modalSelector) {
        if (!$(modalSelector).length) {
            throw "Cannot show modal: " + modalSelector + " could not be found";
        }
        $(modalSelector).openModal({
            dismissible: false,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
        });
    }
    hideModal(modalSelector) {
        if (!$(modalSelector).length) {
            throw "Cannot hide modal: " + modalSelector + " could not be found";
        }
        $(modalSelector).closeModal();
    }
}
exports.Page = Page;
//# sourceMappingURL=Page.js.map