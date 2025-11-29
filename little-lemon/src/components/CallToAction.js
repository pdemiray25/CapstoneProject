import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/restaurant.jpg'; // görseli import ettik

function CallToAction() {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/booking');
  };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-text">
        <h1 id="hero-heading">Welcome to Little Lemon</h1>
        <p className="hero-location">Chicago</p>
        <p className="hero-description">
          Delicious Mediterranean cuisine in Chicago.
        </p>
      
        <button
          type="button"
          className="primary-button"
          onClick={handleReserveClick}
        >
          Book a Table
        </button>
      </div>
      <div className="hero-image-placeholder">
        <img src={heroImage} alt="Little Lemon Restaurant" />
      </div>
    </section>
  );
}

export default CallToAction;
