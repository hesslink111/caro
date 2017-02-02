"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PageLoader = function () {
    function PageLoader() {
        _classCallCheck(this, PageLoader);
    }

    _createClass(PageLoader, null, [{
        key: "render",
        value: function render(PageClass, oldPage) {
            if (oldPage) {
                oldPage.hidePage();
            }
            this.currentPage = new PageClass();
            this.currentPage.showPage();
        }
    }, {
        key: "getCurrentPage",
        value: function getCurrentPage() {
            return this.currentPage;
        }
    }]);

    return PageLoader;
}();

exports.PageLoader = PageLoader;
//# sourceMappingURL=PageLoader.js.map
//# sourceMappingURL=PageLoader.js.map