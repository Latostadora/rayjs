
const Component=RayNS.Component;
const Events=RayNS.Events;
const Commands=RayNS.Commands;

class CommandDispatcher {
    constructor(bus) {
        this.bus = bus;
    }

    begin() {
        const self=this;
        this.listenerToExecNewComponents=this.bus.on(Commands.EXECUTE_NEW_COMPONENTS, ()=>{
            self._executeNewComponents();
        })
    }

    end() {
        this.bus.off(this.listenerToExecNewComponents);
    }

    _executeNewComponents() {
        const DATA_RAY_ATTR=RayNS.Component.DATA_RAY_ATTR;
        const self = this;
        return document.querySelectorAll(`[${DATA_RAY_ATTR}]`).forEach(domElement => {
            try {
                const EXECUTED_ATTRIBUTE = 'data-ray-component-executed';
                if (domElement.hasAttribute(EXECUTED_ATTRIBUTE)) {
                    return;
                }
                domElement.setAttribute(EXECUTED_ATTRIBUTE, '');

                const component=Component.create(domElement, self.bus);
                component.execute();
            } catch (e) {
                self.bus.trigger(Events.ERROR, e);
                console.log(`RayJS: Error loading components: ${e.message}`);
            }
        });
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.CommandDispatcher=CommandDispatcher;


