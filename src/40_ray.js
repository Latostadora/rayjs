(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.eventBus=RayNS.EventBus.create();
        this.commandDispatcher = new RayNS.CommandDispatcher(this.eventBus);
    };

    Ray.prototype.begin=function() {
        this.raydocument.begin();
        var self = this;
        this.raydocument.ready(function(){
            self.commandDispatcher.loadNewComponents();
        });
        this.intervalId=setInterval(function(){
            self.commandDispatcher.loadNewComponents();
        },400);
    };

    Ray.prototype.end=function() {
        clearInterval(this.intervalId);
        this.raydocument.end();
        this.eventBus.end();
    };

    Ray.prototype.getCommandDispatcher=function() {
        return this.commandDispatcher;
    };

    Ray.createBus=function() {
        return RayNS.EventBus.create();
    };

    Ray.createComponent=function(domElement, bus) {
        return RayNS.Component.create(domElement, bus);
    };

    exports.RayNS.Ray=Ray;
})(window);

