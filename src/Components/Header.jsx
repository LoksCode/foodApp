import logoImg from '../assets/logo.jpg';

export default function Header() {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='food on a table' /> <h1>REST-aurant</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
