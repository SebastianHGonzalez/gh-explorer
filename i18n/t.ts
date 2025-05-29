import { getLocales } from 'expo-localization';

export const DEFAULT_LANGUAGE = 'en';

export const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  en: () => require('../assets/locales/en/translations.json'),
  es: () => require('../assets/locales/es/translations.json'),
};

function getTranslations(): Record<string, string> {
  const locales = getLocales();
  const currentLocale = locales[0]?.languageCode || DEFAULT_LANGUAGE;
  const translationGetter = (translationGetters as any)[currentLocale] ?? translationGetters[DEFAULT_LANGUAGE];
  return translationGetter();
}

export function t(key: string, params?: Record<string, string>): string {
  const translation = getTranslations()[key];
  if (!translation) {
    console.warn(`Translation for key "${key}" not found.`);
    return key; // Fallback to the key itself if translation is missing
  }
  if (params) {
    return Object.keys(params).reduce((result, paramKey) => {
      return result.replace(`{${paramKey}}`, params[paramKey]);
    }, translation);
  }
  return translation;
}
