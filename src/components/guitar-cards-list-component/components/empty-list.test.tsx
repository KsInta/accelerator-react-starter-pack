import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import EmptyList from './empty-list';

const history = createMemoryHistory();

describe('Component: EmptyList', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <EmptyList />
      </Router>);

    expect(screen.getByText(/По вашему запросу гитар не найдено/i)).toBeInTheDocument();
    expect(screen.getByText(/Попробуйте поменять параметры поиска/i)).toBeInTheDocument();
  });
});
