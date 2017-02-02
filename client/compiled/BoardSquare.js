/**
 * Created by will on 7/8/16.
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoardSquare = function () {
    function BoardSquare(x, y, tableCell) {
        _classCallCheck(this, BoardSquare);

        this.x = x;
        this.y = y;
        this.tableCell = tableCell;
    }

    _createClass(BoardSquare, [{
        key: "getX",
        value: function getX() {
            return this.x;
        }
    }, {
        key: "getY",
        value: function getY() {
            return this.y;
        }
    }, {
        key: "getTableCell",
        value: function getTableCell() {
            return this.tableCell;
        }
    }]);

    return BoardSquare;
}();

exports.BoardSquare = BoardSquare;
//# sourceMappingURL=BoardSquare.js.map
//# sourceMappingURL=BoardSquare.js.map