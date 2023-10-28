import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";

// jos.js
// compresed   | *
// full css    | ~  (only required css classes)
// console log |

export default {
  input: "../bundler/original/jos.min.js",
  output: {
    file: "../bundler/original/jos.min.js",
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
        beautify: false,
        comments: false,
      },
      compress: {
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        keep_classnames: true,
      },
    }),
  ],
};
