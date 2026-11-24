// Data object per DOM element. data-ray-params is removed from the DOM once parsed,
// so the parsed data must be kept here to be shared with components executed later
// (e.g. when one of them is defined after the first pass).
const componentDataCache = new WeakMap();

class Component {

    constructor(componentConstructorFn, data) {
        this.componentConstructorFn=componentConstructorFn;
        this.data=data;
    }

    execute() {
        new this.componentConstructorFn(this.data);
    }

    static get DATA_RAY_ATTR() {
        return "data-ray-component";
    }

    static get DATA_RAY_EXECUTED_ATTR() {
        return "data-ray-component-executed";
    }

    static get DATA_RAY_FAILED_ATTR() {
        return "data-ray-component-failed";
    }

    // onError (optional): called for every error. If not given, the first error is thrown
    // after trying every component of the element.
    static execute(domElement, bus, onError) {

        const getComponentName = (dataRayComponentAttrValue) => {
            const namespaces = dataRayComponentAttrValue.split(".");
            return namespaces.pop();
        };

        const getLastNamespaceObject= (dataRayComponentAttrValue) => {
            const namespaces = dataRayComponentAttrValue.split(".");
            namespaces.pop();

            let obj=window;
            for (let i = 0; i < namespaces.length; i++) {
                obj=obj[namespaces[i]];
                if (obj === undefined || obj === null) {
                    return undefined;
                }
            }
            return obj;
        };

        const getAttrList = (attrName) => {
            const value = domElement.getAttribute(attrName);
            return value === null ? [] : value.split(',');
        };

        const addToAttrList = (attrName, name) => {
            const list = getAttrList(attrName);
            list.push(name);
            domElement.setAttribute(attrName, list.join(','));
        };

        const componentNames = domElement.getAttribute(Component.DATA_RAY_ATTR)
            .split(",")
            .map(name => name.trim())
            .filter(name => name !== "");

        const isPending = (name) => getAttrList(Component.DATA_RAY_EXECUTED_ATTR).indexOf(name) === -1
            && getAttrList(Component.DATA_RAY_FAILED_ATTR).indexOf(name) === -1;

        if (!componentNames.some(isPending)) {
            return;
        }

        let data;
        try {
            data = Component._getData(domElement, bus);
        } catch (e) {
            // Invalid params: no component of this element can run. Mark them as failed
            // so they are not retried (and the error is not reported) on every pass.
            componentNames.filter(isPending).forEach(name => {
                addToAttrList(Component.DATA_RAY_FAILED_ATTR, name);
            });
            throw e;
        }

        const errors = [];
        componentNames.forEach(dataRayComponentAttrValue => {
            if (!isPending(dataRayComponentAttrValue)) {
                return;
            }

            const lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
            if (lastNamespaceObject === undefined) {
                return;
            }
            const componentConstructorFn = lastNamespaceObject[getComponentName(dataRayComponentAttrValue)];
            if (componentConstructorFn === undefined) {
                return;
            }

            try {
                new Component(componentConstructorFn, data).execute();
            } catch (e) {
                addToAttrList(Component.DATA_RAY_FAILED_ATTR, dataRayComponentAttrValue);
                if (onError) {
                    onError(e);
                } else {
                    errors.push(e);
                }
                return;
            }

            addToAttrList(Component.DATA_RAY_EXECUTED_ATTR, dataRayComponentAttrValue);
        });

        if (errors.length > 0) {
            throw errors[0];
        }
    }

    static _getData(domElement, bus) {
        const cached = componentDataCache.get(domElement);
        if (cached !== undefined) {
            if (cached.bus === bus) {
                return cached;
            }
            const data = RayNS.ComponentData.create(domElement, bus, cached.params);
            componentDataCache.set(domElement, data);
            return data;
        }
        const data = RayNS.ComponentData.create(domElement, bus);
        componentDataCache.set(domElement, data);
        return data;
    }
}


window.RayNS=window.RayNS || {};
window.RayNS.Component=Component;
