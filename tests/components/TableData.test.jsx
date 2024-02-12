import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { TableData } from '../../src/components';

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

describe('TableData', () => {
  const settings = [
    {
      id: 1,
      token_bot_api: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
      formatting_style_id: 'html',
      description: 'the description one'
    },
    {
      id: 2,
      token_bot_api: 'tbJhbGciOiJSUzI1NiIsInR5cCI6IkpXVff1',
      formatting_style_id: 'markdown',
      description: 'the description two'
    }
  ];
  const onDelete = jest.fn();
  const onUpdate = jest.fn();

  beforeEach(async () => {
    localStorage.setItem('language', 'en');

    await act(async () => {
      render(
        <TableData translation_block={ 'setting_index_page' } data={ settings } onDelete={ onDelete } onUpdate={ onUpdate }/>
      );
    });

    await screen.findByTestId('table-index');
  });

  it('render the table correctly', () => {
    expect(screen.getByText('setting_index_page.id')).toBeTruthy();
    expect(screen.getByText('setting_index_page.token_bot_api')).toBeTruthy();
    expect(screen.getByText('setting_index_page.formatting_style_id')).toBeTruthy();
    expect(screen.getByText('setting_index_page.description')).toBeTruthy();

    expect(screen.getByText(settings[0].id)).toBeTruthy();
    expect(screen.getByText(settings[0].token_bot_api)).toBeTruthy();
    expect(screen.getByText(settings[0].formatting_style_id)).toBeTruthy();
    expect(screen.getByText(settings[0].description)).toBeTruthy();

    expect(screen.getByText(settings[1].id)).toBeTruthy();
    expect(screen.getByText(settings[1].token_bot_api)).toBeTruthy();
    expect(screen.getByText(settings[1].formatting_style_id)).toBeTruthy();
    expect(screen.getByText(settings[1].description)).toBeTruthy();
  })

  it('should call onDelete and onUpdate buttons', async () => {
    const deleteButton = (await screen.findAllByTestId('update-button'))[0];
    const updateButton = (await screen.findAllByTestId('delete-button'))[0];

    fireEvent.click(deleteButton);
    fireEvent.click(updateButton);

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledTimes(1);
  })
})
