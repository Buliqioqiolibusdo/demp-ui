import {LocaleMessageDictionary} from '@intlify/core-base';
import {VueMessageType} from 'vue-i18n';

declare global {
  interface L extends LocaleMessageDictionary<VueMessageType> {
    global: LGlobal;
    common: LCommon;
    layouts: LLayouts;
    router: LRouter;
    components: LComponents;
    views: LViews;
  }
}
