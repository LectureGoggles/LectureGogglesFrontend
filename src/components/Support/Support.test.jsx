import React from 'react';
import { cleanup, render } from 'react-testing-library';
import SupportPage from './Support';

afterEach(cleanup);

it('Renders a hamburger menu when the window is smaller than 768px', () => {
  global.innerWidth = 767;
  const { queryByTestId } = render(<SupportPage />);
  expect(queryByTestId('hamburger-button')).not.toBeNull();
});

it('Renders a hamburger menu when the window is >= 768px', () => {
  global.innerWidth = 768;
  const { queryByTestId } = render(<SupportPage />);
  expect(queryByTestId('hamburger-button')).toBeNull();
});
