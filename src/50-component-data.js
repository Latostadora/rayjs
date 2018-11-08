class ComponentData {
    constructor(domElement, bus) {
        this.DOMElement = domElement;
        this.bus = bus;
        this.attributes = domElement.dataset.rayAttributes;
        if(this.attributes !== undefined) {
            this.attributes = JSON.parse(this.attributes);
        }
    }

    static create(domElement, bus) {
        return new ComponentData(domElement, bus);
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.ComponentData=ComponentData;