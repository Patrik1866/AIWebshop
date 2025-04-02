import { useEffect, useState } from "react";
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
   <div className="min-h-screen bg-gray-50">
     <header className="py-12 text-center bg-main-green-light shadow-md">
       <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-main-green-title">Üdvözöllek webshopunkon!</h1>
       <p className="text-lg md:text-xl mb-6 text-main-green">Fedezd fel a legújabb trendeket és legújabb termékeinket!</p>
       <button 
         onClick={() => window.location.href = "/products"}
         className="bg-main-brown hover:bg-main-brown-hover text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
       >
         Vásárlás
       </button>
     </header>
     <section className="my-12 px-4 md:px-12 lg:px-20">
       <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-main-green-title">Mit mondanak a vásárlóink</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {reviews.map((review, index) => (
           <div key={index} className="border border-main-green-title rounded-lg p-6 shadow-sm hover:shadow-lg hover:scale-105 transition duration-300">
             <h3 className="text-xl font-bold mb-2 text-main-green-title">{review.productName}</h3>
             <h4 className="text-main-green mb-2">Felhasználó: {review.username}</h4>
             <p className="text-main-green mb-2">Vélemény: {review.description}</p>
             <div className="flex">
               {Array.from({ length: 5 }, (_, i) => (
                 <i key={i} className={`fas fa-star ${i < review.point ? 'text-yellow-400' : 'text-gray-300'} mr-1`}></i>
               ))}
             </div>
           </div>
         ))}
       </div>
     </section>
     
     <section className="my-12  p-8 rounded-lg shadow-2xl hover:scale-101 transition duration-300 mx-4 md:mx-12 lg:mx-20">
       <h2 className="text-center mb-3 text-main-green-title font-bold text-2xl">Rólunk</h2>
       <p className="text-center text-main-green">Innovatív shop</p>
     </section>
     
     <footer className="py-6 mt-12 border-t text-center text-gray-600">
       <p>&copy; {new Date().getFullYear()} Webshopunk</p>
     </footer>
   </div>
 );
};

export default HomePage;