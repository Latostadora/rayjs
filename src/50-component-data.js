const Events=RayNS.Events;

class ComponentData {
    constructor(domElement, bus) {
        this.DOMElement = domElement;
        this.bus = bus;
        this.params = domElement.dataset.rayParams;

        if(this.params === undefined) {
            this.params = {};
            return;
        }

        if(this.params === null) {
            this.params = {};
            return;
        }

        if(this.isJSON(this.params)) {
            this.params = JSON.parse(this.params);
            this.DOMElement.removeAttribute('data-ray-params');
        } else {
            this.params = {};
            throw new Error("The params are not correct");
        }
    }

    static create(domElement, bus) {
        return new ComponentData(domElement, bus);
    }

    isJSON(json) {
        if(json === undefined) {
            return false;
        }

        if(json === null) {
            return false;
        }

        if(json === "") {
            return false;
        }

        return (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.ComponentData=ComponentData;