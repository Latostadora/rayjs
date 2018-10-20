(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var CommandDispatcher=function(eventBus)
    {
        this.eventBus = eventBus;
    };

    CommandDispatcher.prototype.loadNewComponents = function() {
        var DATA_RAY_ATTR=RayNS.RayFactory.DATA_RAY_ATTR;
        var self = this;
        return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
            try {
                var EXECUTED_ATTRIBUTE = RayNS.RayFactory.EXECUTED_ATTRIBUTE;
                if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                    return;
                }
                domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                var data=RayNS.RayFactory.createData(domElement, self.eventBus);
                return RayNS.RayFactory.createComponent(data);
            } catch (e) {
                self.eventBus.trigger("ray.error", e);
                console.log("RayJS: Error loading components: "+ e.message);
            }
        });
    };

    exports.RayNS.CommandDispatcher=CommandDispatcher;
})(window);


