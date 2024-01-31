import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useState } from "react";

export const TranslationSwitcher = () => {

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const onChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);

    localStorage.setItem('language', newLanguage);
    setLanguage(newLanguage);
  }

  useEffect(() => {
    const languageSaved = localStorage.getItem('language');

    i18n.changeLanguage(languageSaved);
    setLanguage(languageSaved);
  }, [])

  return (
    <div>
      <select onChange={ onChangeLanguage } className='font-sans' value={ language }>
        <option value="en">🇺🇸</option>
        <option value="es">🇪🇸</option>
      </select>
    </div>
  )
}
