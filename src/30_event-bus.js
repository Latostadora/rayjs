//Adapted from https://gist.github.com/fatihacet/1290216

(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var EventBus=function() {
        this._init();
    };

    EventBus.prototype._init=function() {
        this.topics = {};
        this.id = 0;
    };

    EventBus.prototype.on = function(topic, callback) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.id++;
        this.topics[topic].push({
            id: this.id,
            callback: callback
        });
        return this.id;
    };

    EventBus.prototype.off = function(id) {
        for (var m in this.topics) {
            if (!this.topics[m]) return false;
            for (var i = 0, len = this.topics[m].length; i < len; i++) {
                if (this.topics[m][i].id === id) {
                    this.topics[m].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    };

    EventBus.prototype.end = function() {
        this._init();
    };

    EventBus.prototype.trigger = function(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }
        var self=this;
        setTimeout(function() {
            var subscribers = self.topics[topic];
            if (!subscribers) return;
            subscribers.forEach(function(suscriber){
                suscriber.callback(args);
            });
        }, 0);
        return true;
    };

    exports.RayNS.EventBus=EventBus;
})(window);


