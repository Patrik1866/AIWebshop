
const SuccessfulOrderPage = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Rendelés sikeresen leadva!</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <p className="mb-4">Köszönjük, hogy rendelt Öntől!</p>
        <p className="mb-4">A rendelésének részleteit hamarosan elküldjük Önnek e-mailben.</p>
        <p className="mb-4">
          Ha bármilyen kérdése van, kérjük, lépjen velünk kapcsolatba <a href="/contact" className="text-main-brown underline">itt</a>.
        </p>
      </div>
      <div className="mt-6">
        <button
          className="bg-main-green-title text-white font-bold py-2 px-4 rounded-lg hover:bg-main-green cursor-pointer transition duration-300 ease-in-out"
          onClick={() => window.location.href = "/"}
        >
          Vissza a főoldalra
        </button>
      </div>
    </div>
  );
};

export default SuccessfulOrderPage;