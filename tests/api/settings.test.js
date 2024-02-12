import { getAllSettings, getSetting, createSetting, updateSetting, deleteSetting, getSettings } from '../../src/api/settings';
import { api } from '../../src/helper/api';

jest.mock('../../src/helper/api');

describe('settings', () => {
  jest.clearAllMocks();

  const setting = {
    id: 1,
    token_bot_api: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    formatting_style_id: 1,
    description: 'the description'
  };

  it('should get all settings', async () => {
    const settings = [
      {
        id: 1,
        token_bot_api: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
        formatting_style_id: 1,
        description: 'the description'
      },
      {
        id: 2,
        token_bot_api: 'tbJhbGciOiJSUzI1NiIsInR5cCI6IkpXVff1',
        formatting_style_id: 2,
        description: 'the description'
      }
    ];

    api.get.mockResolvedValue({ data: settings });
    const settingData = await getAllSettings();

    expect(settings).toEqual(settingData);
  })

  it('should get setting', async () => {
    api.get.mockResolvedValue({ data: setting });
    const settingData = await getSetting(setting.id);

    expect(setting).toEqual(settingData);
  })

  it('should setting not found', async () => {
    api.get.mockRejectedValue(new Error('Setting not found.'));

    try {
      await getSetting(1);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Setting not found.'));
    }
  })

  it('should create setting', async () => {
    api.post.mockResolvedValue({data: { message: 'Setting created successfully.', record: setting }});
    const responseData = await createSetting(setting);

    expect(responseData).toEqual({ message: 'Setting created successfully.', record: setting });
  })

  it('should not create setting', async () => {
    api.post.mockRejectedValue(new Error('Error creating Setting.'));

    try {
      await createSetting(setting);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Error creating Setting.'));
    }
  })

  it('should update setting', async () => {
    api.put.mockResolvedValue({data: { message: 'Setting updated successfully.', record: setting }});
    const responseData = await updateSetting(setting.id, setting);

    expect(responseData).toEqual({ message: 'Setting updated successfully.', record: setting });
  })

  it('should not update setting', async () => {
    api.put.mockRejectedValue(new Error('Error updating Setting.'));

    try {
      await updateSetting(setting.id, setting);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Error updating Setting.'));
    }
  })

  it('should delete setting', async () => {
    api.delete.mockResolvedValue({data: { message: 'Setting deleted successfully.' }});

    const message = await deleteSetting(1);

    expect(message).toEqual('Setting deleted successfully.');
  })

  it('should not delete setting', async () => {
    api.delete.mockRejectedValue(new Error('Error deleting Setting.'));

    try {
      await deleteSetting(1);
    } catch (error) {
      expect(error).toEqual(new Error('Error: Error deleting Setting.'));
    }
  })

  it('should get settings', async () => {
    const settings = [
      {
        id: 1,
        description: 'the description'
      },
      {
        id: 2,
        description: 'the description'
      }
    ];

    api.get.mockResolvedValue({ data: settings });
    const settingData = await getSettings();

    expect(settings).toEqual(settingData);
  })
})
