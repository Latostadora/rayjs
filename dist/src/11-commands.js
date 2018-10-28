"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Commands = function () {
    function Commands() {
        _classCallCheck(this, Commands);
    }

    _createClass(Commands, null, [{
        key: "EXECUTE_NEW_COMPONENTS",
        get: function get() {
            return "ray.command.execute-new-components";
        }
    }]);

    return Commands;
}();

window.RayNS = window.RayNS || {};
window.RayNS.Commands = Commands;