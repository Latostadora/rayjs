(function(exports) {

    exports.Ray=exports.Ray || {};

    var Document=function(){
        this.callbacks=[];
        var self=this;
        document.addEventListener('DOMContentLoaded', function() {
            self._notifyReady(self.callbacks);
        });
        window.addEventListener('load', function() {
            self._notifyReady(self.callbacks);
        });
    };

    Document.prototype.ready=function(callback) {
        if (this._documentIsReady()) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    };

    var _notified=false;
    Document.prototype._notifyReady=function(callbacks) {
        if (_notified) return;
        _notified=true;
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

    /*
     Document.prototype._removeDocumentLoadEventListener=function() {
        document.removeEventListener('DOMContentLoaded', ?);
        window.removeEventListener('load', ?);
     };
     */

    exports.Ray.Document=Document;
})(window);




