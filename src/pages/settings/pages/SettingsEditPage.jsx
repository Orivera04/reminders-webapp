import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { onCloseLoader, onOpenLoader } from '../../../../store';
import { SettingForm } from '../components';
import { getSetting, updateSetting } from '../../../api';
import { successAlert, errorAlert, SETTING_DEFAULT_FIELDS } from '../../../helper';

export const SettingsEditPage = () => {
  const { t } = useTranslation();
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
      .then(() => {
        successAlert(t('setting_form_page.setting_updated_successfully'))
          .then(() => navigate('/settings'));
      })
      .catch((error) => errorAlert(error.message));
  }

  return (
    <SettingForm type={'update'} onSave={ onUpdateSetting } setting={ setting } />
  )
}
