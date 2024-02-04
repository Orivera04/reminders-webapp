import { render, screen, act, waitFor } from '@testing-library/react';
import { AppRouter } from "../../src/router/AppRouter";
import { Provider } from 'react-redux';
import { store } from '../../store';
import { MemoryRouter } from 'react-router-dom';


jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('../../src/api/settings', () => ({
  getAllSettings: jest.fn().mockResolvedValue([])
}));


jest.mock('../../src/api/reminders', () => ({
  getReminders: jest.fn().mockResolvedValue([])
}));


describe('AppRouter', () => {
  it('should render the AppRouter', async() => {

    expect(store.getState().ui.isLoading).toBe(false);

    render(
      <Provider store={ store }>
        <MemoryRouter initialEntries={['/']}>
          <AppRouter />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const loadingComponent = screen.getByTestId('three-dots-loading');

      expect(loadingComponent).toBeTruthy();
      expect(store.getState().ui.isLoading).toBe(true);
    });
  });

  it('should render the AppRouter with the reminders route', async() => {

    await act(async () => {
      render(
        <Provider store={ store }>
          <MemoryRouter initialEntries={['/reminders']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    const table = screen.getByTestId('reminder-table');
    expect(table).toBeTruthy();
  });

  it('should render the AppRouter with the settings route', async() => {

    await act(async () => {
      render(
        <Provider store={ store }>
          <MemoryRouter initialEntries={['/settings']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    const settingsTable = screen.getByTestId('setting-table');
    expect(settingsTable).toBeTruthy();
  });

  it('should render the AppRouter with the chats route', async() => {

    await act(async () => {
      render(
        <Provider store={ store }>
          <MemoryRouter initialEntries={['/chats']}>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    const table = screen.getByTestId('chat-table');
    expect(table).toBeTruthy();
  });
});