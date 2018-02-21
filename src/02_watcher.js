(function (exports) {

    exports.Ray=exports.Ray || {};

    var Watcher=function()
    {
        var self=this;

        var instance;

        function createInstance() {
            var DATA_RAY_ATTR= "data-ray-component";
            return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
                var dataRayComponentAttrValue=domElement.getAttribute(DATA_RAY_ATTR);
                var componentName=self.getComponentName(dataRayComponentAttrValue);
                var lastNamespaceObject = self.getLastCallableObject(dataRayComponentAttrValue);
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

    Watcher.prototype.getComponentName=function(dataRayComponent) {
        var namespaces = dataRayComponent.split(".");
        return namespaces.pop();
    };

    Watcher.prototype.getLastCallableObject=function(dataRayComponent) {
        var namespaces = dataRayComponent.split(".");
        namespaces.pop();

        var obj=window;
        namespaces.forEach(function(namespace){
            obj=obj[namespace];
        });
        return obj;
    };

    exports.Ray.Watcher=Watcher;
})(window);
