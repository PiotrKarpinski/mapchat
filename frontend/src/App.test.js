import React from 'react';
import { render } from '@testing-library/react';
import AppOld from './AppWrapper';

test('renders learn react link', () => {
  const { getByText } = render(<AppOld />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
