(function() {
  var path = require("path"),
    fs = require("fs");

  var glob = require("glob");

  var jasmineUnderTestRequire = require(path.join(__dirname, "../../src/core/requireCore.src"));

  global.getJasmineRequireObj = function () {
    return jasmineUnderTestRequire;
  };

  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

  function getSourceFiles() {
    var src_files = ['core/**/*.src', 'console/**/*.src', 'version.src'];
    src_files.forEach(function(file) {
      var filePath = path.join(__dirname, "../../", 'src/', file);
      glob.sync(filePath).forEach(function(resolvedFile) {
        require(resolvedFile);
      });
    });
  }

  extend(jasmineUnderTestRequire, require(path.join(__dirname,"../../src/console/requireConsole.src")));
  getSourceFiles();
  global.jasmineUnderTest = jasmineUnderTestRequire.core(jasmineUnderTestRequire);

  jasmineUnderTestRequire.console(jasmineUnderTestRequire, jasmineUnderTest);
})();
