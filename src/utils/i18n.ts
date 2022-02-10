import i18n from '@/i18n';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import zh from 'javascript-time-ago/locale/zh';
import {updateTitle} from '@/utils/dom';
import {LOCAL_STORAGE_KEY_LANG} from "@/constants/localStorage";

export const translate = (path: string): string => {
  const {tm} = i18n.global;
  const res = tm(path);
  if (typeof res === 'string') return res;
  return path;
};
window._t = translate;

export const translatePlugin = (pluginName: string, path: string): string => {
  return translate(`plugins.${pluginName}.${path}`);
};
window._tp = translatePlugin;

export const setGlobalLang = (lang: Lang) => {
  localStorage.setItem(LOCAL_STORAGE_KEY_LANG, lang);
  i18n.global.locale.value = lang;
  TimeAgo.locale(lang === 'zh' ? zh : en);
  updateTitle(translate('global.title'));
};

export const getLanguage = (): string => {
  return i18n.global.locale.value === 'zh' ? 'zh_CN' : 'en';
};
