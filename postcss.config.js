const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = (ctx) => ({
  plugins: [
    autoprefixer(),
    ...(ctx.env === "production"
      ? [cssnano({ preset: ["default", { discardComments: { removeAll: true } }] })]
      : []),
  ],
});
