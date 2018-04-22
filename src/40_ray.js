(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.eventBus=new RayNS.EventBus();
    };

    Ray.prototype.begin=function() {
        this.raydocument.begin();
        var self=this;
        this.raydocument.ready(function(){
            new RayNS.Watcher(self.eventBus);
        });
    };

    Ray.prototype.end=function() {
        this.raydocument.end();
        this.eventBus.end();
    };

    exports.RayNS.Ray=Ray;
})(window);

