import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss"; // css

export default {
  input: "../dev/jos.full.js",
  output: {
    file: "../bundler/export/jos.full.min.js",
    format: "umd",
    name: "JOS",
    //sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss(), // css
    terser({
      format: {
        beautify: false,
        comments: false,
      },
      compress: {
        dead_code: true,
        drop_console: true,
      },
      mangle: {
        keep_classnames: true,
      },
      mangle: true,
    }),
  ],
};
