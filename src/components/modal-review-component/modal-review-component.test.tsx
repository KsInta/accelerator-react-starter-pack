import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import ModalReviewComponent from './modal-review-component';
import {GenerateFakeGuitar} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const onModalReviewCloseClick = jest.fn();
const fakeGuitar = GenerateFakeGuitar();

const store = mockStore({
  DATA: {...MockData, guitar: fakeGuitar},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const fakeReviewComponent = (
  <Provider store={store}>
    <Router history={history}>
      <ModalReviewComponent onModalReviewCloseClick={onModalReviewCloseClick}/>
    </Router>
  </Provider>
);

describe('Component: ModalReviewComponent', () => {
  it('should render correctly', () => {
    render(fakeReviewComponent);

    expect(screen.getByRole('button', { name: 'Отправить отзыв' })).toBeInTheDocument();
    expect(screen.getByText(fakeGuitar.name)).toBeInTheDocument();
    expect(screen.getByText(/Ваше Имя/i)).toBeInTheDocument();
    expect(screen.getByText(/Комментарий/i)).toBeInTheDocument();
  });
  it('should call dispatch when user send review', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(fakeReviewComponent);

    userEvent.type(screen.getByTestId('userName'), 'Vladimir');
    userEvent.click(screen.getByTestId('4-stars'));
    userEvent.type(screen.getByTestId('advantage'), 'Хорошая');
    userEvent.type(screen.getByTestId('disadvantage'), 'Быстро расстраивается');
    userEvent.type(screen.getByTestId('comment'), 'Подойдет для новичка');

    expect(screen.getByDisplayValue(/Vladimir/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Отправить отзыв/i})).toBeEnabled();

    userEvent.click(screen.getByRole('button', {name: /Отправить отзыв/i}));
    expect(dispatch).toBeCalledTimes(1);
  });
});
