import { render, fireEvent } from '@testing-library/react';
import { TranslationSwitcher } from '../../src/components';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

describe('TranslationSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('language', 'en');
  });

  it('renders with default language', () => {
    const { getByTestId } = render(<TranslationSwitcher />);
    const selectElement = getByTestId('language-selector');

    expect(selectElement).toBeTruthy();
    expect(selectElement.value).toBe('en');
  });

  it('changes language when select value changes', () => {
    const { getByTestId } = render(<TranslationSwitcher />);
    const selectElement = getByTestId('language-selector');

    fireEvent.change(selectElement, { target: { value: 'es' } });

    expect(localStorage.getItem('language')).toBe('es');
    expect(selectElement.value).toBe('es');
  });
});
