import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DeleteButton } from '../../src/components';

describe('DeleteButton', () => {
  it('should render the button', () => {
    const { getByTestId } = render(<DeleteButton id={1} onDelete={() => {}} />);
    const button = getByTestId('delete-button');

    expect(button).toBeTruthy();
  });

  it('should calls onDelete callback when clicked', () => {
    const onDeleteMock = jest.fn();
    const { getByTestId } = render(<DeleteButton id={1} onDelete={onDeleteMock} />);
    const button = getByTestId('delete-button');

    fireEvent.click(button);

    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });
});