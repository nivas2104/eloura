import React from 'react';

function ExploVR() {
  return (
    <div>
      <header>
        <title>ExploVR - Travel agency</title>
        {/* Your head content here */}
      </header>
      <main>
        <section className="hero" id="home">
          <div className="container">
            <h2 className="h1 hero-title">Journey to explore India</h2>
            <p className="hero-text">
              Welcome to our virtual travel hub, where your journey begins with a click. Explore breathtaking destinations, uncover hidden gems, and plan your next adventure with ease. From captivating articles to immersive experiences, let us inspire your wanderlust and guide you to unforgettable experiences around the India.
            </p>
            <div className="btn-group">
              <button className="btn btn-primary">Learn more</button>
            </div>
          </div>
        </section>
        <section className="tour-search">
          <div className="container">
            <form action="" className="tour-search-form">
              <div className="input-wrapper">
                <label htmlFor="destination" className="input-label">Search Destination*</label>
                <input type="text" name="destination" id="destination" required placeholder="Enter Destination" className="input-field" />
              </div>
              {/* Repeat for other input fields */}
              <button type="submit" className="btn btn-secondary">Inquire now</button>
            </form>
          </div>
        </section>
        <section className="popular" id="destination">
          <div className="container">
            <p className="section-subtitle">Uncover place</p>
            <h2 className="h2 section-title">Popular destination</h2>
            <p className="section-text">
              Places to see, ways to wander, and signature experiences.
            </p>
            <ul className="popular-list">
              <li>
                <div className="popular-card">
                  <figure className="card-img">
                    <img src="charminar.jpg" alt="Charminar, Hyderabad" loading="lazy" />
                  </figure>
                  <div className="card-content">
                    {/* Card content */}
                  </div>
                </div>
              </li>
              {/* Repeat for other popular destinations */}
            </ul>
            <button className="btn btn-primary">More destination</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        {/* Footer content */}
      </footer>
      <a href="#top" className="go-top" data-go-top>
        {/* Go to top button */}
      </a>
    </div>
  );
}

export default ExploVR;
