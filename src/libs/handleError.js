import { message } from 'antd';
import i18n from '../i18n';

export default function handleError(error) {
  const reason = error.reason || error;
  console.error(reason);
  message.destroy();
  if (reason instanceof Error) {
    return message.error(i18n.t(`errors.script_error`, { msg: reason.message }), 3);
  }
  if (typeof reason === 'object') {
    if (reason.body) {
      const { body: { error: { message: msg }}} = reason;
      if (msg) return message.error(msg, 3);
      return message.error(i18n.t('errors.unknown_error'));
    }
    if (reason.status === 401) {
      return message.error(i18n.t('errors.unauthorized'), 1.5, () =>
        window.location.replace('/#/login'));
    }
    if (reason.status === 403) {
      return message.error(i18n.t('errors.403'));
    }
    if (reason.status === 404) {
      return message.error(i18n.t('errors.404'), .5, () =>
        window.location.replace('/#/404'));
    }
    return message.error(reason.error.message, 3);
  }
  if (typeof reason === 'string') {
    return message.error(reason, 3);
  }
}
