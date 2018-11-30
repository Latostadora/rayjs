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
        });
        this.listenerToCatchError = this.bus.on(Events.ERROR, (e) => {
            console.error(`RayJS Error: ${e.stack}`);
        });
    }

    end() {
        this.bus.off(this.listenerToExecNewComponents);
        this.bus.off(this.listenerToCatchError);
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

                Component.execute(domElement, self.bus);
            } catch (e) {
                self.bus.trigger(Events.ERROR, e);
            }
        });
    }
}

window.RayNS=window.RayNS || {};
window.RayNS.CommandDispatcher=CommandDispatcher;


