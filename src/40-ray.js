const Commands=RayNS.Commands;

class Ray {

    constructor(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.bus=RayNS.Bus.create();
        this.commandDispatcher=new RayNS.CommandDispatcher(this.bus);
    }

    begin() {
        this.commandDispatcher.begin();
        this.raydocument.begin();
        const self = this;
        this.raydocument.ready(() => {
            self.bus.trigger(Commands.EXECUTE_NEW_COMPONENTS);
        });
        this.intervalId=setInterval(() => {
            self.bus.trigger(Commands.EXECUTE_NEW_COMPONENTS);
        },400);
    }

    end() {
        clearInterval(this.intervalId);
        this.raydocument.end();
        this.bus.end();
        this.commandDispatcher.end();
    }

    static get Events() {
        return RayNS.Events;
    }

    static get Commands() {
        return RayNS.Commands;
    }

    static createBus() {
        return RayNS.Bus.create();
    }

    static createComponent(domElement, bus) {
        return RayNS.Component.create(domElement, bus);
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.Ray=Ray;
module.exports=Ray;
