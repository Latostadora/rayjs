const HtmlFixture = require('html-fixture');
require ('../../../dist/ray-min');

require ("../src/state-component");
require ("../src/events");

describe("State Component", function() {

    const fixture = new HtmlFixture();

    beforeEach(() => {
        fixture.create();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("should show its content when COUNTRY_CHANGED to US", (done)=> {
        const COUNTRY_VALUE = "US";
        const STYLE_DISPLAY = "inline";
        fixture.append(function () {/*
            <select data-ray-component="StateComponent">
                <option label="Alabama" value="AL">Alabama</option>
                <option label="Wisconsin" value="WI">Wisconsin</option>
                <option label="Florida" value="FL" selected="selected">Florida</option>
            </select>
        */
        });
        const bus = Ray.createBus();
        const selectElement = fixture.elementByTag("select");
        const component = Ray.createComponent(selectElement, bus);
        component.execute();
        bus.trigger(Events.COUNTRY_CHANGED, COUNTRY_VALUE);
        expect(selectElement.style.display).toBe(STYLE_DISPLAY);
        done();
    });

    it("should hide its content when COUNTRY_CHANGED to ES", (done)=> {
        const COUNTRY_VALUE = "ES";
        const STYLE_DISPLAY = "none";
        fixture.append(function () {/*
            <select data-ray-component="StateComponent">
                <option label="Alabama" value="AL">Alabama</option>
                <option label="Wisconsin" value="WI">Wisconsin</option>
                <option label="Florida" value="FL" selected="selected">Florida</option>
            </select>
        */
        });
        const bus = Ray.createBus();
        const selectElement = fixture.elementByTag("select");
        const component = Ray.createComponent(selectElement, bus);
        component.execute();
        bus.trigger(Events.COUNTRY_CHANGED, COUNTRY_VALUE);
        expect(selectElement.style.display).toBe(STYLE_DISPLAY);
        done();
    });

});
