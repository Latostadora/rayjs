class ComponentData {
    constructor(domElement, bus, commandDispatcher) {
        this.DOMElement = domElement;
        this.bus = bus;
        this.commandDispatcher = commandDispatcher;
    }

    _init() {
        this.topics = {};
        this.id = 0;
    }

    static create(domElement, bus, commandDispatcher) {
        //TODO: quitar commandDispatcher.
        //TODO: sustituir por un comando que tiramos al bus (ray.refresh)?
        return new ComponentData(domElement, bus, commandDispatcher);
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.ComponentData=ComponentData;