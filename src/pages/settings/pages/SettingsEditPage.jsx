import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { onCloseLoader, onOpenLoader } from '../../../../store';
import { SettingForm } from '../components';
import { successAlert, errorAlert, SETTING_DEFAULT_FIELDS } from '../../../helper';
import { getSetting, updateSetting } from '../../../api';

export const SettingsEditPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setting, setSetting] = useState(SETTING_DEFAULT_FIELDS);

  useEffect(() => {
    dispatch(onOpenLoader());

    getSetting(id).then((data) => {
      setSetting(data);

      dispatch(onCloseLoader());
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
