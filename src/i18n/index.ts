import {createI18n} from 'vue-i18n';
import en from './lang/en';
import zh from './lang/zh';

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('lang') || 'en',
  messages: {
    en,
    zh
  },
  fallbackLocale: 'en',
  missingWarn: process.env.NODE_ENV === 'development',
  fallbackWarn: process.env.NODE_ENV === 'development',
});

export default i18n;
