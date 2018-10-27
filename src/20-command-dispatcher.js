
const Component=RayNS.Component;

class CommandDispatcher {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    loadNewComponents() {
        const DATA_RAY_ATTR=RayNS.Component.DATA_RAY_ATTR;
        const self = this;
        return document.querySelectorAll(`[${DATA_RAY_ATTR}]`).forEach(domElement => {
            try {
                const EXECUTED_ATTRIBUTE = 'data-ray-component-executed';
                if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                    return;
                }
                domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                const component=Component.create(domElement, self.eventBus);
                component.execute();
            } catch (e) {
                self.eventBus.trigger("ray.error", e);
                console.log(`RayJS: Error loading components: ${e.message}`);
            }
        });
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.CommandDispatcher=CommandDispatcher;


