import { SettingForm } from '../components';
import { api } from '../../../api';
import { SuccessAlert, ErrorAlert } from '../../../helper'

export const SettingsNewPage = () => {
  const onCreateSetting = async (data) => {
    try {
      const response = await api.post('/settings', data);
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
  };

  return (
    <SettingForm type={'create'} onSave={ onCreateSetting } />
  )
}
