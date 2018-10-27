(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Component=RayNS.Component;

    var CommandDispatcher=function(eventBus)
    {
        this.eventBus = eventBus;
    };

    CommandDispatcher.EXECUTED_ATTRIBUTE = 'data-ray-component-executed';

    CommandDispatcher.prototype.loadNewComponents = function() {
        var DATA_RAY_ATTR=RayNS.Component.DATA_RAY_ATTR;
        var self = this;
        return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
            try {
                var EXECUTED_ATTRIBUTE = CommandDispatcher.EXECUTED_ATTRIBUTE;
                if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                    return;
                }
                domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                var component=Component.create(domElement, self.eventBus);
                component.execute();
            } catch (e) {
                self.eventBus.trigger("ray.error", e);
                console.log("RayJS: Error loading components: "+ e.message);
            }
        });
    };

    exports.RayNS.CommandDispatcher=CommandDispatcher;
})(window);


