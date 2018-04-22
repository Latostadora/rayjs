(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var EventBus = function() {
        this.pubSub=new PubSub();
    };

    EventBus.prototype.trigger = function (name, data) {
        this.pubSub.publish(name, data);
    };

    EventBus.prototype.on = function (eventName, callback) {
        this.pubSub.subscribe(eventName, function (eventName, eventData ) {
            callback(eventData);
            return null;
        });
    };

    exports.RayNS.EventBus=EventBus;
})(window);



