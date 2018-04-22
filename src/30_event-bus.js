(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var EventBus = function() {
        this.channel = null;
        if (EventBus._instance) {
            throw new Error("Error: Instantiation failed: Use EventBus.getInstance() instead of new.");
        }
        EventBus._instance = this;
        if (EventBus._channelNumber != null) {
            EventBus._channelNumber++;
        }
        else {
            EventBus._channelNumber = 1;
        }
        var channelName = "EventBus-" + EventBus._channelNumber;
        this.channel = postal.channel(channelName);
    };

    EventBus.getInstance = function () {
        return EventBus._instance;
    };

    EventBus.destroyInstance = function () {
        EventBus._instance = null;
        EventBus._instance = new EventBus();
    };

    EventBus.prototype.trigger = function (name, data) {
        this.channel.publish(name, data);
    };

    EventBus.prototype.on = function (eventName, callback) {
        this.channel.subscribe(eventName, function (eventData, envelope) {
            callback(eventData);
            return null;
        });
    };

    exports.RayNS.EventBus=EventBus;
})(window);



