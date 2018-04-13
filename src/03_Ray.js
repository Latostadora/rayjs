(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var Ray=function(eventsToListen) {
        eventsToListen=eventsToListen || {document:'DOMContentLoaded', window:'load'};
        var raydocument=new RayNS.Document(eventsToListen);
        raydocument.ready(function(){
            new RayNS.Watcher();
        });
    };

    exports.RayNS.Ray=Ray;
})(window);

