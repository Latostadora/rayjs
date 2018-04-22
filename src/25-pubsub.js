//Adapted from https://gist.github.com/fatihacet/1290216

var PubSub=function() {
    this.init();
};

PubSub.prototype.init=function() {
    this.topics = {};
    this.id = 0;
};

PubSub.prototype.subscribe = function(topic, callback) {
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

PubSub.prototype.unsubscribe = function(id) {
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

PubSub.prototype.unsubscribeAll = function() {
    this.init();
};

PubSub.prototype.publish = function(topic, args) {
    if (!this.topics[topic]) {
        return false;
    }
    var self=this;
    setTimeout(function() {
        var subscribers = self.topics[topic],
            len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].callback(topic, args);
        }
    }, 0);
    return true;
};