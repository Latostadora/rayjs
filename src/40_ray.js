(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.eventBus=new RayNS.EventBus();
    };

    Ray.prototype.begin=function() {
        this.raydocument.begin();
        var watcher = new RayNS.Watcher(this.eventBus);
        this.raydocument.ready(function(){
            watcher.execute();
        });
        setInterval(function(){
            watcher.execute();
        },400);
    };

    Ray.prototype.end=function() {
        this.raydocument.end();
        this.eventBus.end();
    };

    exports.RayNS.Ray=Ray;
})(window);

