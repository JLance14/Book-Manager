import { render, screen } from '@testing-library/react';
import BookManager from './App';

test('renders learn react link', () => {
  render(<BookManager />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
