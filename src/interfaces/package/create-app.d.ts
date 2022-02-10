import {RouteRecordRaw} from 'vue-router';
import {Store} from 'vuex';

declare global {
  interface CreateAppOptions {
    initStylesheet?: boolean;
    initScripts?: boolean;
    initBaiduTongji?: boolean;
    initUmeng?: boolean;
    loadStore?: boolean;
    loadRouter?: boolean;
    loadElementPlus?: boolean;
    loadCrawlabUI?: boolean;
    loadI18n?: boolean;
    loadFontAwesome?: boolean;
    loadTrack?: boolean;
    store?: Store;
    routes?: Array<RouteRecordRaw>;
    mount?: boolean | string;
  }
}
