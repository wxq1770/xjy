import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';

i18n.use(XHR)
  .init({
    wait: true,
    fallbackLng: 'zh-CN',
    lng: localStorage.getItem('locale') || 'zh-CN',
    lngs: ['en-US', 'zh-CN'],
    preload: ['en-US', 'zh-CN'],
    ns: [''],
    defaultNS: '',
    debug: false,
    backend: {
      loadPath: `/locales/{{lng}}.json?v=${__webpack_hash__ || '1'}`, // eslint-disable-line
    },
    load: 'currentOnly',
  });

export default i18n;
