import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';

export default {
  entry: 'index.js',
  dest: 'dist/v-tags.js',
  format: 'umd',
  sourceMap: true,
  useStrict: true,
  moduleName: 'VTags',
  plugins: [
    vue({
      compileTemplate: false
    }),
    buble({
      objectAssign: 'Vue.util.extend'
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
  ]
};
