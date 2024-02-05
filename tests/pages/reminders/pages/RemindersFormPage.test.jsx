import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RemindersFormPage } from '../../../../src/pages/reminders/pages/RemindersFormPage';
import { createReminder, updateReminder } from '../../../../src/api/reminders';
import { Provider } from 'react-redux';
import { store } from '../../../../store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key })
}));

jest.mock('../../../../src/api/reminders', () => ({
  getReminderById: jest.fn().mockResolvedValue({
    id: 1,
    chatId: 'chat_1',
    message: 'Test message',
    typeScheduleId: 1,
    schedules: {
      "monday": "10:10",
      "tuesday": "10:10",
      "wednesday": "10:10",
      "thursday": "10:10",
      "friday": "10:10",
      "saturday": "10:10",
      "sunday": "10:10"
     }
  }),
  createReminder: jest.fn().mockResolvedValue(),
  updateReminder: jest.fn().mockResolvedValue()
}));

jest.mock('../../../../src/api/chat', () => ({
  getAllChats: jest.fn().mockResolvedValue([{ id: '1', name: 'Chat 1' }, { id: '2', name: 'Chat 2' }])
}));

describe('RemindersFormPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('submits the form with valid data', async () => {
    await act(async () => {
      render(
        <Provider store={ store }>
          <MemoryRouter initialEntries={['/reminders/new']}>
            <RemindersFormPage />
          </MemoryRouter>
        </Provider>
      );
    });

    await act(async () => {

      fireEvent.change(screen.getByTestId('chatId'), { target: { value: '1' } });
      fireEvent.change(screen.getByTestId('message'), { target: { value: 'test' } });
      fireEvent.change(screen.getByTestId('typeScheduleId'), { target: { value: '1' } });

      fireEvent.submit(screen.getByText('reminder_form_page.submit'));

      expect(createReminder).toHaveBeenCalledWith({
        chatId: '1',
        id: null,
        message: 'test',
        availableChats: [
          {
            "id": "1",
            "name": "Chat 1",
          },
          {
            "id": "2",
            "name": "Chat 2",
          },
        ],
        schedules: {
          "monday": "00:00",
          "tuesday": "00:00",
          "wednesday": "00:00",
          "thursday": "00:00",
          "friday": "00:00",
          "saturday": "00:00",
          "sunday": "00:00"
         },
        typeScheduleId: "1"
      });
    });
  });
});
