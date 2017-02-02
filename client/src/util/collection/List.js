"use strict";
class List {
    constructor() {
        this.items = [];
    }
    size() {
        return this.items.length;
    }
    add(value) {
        this.items.push(value);
    }
    addAll(values) {
        for (var i = 0; i < values.size(); i++) {
            this.items.push(values.get(i));
        }
    }
    contains(value) {
        var index = this.items.indexOf(value);
        return index != -1;
    }
    get(index) {
        return this.items[index];
    }
    remove(value) {
        var index = this.items.indexOf(value);
        if (index != -1) {
            this.items.splice(index, 1);
        }
    }
    forEach(fn) {
        for (var i = 0; i < this.items.length; i++) {
            fn(this.items[i]);
        }
    }
}
exports.List = List;
//# sourceMappingURL=List.js.map