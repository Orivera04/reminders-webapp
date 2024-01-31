import { useTranslation } from "react-i18next";

export const TranslationSwitcher = () => {

  const { i18n } = useTranslation();

  const onChangeLanguage = (e) => {
    const newLanguage = e.target.value;
    i18n.changeLanguage(newLanguage);
  }

  return (
    <div>
      <select onChange={ onChangeLanguage } className='font-sans'>
        <option value="en">🇺🇸</option>
        <option value="es">🇪🇸</option>
      </select>
    </div>
  )
}
