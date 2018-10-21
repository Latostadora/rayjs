module.exports = {
  beforeConcat: ['src/**/*.src'],
  afterConcat: [
    'lib/jasmine-core/jasmine-html.src',
    'lib/jasmine-core/jasmine.src'
  ],
  options: {
    jshintrc: '.jshintrc'
  },
  all: ['src/**/*.src']
};
