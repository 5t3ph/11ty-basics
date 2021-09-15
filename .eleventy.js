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

  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  const MarkDownIt = new markdownIt(options);
  
  eleventyConfig.addFilter('markIt', (content) => {
    return MarkDownIt.render(content);
  });

  eleventyConfig.addFilter('stringify', (content) => {
    return JSON.stringify(content, null, 2);
  });

  eleventyConfig.addFilter('fallbackImageSrc', (imageSource) => imageSource || 'https://via.placeholder.com/150x100.png');
  eleventyConfig.addFilter('statusBadgeColor', (status) => {
    switch (status) {
      case 'Draft':
        return 'blue';
      case 'Published':
        return 'green';
      default:
        return 'gray';
    }
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: '_templates',
      data: '_data',
    }
  };
};
