import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Expense from '.';

const mock = {
  name: 'food',
  id: 'parent_id',
  maxValue: 1000,
  value: 666,
  childCategories: {
    'test_id': {
      name: 'vegetables',
      userId: 'user_id',
      childOf: 'parent_id',
      _id: 'category_id',
      value: 100,
    }
  }
};

describe('Expense', () => {
  it('renders Expense component with children', () => {
    render(
      <Expense
        name={mock.name}
        id={mock.id}
        value={mock.value}
        childCategories={mock.childCategories}
      />
    );
    expect(screen.getByText(/food/i)).toBeInTheDocument();
    expect(screen.getByText(/666/)).toBeInTheDocument();
    expect(screen.getByText(/vegetables/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });
  it('click event on Expense component with children', () => {
    render(
      <Expense
        name={mock.name}
        id={mock.id}
        value={mock.value}
        childCategories={mock.childCategories}
      />
    );
    const row = screen.getByTestId('dashboard-expense');
    userEvent.click(row); 
    expect(row).toHaveStyle('height: 68px');
    userEvent.click(row); 
    expect(row).toHaveStyle('height: 30px');
  });
  it('click event on Expense component without children', () => {
    render(
      <Expense
        name={mock.name}
        id={mock.id}
        value={mock.value}
        childCategories={{}}
      />
    );
    const row = screen.getByTestId('dashboard-expense');
    userEvent.click(row); 
    expect(row).toHaveStyle('height: 30px');
    userEvent.click(row); 
    expect(row).toHaveStyle('height: 30px');
  });
});
