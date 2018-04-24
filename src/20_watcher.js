(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Watcher=function(eventBus)
    {
        this.eventBus = eventBus;
    };

    Watcher.prototype.execute = function() {
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
            var EXECUTED_ATTRIBUTE = 'data-ray-component-executed';
            if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)){
                return;
            }
            domElement.setAttribute(EXECUTED_ATTRIBUTE,'');
            var dataRayComponentAttrValue=domElement.getAttribute(DATA_RAY_ATTR);
            var componentName=getComponentName(dataRayComponentAttrValue);
            var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
            var component=lastNamespaceObject[componentName];
            var data={ DOMElement: domElement, bus: self.eventBus};
            new component(data);
        });
    };

    exports.RayNS.Watcher=Watcher;
})(window);


