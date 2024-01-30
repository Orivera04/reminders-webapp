import { api } from "../helper";

export const getAllSettings = async () => {
  try {
    const { data } = await api.get('/settings');

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const getSetting = async (id) => {
  try {
    const { data } = await api.get(`/settings/${id}`);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const createSetting = async (settingData) => {
  try {
    const { data } = await api.post('/settings', settingData);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const updateSetting = async (id, settingData) => {
  try {
    const { data } = await api.put(`/settings/${id}`, settingData);

    return data;
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const deleteSetting = async (id) => {
  try {
    const { data } = await api.delete(`/settings/${id}`);

    return data.message
  } catch(error) {
    throw new Error('Error: ' + error.message);
  }
}

export const getSettings = async () => {
  try {
    const response = await api.get('/settings');
    const { data: settingsList } = response;

    return settingsList.map(setting => ({
      id: setting.id,
      description: setting.description,
    }));

  } catch (error) {
    throw new Error('Error fetching settings: ' + error.message);
  }
}
