(function (exports) {

    exports.Ray=exports.Ray || {};

    var Watcher=function()
    {
        var instance;

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

        function createInstance() {
            var DATA_RAY_ATTR= "data-ray-component";
            return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
                var dataRayComponentAttrValue=domElement.getAttribute(DATA_RAY_ATTR);
                var componentName=getComponentName(dataRayComponentAttrValue);
                var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
                var component=lastNamespaceObject[componentName];
                new component(domElement);
            });
        }

        return {
            getInstance: function () {
                return instance || (instance = createInstance());
            }
        };
    };

    exports.Ray.Watcher=Watcher;
})(window);
