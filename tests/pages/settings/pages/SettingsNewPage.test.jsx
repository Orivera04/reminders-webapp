import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createSetting } from '../../../../src/api/settings';
import { SettingsNewPage } from '../../../../src/pages/settings/pages/SettingsNewPage'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}));

jest.mock('../../../../store/store', () => ({
  useDispatch: () => jest.fn()
}));

jest.mock('../../../../src/api/settings');

describe('SettingsNewPage', () => {
  beforeEach(() => {
    createSetting.mockResolvedValue(jest.fn());
  });

  it('submits the form with invalid data', async () => {
    render(
      <MemoryRouter initialEntries={['/settings/new']}>
        <SettingsNewPage />
      </MemoryRouter>
    );

    await screen.findByText('setting_form_page.create_setting');

    await act( async() => {
      fireEvent.change(screen.getByTestId('token'), { target: { name: 'token_bot_api', value: '' } });
      fireEvent.change(screen.getByTestId('formatting_style'), { target: { name: 'formatting_style', value: '' } });
      fireEvent.change(screen.getByTestId('description'), { target: { name: 'description', value: '' } });

      fireEvent.submit(screen.getByText('setting_form_page.create', { name: 'submit' }));
    });

    expect(createSetting).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter initialEntries={['/settings/new']}>
        <SettingsNewPage />
      </MemoryRouter>
    );

    await screen.findByText('setting_form_page.create_setting');

    await act( async() => {
      fireEvent.change(screen.getByTestId('token'), { target: { name: 'token_bot_api', value: 'token' } });
      fireEvent.change(screen.getByTestId('formatting_style'), { target: { name: 'formatting_style_id', value: '1' } });
      fireEvent.change(screen.getByTestId('description'), { target: { name: 'description', value: 'the description' } });

      fireEvent.submit(screen.getByText('setting_form_page.create', { name: 'submit' }));

      await expect(createSetting).toHaveBeenCalledWith({
        "description": "the description",
        "formatting_style_id": "1",
        "token_bot_api": "token",
      });
    });
  });
});
