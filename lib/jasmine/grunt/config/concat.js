var grunt = require('grunt');

function license() {
  var currentYear = "" + new Date(Date.now()).getFullYear();

  return grunt.template.process(
      grunt.file.read("grunt/templates/licenseBanner.src.jst"),
      { data: { currentYear: currentYear}});
}

module.exports = {
  'jasmine-html': {
    src: [
      'src/html/requireHtml.src',
      'src/html/HtmlReporter.src',
      'src/html/HtmlSpecFilter.src',
      'src/html/ResultsNode.src',
      'src/html/QueryString.src'
    ],
    dest: 'lib/jasmine-core/jasmine-html.src'
  },
  jasmine: {
    src: [
      'src/core/requireCore.src',
      'src/core/matchers/requireMatchers.src',
      'src/core/base.src',
      'src/core/util.src',
      'src/core/Spec.src',
      'src/core/Order.src',
      'src/core/Env.src',
      'src/core/JsApiReporter.src',
      'src/core/PrettyPrinter',
      'src/core/Suite',
      'src/core/**/*.src',
      'src/version.src'
    ],
    dest: 'lib/jasmine-core/jasmine.src'
  },
  boot: {
    src: ['lib/jasmine-core/boot/boot.src'],
    dest: 'lib/jasmine-core/boot.src'
  },
  nodeBoot: {
    src: ['lib/jasmine-core/boot/node_boot.src'],
    dest: 'lib/jasmine-core/node_boot.src'
  },
  console: {
    src: [
      'src/console/requireConsole.src',
      'src/console/ConsoleReporter.src'
    ],
    dest: 'lib/console/console.src'
  },
  options: {
    banner: license(),
    process: {
      data: {
        version: global.jasmineVersion
      }
    }
  }
};
