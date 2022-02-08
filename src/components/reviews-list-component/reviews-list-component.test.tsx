import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import ReviewsListComponent from './reviews-list-component';
import {AppRoute} from '../../const';
import {GenerateFakeComment} from '../../mock/mock';
import {MockData, MockOption, MockFilter} from '../../mock/mock-store';

const COMMENT_COUNT_MORE_THEN_ON_START = 5;
const COMMENT_COUNT_LESS_THEN_ON_START = 2;
const COMMENT_COUNT_ON_START = 3;

const history = createMemoryHistory();
const mockStore = configureMockStore();

const fakeCommentsMore = new Array(COMMENT_COUNT_MORE_THEN_ON_START).fill(null).map((comment) => comment = {...GenerateFakeComment()});
const fakeCommentsLess = new Array(COMMENT_COUNT_LESS_THEN_ON_START).fill(null).map((comment) => comment = {...GenerateFakeComment()});

const storeMore = mockStore({
  DATA: {...MockData, guitarComments: fakeCommentsMore},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const storeLess = mockStore({
  DATA: {...MockData, guitarComments: fakeCommentsLess},
  OPTION: {...MockOption},
  FILTER: {...MockFilter},
});

const onModalReviewBtnClick = jest.fn();

describe('Component: GuitarCardsListComponent', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });

  it('should render correctly with comments more then COMMENT_COUNT_ON_START', () => {
    render(
      <Provider store={storeMore}>
        <Router history={history}>
          <ReviewsListComponent onModalReviewBtnClick={onModalReviewBtnClick}/>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Достоинства:/i)).toHaveLength(COMMENT_COUNT_ON_START);
    expect(screen.getAllByText(/Недостатки:/i)).toHaveLength(COMMENT_COUNT_ON_START);
    expect(screen.getAllByText(/Комментарий:/i)).toHaveLength(COMMENT_COUNT_ON_START);
    userEvent.click(screen.getByText(/Показать еще отзывы/i));
    expect(screen.getAllByText(/Достоинства:/i)).toHaveLength(COMMENT_COUNT_MORE_THEN_ON_START);
    expect(screen.getAllByText(/Недостатки:/i)).toHaveLength(COMMENT_COUNT_MORE_THEN_ON_START);
    expect(screen.getAllByText(/Комментарий:/i)).toHaveLength(COMMENT_COUNT_MORE_THEN_ON_START);
  });

  it('should render correctly with comments less then COMMENT_COUNT_ON_START', () => {
    render(
      <Provider store={storeLess}>
        <Router history={history}>
          <ReviewsListComponent onModalReviewBtnClick={onModalReviewBtnClick}/>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Достоинства:/i)).toHaveLength(COMMENT_COUNT_LESS_THEN_ON_START);
    expect(screen.getAllByText(/Недостатки:/i)).toHaveLength(COMMENT_COUNT_LESS_THEN_ON_START);
    expect(screen.getAllByText(/Комментарий:/i)).toHaveLength(COMMENT_COUNT_LESS_THEN_ON_START);
  });
});
