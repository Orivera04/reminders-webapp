import { MemoryRouter } from "react-router-dom";
import NavBar from "../../src/components/NavBar";
import { render } from "@testing-library/react";

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

describe('NavBar', () => {

  beforeEach(() => {
    localStorage.setItem('language', 'en');
  });

  it('should render the NavBar', () => {
    const {getByText, getByAltText } =
      render(
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      );


      const logoElement = getByAltText('Reminders Logo');
      expect(logoElement).toBeTruthy();

      const remindersLink = getByText('navbar.reminders');
      expect(remindersLink).toBeTruthy();
      expect(remindersLink.getAttribute('href')).toBe('/reminders');

      const chatsLink = getByText('navbar.chats');
      expect(chatsLink).toBeTruthy();
      expect(chatsLink.getAttribute('href')).toBe('/chats');

      const settingsLink = getByText('navbar.bot');
      expect(settingsLink).toBeTruthy();
      expect(settingsLink.getAttribute('href')).toBe('/settings');
  });
});
