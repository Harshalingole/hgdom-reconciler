import babel from 'rollup-plugin-babel'
import { terser} from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/hgdom-reconciler.js',
    format: "esm",
    name: 'hgdom-reconciler'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ["@babel/preset-env"]
    }),
    terser()
  ]
}