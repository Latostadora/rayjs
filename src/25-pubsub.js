//Adapted from https://gist.github.com/fatihacet/1290216

var PubSub=function() {
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


/*    for (var m in this.topics) {
        if (!this.topics[m]) return false;
        for (var i = 0, j = this.topics[m].length; i < j; i++) {
            if (this.topics[m][i].token === token) {
                this.topics[m].splice(i, 1);
                return token;
            }
        }
    }
    return false;*/
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