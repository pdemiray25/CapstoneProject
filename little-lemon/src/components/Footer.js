function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">
        <span>Little Lemon</span>
      </div>
      <div className="footer-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Reservations</a></li>
          <li><a href="#">Order online</a></li>
        </ul>
      </div>
      <div className="footer-contact">
        <p>Contact</p>
        <p>123 Lemon Street, Chicago</p>
        <p>(000) 111-2222</p>
      </div>
      <div className="footer-social">
        <p>Follow us</p>
        <a href="#">Instagram</a>
    
      </div>
    </footer>
  );
}

export default Footer;