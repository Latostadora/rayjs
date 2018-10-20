(function(exports) {

    exports.RayNS=exports.RayNS || {};

    var ComponentInstanceCommand=RayNS.ComponentInstanceCommand;

    var RayFactory=function(){};

    RayFactory.DATA_RAY_ATTR = 'data-ray-component';
    RayFactory.EXECUTED_ATTRIBUTE = 'data-ray-component-executed';

    RayFactory.createBus=function() {
        return new RayNS.EventBus();
    };

    RayFactory.createData=function(domElement, bus) {
        //TODO: quitar commandDispatcher.
        //TODO: sustituir por un comando que tiramos al bus (ray.refresh)?
        var data = {
            DOMElement: domElement,
            bus: bus,
            commandDispatcher: null
        };
        return data;
    };

    RayFactory.createComponent=function(data) {
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

        var DATA_RAY_ATTR=this.DATA_RAY_ATTR;

        var domElement=data.DOMElement;

        var dataRayComponentAttrValue = domElement.getAttribute(DATA_RAY_ATTR);
        var componentName = getComponentName(dataRayComponentAttrValue);
        var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
        var component = lastNamespaceObject[componentName];
        if (component==undefined) {
            throw new Error("<"+componentName+"> JS object not Found");
        }
        return new component(data);
    };


    RayFactory.createComponentInstanceCommand=function(domElement, bus) {
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

        var data=RayFactory.createData(domElement, bus);
        
        var dataRayComponentAttrValue = domElement.getAttribute(DATA_RAY_ATTR);
        var componentName = getComponentName(dataRayComponentAttrValue);
        var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
        var componentObject = lastNamespaceObject[componentName];
        if (componentObject==undefined) {
            throw new Error("<"+componentName+"> JS object not Found");
        }
        return new ComponentInstanceCommand(componentObject, data);
    };

    exports.RayNS.RayFactory=RayFactory;
})(window);




