import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../../src/components';

describe('Button', () => {
  it('render the correct element', () => {
    const { getByText } = render(<Button title={'click me'} handleClick={ () => {} }/>);
    const buttonElement = getByText('click me');

    expect(buttonElement).toBeTruthy();
  })

  it('should call handleClick', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button title={'click me'} handleClick={ handleClick }/>);
    const buttonElement = getByText('click me');

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  })
})
