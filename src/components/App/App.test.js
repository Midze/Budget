import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../data/store.ts';
import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    );
    screen.debug();
    expect(screen.getByDisplayValue(/Login/i)).toBeInTheDocument();
  });
});
