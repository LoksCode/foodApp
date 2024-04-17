import Modal from './Modal';
import Button from './Button.jsx';
import Input from './Input.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../store/cartSlice.jsx';
import { userProgressActions } from '../store/userProgress.jsx';

const requestConfig = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
};

export default function Checkout() {
  const cartSlice = useSelector((state) => state.cart.items);
  const userProgressSlice = useSelector((state) => state.userProgress.progress);
  const dispatch = useDispatch();

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartSlice.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    dispatch(userProgressActions.hideCheckout());
  }

  function handleFinish() {
    dispatch(userProgressActions.hideCheckout());
    dispatch(cartActions.clearCart());
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartSlice,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      {' '}
      <Button textOnly type='button' onClick={handleClose}>
        {' '}
        Close
      </Button>
      <Button> Submit</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={userProgressSlice === 'checkout'} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitrted sucessfully!</p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressSlice === 'checkout'} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: ${cartTotal.toFixed(2)}</p>

        <Input label='Full Name' type='text' id='name' />
        <Input label='E-MAIL' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>
        {error && <Error title='Failed to submit order' message={error} />}
        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
