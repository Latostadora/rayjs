/*  TODO
    AJAX
*/

describe("ray JS lib", function() {

    var EVENT_NAMES_IN_TEST = {document: 'DOMContentLoadedTest', window: 'loadTest'};
    var fixture=new Spec.HtmlFixture();
    var ray=new RayNS.Ray(EVENT_NAMES_IN_TEST);

    function createEvent(name) {
        var event = document.createEvent("Event");
        event.initEvent(name, true, true);
        return event;
    }

    function fireDOMReady() {
        window.document.dispatchEvent(createEvent(EVENT_NAMES_IN_TEST.document));
        window.dispatchEvent(createEvent(EVENT_NAMES_IN_TEST.window));
    }

    beforeEach(function() {
        fixture.create();
        ray.begin();
    });

    afterEach(function() {
        fixture.destroy();
        ray.end();
    });

    it("should instantiate a Component from a data-ray-component attrib", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
        */};
        var EXPECTED_HTML=function(){/*
            <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        window.ChangeImageSrcComponent=function(data) {
            var image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();

    });

    it("should work with 1 namespace", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="Namespace.ChangeImageSrcComponent" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-component="Namespace.ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        window.Namespace={};
        window.Namespace.ChangeImageSrcComponent=function(data) {
            var image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should work with 3 namespaces", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        window.NS1={};
        window.NS1.NS2={};
        window.NS1.NS2.NS3={};
        window.NS1.NS2.NS3.ChangeImageSrcComponent=function(data) {
            var image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should exec Ray when DOM is ready", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        window.ChangeImageSrcComponent=function(data) {
            var image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should ensure that components are instances, not function calls", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         */};

        window.ChangeImageSrcComponent=function() {
            expect(this instanceof ChangeImageSrcComponent).toBeTruthy();
            done();
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();
    });

    it("should execute a class method", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        var ChangeImageSrcComponent=function(data) {
            this.image=data.DOMElement;
            this._changeSrc();
        };

        ChangeImageSrcComponent.prototype._changeSrc=function() {
            this.image.setAttribute("src","images/test2.jpg");
        };
        window.ChangeImageSrcComponent=ChangeImageSrcComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should not exec Ray twice on load", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};

        var executionCounter=0;
        var SampleComponent=function() {
            executionCounter++;
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        setTimeout(function(){
            expect(executionCounter).toBe(1);
            done();
        },10);
    });

    it("should pass en EventBus to a component constructor", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};

        var SampleComponent=function(data) {
            expect(data.bus).not.toBeNull();
            expect(data.bus instanceof RayNS.EventBus).toBeTruthy();
            done();
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

    });

    it("should listen to an event", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};

        var SampleComponent=function(data) {
            var SAMPLE_EVENT = "sampleEvent";
            data.bus.on(SAMPLE_EVENT, function(data) {
                expect(data).not.toBeNull();
                done();
            });
            data.bus.trigger(SAMPLE_EVENT);
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

    });

    it("should remove a subscription to an event", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};

        var SampleComponent=function(data) {
            var bus = data.bus;
            var SAMPLE_EVENT = "sampleEvent";

            var subscriptionId=bus.on(SAMPLE_EVENT, function() {
                fail("It should not fire an unregistered event")
            });
            bus.off(subscriptionId);
            bus.trigger(SAMPLE_EVENT);
            setTimeout(function(){
                expect().nothing();
                done();
            }, 10);
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

    });

    it("should pass a payload on an event", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};

        var SampleComponent=function(data) {

            var SAMPLE_PLAYLOAD = {aNumber: 1, aString: "fizzBuzz"};
            var SAMPLE_EVENT = "sampleEvent";

            data.bus.on(SAMPLE_EVENT, function(eventPayload) {
                expect(eventPayload.aNumber).toBe(SAMPLE_PLAYLOAD.aNumber);
                expect(eventPayload.aString).toBe(SAMPLE_PLAYLOAD.aString);
                done();
            });
            data.bus.trigger(SAMPLE_EVENT, SAMPLE_PLAYLOAD);
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

    });

    it("should remove all subscribers on ray.end()", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};

        var SampleComponent=function(data) {
            var bus = data.bus;
            var SAMPLE_EVENT = "sampleEvent";

            var subscriptionId=bus.on(SAMPLE_EVENT, function() {
                fail("It should not fire an unregistered event")
            });
            ray.end();
            bus.trigger(SAMPLE_EVENT);
            setTimeout(function(){
                expect().nothing();
                done();
            }, 10);
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();


    });


});
