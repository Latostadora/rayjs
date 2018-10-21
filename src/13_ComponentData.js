(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var ComponentData=function(domElement, bus, commandDispatcher) {
        this.DOMElement = domElement;
        this.bus = bus;
        this.commandDispatcher = commandDispatcher;
    };

    ComponentData.prototype._init=function() {
        this.topics = {};
        this.id = 0;
    };

    ComponentData.create=function(domElement, bus, commandDispatcher) {
        //TODO: quitar commandDispatcher.
        //TODO: sustituir por un comando que tiramos al bus (ray.refresh)?
        return new ComponentData(domElement, bus, commandDispatcher);
    };

    exports.RayNS.ComponentData=ComponentData;
})(window);


