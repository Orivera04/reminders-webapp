import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import { getSetting, updateSetting } from '../../../../src/api/settings';
import { SettingsEditPage } from '../../../../src/pages/settings/pages/SettingsEditPage'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}));

jest.mock('../../../../store/store', () => ({
  useDispatch: () => jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

jest.mock('../../../../src/api/settings');

describe('SettingsEditPage', () => {
  beforeEach(() => {
    getSetting.mockResolvedValue({
      id: 1,
      token_bot_api: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
      formatting_style_id: 1,
      description: 'the description'
    });
    updateSetting.mockResolvedValue(jest.fn());
    useParams.mockReturnValue({ id: 1 })
  });

  it('validate data', async () => {
    render(
      <MemoryRouter initialEntries={['/settings/1/edit']}>
        <SettingsEditPage />
      </MemoryRouter>
    );

    await screen.findByText('setting_form_page.update_setting');

    expect(screen.getByTestId('token').value).toBe('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9');
    expect(screen.getByTestId('formatting_style').value).toBe('1');
    expect(screen.getByTestId('description').value).toBe('the description');
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter initialEntries={['/settings/1/edit']}>
        <SettingsEditPage />
      </MemoryRouter>
    );

    await screen.findByText('setting_form_page.update_setting');

    await act( async() => {
      fireEvent.change(screen.getByTestId('token'), { target: { name: 'token_bot_api', value: 'token' } });
      fireEvent.change(screen.getByTestId('formatting_style'), { target: { name: 'formatting_style_id', value: '1' } });
      fireEvent.change(screen.getByTestId('description'), { target: { name: 'description', value: 'the description' } });

      fireEvent.submit(screen.getByText('setting_form_page.update', { name: 'submit' }));

      await expect(updateSetting).toHaveBeenCalledWith(1, {
        "description": "the description",
        "formatting_style_id": "1",
        "id": 1,
        "token_bot_api": "token",
      });
    });
  });
})
