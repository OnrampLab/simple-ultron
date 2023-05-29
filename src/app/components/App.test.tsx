import { render, screen } from '@testing-library/react';
import '../../modules/core/infrastructure/ui/test/matchMedia.mock';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Workflows/i);
  expect(linkElement).toBeDefined();
});
