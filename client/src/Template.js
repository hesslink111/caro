"use strict";
const TemplateUtils_1 = require("./util/TemplateUtils");
class Template {
    constructor(templateName) {
        this.templateElement = TemplateUtils_1.TemplateUtils.createElement(templateName);
    }
    getElement() {
        return this.templateElement;
    }
}
exports.Template = Template;
//# sourceMappingURL=Template.js.map