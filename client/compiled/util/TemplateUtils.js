"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List_1 = require("./collection/List");

var TemplateUtils = function () {
    function TemplateUtils() {
        _classCallCheck(this, TemplateUtils);
    }

    _createClass(TemplateUtils, null, [{
        key: "createElement",
        value: function createElement(templateName) {
            if (!this.templateCache.has(templateName)) {
                this.templateCache.set(templateName, this.readTemplate(templateName));
            }
            return document.importNode(this.templateCache.get(templateName).content, true).firstElementChild;
        }
    }, {
        key: "readTemplate",
        value: function readTemplate(templateName) {
            var template = document.getElementById(templateName);
            if (template == null) {
                throw "Template '" + templateName + "' could not be loaded";
            }
            return document.getElementById(templateName);
        }
    }, {
        key: "getDummyElements",
        value: function getDummyElements(templateName) {
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
    }, {
        key: "getChildDummyElements",
        value: function getChildDummyElements(element) {
            var dummyElements = element.querySelectorAll(".template-dummy");
            var htmlElements = new List_1.List();
            for (var i = 0; i < dummyElements.length; i++) {
                htmlElements.add(dummyElements.item(i));
            }
            return htmlElements;
        }
    }]);

    return TemplateUtils;
}();

TemplateUtils.templateCache = new Map();
exports.TemplateUtils = TemplateUtils;
//# sourceMappingURL=TemplateUtils.js.map
//# sourceMappingURL=TemplateUtils.js.map