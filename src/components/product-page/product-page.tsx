import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import FooterComponent from '../footer-component/footer-component';
import HeaderComponent from '../header-component/header-component';
import LoadingScreen from '../loading-screen/loading-screen';
import ModalCartComponent from '../modal-cart-component/modal-cart-component';
import ModalCartSuccessComponent from '../modal-cart-success-component/modal-cart-success-component';
import ModalReviewComponent from '../modal-review-component/modal-review-component';
import ModalReviewSuccessComponent from '../modal-review-success-component/modal-review-success-component';
import PageNotFound from '../page-not-found/page-not-found';
import ProductTabs from '../product-tabs/product-tabs';
import GuitarRating from '../guitar-rating/guitar-rating';
import ReviewsListComponent from '../reviews-list-component/reviews-list-component';
import {toggleIsGuitarLoading, toggleIsPosting} from '../../store/actions';
import {fetchOfferByIdAction} from '../../store/api-actions';
import {getGuitar, getGuitarLoaded, getCommentPosted} from '../../store/app-data/selectors';
import {AppRoute, GuitarTypesTranslationForProductPage} from '../../const';

function ProductPage(): JSX.Element {
  const guitar = useSelector(getGuitar);
  const isGuitarLoaded = useSelector(getGuitarLoaded);
  const isCommentPosted = useSelector(getCommentPosted);
  const params: {id: string} = useParams();
  const dispatch = useDispatch();
  const [isDataLoaded, setDataLoaded] = useState(isGuitarLoaded);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [isModalReviewSuccessOpen, setIsModalReviewSuccessOpen] = useState(false);
  const [isModalCartOpen, setIsModalCartOpen] = useState(false);
  const [isModalCartSuccessOpen, setIsModalCartSuccessOpen] = useState(false);

  const isModalVisible = isModalReviewOpen || isModalReviewSuccessOpen || isModalCartOpen || isModalCartSuccessOpen;
  let className = '';

  if (isModalReviewSuccessOpen || isModalCartSuccessOpen) {
    className = 'modal--success';
  } else if (isModalReviewOpen) {
    className = 'modal--review';
  }

  const handleModalReviewBtnClick = () => {
    setIsModalReviewOpen(true);
  };

  const handleModalReviewCloseClick = () => {
    setIsModalReviewOpen(false);
  };

  const handleModalReviewSuccessCloseClick = () => {
    setIsModalReviewSuccessOpen(false);
    dispatch(toggleIsPosting(false));
  };

  const handleModalCartBtnClick = () => {
    setIsModalCartOpen(true);
  };

  const handleModalCartCloseClick = () => {
    setIsModalCartOpen(false);
  };

  const handleModalCartSuccessClick = () => {
    setIsModalCartOpen(false);
    setIsModalCartSuccessOpen(true);
  };

  const handleModalSuccessCloseClick = () => {
    setIsModalCartSuccessOpen(false);
  };

  useEffect(() => {
    Promise.all([
      dispatch(fetchOfferByIdAction(params.id)),
    ])
      .then(() => {
        dispatch(toggleIsGuitarLoading(true));
        setDataLoaded(true);
      });
  }, [params.id]);

  useEffect(() => {
    if (isCommentPosted && isModalReviewOpen) {
      setIsModalReviewSuccessOpen(true);
      setIsModalReviewOpen(false);
    } else if (!isCommentPosted) {
      setIsModalReviewSuccessOpen(false);
    }
  }, [isCommentPosted]);

  if (!isDataLoaded || !isGuitarLoaded) {
    return <LoadingScreen/>;
  }

  if (!guitar.id) {
    return <PageNotFound />;
  }

  return(
    <div className="wrapper">
      <HeaderComponent />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">{guitar.name}</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item"><Link className="link" to={AppRoute.Guitars}>Каталог</Link>
            </li>
            <li className="breadcrumbs__item"><a className="link">{guitar.name}</a>
            </li>
          </ul>
          <div className="product-container"><img className="product-container__img" src={`/${guitar.previewImg}`} width="90" height="235" alt="" />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{guitar.name}</h2>
              <div className="rate product-container__rating" aria-hidden="true">
                <GuitarRating rating={guitar.rating} />
                <span className="rate__count" style={{marginLeft: '5px', fontSize: '12px', lineHeight: '15px'}}>{guitar.comments.length}</span>
              </div>
              <ProductTabs vendorCode={guitar.vendorCode} type={GuitarTypesTranslationForProductPage.get(guitar.type)} stringCount={guitar.stringCount} description={guitar.description}/>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p><a className="button button--red button--big product-container__button" onClick={handleModalCartBtnClick} href="#cart">Добавить в корзину</a>
            </div>
          </div>
          <ReviewsListComponent onModalReviewBtnClick={handleModalReviewBtnClick}/>
          {isModalVisible &&
          <div style={{position: 'absolute'}}>
            <div className={`modal is-active modal-for-ui-kit ${className}`}>
              <div className="modal__wrapper">
                <div className="modal__overlay" data-close-modal></div>
                {isModalReviewOpen && <ModalReviewComponent onModalReviewCloseClick={handleModalReviewCloseClick} />}
                {isModalReviewSuccessOpen && <ModalReviewSuccessComponent onModalReviewSuccessCloseClick={handleModalReviewSuccessCloseClick} />}
                {isModalCartOpen && <ModalCartComponent guitar={guitar} onModalCartCloseClick={handleModalCartCloseClick} onModalCartSuccessClick={handleModalCartSuccessClick} />}
                {isModalCartSuccessOpen && <ModalCartSuccessComponent onModalCartSuccessCloseClick={handleModalSuccessCloseClick} />}
              </div>
            </div>
          </div>}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default ProductPage;
