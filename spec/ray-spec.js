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

    it("should instantiate an Action from a data-ray-action attrib", function() {
        var INITIAL_HTML=function(){/*
            <img data-ray-action="ChangeImageSrcAction" src="images/test1.jpg">
        */};
        var EXPECTED_HTML=function(){/*
            <img data-ray-action="ChangeImageSrcAction" src="images/test2.jpg">
         */};

        window.ChangeImageSrcAction=function(image) {
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        new Ray();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();

    });

    it("should work with 1 namespace", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-action="Namespace.ChangeImageSrcAction" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-action="Namespace.ChangeImageSrcAction" src="images/test2.jpg">
         */};

        window.Namespace={};
        window.Namespace.ChangeImageSrcAction=function(image) {
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should work with 3 namespace", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-action="NS1.NS2.NS3.ChangeImageSrcAction" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-action="NS1.NS2.NS3.ChangeImageSrcAction" src="images/test2.jpg">
         */};

        window.NS1={};
        window.NS1.NS2={};
        window.NS1.NS2.NS3={};
        window.NS1.NS2.NS3.ChangeImageSrcAction=function(image) {
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should exec Ray() when DOM is ready", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-action="ChangeImageSrcAction" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-action="ChangeImageSrcAction" src="images/test2.jpg">
         */};

        window.ChangeImageSrcAction=function(image) {
            image.setAttribute("src","images/test2.jpg");
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });

    it("should ensure that actions are instances, not function calls", function(done) {
        var INITIAL_HTML=function(){/*
         <img data-ray-action="ChangeImageSrcAction" src="images/test1.jpg">
         */};

        window.ChangeImageSrcAction=function() {
            expect(this instanceof ChangeImageSrcAction).toBeTruthy();
            done();
        };

        fixture.add(INITIAL_HTML);

        fireDOMReady();
    });

    it("should execute a class Action", function() {
        var INITIAL_HTML=function(){/*
         <img data-ray-action="ChangeImageSrcAction" src="images/test1.jpg">
         */};
        var EXPECTED_HTML=function(){/*
         <img data-ray-action="ChangeImageSrcAction" src="images/test2.jpg">
         */};

        var ChangeImageSrcAction=function(image) {
            this.image=image;
            this._changeSrc();
        };

        ChangeImageSrcAction.prototype._changeSrc=function() {
            this.image.setAttribute("src","images/test2.jpg");
        };
        window.ChangeImageSrcAction=ChangeImageSrcAction;

        fixture.add(INITIAL_HTML);

        fireDOMReady();

        expect(fixture.isEqual(EXPECTED_HTML)).toBeTruthy();
    });


});
