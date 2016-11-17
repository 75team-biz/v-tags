import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';

export default {
  entry: 'index.js',
  dest: 'dist/index.js',
  format: 'umd',
  sourceMap: true,
  useStrict: false,
  moduleName: 'VTags',
  plugins: [
    vue({
      compileTemplate: false
    }),
    buble({
      objectAssign: 'Object.assign'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
  ]
};
