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

        const data = RayNS.ComponentData.create(domElement, bus);
        const dataRayComponentsAttrValue = domElement.getAttribute(Component.DATA_RAY_ATTR).split(",");
        dataRayComponentsAttrValue.forEach(dataRayComponentAttrValue => {
            let componentsExecuted = domElement.getAttribute(Component.DATA_RAY_EXECUTED_ATTR);
            if(componentsExecuted === null) {
                componentsExecuted = [];
            } else {
                componentsExecuted = componentsExecuted.split(',');
            }

            const componentName = getComponentName(dataRayComponentAttrValue);

            if(componentsExecuted.indexOf(dataRayComponentAttrValue) > -1) {
                return;
            }

            const lastNamespaceObject = getLastNamespaceObject(dataRayComponentAttrValue);
            const componentConstructorFn = lastNamespaceObject[componentName];
            if (componentConstructorFn === undefined) {
                return;
            }
            const component = new Component(componentConstructorFn, data);
            component.execute();

            componentsExecuted.push(dataRayComponentAttrValue);
            domElement.setAttribute(Component.DATA_RAY_EXECUTED_ATTR, componentsExecuted.join(','));
        });
    }
}


window.RayNS=window.RayNS || {};
window.RayNS.Component=Component;


