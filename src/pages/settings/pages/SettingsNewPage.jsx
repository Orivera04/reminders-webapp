import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { SettingForm } from '../components';
import { createSetting } from '../../../api';
import { successAlert, errorAlert } from '../../../helper'

export const SettingsNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onCreateSetting = async (settingData) => {
    createSetting(settingData)
      .then(() => {
        successAlert(t('setting_form_page.setting_created_successfully'))
          .then(() => navigate('/settings'));
      })
      .catch((error) => errorAlert(error.message));
  };

  return (
    <SettingForm type={'create'} onSave={ onCreateSetting } />
  )
}
