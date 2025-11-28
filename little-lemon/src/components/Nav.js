import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/booking">Reservations</Link></li>
        <li><Link to="#">Menu</Link></li>
        <li><Link to="#">Order Online</Link></li>
        <li><Link to="#">Login</Link></li>
      </ul>
    </nav>
  );
}
