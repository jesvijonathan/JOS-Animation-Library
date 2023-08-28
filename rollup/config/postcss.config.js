module.exports = {
  plugins: [
    require("autoprefixer"), // Add any necessary PostCSS plugins
    require("cssnano")(), // Minify and compress the CSS
  ],
};
