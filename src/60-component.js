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

    static execute(domElement, bus) {

        const getComponentName = (dataRayComponentAttrValue) => {
            const namespaces = dataRayComponentAttrValue.split(".");
            return namespaces.pop();
        };

        const getLastNamespaceObject= (dataRayComponentAttrValue) => {
            const namespaces = dataRayComponentAttrValue.split(".");
            namespaces.pop();

            let obj=window;
            namespaces.forEach(namespace => {
                obj=obj[namespace];
            });
            return obj;
        };

        const data=RayNS.ComponentData.create(domElement, bus);

        const dataRayComponentAttrValue = domElement.getAttribute(Component.DATA_RAY_ATTR);
        const componentName = getComponentName(dataRayComponentAttrValue);
        const lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
        const componentConstructorFn = lastNamespaceObject[componentName];
        if (componentConstructorFn===undefined) {
            throw new Error(`<${componentName}> JS object not Found`);
        }
        const component = new Component(componentConstructorFn, data);
        component.execute();
    }
}


window.RayNS=window.RayNS || {};
window.RayNS.Component=Component;


