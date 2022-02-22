type CartTotalComponentProps = {
  totalPrice: number,
  discount: number,
}

function CartTotalComponent({totalPrice, discount}: CartTotalComponentProps): JSX.Element {
  const totalDiscount = discount / 100 * totalPrice;
  const finalPrice = (100 - discount) / 100 * totalPrice;

  return(
    <div className="cart__total-info">
      <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">{totalPrice} ₽</span></p>
      <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span><span className={`cart__total-value ${discount !== 0 && 'cart__total-value--bonus'}`}>{discount !== 0 && '-'} {totalDiscount} ₽</span></p>
      <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">{finalPrice} ₽</span></p>
      <button className="button button--red button--big cart__order-button">Оформить заказ</button>
    </div>
  );
}

export default CartTotalComponent;
