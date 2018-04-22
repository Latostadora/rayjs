(function(exports) {

    exports.RayNS=exports.RayNS || {};

    var Document=function(eventsToListen){
        this.callbacks=[];
        this.eventNamesToListen=eventsToListen;
        var self=this;
        this._notified=false;

        this.listener = function () {
            self._notifyReady(self.callbacks);
        };

    };

    Document.prototype.begin=function() {
        document.addEventListener(this.eventNamesToListen.document, this.listener);
        window.addEventListener(this.eventNamesToListen.window, this.listener);
    };

    Document.prototype.end=function() {
        this._notified=false;
        document.removeEventListener(this.eventNamesToListen.document, this.listener);
        window.removeEventListener(this.eventNamesToListen.window, this.listener);
        this.callbacks=[];
    };

    Document.prototype.ready=function(callback) {
        //if (this._documentIsReady()) {
        //    callback();
        //} else {
            this.callbacks.push(callback);
        //}
    };

    Document.prototype._notifyReady=function(callbacks) {
        if (this._notified) return;
        this._notified=true;
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

    exports.RayNS.Document=Document;
})(window);




(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Watcher=function(eventBus)
    {

        function getComponentName(dataRayComponent) {
            var namespaces = dataRayComponent.split(".");
            return namespaces.pop();
        }

        function getLastCallableObject(dataRayComponent) {
            var namespaces = dataRayComponent.split(".");
            namespaces.pop();

            var obj=window;
            namespaces.forEach(function(namespace){
                obj=obj[namespace];
            });
            return obj;
        }

        var DATA_RAY_ATTR= "data-ray-component";
        return document.querySelectorAll("["+DATA_RAY_ATTR+"]").forEach(function(domElement){
            var dataRayComponentAttrValue=domElement.getAttribute(DATA_RAY_ATTR);
            var componentName=getComponentName(dataRayComponentAttrValue);
            var lastNamespaceObject = getLastCallableObject(dataRayComponentAttrValue);
            var component=lastNamespaceObject[componentName];
            var data={ DOMElement: domElement, bus: eventBus};
            new component(data);
        });

    };

    exports.RayNS.Watcher=Watcher;
})(window);
//Adapted from https://gist.github.com/fatihacet/1290216

var PubSub=function() {
    this.topics = {};
    this.Id = 0;
};

PubSub.prototype.subscribe = function(topic, callback) {
    if (!this.topics[topic]) {
        this.topics[topic] = [];
    }
    this.id++;
    var token = this.Id.toString();
    this.topics[topic].push({
        token: token,
        callback: callback
    });
    return token;
};

PubSub.prototype.unsubscribe = function(token) {
    for (var m in this.topics) {
        if (!this.topics[m]) return false;
        for (var i = 0, j = this.topics[m].length; i < j; i++) {
            if (this.topics[m][i].token === token) {
                this.topics[m].splice(i, 1);
                return token;
            }
        }
    }
    return false;
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
};(function (exports) {

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
    };

    exports.RayNS.Ray=Ray;
})(window);

var ray=new RayNS.Ray();
ray.begin();
