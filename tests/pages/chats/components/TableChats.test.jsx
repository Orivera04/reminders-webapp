import { render, screen, fireEvent } from '@testing-library/react';
import { TableChats } from '../../../../src/pages/chats/components/TableChats';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('../../../../src/api/chat.js', () => ({
  getAllChats: jest.fn(() => Promise.resolve([{ id: 1, name: 'Chat 1', description: 'Description 1', chat_id: 'chat_1' }])),
  deleteChat: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('TableChats', () => {
  it('renders table with chat data', async () => {
    render(<TableChats />);

    await screen.findByTestId('chat-table');

    expect(screen.getByText('chat_index_page.id')).toBeTruthy();
    expect(screen.getByText('chat_index_page.name')).toBeTruthy();
    expect(screen.getByText('chat_index_page.description')).toBeTruthy();
    expect(screen.getByText('chat_index_page.chat_id')).toBeTruthy();
    expect(screen.getByText('chat_index_page.actions')).toBeTruthy();

    expect(screen.getByText('Chat 1')).toBeTruthy();
    expect(screen.getByText('Description 1')).toBeTruthy();
    expect(screen.getByText('chat_1')).toBeTruthy();
  });

  it('navigates to edit page when edit button is clicked', async () => {
    const navigateMock = jest.fn();

    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigateMock);

    render(<TableChats />);

    await screen.findByTestId('chat-table');

    fireEvent.click(screen.getByTestId('update-button'));

    expect(navigateMock).toHaveBeenCalledWith('/chats/edit/1');
  });

});
