import { useParams } from 'react-router-dom'
import { SettingForm } from '../components';
import { useState, useEffect } from 'react';
import { SuccessAlert, ErrorAlert, api } from '../../../helper';

export const SettingsEditPage = () => {

  const { id } = useParams();
  const [setting, setSetting] = useState({});

  useEffect(() => {
    const getSetting = async () => {
      try {
        const response = await api.get(`/settings/${id}`);

        if(response.status === 200) {
          setSetting(response.data)
        } else {
          console.error('Error:', response.error);
        }
      } catch(error) {
        console.error('Error al crear un nuevo registro:', error);
      }
    }
    getSetting();
  }, [id])

  const onUpdateSetting = async (data) => {
    try {
      const response = await api.put(`/settings/${id}`, data);

      if(response.status === 200) {
        SuccessAlert(response.message);
      } else {
        ErrorAlert(response.error);
        console.error('Error:', response.error);
      }
    } catch (error) {
      ErrorAlert(error.message);
      console.error('Error al crear un nuevo registro:', error);
    }
  }

  return (
    <SettingForm type={'update'} onSave={ onUpdateSetting } setting={ setting } />
  )
}
