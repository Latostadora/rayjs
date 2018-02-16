var RayDocument=function(){
    this.callbacks=[];
    var self=this;
    document.addEventListener('DOMContentLoaded', function() {
        self._notifyReady(self.callbacks);
    });
    window.addEventListener('load', function() {
        self._notifyReady(self.callbacks);
    });
};

RayDocument.prototype.ready=function(callback) {
    if (this._documentIsReady()) {
        callback();
    } else {
        this.callbacks.push(callback);
    }
};

RayDocument.prototype._notifyReady=function(callbacks) {
    callbacks.forEach(function(callback){
        callback();
    });
    callbacks=[];
};

RayDocument.prototype._documentIsReady=function() {
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



/*
RayDocument.prototype._removeDocumentLoadEventListener=function() {
    document.removeEventListener('DOMContentLoaded', ?);
    window.removeEventListener('load', ?);
};
*/


