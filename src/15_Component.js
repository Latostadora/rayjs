(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Component=function(componentConstructorFn, data) {
        this.componentConstructorFn=componentConstructorFn;
        this.data=data;
    };

    Component.prototype.execute=function(){
        return new this.componentConstructorFn(this.data);
    };

    Component.DATA_RAY_ATTR= "data-ray-component";

    Component.create=function(domElement, bus) {
        function getComponentName(dataRayComponentAttrValue) {
            var namespaces = dataRayComponentAttrValue.split(".");
            return namespaces.pop();
        }

        function getLastNamespaceObject(dataRayComponentAttrValue) {
            var namespaces = dataRayComponentAttrValue.split(".");
            namespaces.pop();

            var obj=window;
            namespaces.forEach(function(namespace){
                obj=obj[namespace];
            });
            return obj;
        }

        var data=RayNS.ComponentData.create(domElement, bus);

        var dataRayComponentAttrValue = domElement.getAttribute(Component.DATA_RAY_ATTR);
        var componentName = getComponentName(dataRayComponentAttrValue);
        var lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
        var componentConstructorFn = lastNamespaceObject[componentName];
        if (componentConstructorFn==undefined) {
            throw new Error("<"+componentName+"> JS object not Found");
        }
        return new Component(componentConstructorFn, data);
    };

    exports.RayNS.Component=Component;
})(window);


