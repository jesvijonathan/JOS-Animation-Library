import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "../dev/jos.js",
  output: {
    file: "../bundler/export/jos.min.js",
    format: "umd",
    name: "JOS",
    //sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    terser({
      compress: {
        dead_code: true,
        drop_console: true,
      },
      format: {
        //beautify: true,
        comments: false,
      },
      keep_classnames: true,
    }),
  ],
};
