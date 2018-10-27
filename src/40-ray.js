class Ray {
    constructor(eventNamesToListen) {
        this.eventNamesToListen=eventNamesToListen || {document:'DOMContentLoaded', window:'load'};
        this.raydocument=new RayNS.Document(this.eventNamesToListen);
        this.eventBus=RayNS.Bus.create();
        this.commandDispatcher = new RayNS.CommandDispatcher(this.eventBus);
    }

    begin() {
        this.raydocument.begin();
        const self = this;
        this.raydocument.ready(() => {
            self.commandDispatcher.loadNewComponents();
        });
        this.intervalId=setInterval(() => {
            self.commandDispatcher.loadNewComponents();
        },400);
    }

    end() {
        clearInterval(this.intervalId);
        this.raydocument.end();
        this.eventBus.end();
    }

    getCommandDispatcher() {
        return this.commandDispatcher;
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
