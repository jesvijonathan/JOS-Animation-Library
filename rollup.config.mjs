import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";

const banner = `/*!
 * JOS Animation Library v1.0.0
 * https://jos-animation.vercel.app
 * (c) ${new Date().getFullYear()} Jesvi Jonathan
 * Released under the MIT License
 */`;

const terserOpts = {
  format: { comments: false },
  compress: { dead_code: true, drop_debugger: true },
  mangle: { keep_classnames: true, reserved: ["JOS"] },
};

const terserMinOpts = {
  ...terserOpts,
  compress: { ...terserOpts.compress, drop_console: true },
};

export default [
  // UMD (full, unminified) — for <script> tags
  {
    input: "src/index.js",
    output: {
      file: "dist/jos.js",
      format: "umd",
      name: "JOS",
      exports: "default",
      banner,
    },
    plugins: [resolve(), commonjs()],
  },

  // UMD (minified) — production <script> tag
  {
    input: "src/index.js",
    output: {
      file: "dist/jos.min.js",
      format: "umd",
      name: "JOS",
      exports: "default",
      banner,
      sourcemap: true,
    },
    plugins: [resolve(), commonjs(), terser(terserMinOpts)],
  },

  // ESM — for `import JOS from 'jos-animation'`
  {
    input: "src/index.js",
    output: {
      file: "dist/jos.esm.js",
      format: "es",
      banner,
    },
    plugins: [resolve(), commonjs()],
  },

  // CJS — for `const JOS = require('jos-animation')`
  {
    input: "src/index.js",
    output: {
      file: "dist/jos.cjs.js",
      format: "cjs",
      exports: "default",
      banner,
    },
    plugins: [resolve(), commonjs()],
  },

  // Full bundle (JS + embedded CSS) — UMD
  {
    input: "src/index.full.js",
    output: {
      file: "dist/jos.full.js",
      format: "umd",
      name: "JOS",
      exports: "default",
      banner,
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({ extract: false, minimize: false }),
    ],
  },

  // Full bundle (JS + embedded CSS) — minified UMD
  {
    input: "src/index.full.js",
    output: {
      file: "dist/jos.full.min.js",
      format: "umd",
      name: "JOS",
      exports: "default",
      banner,
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      postcss({ extract: false, minimize: true }),
      terser(terserMinOpts),
    ],
  },

  // Debug build (unminified, with console logs)
  {
    input: "src/index.js",
    output: {
      file: "dist/jos.debug.js",
      format: "umd",
      name: "JOS",
      exports: "default",
      banner,
      sourcemap: true,
    },
    plugins: [resolve(), commonjs()],
  },
];
