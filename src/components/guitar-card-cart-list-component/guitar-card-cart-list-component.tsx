import GuitarCardCartComponent from '../guitar-card-cart-component/guitar-card-cart-component';
import {Guitars, GuitarsInCart} from '../../types/types';

type GuitarCardCartListComponentProps = {
  guitarsInCartList: Guitars,
  guitarsInCart: GuitarsInCart,
}

function GuitarCardCartListComponent({guitarsInCartList, guitarsInCart}: GuitarCardCartListComponentProps): JSX.Element {
  return(
    <>
      {guitarsInCartList.map((guitar) => <GuitarCardCartComponent key={guitar.id} guitar={guitar} guitarsInCart={guitarsInCart} />)}
    </>
  );
}

export default GuitarCardCartListComponent;
