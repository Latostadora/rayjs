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
            <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
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
         <img data-ray-component="Namespace.ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
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
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
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
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
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
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
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

    it("should pass an EventBus to a component constructor", function(done) {
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

    it("should listen to N events", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};


        var SampleComponent=function(data) {
            var count=0;
            var SAMPLE_EVENT = "sampleEvent";
            data.bus.on(SAMPLE_EVENT, function() {
                count++;
            });
            data.bus.on(SAMPLE_EVENT, function() {
                count++;
            });
            data.bus.on(SAMPLE_EVENT, function() {
                count++;
            });
            setTimeout(function(){
                expect(count).toBe(3);
                done();
            }, 10);
            data.bus.trigger(SAMPLE_EVENT);
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

    });

    it("should call callback function in registered order", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="SampleComponent" />
         */};


        var SampleComponent=function(data) {
            var count=0;
            var SAMPLE_EVENT = "sampleEvent";
            data.bus.on(SAMPLE_EVENT, function() {
                count++;
                expect(count).toBe(1);
            });
            data.bus.on(SAMPLE_EVENT, function() {
                count++;
                expect(count).toBe(2);
            });
            data.bus.on(SAMPLE_EVENT, function() {
                count++;
                expect(count).toBe(3);
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
                fail("It should not fire an unregistered event");
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
                fail("It should not fire an unregistered event");
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


    it("should instantiate component after dom is ready", function(done) {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="AsyncComponent">
        */};

        window.AsyncComponent=function() {
            done();
        };

        fireDOMReady();

        fixture.add(INITIAL_HTML);
    });

    it("should instantiate components on changes in DOM after load/ready", function(done) {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="SampleComponent">
        */};

        var AFTER_HTML=function(){/*
            <img data-ray-component="Sample2Component">
        */};

        var SampleCount = 0;
        var Sample2Count = 0;

        window.SampleComponent=function() {
            SampleCount++;
        };

        window.Sample2Component=function() {
            Sample2Count++;
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        fixture.add(AFTER_HTML);

        setTimeout(function(){
            expect(SampleCount).toBe(1);
            expect(Sample2Count).toBe(1);
            done();
        }, 600);
    });

    it("should instantiate components on demand", function() {
        var AFTER_HTML=function(){/*
            <img data-ray-component="SampleComponent">
        */};

        var SampleCount = 0;

        window.SampleComponent=function() {
            SampleCount++;
        };

        fixture.add(AFTER_HTML);
        ray.getCommandDispatcher().loadNewComponents();

        expect(SampleCount).toBe(1);

    });

/*
    it("should pass a CommandDispatcher to a component constructor", function(done) {
        var INITIAL_HTML=function(){/!*
         <img data-ray-component="SampleComponent" />
         *!/};

        var SampleComponent=function(data) {
            expect(data.commandDispatcher).not.toBeNull();
            expect(data.commandDispatcher instanceof RayNS.CommandDispatcher).toBeTruthy();
            done();
        };

        window.SampleComponent=SampleComponent;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

    });
*/

    it("should send a 'ray.error' event if component doesn't exists", function(done) {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="NonExistentComponent" />
        */};
        fixture.add(INITIAL_HTML);
        ray.eventBus.on("ray.error", function(exception){
            expect(exception instanceof Error).toBeTruthy();
            expect("<NonExistentComponent> JS object not Found").toBe(exception.message);
            done();
        });
        fireDOMReady();
    });

    it("must create a new Bus", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="NonExistentComponent" />
        */};
        fixture.add(INITIAL_HTML);

        var bus = RayNS.RayFactory.createBus();

        expect(bus).not.toBeNull();
        expect(bus instanceof RayNS.EventBus).toBeTruthy();


    });

    it("must create a data from dom & bus", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="NonExistentComponent" />
        */};
        fixture.add(INITIAL_HTML);


        var bus = RayNS.RayFactory.createBus();
        var fixtureDomElement = fixture.getRootElement();
        var data = RayNS.RayFactory.createData(fixtureDomElement, bus);

        expect(data).not.toBeNull();
        expect(data.bus instanceof RayNS.EventBus).toBeTruthy();
        expect(fixtureDomElement.innerHTML).toBe(data.DOMElement.innerHTML);
    });

    it("must create a component instance from data", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="SampleComponent" />
        */};
        fixture.add(INITIAL_HTML);

        window.SampleComponent=function(data) {

        };

        var bus = RayNS.RayFactory.createBus();
        var imageDomElement = fixture.getRootElement().getElementsByTagName("img")[0];
        var data = RayNS.RayFactory.createData(imageDomElement, bus);

        var sampleComponentInstance=RayNS.RayFactory.createComponent(data);
        expect(sampleComponentInstance instanceof SampleComponent).toBeTruthy();
    });

    it("must create a componentCommand from domElement & bus", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="SampleComponent" />
        */};
        fixture.add(INITIAL_HTML);

        window.SampleComponent=function(data) {

        };

        var bus = RayNS.RayFactory.createBus();
        var imageDomElement = fixture.getRootElement().getElementsByTagName("img")[0];
        var componentCommand=RayNS.RayFactory.createComponentInstanceCommand(imageDomElement, bus);
        expect(componentCommand instanceof RayNS.ComponentInstanceCommand).toBeTruthy();
    });

    it("must execute a componentCommand from domElement & bus", function(done) {
        ray.end();

        var INITIAL_HTML=function(){/*
            <img data-ray-component="SampleComponent" />
        */};
        fixture.add(INITIAL_HTML);

        var bus = RayNS.RayFactory.createBus();
        var imageDomElement = fixture.getRootElement().getElementsByTagName("img")[0];

        window.SampleComponent=function(data) {
            expect(data.DOMElement.innerHTML).toBe(imageDomElement.innerHTML);
            done();
        };

        var componentCommand=RayNS.RayFactory.createComponentInstanceCommand(imageDomElement, bus);
        componentCommand.execute();
    });
});
