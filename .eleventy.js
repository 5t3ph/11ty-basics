module.exports = function (eleventyConfig) {

  eleventyConfig.addWatchTarget("./src/_tmp/style.css");
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy({ "./src/_tmp/style.css": "./css/style.css" });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
