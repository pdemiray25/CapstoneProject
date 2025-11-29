import React from 'react';
import special1 from '../assets/special1.jpg';
import special2 from '../assets/special2.jpg';
import special3 from '../assets/special4.jpg';

function Specials() {
  return (
    <section className="specials" aria-labelledby="specials-heading">
      <div className="specials-header">
        <h2 id="specials-heading">This week&apos;s specials</h2>
        <button type="button" className="secondary-button">
          Order online
        </button>
      </div>

      <div className="specials-grid">
        <article className="card">
          <img src={special1} alt="Special 1" />
          <h3>Special Item 1</h3>
          <p>Description for Special 1</p>
        </article>

        <article className="card">
          <img src={special2} alt="Special 2" />
          <h3>Special Item 2</h3>
          <p>Description for Special 2</p>
        </article>

        <article className="card">
          <img src={special3} alt="Special 3" />
          <h3>Special Item 3</h3>
          <p>Description for Special 3</p>
        </article>
      </div>
    </section>
  );
}

export default Specials;
