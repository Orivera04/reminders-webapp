import { useNavigate } from 'react-router-dom';
import { SettingForm } from '../components';
import { successAlert, errorAlert } from '../../../helper'
import { createSetting } from '../../../api';

export const SettingsNewPage = () => {
  const navigate = useNavigate();

  const onCreateSetting = async (settingData) => {
    createSetting(settingData)
      .then((data) => {
        successAlert(data.message)
          .then(() => navigate('/settings'));
      })
      .catch((error) => errorAlert(error.message));
  };

  return (
    <SettingForm type={'create'} onSave={ onCreateSetting } />
  )
}
