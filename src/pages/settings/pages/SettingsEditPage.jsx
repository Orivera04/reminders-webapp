import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SettingForm } from '../components';
import { successAlert, errorAlert, SETTING_DEFAULT_FIELDS } from '../../../helper';
import { getSetting, updateSetting } from '../../../api';

export const SettingsEditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [setting, setSetting] = useState(SETTING_DEFAULT_FIELDS);

  useEffect(() => {
    getSetting(id).then((data) => {
      setSetting(data);
    });
  }, [id])

  const onUpdateSetting = (settingData) => {
    updateSetting(id, settingData)
      .then((data) => {
        successAlert(data.message)
          .then(() => navigate('/settings'));
      })
      .catch((error) => errorAlert(error.message));
  }

  return (
    <SettingForm type={'update'} onSave={ onUpdateSetting } setting={ setting } />
  )
}
