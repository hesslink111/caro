"use strict";
const List_1 = require("./collection/List");
class TemplateUtils {
    static createElement(templateName) {
        if (!this.templateCache.has(templateName)) {
            this.templateCache.set(templateName, this.readTemplate(templateName));
        }
        return document.importNode(this.templateCache.get(templateName).content, true).firstElementChild;
    }
    static readTemplate(templateName) {
        var template = document.getElementById(templateName);
        if (template == null) {
            throw "Template '" + templateName + "' could not be loaded";
        }
        return document.getElementById(templateName);
    }
    static getDummyElements(templateName) {
        var selector = ".template-dummy";
        if (templateName) {
            selector = "[data-template-name=" + templateName + "]" + selector;
        }
        var dummyElements = document.querySelectorAll(selector);
        var htmlElements = new List_1.List();
        for (var i = 0; i < dummyElements.length; i++) {
            htmlElements.add(dummyElements.item(i));
        }
        return htmlElements;
    }
    static getChildDummyElements(element) {
        var dummyElements = element.querySelectorAll(".template-dummy");
        var htmlElements = new List_1.List();
        for (var i = 0; i < dummyElements.length; i++) {
            htmlElements.add(dummyElements.item(i));
        }
        return htmlElements;
    }
}
TemplateUtils.templateCache = new Map();
exports.TemplateUtils = TemplateUtils;
//# sourceMappingURL=TemplateUtils.js.map