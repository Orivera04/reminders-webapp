

import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SettingsPage } from '../../../../src/pages/settings/pages/SettingsPage';
import { getAllSettings } from '../../../../src/api/settings';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock('../../../../src/api/settings');

describe('SettingsPage', () => {
  beforeEach(() => {
    const settings = [
      {
        id: 1,
        token_bot_api: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
        formatting_style_id: 1,
        description: 'the description one'
      },
      {
        id: 2,
        token_bot_api: 'tbJhbGciOiJSUzI1NiIsInR5cCI6IkpXVff1',
        formatting_style_id: 2,
        description: 'the description two'
      }
    ];

    getAllSettings.mockResolvedValue(settings);
  });

  it('renders setting page correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SettingsPage />
        </MemoryRouter>
      );
    });

    expect(screen.getByText('setting_index_page.id')).toBeTruthy();
    expect(screen.getByText('setting_index_page.token_bot_api')).toBeTruthy();
    expect(screen.getByText('setting_index_page.formatting_style_id')).toBeTruthy();
    expect(screen.getByText('setting_index_page.description')).toBeTruthy();

    expect(screen.getByText(1)).toBeTruthy();
    expect(screen.getByText('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9')).toBeTruthy();
    expect(screen.getByText('HTML')).toBeTruthy();
    expect(screen.getByText('the description two')).toBeTruthy();

    expect(screen.getByText(2)).toBeTruthy();
    expect(screen.getByText('tbJhbGciOiJSUzI1NiIsInR5cCI6IkpXVff1')).toBeTruthy();
    expect(screen.getByText('Markdown')).toBeTruthy();
    expect(screen.getByText('the description two')).toBeTruthy();
  });
});
