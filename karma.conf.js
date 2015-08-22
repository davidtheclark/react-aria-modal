module.exports = function(config) {
  config.set({
    frameworks: ['tap'],
    browsers: ['PhantomJS'],
    files: [
      './node_modules/es5-shim/es5-shim.min.js',
      './node_modules/es5-shim/es5-sham.min.js',
      './test/test-bundle.js',
    ],
  });
};
