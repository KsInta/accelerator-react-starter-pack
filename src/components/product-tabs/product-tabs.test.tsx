import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import ProductTabs from './product-tabs';
import {GenerateFakeGuitar} from '../../mock/mock';

const history = createMemoryHistory();
const guitar = GenerateFakeGuitar();

describe('Component: GuitarCardComponent', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ProductTabs vendorCode={guitar.vendorCode} type={guitar.type} stringCount={guitar.stringCount} description={guitar.description}/>
      </Router>);

    expect(screen.getByText(guitar.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(guitar.type)).toBeInTheDocument();
    expect(screen.getByText(/струнная/i)).toBeInTheDocument();
    expect(screen.getByText(guitar.description)).toBeInTheDocument();
  });
});
