import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss"; // css

export default {
  input: "../dev/jos.full.js",
  output: {
    file: "../rollup/export/jos.full.js",
    format: "umd",
    name: "JOS",
    //sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss(),
    terser({
      format: {
        beautify: true,
        comments: false,
      },
      compress: {
        dead_code: true,
        // drop_console: true,
      },
      mangle: {
        keep_classnames: true,
      },
    }),
  ],
};
