import {createApp as createVueApp, App as VueApp} from 'vue';
import ElementPlus from 'element-plus';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {installer as CrawlabUI} from '@/package/index';
import App from './App.vue';
import {createStore} from '@/store';
import i18n from '@/i18n';
import {initBaiduTonji} from '@/admin/baidu';
import {importScripts, importStylesheets, initWindowGlobals} from '@/package/utils';
import {createRouter} from '@/router';
import {initPlugins} from '@/utils/plugin';
import {initRequest} from '@/services/request';
import {initUmeng} from '@/admin/umeng';
import {setGlobalLang} from '@/utils/i18n';
import track from '@/directives/track/track';

export const getDefaultCreateAppOptions = (): CreateAppOptions => {
  return {
    initStylesheet: true,
    initScripts: true,
    initBaiduTongji: true,
    initUmeng: true,
    loadStore: true,
    loadRouter: true,
    loadElementPlus: true,
    loadCrawlabUI: true,
    loadI18n: true,
    loadFontAwesome: true,
    loadTrack: true,
    mount: true,
  };
};

const createApp = async (options?: CreateAppOptions): Promise<VueApp> => {
  options = {
    ...getDefaultCreateAppOptions(),
    ...options,
  };

  // import stylesheets
  if (options.initStylesheet) importStylesheets();

  // import scripts
  if (options.initScripts) importScripts();

  // baidu tongji
  if (options.initBaiduTongji) initBaiduTonji();

  // umeng
  if (options.initUmeng) initUmeng();

  // remove loading placeholder
  document.querySelector('#loading-placeholder')?.remove();

  // store
  const store = options.store || createStore();

  // router
  const router = createRouter(options.routes);

  // window globals
  initWindowGlobals();

  // app
  const app = createVueApp(App);

  // initialize plugins
  try {
    await initPlugins(router, store);
  } catch (e) {
    console.warn(e);
  }

  // initialize request
  initRequest(router);

  // load modules
  if (options.loadStore) app.use(store);
  if (options.loadRouter) app.use(router);
  if (options.loadElementPlus) app.use(ElementPlus);
  if (options.loadCrawlabUI) app.use(CrawlabUI);
  if (options.loadI18n) {
    app.use(i18n);
    setGlobalLang(window.localStorage.getItem('lang') as Lang || 'en');
  }
  if (options.loadFontAwesome) app.component('font-awesome-icon', FontAwesomeIcon);
  if (options.loadTrack) app.directive('track', track);

  // mount
  if (options.mount) app.mount(typeof options.mount === 'string' ? options.mount : '#app');

  return app;
};

export default createApp;
