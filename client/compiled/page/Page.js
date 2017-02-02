"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TemplateUtils_1 = require("../util/TemplateUtils");
var List_1 = require("../util/collection/List");
var Template_1 = require("../Template");

var Page = function () {
    function Page() {
        _classCallCheck(this, Page);

        this.templateInstances = new Map();
    }

    _createClass(Page, [{
        key: "setTemplateEventHandler",
        value: function setTemplateEventHandler(templateName, templateElementSelector, event, handler) {
            var templates = this.templateInstances.get(templateName);
            if (templates == null) {
                throw "Could not set template event: Template " + templateName + " not found";
            }
            templates.forEach(function (template) {
                var elements = template.getElement().querySelectorAll(templateElementSelector);
                for (var i = 0; i < elements.length; i++) {
                    elements.item(i).addEventListener(event, function (event) {
                        handler(event.target);
                    });
                }
            });
        }
    }, {
        key: "showTemplate",
        value: function showTemplate(templateName) {
            var _this = this;

            var dummyElements = TemplateUtils_1.TemplateUtils.getDummyElements(templateName);
            if (dummyElements.size() == 0) {
                throw "Could not show template: Template " + templateName + " not found";
            }
            dummyElements.forEach(function (dummyElement) {
                var templateInstanceIdentity = dummyElement.getAttribute("data-template-instance-identity");
                var template = new Template_1.Template(templateName);
                if (templateInstanceIdentity) {
                    template.getElement().setAttribute("data-instance-identity", templateInstanceIdentity);
                }
                var templateList = _this.templateInstances.get(templateName);
                if (templateList == null) {
                    templateList = new List_1.List();
                    _this.templateInstances.set(templateName, templateList);
                }
                templateList.add(template);
                dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
                template.getElement();
                _this.showChildElements(template.getElement());
            });
        }
    }, {
        key: "showChildElements",
        value: function showChildElements(element) {
            var _this2 = this;

            var dummyElements = TemplateUtils_1.TemplateUtils.getChildDummyElements(element);
            dummyElements.forEach(function (dummyElement) {
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
                var templateList = _this2.templateInstances.get(templateNameAttribute);
                if (templateList == null) {
                    templateList = new List_1.List();
                    _this2.templateInstances.set(templateNameAttribute, templateList);
                }
                templateList.add(template);
                dummyElement.parentElement.replaceChild(template.getElement(), dummyElement);
                template.getElement();
                _this2.showChildElements(template.getElement());
            });
        }
    }, {
        key: "hideTemplate",
        value: function hideTemplate(templateName) {
            var templates = this.templateInstances.get(templateName);
            if (templates == null) {
                throw "Could not remove template: Template " + templateName + " not found";
            }
            templates.forEach(function (template) {
                var dummyElement = document.createElement("div");
                dummyElement.setAttribute("class", "template-dummy");
                dummyElement.setAttribute("data-template-name", templateName);
                if (template.getElement()['data-instance-identity'] !== null) {
                    dummyElement.setAttribute("data-template-instance-identity", template.getElement()['data-instance-identity']);
                }
                template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
            });
        }
    }, {
        key: "hideAllTemplates",
        value: function hideAllTemplates() {
            this.templateInstances.forEach(function (templateList, templateName) {
                templateList.forEach(function (template) {
                    var dummyElement = document.createElement("div");
                    dummyElement.setAttribute("class", "template-dummy");
                    dummyElement.setAttribute("data-template-name", templateName);
                    template.getElement().parentElement.replaceChild(dummyElement, template.getElement());
                });
            });
        }
    }, {
        key: "updateElementText",
        value: function updateElementText(elementSelector, updatedText) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not update element: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i).textContent = updatedText;
            }
        }
    }, {
        key: "getElementAttribute",
        value: function getElementAttribute(elementSelector, attribute) {
            var element = document.querySelector(elementSelector);
            if (element == null) {
                throw "Could not get element text: " + elementSelector + " could not be found.";
            }
            if (element[attribute] == null) {
                throw "Could not get attribute: " + elementSelector + " does not have attribute " + attribute;
            }
            return element[attribute];
        }
    }, {
        key: "updateElementStyle",
        value: function updateElementStyle(elementSelector, style, value) {
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
    }, {
        key: "updateElementAttribute",
        value: function updateElementAttribute(elementSelector, attribute, value) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not update element: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i)[attribute] = value;
            }
        }
    }, {
        key: "addElementClass",
        value: function addElementClass(elementSelector, className) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not add class: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i).classList.add(className);
            }
        }
    }, {
        key: "checkElementHasClass",
        value: function checkElementHasClass(elementSelector, className) {
            var element = document.querySelector(elementSelector);
            if (element == null) {
                throw "Could not check class: Element " + elementSelector + " not found";
            }
            return element.classList.contains(className);
        }
    }, {
        key: "removeElementClass",
        value: function removeElementClass(elementSelector, className) {
            var elementList = document.querySelectorAll(elementSelector);
            if (elementList.length == 0) {
                throw "Could not remove class: Element " + elementSelector + " not found";
            }
            for (var i = 0; i < elementList.length; i++) {
                elementList.item(i).classList.remove(className);
            }
        }
    }, {
        key: "showModal",
        value: function showModal(modalSelector) {
            if (!$(modalSelector).length) {
                throw "Cannot show modal: " + modalSelector + " could not be found";
            }
            $(modalSelector).openModal({
                dismissible: false,
                opacity: .5,
                in_duration: 300,
                out_duration: 200
            });
        }
    }, {
        key: "hideModal",
        value: function hideModal(modalSelector) {
            if (!$(modalSelector).length) {
                throw "Cannot hide modal: " + modalSelector + " could not be found";
            }
            $(modalSelector).closeModal();
        }
    }]);

    return Page;
}();

exports.Page = Page;
//# sourceMappingURL=Page.js.map
//# sourceMappingURL=Page.js.map