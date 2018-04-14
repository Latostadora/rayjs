(function(exports) {

    exports.RayNS=exports.RayNS || {};

    var Document=function(eventsToListen){
        this.callbacks=[];
        this.eventNamesToListen=eventsToListen;
        var self=this;
        this._notified=false;

        this.listener = function () {
            self._notifyReady(self.callbacks);
        };

    };

    Document.prototype.begin=function() {
        document.addEventListener(this.eventNamesToListen.document, this.listener);
        window.addEventListener(this.eventNamesToListen.window, this.listener);
    };

    Document.prototype.end=function() {
        this._notified=false;
        document.removeEventListener(this.eventNamesToListen.document, this.listener);
        window.removeEventListener(this.eventNamesToListen.window, this.listener);
        this.callbacks=[];
    };

    Document.prototype.ready=function(callback) {
        //if (this._documentIsReady()) {
        //    callback();
        //} else {
            this.callbacks.push(callback);
        //}
    };

    Document.prototype._notifyReady=function(callbacks) {
        if (this._notified) return;
        this._notified=true;
        callbacks.forEach(function(callback){
            callback();
        });
        callbacks=[];
    };

    Document.prototype._documentIsReady=function() {
        var readyState = document.readyState;
        var isScrolling = document.documentElement.doScroll;
        var isComplete=readyState === 'complete';
        var isLoading=readyState === 'loading';
        if (isComplete) return true;
        if ( (!isLoading) && (!isScrolling) ) {
            return true;
        }
        return false;
    };
    
    exports.RayNS.Document=Document;
})(window);




(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Watcher=function()
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
            new component(domElement);
        });

    };

    exports.RayNS.Watcher=Watcher;
})(window);
(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
    };

    Ray.prototype.begin=function() {
        this.raydocument.begin();
        this.raydocument.ready(function(){
            new RayNS.Watcher();
        });
    };

    Ray.prototype.end=function() {
        this.raydocument.end();
    };

    exports.RayNS.Ray=Ray;
})(window);

var ray=new RayNS.Ray();
ray.begin();
