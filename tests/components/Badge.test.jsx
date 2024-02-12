import React from 'react';
import { render } from '@testing-library/react';
import { Badge } from '../../src/components';

describe('Badge', () => {
  it('render the correct element', () => {
    const { getByText } = render(<Badge content={'html'} color={'green'}/>);
    const badgeElement = getByText('html');

    expect(badgeElement).toBeTruthy();
    expect(badgeElement).toHaveProperty('className',
      '\n' +
      '    block py-1 text-center rounded-full bg-green-200\n' +
      '    text-sm font-semibold text-green-900 capitalize\n' +
      '    w-24\n' +
      '  '
    );
  })
})
