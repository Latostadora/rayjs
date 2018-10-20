(function (exports) {

    exports.RayNS=exports.RayNS || {};

    var ComponentInstanceCommand=function(componentObject, data) {
        this.componentObject=componentObject;
        this.data=data;
    };

    ComponentInstanceCommand.prototype.execute=function(){
        return new this.componentObject(this.data);
    };

    exports.RayNS.ComponentInstanceCommand=ComponentInstanceCommand;
})(window);


