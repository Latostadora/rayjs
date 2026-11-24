// Loads the built bundle the way a browser does (classic <script>, global scope, no `module`).
const fs = require('fs');
const path = require('path');

describe("dist/ray.js bundle", function() {

    const code = fs.readFileSync(path.join(__dirname, '../dist/ray.js'), 'utf8');
    const OriginalDocument = window.Document;

    beforeAll(function() {
        // Indirect eval runs the code in the global scope, like a classic script
        (0, eval)(code);
    });

    it("must expose Ray and RayNS", function() {
        expect(typeof window.Ray).toBe("function");
        expect(typeof window.RayNS).toBe("object");
    });

    it("must not overwrite browser globals", function() {
        expect(window.Document).toBe(OriginalDocument);
    });

    it("must not leak internal classes as globals", function() {
        ["Component", "Events", "Commands", "Bus", "ComponentData", "CommandDispatcher", "_createClass"]
            .forEach(name => expect(window[name]).toBeUndefined());
    });

    it("must execute a component", function() {
        document.body.innerHTML = `<img data-ray-component="BundleComponent">`;
        let executions = 0;
        window.BundleComponent = function() { executions++; };

        window.Ray.executeComponent(document.querySelector("img"), window.Ray.createBus());

        expect(executions).toBe(1);
    });
});
