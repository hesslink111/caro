"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
    function List() {
        _classCallCheck(this, List);

        this.items = [];
    }

    _createClass(List, [{
        key: "size",
        value: function size() {
            return this.items.length;
        }
    }, {
        key: "add",
        value: function add(value) {
            this.items.push(value);
        }
    }, {
        key: "addAll",
        value: function addAll(values) {
            for (var i = 0; i < values.size(); i++) {
                this.items.push(values.get(i));
            }
        }
    }, {
        key: "contains",
        value: function contains(value) {
            var index = this.items.indexOf(value);
            return index != -1;
        }
    }, {
        key: "get",
        value: function get(index) {
            return this.items[index];
        }
    }, {
        key: "remove",
        value: function remove(value) {
            var index = this.items.indexOf(value);
            if (index != -1) {
                this.items.splice(index, 1);
            }
        }
    }, {
        key: "forEach",
        value: function forEach(fn) {
            for (var i = 0; i < this.items.length; i++) {
                fn(this.items[i]);
            }
        }
    }]);

    return List;
}();

exports.List = List;
//# sourceMappingURL=List.js.map
//# sourceMappingURL=List.js.map