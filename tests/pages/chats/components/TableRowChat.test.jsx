import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableRowChat } from '../../../../src/pages/chats/components/TableRowChat';

describe('TableRowChat', () => {
  const mockId = 1;
  const mockName = 'Chat 1';
  const mockDescription = 'Description 1';
  const mockChatId = 'chat_1';
  const mockHandleDelete = jest.fn();
  const mockHandleUpdate = jest.fn();

  it('renders row with chat data', () => {
    render(
      <table>
        <tbody>
          <TableRowChat
            id={mockId}
            name={mockName}
            description={mockDescription}
            chatId={mockChatId}
            handleDelete={mockHandleDelete}
            handleUpdate={mockHandleUpdate}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText(mockId)).toBeTruthy();
    expect(screen.getByText(mockName)).toBeTruthy();
    expect(screen.getByText(mockDescription)).toBeTruthy();
    expect(screen.getByText(mockChatId)).toBeTruthy();
  });

  it('calls handleDelete when delete button is clicked', () => {
    render(
      <table>
        <tbody>
          <TableRowChat
            id={mockId}
            name={mockName}
            description={mockDescription}
            chatId={mockChatId}
            handleDelete={mockHandleDelete}
            handleUpdate={mockHandleUpdate}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByTestId('delete-button'));

    expect(mockHandleDelete).toHaveBeenCalledWith(mockId);
  });

  it('calls handleUpdate when update button is clicked', () => {
    render(
      <table>
        <tbody>
          <TableRowChat
            id={mockId}
            name={mockName}
            description={mockDescription}
            chatId={mockChatId}
            handleDelete={mockHandleDelete}
            handleUpdate={mockHandleUpdate}
          />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByTestId('update-button'));

    expect(mockHandleUpdate).toHaveBeenCalledWith(mockId);
  });
});
