import logoImg from '../assets/logo.jpg';
import Button from './Button';

export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='food on a table' /> <h1>REST-aurant</h1>
      </div>
      <nav>
        <Button>Cart (0)</Button>
      </nav>
    </header>
  );
}
