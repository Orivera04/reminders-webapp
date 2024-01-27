import { SettingForm } from '../components';
import { successAlert, errorAlert } from '../../../helper'
import { createSetting } from '../../../api';

export const SettingsNewPage = () => {
  const onCreateSetting = async (settingData) => {
    createSetting(settingData)
      .then((data) => {
        const storedSettings = JSON.parse(localStorage.getItem('storedSettings'));
        localStorage.setItem('storedSettings', JSON.stringify([...storedSettings, data.record]));
        successAlert(data.message, '/settings')
      })
      .catch((error) => errorAlert(error.message));
  };

  return (
    <SettingForm type={'create'} onSave={ onCreateSetting } />
  )
}
