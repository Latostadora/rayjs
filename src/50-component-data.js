const Events=RayNS.Events;

class ComponentData {
    constructor(domElement, bus) {
        this.DOMElement = domElement;
        this.bus = bus;
        this.params = {};
        let domParams = domElement.dataset.rayParams;
        if (domParams==undefined) {
            return;
        }
        try {
            this.params=JSON.parse(domParams)
        } catch (e) {
            this.params = {};
            const errorMessage = "Invalid JSON syntax in data-ray-params: '"+ domParams+"'";
            throw new Error(errorMessage);
        }
    }

    static create(domElement, bus) {
        return new ComponentData(domElement, bus);
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.ComponentData=ComponentData;