var standaloneLibDir = "lib/jasmine-" + jasmineVersion;

function root(path) { return "./" + path; }
function libJasmineCore(path) { return root("lib/jasmine-core/" + path); }
function libConsole() { return "lib/console/" }
function dist(path) { return root("dist/" + path); }

module.exports = {
  standalone: {
    options: {
      archive: root("dist/jasmine-standalone-" + global.jasmineVersion + ".zip")
    },

    files: [
      { src: [ root("MIT.LICENSE") ] },
      {
        src: [ "jasmine_favicon.png"],
        dest: standaloneLibDir,
        expand: true,
        cwd: root("images")
      },
      {
        src: [
          "jasmine.src",
          "jasmine-html.src",
          "jasmine.css"
        ],
        dest: standaloneLibDir,
        expand: true,
        cwd: libJasmineCore("")
      },
      {
        src: [
          "console.src"
        ],
        dest: standaloneLibDir,
        expand: true,
        cwd: libConsole()
      },
      {
        src: [ "boot.src" ],
        dest: standaloneLibDir,
        expand: true,
        cwd: libJasmineCore("boot")
      },
      {
        src: [ "SpecRunner.html" ],
        dest: root(""),
        expand: true,
        cwd: dist("tmp")
      },
      {
        src: [ "*.src" ],
        dest: "src",
        expand: true,
        cwd: libJasmineCore("example/src/")
      },
      {
        src: [ "*.src" ],
        dest: "spec",
        expand: true,
        cwd: libJasmineCore("example/spec/")
      }
    ]
  }
};
