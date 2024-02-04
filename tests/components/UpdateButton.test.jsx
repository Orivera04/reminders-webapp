import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { UpdateButton } from '../../src/components';

describe('UpdateButton', () => {
  it('should render the button', () => {
    const { getByTestId } = render(<UpdateButton id={1} onUpdate={() => {}} />);
    const button = getByTestId('update-button');

    expect(button).toBeTruthy();
  });

  it('should calls onUpdate callback when clicked', () => {
    const onUpdateMock = jest.fn();
    const { getByTestId } = render(<UpdateButton id={1} onUpdate={onUpdateMock} />);
    const button = getByTestId('update-button');

    fireEvent.click(button);

    expect(onUpdateMock).toHaveBeenCalledWith(1);
  });
});
