var Ray=function()
{
    var self=this;

    document.querySelectorAll("[data-ray-action]").forEach(function(domElement){
        var dataRayAction=domElement.getAttribute("data-ray-action");
        var actionName=self.getActionName(dataRayAction);
        var ctxObject = self.getLastCallableObject(dataRayAction);
        var action=ctxObject[actionName];
        action(domElement);
    });
};

Ray.prototype.getActionName=function(dataRayAction) {
    var namespaces = dataRayAction.split(".");
    return namespaces.pop();
};

Ray.prototype.getLastCallableObject=function(dataRayAction) {
    var namespaces = dataRayAction.split(".");
    namespaces.pop();

    var obj=window;
    namespaces.forEach(function(namespace){
        obj=obj[namespace];
    });
    return obj;
};


