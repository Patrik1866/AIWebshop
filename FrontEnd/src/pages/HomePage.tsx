import "../styles/HomePage.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="hero-header">
        <h1>Üdvözöllek webshopunkon!</h1>
        <p>Fedezd fel a legújabb trendeket és legújabb termékeinket!</p>
        <button>Shop Now</button>
      </header>
      <section className="featured-products">
        <h2>Felkapott termékek</h2>
        <div className="product-grid">
          <div className="product-card">
            <h3>Product 1</h3>
            <p>Dummy text for product 1</p>
            <button>Vásárlás most</button>
          </div>
          <div className="product-card">
            <h3>Product 2</h3>
            <p>Dummy text for product 2</p>
            <button>Vásárlás most</button>
          </div>
          <div className="product-card">
            <h3>Product 3</h3>
            <p>Dummy text for product 3</p>
            <button>Vásárlás most</button>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2>Mit mondanak a vásárlóink</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>Dummy testimonial 1</p>
            <h3>Customer 1</h3>
          </div>
          <div className="testimonial-card">
            <p>Dummy testimonial 2</p>
            <h3>Customer 2</h3>
          </div>
          <div className="testimonial-card">
            <p>Dummy testimonial 3</p>
            <h3>Customer 3</h3>
          </div>
        </div>
      </section>
      <section className="about-us">
        <h2>Rólunk</h2>
        <p>Valami biztos</p>
      </section>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Webshopunk</p>
      </footer>
    </div>
  );
};

export default HomePage;