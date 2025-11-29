import Nav from './Nav';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <img src={logo} alt="Little Lemon logo" /> 
      </div>
      <Nav />
    </header>
  );
}

export default Header;