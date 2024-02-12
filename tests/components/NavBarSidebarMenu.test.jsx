import React from 'react';
import { MemoryRouter } from "react-router-dom";
import { render, screen, act, fireEvent } from '@testing-library/react';
import { NavBarSidebarMenu } from '../../src/components';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: jest.fn(),
    },
    t: (key) => {
      return key;
    }
  }),
}));

describe('NavBarSidebarMenu', () => {
  beforeEach(() => {
    localStorage.setItem('language', 'en');
  });

  it('render the correct element', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <NavBarSidebarMenu />
        </MemoryRouter>
      );
    });

    fireEvent.click(await screen.findByTestId('hamburger-button'));

    expect(screen.getByAltText('Reminders Logo'))
      .toHaveProperty('src', 'http://localhost/assets/reminder-logo.svg')

    expect(screen.getByText('navbar.reminders'))
      .toHaveProperty('href', 'http://localhost/reminders')

    expect(screen.getByText('navbar.chats'))
      .toHaveProperty('href', 'http://localhost/chats')

    expect(screen.getByText('navbar.bot'))
      .toHaveProperty('href', 'http://localhost/settings');
  })
})
