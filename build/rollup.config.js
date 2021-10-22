// rollup.config.js
import fs from "fs";
import path from "path";
import vue from "rollup-plugin-vue";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import minimist from "minimist";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs
  .readFileSync("./.browserslistrc")
  .toString()
  .split("\n")
  .filter(entry => entry && entry.substring(0, 2) !== "ie");

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, "..");

const baseConfig = {
  input: "src/entry.js",
  plugins: {
    preVue: [
      alias({
        resolve: [".js", ".jsx", ".ts", ".tsx", ".vue"],
        entries: {
          "@": path.resolve(projectRoot, "src")
        }
      })
    ],
    replace: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.ES_BUILD": JSON.stringify("false")
    },
    vue: {
      css: true,
      template: {
        isProduction: true
      }
    },
    babel: {
      exclude: "node_modules/**",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"]
    }
  }
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  'vuex',
  'gsap',
  'VueCookies'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  vuex: 'vuex',
  gsap: 'gsap',
  VueCookies: 'vue-cookies'
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === "es") {
  const esConfig = {
    ...baseConfig,
    external,
    output: {
      file: "dist/shop-base-components.esm.js",
      inlineDynamicImports: true,
      format: "esm",
      exports: "named"
    },
    plugins: [
      replace({
        ...baseConfig.plugins.replace,
        "process.env.ES_BUILD": JSON.stringify("true")
      }),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: esbrowserslist
            }
          ]
        ]
      }),
      resolve({ preferBuiltins: true, browser: true }),
      commonjs(),
      json()
    ]
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === "cjs") {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      inlineDynamicImports: true,
      file: "dist/shop-base-components.ssr.js",
      format: "cjs",
      name: "ShopBaseComponents",
      exports: "named",
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true
        }
      }),
      babel(baseConfig.plugins.babel),
      resolve({ preferBuiltins: true, browser: true }),
      commonjs(),
      json()
    ]
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === "iife") {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: "dist/shop-base-components.min.js",
      format: "iife",
      name: "ShopBaseComponents",
      inlineDynamicImports: true,
      exports: "named",
      globals
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      babel(baseConfig.plugins.babel),
      resolve({ preferBuiltins: true, browser: true }),
      commonjs(),
      json(),
      terser({
        output: {
          ecma: 5
        }
      })
    ]
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
