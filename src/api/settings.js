import { api } from "../helper";

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
