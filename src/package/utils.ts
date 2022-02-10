import {ComponentOptionsMixin} from 'vue';

export const mapElements = (elements: any) => {
  return Object.keys(elements).map((name) => [name, elements[name]] as [string, ComponentOptionsMixin]);
};

export const importStylesheets = () => {
  require('normalize.css/normalize.css');
  require('font-awesome/css/font-awesome.min.css');
  require('element-plus/theme-chalk/index.css');
  require('codemirror/lib/codemirror.css');
  require('@/styles/index.scss');
};

export const importScripts = () => {
  // require('@/../../public/js/vue3-sfc-loader.js');
};

export const initWindowGlobals = () => {
  // window.CodeMirror = CodeMirror;
};
