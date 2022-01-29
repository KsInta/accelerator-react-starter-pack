import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import GuitarCardComponent from './guitar-card-component';
import {GenerateFakeGuitar} from '../../mock/mock';

const history = createMemoryHistory();
const guitar = GenerateFakeGuitar();

describe('Component: GuitarCardComponent', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <GuitarCardComponent guitar={guitar}/>
      </Router>);

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
    expect(screen.getByText(/Подробнее/i)).toBeInTheDocument();
    expect(screen.getByText(/Купить/i)).toBeInTheDocument();
  });
});
