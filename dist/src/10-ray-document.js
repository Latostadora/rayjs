'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = function () {
    function Document(eventsToListen) {
        _classCallCheck(this, Document);

        this.callbacks = [];
        this.eventNamesToListen = eventsToListen;
        var self = this;
        this._notified = false;

        this.listener = function () {
            self._notifyReady(self.callbacks);
        };
    }

    _createClass(Document, [{
        key: 'begin',
        value: function begin() {
            document.addEventListener(this.eventNamesToListen.document, this.listener);
            window.addEventListener(this.eventNamesToListen.window, this.listener);
        }
    }, {
        key: 'end',
        value: function end() {
            this._notified = false;
            document.removeEventListener(this.eventNamesToListen.document, this.listener);
            window.removeEventListener(this.eventNamesToListen.window, this.listener);
            this.callbacks = [];
        }
    }, {
        key: 'ready',
        value: function ready(callback) {
            //if (this._documentIsReady()) {
            //    callback();
            //} else {
            this.callbacks.push(callback);
            //}
        }
    }, {
        key: '_notifyReady',
        value: function _notifyReady(callbacks) {
            if (this._notified) return;
            this._notified = true;
            callbacks.forEach(function (callback) {
                callback();
            });
            callbacks = [];
        }
    }, {
        key: '_documentIsReady',
        value: function _documentIsReady() {
            var readyState = document.readyState;
            var isScrolling = document.documentElement.doScroll;
            var isComplete = readyState === 'complete';
            var isLoading = readyState === 'loading';
            if (isComplete) return true;
            if (!isLoading && !isScrolling) {
                return true;
            }
            return false;
        }
    }]);

    return Document;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Document = Document;