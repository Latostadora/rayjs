class Document {
    constructor(eventsToListen) {
        this.callbacks=[];
        this.eventNamesToListen=eventsToListen;
        const self=this;
        this._notified=false;
        this._alreadyReadyTimeoutId=null;

        this.listener = () => {
            self._notifyReady();
        };

    }

    begin() {
        document.addEventListener(this.eventNamesToListen.document, this.listener);
        window.addEventListener(this.eventNamesToListen.window, this.listener);
        // If begin() is called after DOMContentLoaded, those events will never fire again.
        // Deferred so callbacks registered with ready() right after begin() are included.
        if (document.readyState !== 'loading') {
            this._alreadyReadyTimeoutId = setTimeout(this.listener, 0);
        }
    }

    end() {
        this._notified=false;
        clearTimeout(this._alreadyReadyTimeoutId);
        this._alreadyReadyTimeoutId=null;
        document.removeEventListener(this.eventNamesToListen.document, this.listener);
        window.removeEventListener(this.eventNamesToListen.window, this.listener);
        this.callbacks=[];
    }

    ready(callback) {
        this.callbacks.push(callback);
    }

    _notifyReady() {
        if (this._notified) return;
        this._notified=true;
        const callbacks=this.callbacks;
        this.callbacks=[];
        callbacks.forEach(callback => {
            callback();
        });
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.Document=Document;
