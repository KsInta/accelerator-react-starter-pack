import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {Link} from 'react-router-dom';
import FooterComponent from '../footer-component/footer-component';
import HeaderComponent from '../header-component/header-component';
import LoadingScreen from '../loading-screen/loading-screen';
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
              <p className="product-container__price-info product-container__price-info--value">{guitar.price} ₽</p><a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
            </div>
          </div>
          <ReviewsListComponent onModalReviewBtnClick={handleModalReviewBtnClick}/>
          {isModalReviewOpen && <ModalReviewComponent onModalReviewCloseClick={handleModalReviewCloseClick} />}
          {isModalReviewSuccessOpen && <ModalReviewSuccessComponent onModalReviewSuccessCloseClick={handleModalReviewSuccessCloseClick} />}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
}

export default ProductPage;
