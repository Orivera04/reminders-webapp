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
    const languageSaved = localStorage.getItem('language') || 'en';

    i18n.changeLanguage(languageSaved);
    setLanguage(languageSaved);
  }, []);

  return (
    <div className="relative">
      <select onChange={ onChangeLanguage }
              className='appearance-none absolute w-full h-full inset-y-0 bg-transparent bg-none pl-2 z-10'
              value={ language }
              data-testid='language-selector'>
        <option value="en">🇺🇸</option>
        <option value="es">🇪🇸</option>
      </select>

      <input className="block border-0 py-2 w-12" />

      <div className='absolute top-3 right-0 z-0'>
        <svg className="fill-current h-4 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  )
}
