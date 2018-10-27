"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Adapted from https://gist.github.com/fatihacet/1290216

var Bus = function () {
    function Bus() {
        _classCallCheck(this, Bus);

        this._init();
    }

    _createClass(Bus, [{
        key: "_init",
        value: function _init() {
            this.topics = {};
            this.id = 0;
        }
    }, {
        key: "on",
        value: function on(topic, callback) {
            if (!this.topics[topic]) {
                this.topics[topic] = [];
            }
            this.id++;
            this.topics[topic].push({
                id: this.id,
                callback: callback
            });
            return this.id;
        }
    }, {
        key: "off",
        value: function off(id) {
            for (var m in this.topics) {
                if (!this.topics[m]) return false;
                for (var i = 0, len = this.topics[m].length; i < len; i++) {
                    if (this.topics[m][i].id === id) {
                        this.topics[m].splice(i, 1);
                        return true;
                    }
                }
            }
            return false;
        }
    }, {
        key: "end",
        value: function end() {
            this._init();
        }
    }, {
        key: "trigger",
        value: function trigger(topic, args) {
            if (!this.topics[topic]) {
                return false;
            }
            var self = this;
            setTimeout(function () {
                var subscribers = self.topics[topic];
                if (!subscribers) return;
                subscribers.forEach(function (suscriber) {
                    suscriber.callback(args);
                });
            }, 0);
            return true;
        }
    }], [{
        key: "create",
        value: function create() {
            return new Bus();
        }
    }]);

    return Bus;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Bus = Bus;