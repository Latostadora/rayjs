(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.eventBus=new RayNS.EventBus();
        this.commandDispatcher = new RayNS.CommandDispatcher(this.eventBus);
    };

    Ray.prototype.begin=function() {
        this.raydocument.begin();
        var self = this;
        this.raydocument.ready(function(){
            self.commandDispatcher.loadNewComponents();
        });
        setInterval(function(){
            self.commandDispatcher.loadNewComponents();
        },400);
    };

    Ray.prototype.end=function() {
        this.raydocument.end();
        this.eventBus.end();
    };

    Ray.prototype.getCommandDispatcher=function() {
        return this.commandDispatcher;
    };

    exports.RayNS.Ray=Ray;
})(window);

