
export function helloByTime(t) {
  const hour = new Date().getHours();
  if (hour < 6) return t('messages.earlist_morning');
  else if (hour < 9) return t('messages.early_morning');
  else if (hour < 12) return t('messages.morning');
  else if (hour < 14) return t('messages.noon');
  else if (hour < 17) return t('messages.after_noon');
  else if (hour < 19) return t('messages.early_evening');
  else if (hour < 22) return t('messages.evening');
  return t('messages.night');
}
