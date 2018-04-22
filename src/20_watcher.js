(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Watcher=function(eventBus)
    {

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
        return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
            var dataRayComponentAttrValue=domElement.getAttribute(DATA_RAY_ATTR);
            var componentName=getComponentName(dataRayComponentAttrValue);
            var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
            var component=lastNamespaceObject[componentName];
            new component(domElement, eventBus);
        });

    };

    exports.RayNS.Watcher=Watcher;
})(window);
