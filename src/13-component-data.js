class ComponentData {
    constructor(domElement, bus) {
        this.DOMElement = domElement;
        this.bus = bus;
    }

    static create(domElement, bus) {
        return new ComponentData(domElement, bus);
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.ComponentData=ComponentData;