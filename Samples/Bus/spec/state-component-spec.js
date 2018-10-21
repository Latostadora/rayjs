
describe("State Component", function() {

    var fixture=new HtmlFixture();
    var Ray=RayNS.Ray;
    var ray=new Ray();

    beforeEach(function() {
        fixture.create();
        ray.begin();
    });

    afterEach(function() {
        fixture.destroy();
        ray.end();
    });

    function checkVisibilityByCountry(COUNTRY_VALUE, STYLE_DISPLAY, done) {
        fixture.append(function () {/*
            <select data-ray-component="StateComponent">
                <option label="Alabama" value="AL">Alabama</option>
                <option label="Wisconsin" value="WI">Wisconsin</option>
                <option label="Florida" value="FL" selected="selected">Florida</option>
            </select>
        */
        });

        var bus = Ray.createBus();
        var selectElement = fixture.elementByTag("select");
        var component = Ray.createComponent(selectElement, bus);
        component.execute();
        bus.trigger(Events.COUNTRY_CHANGED, COUNTRY_VALUE);
        setTimeout(function () {
            expect(selectElement.style.display).toBe(STYLE_DISPLAY);
            done();
        }, 1);
    }

    it("should show its content when COUNTRY_CHANGED to US", function(done) {
        var COUNTRY_VALUE = "US";
        var STYLE_DISPLAY = "inline";
        checkVisibilityByCountry(COUNTRY_VALUE, STYLE_DISPLAY, done);
    });

    it("should hide its content when COUNTRY_CHANGED to ES", function(done) {
        var COUNTRY_VALUE = "ES";
        var STYLE_DISPLAY = "none";
        checkVisibilityByCountry(COUNTRY_VALUE, STYLE_DISPLAY, done);
    });

});
