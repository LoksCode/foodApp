import Modal from './Modal';
import Button from './Button.jsx';
import CartItem from './CartItem.jsx';
import { userProgressActions } from '../store/userProgress.jsx';
import { cartActions } from '../store/cartSlice.jsx';
import { useSelector, useDispatch } from 'react-redux';

export default function Cart() {
  const cartSlice = useSelector((state) => state.cart.items);
  const userProgressSlice = useSelector((state) => state.userProgress.progress);
  const dispatch = useDispatch();

  const cartTotal = cartSlice.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    dispatch(userProgressActions.hideCart());
  }

  function handleGoToCheckout() {
    dispatch(userProgressActions.showCheckout());
  }

  return (
    <Modal
      className='cart'
      open={userProgressSlice === 'cart'}
      onClose={userProgressSlice === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {cartSlice.length > 0 ? (
          cartSlice.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => dispatch(cartActions.addItem(item))}
              onDecrease={() => dispatch(cartActions.removeItem(item.id))}
            />
          ))
        ) : (
          <p>Your order is empty!</p>
        )}
      </ul>
      <p className='cart-total'>{`$ ${cartTotal.toFixed(2)}`} </p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartSlice.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout </Button>
        )}
      </p>
    </Modal>
  );
}
