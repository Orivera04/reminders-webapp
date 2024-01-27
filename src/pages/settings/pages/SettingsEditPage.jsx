import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { SettingForm } from '../components';
import { successAlert, errorAlert, SETTING_DEFAULT_FIELDS } from '../../../helper';
import { getSetting, updateSetting } from '../../../api';

export const SettingsEditPage = () => {

  const { id } = useParams();
  const [setting, setSetting] = useState(SETTING_DEFAULT_FIELDS);

  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem('storedSettings'));
    const setting = storedSettings?.find((element) => element.id === parseInt(id));

    if(setting) return setSetting(setting);

    getSetting(id).then((data) => {
      setSetting(data);
    });
  }, [id])

  const onUpdateSetting = (settingData) => {
    updateSetting(id, settingData)
      .then((data) => {
        const storedSettings = JSON.parse(localStorage.getItem('storedSettings'));
        const newData = storedSettings.filter((element) => element.id !== parseInt(id));
        localStorage.setItem('storedSettings', JSON.stringify([...newData, data.record]));
        successAlert(data.message, '/settings')
      })
      .catch((error) => errorAlert(error.message));
  }

  return (
    <SettingForm type={'update'} onSave={ onUpdateSetting } setting={ setting } />
  )
}
