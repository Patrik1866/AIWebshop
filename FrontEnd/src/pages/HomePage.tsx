import { useEffect, useState } from "react";
import "../styles/HomePage.css"
import { Reviews } from "../entities/Reviews";

const HomePage = () => {
  const [reviews, setReviews] = useState<Reviews[]>([]);

  useEffect(() => {
    loadRandomReviews();
  }, []);

  const loadRandomReviews = async () => {
    try {
      const response = await fetch("http://localhost:8080/reviews/random", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
      });
      if (response.ok) {
        setReviews(await response.json());
      }
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className="home-container">
      <header className="hero-header">
        <h1>Üdvözöllek webshopunkon!</h1>
        <p>Fedezd fel a legújabb trendeket és legújabb termékeinket!</p>
        <button onClick={() => window.location.href = "/products"}>Shop Now</button>
      </header>
      <section className="featured-products">
        <h2>Felkapott termékek</h2>
        <div className="product-grid">
          <div className="product-card">
            <h3>Product 1</h3>
            <p>Dummy text for product 1</p>
            <button onClick={() => window.location.href = "/products"}>Shop Now</button>
          </div>
          <div className="product-card">
            <h3>Product 2</h3>
            <p>Dummy text for product 2</p>
            <button onClick={() => window.location.href = "/products"}>Shop Now</button>
          </div>
          <div className="product-card">
            <h3>Product 3</h3>
            <p>Dummy text for product 3</p>
            <button onClick={() => window.location.href = "/products"}>Shop Now</button>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h2>Mit mondanak a vásárlóink</h2>
        <div className="testimonial-grid">
          {reviews.map((review, index) => (
            <div className="testimonial-card" key={index}>
              <h1>{review.productName}</h1>
              <p>{review.username}</p>
              <h3>{review.description}</h3>
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <i key={i} className={`fas fa-star ${i < review.point ? 'active' : ''}`}></i>
                ))}
              </div>
            </div>
          ))}
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