import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ChatsFormPage } from '../../../../src/pages/chats/pages/ChatsFormPage';
import { createChat } from '../../../../src/api/chat';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}));

jest.mock('../../../../src/api/settings', () => ({
  getSettings: jest.fn().mockResolvedValue([{ id: 1, description: 'Setting 1' }, { id: 2, description: 'Setting 2' }])
}));

jest.mock('../../../../src/api/chat', () => ({
  getChatById: jest.fn().mockResolvedValue({ id: 1, name: 'Chat 1', description: 'Description 1', setting_id: 1, chat_id: 'chat_1' }),
  createChat: jest.fn().mockResolvedValue(),
  updateChat: jest.fn().mockResolvedValue(),
}));

jest.mock('../../../../store/store', () => ({
  useDispatch: () => jest.fn()
}));

describe('ChatsFormPage', () => {

  it('submits the form with invalid data', async () => {
    render(
      <MemoryRouter initialEntries={['/chats/new']}>
        <ChatsFormPage />
      </MemoryRouter>
    );

    await screen.findByText('chat_form_page.chat');

    await act( async() => {
      fireEvent.change(screen.getByTestId('name'), { target: { name: 'name', value: '' } });
      fireEvent.change(screen.getByTestId('description'), { target: { name: 'description', value: '' } });
      fireEvent.change(screen.getByTestId('chat-id'), { target: { name: 'chatId', value: '' } });
      fireEvent.change(screen.getByTestId('setting-id'), { target: { name: 'settingId', value: '' } });

      fireEvent.submit(screen.getByTestId('submit-button', { name: 'Submit' }));
    });

    expect(createChat).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    render(
      <MemoryRouter initialEntries={['/chats/new']}>
        <ChatsFormPage />
      </MemoryRouter>
    );

    await screen.findByText('chat_form_page.chat');

    await act( async() => {
      fireEvent.change(screen.getByTestId('name'), { target: { name: 'name', value: 'New Chat' } });
      fireEvent.change(screen.getByTestId('description'), { target: { name: 'description', value: 'New Description' } });
      fireEvent.change(screen.getByTestId('chat-id'), { target: { name: 'chatId', value: 'new_chat_id' } });
      fireEvent.change(screen.getByTestId('setting-id'), { target: { name: 'settingId', value: '1' } });
      fireEvent.submit(screen.getByTestId('submit-button', { name: 'Submit' }));

      await expect(createChat).toHaveBeenCalledWith({
        availableSettings: [
          {
            "description": "Setting 1",
            "id": 1,
          },
          {
            "description": "Setting 2",
            "id": 2,
          },
        ],
        id: null,
        name: 'New Chat',
        description: 'New Description',
        settingId: '1',
        chatId: 'new_chat_id'
      });

      expect(window.location.pathname).toBe('/');
    });
  });
});
