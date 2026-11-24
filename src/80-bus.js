//Adapted from https://gist.github.com/fatihacet/1290216
class Bus {
    constructor() {
        this._init();
    }

    _init() {
        this.topics = {};
        this.id = 0;
    }

    on(topic, callback) {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.id++;
        this.topics[topic].push({
            id: this.id,
            callback
        });
        return this.id;
    }

    off(id) {
        for (const m in this.topics) {
            if (!this.topics[m]) return false;
            for (let i = 0, len = this.topics[m].length; i < len; i++) {
                if (this.topics[m][i].id === id) {
                    this.topics[m].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }

    end() {
        this._init();
    }

    trigger(topic, args) {
        if (!this.topics[topic]) {
            return false;
        }
        // Copy: a callback may unsubscribe (off) while the list is being iterated
        const subscribers = this.topics[topic].slice();
        subscribers.forEach(suscriber => {
            suscriber.callback(args);
        });
        return true;
    }

    static create() {
        return new Bus();
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.Bus=Bus;


