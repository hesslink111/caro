"use strict";

class Template {
    static createNode(templateName) {
        if (!this.templateCache.has(templateName)) {
            this.templateCache.set(templateName, this.readTemplate(templateName));
        }
        return document.importNode(this.templateCache.get(templateName).content, true);
    }
    static readTemplate(templateName) {
        var template = document.getElementById(templateName);
        if (template == null) {
            throw "Template '" + templateName + "' could not be loaded";
        }
        return document.getElementById(templateName);
    }
    static replaceDummyNodes() {
        var dummyElements = document.querySelectorAll(".template-dummy");
        for (var i = 0; i < dummyElements.length; i++) {
            var element = dummyElements.item(i);
            var templateName = element.getAttribute("data-template-name");
            var nodeInstance = Template.createNode(templateName);
            element.parentElement.replaceChild(nodeInstance, element);
        }
    }
}
Template.templateCache = new Map();
exports.Template = Template;
//# sourceMappingURL=TemplateUtils.jsls.js.map
//# sourceMappingURL=TemplateUtils.jsls.js.map