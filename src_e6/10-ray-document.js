class Document {
    constructor(eventsToListen) {
        this.callbacks=[];
        this.eventNamesToListen=eventsToListen;
        const self=this;
        this._notified=false;

        this.listener = () => {
            self._notifyReady(self.callbacks);
        };

    }

    begin() {
        document.addEventListener(this.eventNamesToListen.document, this.listener);
        window.addEventListener(this.eventNamesToListen.window, this.listener);
    }

    end() {
        this._notified=false;
        document.removeEventListener(this.eventNamesToListen.document, this.listener);
        window.removeEventListener(this.eventNamesToListen.window, this.listener);
        this.callbacks=[];
    }

    ready(callback) {
        //if (this._documentIsReady()) {
        //    callback();
        //} else {
        this.callbacks.push(callback);
        //}
    }

    _notifyReady(callbacks) {
        if (this._notified) return;
        this._notified=true;
        callbacks.forEach(callback => {
            callback();
        });
        callbacks=[];
    }

    _documentIsReady() {
        const readyState = document.readyState;
        const isScrolling = document.documentElement.doScroll;
        const isComplete=readyState === 'complete';
        const isLoading=readyState === 'loading';
        if (isComplete) return true;
        if ( (!isLoading) && (!isScrolling) ) {
            return true;
        }
        return false;
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.Document=Document;