import {App} from 'vue';

declare global {
  interface Window {
    VUE_APP_API_BASE_URL?: string;
    initCanvas?: () => void;
    resetCanvas?: () => void;
    _hmt?: Array;
    'vue3-sfc-loader'?: { loadModule };
    aplus_queue: { action: string, arguments: any[] }[];
    _app?: App;
    _t?: (path: string) => string;
    _tp?: (pluginName: string, path: string) => string;
  }
}
