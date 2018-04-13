describe("ray JS lib", function() {

    function fireDOMReady() {
        var DOMContentLoaded_event = document.createEvent("Event");
        DOMContentLoaded_event.initEvent("DOMContentLoaded", true, true);
        window.document.dispatchEvent(DOMContentLoaded_event);
    }

    var fixture=new Spec.HtmlFixture();

    beforeEach(function() {
        fixture.create();
    });

    afterEach(function() {
        fixture.destroy();
    });

    it("should instantiate a Component from a data-ray-component attrib", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
        */};
        var EXPECTED_HTML=function(){/*
            <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        window.ChangeImageSrcComponent=function(image) {
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
        window.Namespace.ChangeImageSrcComponent=function(image) {
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should work with 3 namespace", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-component="NS1.NS2.NS3.ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        window.NS1={};
        window.NS1.NS2={};
        window.NS1.NS2.NS3={};
        window.NS1.NS2.NS3.ChangeImageSrcComponent=function(image) {
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

        window.ChangeImageSrcComponent=function(image) {
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

    it("should execute a class Component", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-component="ChangeImageSrcComponent" src="images/test2.jpg">
         */};

        var ChangeImageSrcComponent=function(image) {
            this.image=image;
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

    it('should by apply Singleton Pattern ', function(done) {

        fireDOMReady();
        done();
        var firstRayInstance = Ray.Watcher().getInstance();
        var secondRayInstance = Ray.Watcher().getInstance();

        expect(firstRayInstance === secondRayInstance).toBeTruthy();
    });

    it('should call component only once', function() {

        window.testCount = 0;
        var HTML=function(){/*
         <div data-ray-component="TestComponent">
         */};

        window.TestComponent=function() {
            window.testCount++;
        };

        fixture.add(HTML);
        fireDOMReady();

        expect(window.testCount === 1).toBeTruthy();
    });


});
