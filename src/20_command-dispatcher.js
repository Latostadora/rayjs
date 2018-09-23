(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var CommandDispatcher=function(eventBus)
    {
        this.eventBus = eventBus;
    };

    CommandDispatcher.prototype.loadNewComponents = function() {
        function getComponentName(dataRayComponent) {
            var namespaces = dataRayComponent.split(".");
            return namespaces.pop();
        }

        function getLastCallableObject(dataRayComponent) {
            var namespaces = dataRayComponent.split(".");
            namespaces.pop();

            var obj=window;
            namespaces.forEach(function(namespace){
                obj=obj[namespace];
            });
            return obj;
        }

        var DATA_RAY_ATTR= "data-ray-component";
        var self = this;
        return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
            try {
                var EXECUTED_ATTRIBUTE = 'data-ray-component-executed';
                if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                    return;
                }
                domElement.setAttribute(EXECUTED_ATTRIBUTE, '');
                var dataRayComponentAttrValue = domElement.getAttribute(DATA_RAY_ATTR);
                var componentName = getComponentName(dataRayComponentAttrValue);
                var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
                var component = lastNamespaceObject[componentName];
                var data = {DOMElement: domElement, bus: self.eventBus, commandDispatcher: self};
                if (component==undefined) {
                    throw new Error("<"+componentName+"> JS object not Found");
                }
                new component(data);
            } catch (e) {
                self.eventBus.trigger("ray.error", e);
                console.log("RayJS: Error loading components: "+ e.message);
            }
        });
    };

    exports.RayNS.CommandDispatcher=CommandDispatcher;
})(window);


