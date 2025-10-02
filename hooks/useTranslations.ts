
import { useLanguage } from '../i18n/LanguageContext';

export const useTranslations = () => {
  const { t } = useLanguage();
  return t;
};
