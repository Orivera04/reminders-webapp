import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChatsPage } from '../../../../src/pages/chats/pages/ChatsPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('ChatsPage', () => {
  it('renders ChatsPage correctly', () => {
    render(
      <MemoryRouter>
        <ChatsPage />
      </MemoryRouter>
    );

    expect(screen.getByText('chat_index_page.chat')).toBeTruthy();
    expect(screen.getByText('chat_index_page.create_new_chat')).toBeTruthy();
  });
});
