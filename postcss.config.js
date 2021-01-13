module.exports = {
    plugins: [
      require(`tailwindcss`)(`./src/styles/tailwind.config.js`),
      require(`autoprefixer`),
    ],
  };