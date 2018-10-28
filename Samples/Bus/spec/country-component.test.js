const HtmlFixture = require('html-fixture');
require ('../../../dist/ray');

require ("../src/country-component");
require ("../src/events");


describe("Country Component", function() {

    var fixture=new HtmlFixture();
    var Ray=RayNS.Ray;
    var ray=new Ray();

    beforeEach(function() {
        fixture.create();
    });

    afterEach(function() {
        fixture.destroy();
    });

    it("should trigger COUNTRY_CHANGED event on component load with selected option value (DE)", function(done) {
        var HTML = function () {/*
            <select data-ray-component="CountryComponent">
                <option label="Alemania" value="DE" selected="selected">Alemania</option>
                <option label="España" value="ES">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        };
        var COUNTRY_VALUE = "DE";

        fixture.append(HTML);
        var bus = Ray.createBus();
        bus.on(Events.COUNTRY_CHANGED, function (currentCountry) {
            expect(currentCountry).toBe(COUNTRY_VALUE);
            done();
        });
        var selectElement = fixture.elementByTag("select");
        var component = Ray.createComponent(selectElement, bus);
        component.execute();
    });

    it("should trigger COUNTRY_CHANGED event on component load with selected option value (ES)", function(done) {
        var HTML = function () {/*
            <select data-ray-component="CountryComponent">
                <option label="Alemania" value="DE">Alemania</option>
                <option label="España" value="ES" selected="selected">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        };
        var COUNTRY_VALUE = "ES";
        fixture.append(HTML);
        var bus = Ray.createBus();
        bus.on(Events.COUNTRY_CHANGED, function (currentCountry) {
            expect(currentCountry).toBe(COUNTRY_VALUE);
            done();
        });
        var selectElement = fixture.elementByTag("select");
        var component = Ray.createComponent(selectElement, bus);
        component.execute();
    });

    it("should trigger COUNTRY_CHANGED with correct value event on selected city", function(done) {
        fixture.append(function () {/*
            <select data-ray-component="CountryComponent">
                <option label="Alemania" value="DE">Alemania</option>
                <option label="España" value="ES" selected="selected">España</option>
                <option label="Estados Unidos" value="US" >Estados Unidos</option>
            </select>
        */
        });

        var bus=Ray.createBus();
        var selectElement = fixture.elementByTag("select");
        var component=Ray.createComponent(selectElement, bus);
        component.execute();

        bus.on(Events.COUNTRY_CHANGED, function(currentCountry){
            expect(currentCountry).toBe("DE");
            done();
        });
        fixture.elementBySelector("option[value=DE]").selected = 'selected';
    });


});
