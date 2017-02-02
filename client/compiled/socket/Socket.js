"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List_1 = require("../util/collection/List");
var MessageObject_1 = require("./message/MessageObject");
var Player_1 = require("../player/Player");

var Socket = function () {
    function Socket() {
        _classCallCheck(this, Socket);

        this.createSocketAndSetHandlers();
        this.socketListeners = new List_1.List();
        this.socketSendQueue = new List_1.List();
    }

    _createClass(Socket, [{
        key: "createSocketAndSetHandlers",
        value: function createSocketAndSetHandlers() {
            var _this = this;

            this.socket = new WebSocket(Socket.SOCKET_ADDRESS);
            this.socket.onopen = function (event) {
                _this.onOpen();
            };
            this.socket.onmessage = function (messageEvent) {
                _this.onMessage(messageEvent.data);
            };
            this.socket.onerror = function (event) {
                _this.onError();
            };
            this.socket.onclose = function (event) {
                _this.onClose();
            };
        }
    }, {
        key: "onOpen",
        value: function onOpen() {
            var _this2 = this;

            this.socketSendQueue.forEach(function (messageObject) {
                _this2.send(messageObject);
            });
            if (Player_1.Player.isLoggedIn()) {
                this.sendObject("PlayerUpdate", Player_1.Player.getPlayerInstance());
            }
            this.socketListeners.forEach(function (listener) {
                listener.onSocketOpened();
            });
        }
    }, {
        key: "onMessage",
        value: function onMessage(jsonMessage) {
            var object = JSON.parse(jsonMessage);
            console.log("Socket message received");
            console.log(object);
            this.socketListeners.forEach(function (listener) {
                listener.onSocketObjectReceived(object);
            });
        }
    }, {
        key: "onError",
        value: function onError() {
            console.log("Socket Error");
        }
    }, {
        key: "onClose",
        value: function onClose() {
            var _this3 = this;

            this.socketListeners.forEach(function (listener) {
                listener.onSocketClosed();
            });
            console.log("Socket closed");
            setTimeout(function () {
                _this3.createSocketAndSetHandlers();
            }, 5000);
        }
    }, {
        key: "addSocketListener",
        value: function addSocketListener(listener) {
            this.socketListeners.add(listener);
        }
    }, {
        key: "removeSocketListener",
        value: function removeSocketListener(listener) {
            this.socketListeners.remove(listener);
        }
    }, {
        key: "sendObject",
        value: function sendObject(type, data) {
            var messageObject = this.createMessageObject(type, data);
            if (this.socket.readyState == WebSocket.OPEN) {
                this.send(messageObject);
            } else {
                this.socketSendQueue.add(messageObject);
            }
        }
    }, {
        key: "createMessageObject",
        value: function createMessageObject(type, data) {
            var message = new MessageObject_1.MessageObject();
            message.type = type;
            if (data) {
                message.data = data;
            }
            return message;
        }
    }, {
        key: "send",
        value: function send(messageObject) {
            this.socket.send(JSON.stringify(messageObject));
            console.log("Sent message");
            console.log(JSON.stringify(messageObject));
        }
    }], [{
        key: "getInstance",
        value: function getInstance() {
            if (this.instance == null) {
                this.instance = new Socket();
            }
            return this.instance;
        }
    }]);

    return Socket;
}();

Socket.SOCKET_ADDRESS = "ws://localhost:2000";
exports.Socket = Socket;
//# sourceMappingURL=Socket.js.map
//# sourceMappingURL=Socket.js.map