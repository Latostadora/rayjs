require ('../src/10_array_foreachpolyfill');
require ('../src/20-ray-document');
require ('../src/30-commands');
require ('../src/40-events');
require ('../src/50-component-data');
require ('../src/60-component');
require ('../src/70-command-dispatcher');
require ('../src/80-bus');
require ('../src/90-ray');

const HtmlFixture = require('html-fixture');
window.Handlebars= require('handlebars');

describe("ray JS lib", function() {

    const EVENT_NAMES_IN_TEST = {document: 'DOMContentLoadedTest', window: 'loadTest'};
    const fixture=new HtmlFixture();
    const ray=new Ray(EVENT_NAMES_IN_TEST);

    function createEvent(name) {
        const event = document.createEvent("Event");
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

    it("should work with 3 namespaces", function() {
        const INITIAL_HTML=`
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test1.jpg">
         `;
        const EXPECTED_HTML=`
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
         `;

        window.NS1={};
        window.NS1.NS2={};
        window.NS1.NS2.NS3={};
        window.NS1.NS2.NS3.ChangeImageSrcComponent=function(data) {
            const image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should instantiate a Component from a data-ray-component attrib", function() {
        const INITIAL_HTML=`
            <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
        `;
        const EXPECTED_HTML=`
            <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
         `;

        window.ChangeImageSrcComponent=function(data) {
            const image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();

    });



    it("should work with 1 namespace", function() {
        const INITIAL_HTML=`
         <img data-ray-component="Namespace.ChangeImageSrcComponent" src="images/test1.jpg">
         `;
        const EXPECTED_HTML=`
         <img data-ray-component="Namespace.ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
         `;

        window.Namespace={};
        window.Namespace.ChangeImageSrcComponent=function(data) {
            const image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should exec Ray when DOM is ready", function() {
        const INITIAL_HTML=`
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         `;
        const EXPECTED_HTML=`
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
         `;

        window.ChangeImageSrcComponent=function(data) {
            const image=data.DOMElement;
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should ensure that components are instances, not function calls", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         `;

        window.ChangeImageSrcComponent=function() {
            expect(this instanceof ChangeImageSrcComponent).toBeTruthy();
            done();
        };

        fixture.append(INITIAL_HTML);

        fireDOMReady();
    });

    it("should execute a class method", function() {
        const INITIAL_HTML=`
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         `;
        const EXPECTED_HTML=`
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg" data-ray-component-executed>
         `;

        const ChangeImageSrcComponent=function(data) {
            this.image=data.DOMElement;
            this._changeSrc();
        };

        ChangeImageSrcComponent.prototype._changeSrc=function() {
            this.image.setAttribute("src","images/test2.jpg");
        };
        window.ChangeImageSrcComponent=ChangeImageSrcComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should not exec Ray twice on load", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;

        let executionCounter=0;
        const SampleComponent=function() {
            executionCounter++;
        };

        window.SampleComponent=SampleComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        setTimeout(function(){
            expect(executionCounter).toBe(1);
            done();
        },10);
    });

    it("should pass an Bus to a component constructor", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;

        const SampleComponent=function(data) {
            expect(data.bus).not.toBeNull();
            expect(data.bus instanceof RayNS.Bus).toBeTruthy();
            done();
        };

        window.SampleComponent=SampleComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();

    });

    it("should listen to an event", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;

        const SampleComponent=function(data) {
            const SAMPLE_EVENT = "sampleEvent";
            data.bus.on(SAMPLE_EVENT, function(data) {
                expect(data).not.toBeNull();
                done();
            });
            data.bus.trigger(SAMPLE_EVENT);
        };

        window.SampleComponent=SampleComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();

    });

    it("should listen to N events", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;


        const SampleComponent=function(data) {
            let count=0;
            const SAMPLE_EVENT = "sampleEvent";
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

        fixture.append(INITIAL_HTML);

        fireDOMReady();

    });

    it("should call callback function in registered order", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;


        const SampleComponent=function(data) {
            let count=0;
            const SAMPLE_EVENT = "sampleEvent";
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

        fixture.append(INITIAL_HTML);

        fireDOMReady();

    });

    it("should remove a subscription to an event", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;

        const SampleComponent=function(data) {
            const bus = data.bus;
            const SAMPLE_EVENT = "sampleEvent";

            const subscriptionId=bus.on(SAMPLE_EVENT, function() {
                fail("It should not fire an unregistered event");
            });
            bus.off(subscriptionId);
            bus.trigger(SAMPLE_EVENT);
            setTimeout(function(){
                expect(null);
                done();
            }, 10);
        };

        window.SampleComponent=SampleComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();

    });

    it("should pass a payload on an event", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;

        const SampleComponent=function(data) {

            const SAMPLE_PLAYLOAD = {aNumber: 1, aString: "fizzBuzz"};
            const SAMPLE_EVENT = "sampleEvent";

            data.bus.on(SAMPLE_EVENT, function(eventPayload) {
                expect(eventPayload.aNumber).toBe(SAMPLE_PLAYLOAD.aNumber);
                expect(eventPayload.aString).toBe(SAMPLE_PLAYLOAD.aString);
                done();
            });
            data.bus.trigger(SAMPLE_EVENT, SAMPLE_PLAYLOAD);
        };

        window.SampleComponent=SampleComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();

    });

    it("should remove all subscribers on ray.end()", function(done) {
        const INITIAL_HTML=`
         <img data-ray-component="SampleComponent" />
         `;

        const SampleComponent=function(data) {
            const bus = data.bus;
            const SAMPLE_EVENT = "sampleEvent";

            const subscriptionId=bus.on(SAMPLE_EVENT, function() {
                fail("It should not fire an unregistered event");
            });
            ray.end();
            bus.trigger(SAMPLE_EVENT);
            setTimeout(function(){
                expect(null);
                done();
            }, 10);
        };

        window.SampleComponent=SampleComponent;

        fixture.append(INITIAL_HTML);

        fireDOMReady();


    });


    it("should instantiate component after dom is ready", function(done) {
        const INITIAL_HTML=`
            <img data-ray-component="AsyncComponent">
        `;

        window.AsyncComponent=function() {
            done();
        };

        fireDOMReady();

        fixture.append(INITIAL_HTML);
    });

    it("should instantiate components on changes in DOM after load/ready", function(done) {
        const INITIAL_HTML=`
            <img data-ray-component="SampleComponent">
        `;

        const AFTER_HTML=`
            <img data-ray-component="Sample2Component">
        `;

        let SampleCount = 0;
        let Sample2Count = 0;

        window.SampleComponent=function() {
            SampleCount++;
        };

        window.Sample2Component=function() {
            Sample2Count++;
        };

        fixture.append(INITIAL_HTML);

        fireDOMReady();

        fixture.append(AFTER_HTML);

        setTimeout(function(){
            expect(SampleCount).toBe(1);
            expect(Sample2Count).toBe(1);
            done();
        }, 600);
    });

    it("should instantiate components on demand", function() {
        const AFTER_HTML=`
            <img data-ray-component="SampleComponent">
        `;

        let SampleCount = 0;

        window.SampleComponent=function() {
            SampleCount++;
        };

        fixture.append(AFTER_HTML);
        //ray.getCommandDispatcher()._executeNewComponents();
        ray.bus.trigger(Ray.Commands.EXECUTE_NEW_COMPONENTS);

        expect(SampleCount).toBe(1);

    });

    /*
        it("should pass a CommandDispatcher to a component constructor", function(done) {
            const INITIAL_HTML=function(){/!*
             <img data-ray-component="SampleComponent" />
             *!/};

            const SampleComponent=function(data) {
                expect(data.commandDispatcher).not.toBeNull();
                expect(data.commandDispatcher instanceof RayNS.CommandDispatcher).toBeTruthy();
                done();
            };

            window.SampleComponent=SampleComponent;

            fixture.append(INITIAL_HTML);

            fireDOMReady();

        });
    */

    it("should send a 'ray.error' event if component doesn't exists", function(done) {
        const INITIAL_HTML=`
            <img data-ray-component="NonExistentComponent" />
        `;
        fixture.append(INITIAL_HTML);
        ray.bus.on(Ray.Events.ERROR, function(exception){
            expect(exception instanceof Error).toBeTruthy();
            expect("<NonExistentComponent> JS object not Found").toBe(exception.message);
            done();
        });
        fireDOMReady();
    });

    it("must execute a new Bus", function() {
        const bus = Ray.createBus();

        expect(bus).not.toBeNull();
        expect(bus instanceof RayNS.Bus).toBeTruthy();
    });

    it("must execute a Component from domElement & bus", function(done) {
        ray.end();

        const INITIAL_HTML=`
            <img data-ray-component="SampleComponent" />
        `;
        fixture.append(INITIAL_HTML);

        const bus = Ray.createBus();
        const imageDomElement = fixture.elementByTag("img");

        window.SampleComponent=function(data) {
            expect(data.DOMElement.innerHTML).toBe(imageDomElement.innerHTML);
            done();
        };

        Ray.executeComponent(imageDomElement, bus);
    });

    it("must render a template from String", function() {
        ray.end();
        const TEMPLATE_STRING="<b>{{name}}</b><i>{{surname}}</i>";
        const MODEL={name: "Carlos", surname: "Gil"};
        const html=Ray.renderHtmlFromString(TEMPLATE_STRING, MODEL);
        expect(html).toBe("<b>Carlos</b><i>Gil</i>");
    });

/*    it("must render a template from url", function() {
        ray.end();
        const TEMPLATE_URL="/tests/template.hbs";
        const MODEL={name: "Carlos", surname: "Gil"};
        const html=Ray.renderHtmlFromUrl(TEMPLATE_URL, MODEL);
        expect(html).toBe("<b>Carlos</b><i>Gil</i>");
    });*/

    it("must throw an exception if HandleBars is not loaded when render string", function() {
        const handleBars=window.Handlebars;
        try {
            window.Handlebars=undefined;
            const ERROR_MESSAGE = "HandleBars object is not present. You need to load HandleBars before this";
            expect(()=>{
                Ray.renderHtmlFromString();
            }).toThrow(new Error(ERROR_MESSAGE));
        } finally {
            window.Handlebars=handleBars;
        }
    });

    it("must throw an exception if HandleBars is not loaded when render from url", function() {
        const handleBars=window.Handlebars;
        try {
            window.Handlebars=undefined;
            const ERROR_MESSAGE = "HandleBars object is not present. You need to load HandleBars before this";
            expect(()=>{
                Ray.renderHtmlFromUrl();
            }).toThrow(new Error(ERROR_MESSAGE));
        } finally {
            window.Handlebars=handleBars;
        }
    });
});