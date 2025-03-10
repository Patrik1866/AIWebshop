import "../styles/Successful.css"

const SuccessfulOrderPage = () => {
  return (
    <div className="successful-order-page">
      <h1 className="title">Rendelés sikeresen leadva!</h1>
      <div className="content">
        <p>Köszönjük, hogy rendelt Öntől!</p>
        <p>A rendelésének részleteit hamarosan elküldjük Önnek e-mailben.</p>
        <p>Ha bármilyen kérdése van, kérjük, lépjen velünk kapcsolatba <a href="/contact">itt</a>.</p>
      </div>
      <div className="button-container">
        <button className="button" onClick={() => window.location.href = "/"}>Vissza a főoldalra</button>
      </div>
    </div>
  );
};

export default SuccessfulOrderPage;