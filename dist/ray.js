(function(exports) {

    exports.Ray=exports.Ray || {};

    var Document=function(){
        this.callbacks=[];
        var self=this;
        document.addEventListener('DOMContentLoaded', function() {
            self._notifyReady(self.callbacks);
        });
        window.addEventListener('load', function() {
            self._notifyReady(self.callbacks);
        });
    };

    Document.prototype.ready=function(callback) {
        if (this._documentIsReady()) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    };

    Document.prototype._notifyReady=function(callbacks) {
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

    /*
     Document.prototype._removeDocumentLoadEventListener=function() {
        document.removeEventListener('DOMContentLoaded', ?);
        window.removeEventListener('load', ?);
     };
     */

    exports.Ray.Document=Document;
})(window);




(function (exports) {

    exports.Ray=exports.Ray || {};

    var Watcher=function()
    {
        var self=this;

        document.querySelectorAll("[data-ray-action]").forEach(function(domElement){
            var dataRayAction=domElement.getAttribute("data-ray-action");
            var actionName=self.getActionName(dataRayAction);
            var ctxObject = self.getLastCallableObject(dataRayAction);
            var action=ctxObject[actionName];
            new action(domElement);
        });
    };

    Watcher.prototype.getActionName=function(dataRayAction) {
        var namespaces = dataRayAction.split(".");
        return namespaces.pop();
    };

    Watcher.prototype.getLastCallableObject=function(dataRayAction) {
        var namespaces = dataRayAction.split(".");
        namespaces.pop();

        var obj=window;
        namespaces.forEach(function(namespace){
            obj=obj[namespace];
        });
        return obj;
    };

    exports.Ray.Watcher=Watcher;
})(window);

var raydocument=new Ray.Document();
raydocument.ready(function(){
    new Ray.Watcher();
});
