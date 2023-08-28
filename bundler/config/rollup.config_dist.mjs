import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "../dev/jos.js",
  output: {
    file: "../bundler/export/jos.js",
    format: "umd",
    name: "JOS",
    // sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
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
