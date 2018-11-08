const HtmlFixture = require('html-fixture');
require ('../../../dist/ray-min');

require ("../src/country-component");
require ("../src/events");


describe("Country Component", () => {

    const fixture = new HtmlFixture();

    beforeEach(() => {
        fixture.create();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it("should trigger COUNTRY_CHANGED event on component load with selected option value (DE)", done => {
        const HTML = () => {/*
            <select data-ray-component="CountryComponent">
                <option label="Alemania" value="DE" selected="selected">Alemania</option>
                <option label="España" value="ES">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        };
        const COUNTRY_VALUE = "DE";

        fixture.append(HTML);
        const bus = Ray.createBus();
        bus.on(Events.COUNTRY_CHANGED, (currentCountry) => {
            expect(currentCountry).toBe(COUNTRY_VALUE);
            done();
        });
        const selectElement = fixture.elementByTag("select");
        Ray.executeComponent(selectElement, bus);
    });

    it("should trigger COUNTRY_CHANGED event on component load with selected option value (ES)", done => {
        const HTML = () => {/*
            <select data-ray-component="CountryComponent">
                <option label="Alemania" value="DE">Alemania</option>
                <option label="España" value="ES" selected="selected">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        };
        const COUNTRY_VALUE = "ES";
        fixture.append(HTML);
        const bus = Ray.createBus();
        bus.on(Events.COUNTRY_CHANGED, (currentCountry) => {
            expect(currentCountry).toBe(COUNTRY_VALUE);
            done();
        });
        const selectElement = fixture.elementByTag("select");
        Ray.executeComponent(selectElement, bus);
    });

    it("should trigger COUNTRY_CHANGED with correct value event on selected city", done => {
        fixture.append(() => {/*
            <select data-ray-component="CountryComponent">
                <option label="Alemania" value="DE">Alemania</option>
                <option label="España" value="ES" selected="selected">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        });


        const bus = Ray.createBus();
        const selectElement = fixture.elementByTag("select");
        Ray.executeComponent(selectElement, bus);

        bus.on(Events.COUNTRY_CHANGED, (currentCountry) => {
            expect(currentCountry).toBe("DE");
            done();
        });
        fixture.elementBySelector("option[value=DE]").selected = 'selected';
    });

    it('should print the background of the select', () => {
        fixture.append(() => {/*
            <select
                data-ray-component="CountryComponent"
                data-ray-attributes='{"background":"red"}'
            >
                <option label="Alemania" value="DE">Alemania</option>
                <option label="España" value="ES" selected="selected">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        });

        const bus = Ray.createBus();
        const selectElement = fixture.elementByTag("select");
        Ray.executeComponent(selectElement, bus);

        expect(selectElement.style.backgroundColor).toBe("red");
    });
});
