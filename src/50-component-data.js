const Events=RayNS.Events;

class ComponentData {
    constructor(domElement, bus) {
        this.DOMElement = domElement;
        this.bus = bus;
        this.params = this.getParams(domElement);
    }

    getParams(domElement) {
        let domParams = domElement.dataset.rayParams;
        let params = {};
        if (domParams==undefined) {
            return params;
        }

        try {
            params = JSON.parse(domParams);
        } catch (e) {
            const errorMessage = "Invalid JSON syntax in data-ray-params: '"+ domParams+"'";
            throw new Error(errorMessage);
        }

        this.DOMElement.removeAttribute('data-ray-params');

        return params;
    }

    static create(domElement, bus) {
        return new ComponentData(domElement, bus);
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.ComponentData=ComponentData;