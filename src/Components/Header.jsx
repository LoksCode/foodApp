import logoImg from '../assets/logo.jpg';
import Button from './Button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userProgressActions } from '../store/userProgress';

export default function Header() {
  const dispatch = useDispatch();
  const cartSlice = useSelector((state) => state.cart.items);
  const userProgressSlice = useSelector((state) => state.userProgress.progress);

  const itemsArray = cartSlice;
  const totalCartItems = itemsArray.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    dispatch(userProgressActions.showCart());
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='food on a table' /> <h1>REST-aurant</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
