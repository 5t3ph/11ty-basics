const slugify = require('slugify');
const HtmlMin = require('html-minifier');
const ErrorOverlay = require('eleventy-plugin-error-overlay');

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(['md']);
  eleventyConfig.addPlugin(ErrorOverlay);

  eleventyConfig.addWatchTarget("./src/_tmp/style.css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy({ "./src/_tmp/style.css": "./css/style.css" });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      let minified = HtmlMin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: '_templates',
      data: '_data',
    },
    jsDataFileSuffix: '.data',
  };
};
