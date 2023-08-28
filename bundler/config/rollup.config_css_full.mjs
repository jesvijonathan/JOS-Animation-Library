import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss"; // css

export default {
  input: "../dev/jos.css", // Path to your input CSS file
  output: {
    file: "../bundler/export/jos.full.css", // Output path for the minified and optimized CSS file
    //sourcemap: true,
  },
  plugins: [
    postcss({
      extract: true, // Extract CSS into a separate file
      minimize: true,
      autoModules: true,
      minimize: {
        preset: [
          "default",
          {
            discardComments: { removeAll: true },
          },
        ],
      },
    }),
    terser(), // Minify the output CSS file
  ],
};
