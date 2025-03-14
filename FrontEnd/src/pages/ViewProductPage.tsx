import { useLocation } from "react-router-dom";
import "../styles/viewProductpage.css"
import { useEffect, useState } from "react";
import { Reviews } from "../entities/Reviews";

export function ViewProductPage() {
    const [isComment, setIsComment] = useState(false);
    const [description, setDescription] = useState("");
    const [point, setPoint] = useState(0);
    const location = useLocation();
    const product = location.state?.product;
    const [reviews, setReviews] = useState<Reviews[]>([]);

    useEffect(() => {
        loadReviewsForProduct(product.id)
    }, [product.id])


    const loadReviewsForProduct = async (productId: number) => {
        try {
            if (product) {
                const response = await fetch(`http://localhost:8080/reviews/productId/${productId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                });
                if (response.ok) {
                    setReviews(await response.json());
                    console.log("ok")
                }
            }

        } catch (e) {
            console.error(e)
        }
    }

    const handleSendReview = async () => {
        try {
            const response = await fetch(`http://localhost:8080/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ productId: product.id, point: point, description: description })
            });
            if (response.ok) {
                loadReviewsForProduct(product.id);
                setIsComment(false);
                setPoint(0);
            }
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <div className="max-w-4xl mx-auto">
                <div className="p-4 py-4 mt-4">
                    <button
                        onClick={() => window.location.replace("/products")}
                        className="bg-main-green-title hover:bg-main-green text-white font-bold py-2 px-4 rounded-full flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        <span>Vissza</span>
                    </button>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Product Header */}
                        <div className="border-b border-gray-200 p-6">
                            <h1 className="text-2xl font-bold text-main-green-title">{product.name}</h1>
                        </div>

                        {/* Product Information */}
                        <div className="p-6 space-y-4">
                            <div>
                                <h2 className="text-lg font-semibold text-main-green-title mb-2">Termékleírás:</h2>
                                <p className="text-main-green font-md ml-2">{product.description}</p>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold text-gray-700 flex flex-row">
                                    <span className="font-bold text-main-green-title">Ár:</span> <p className="font-medium text-main-green ml-2">{product.price}</p>
                                </h2>
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-gray-50 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-main-green-title">Vélemények</h2>
                                <button
                                    onClick={() => setIsComment(true)}
                                    className="bg-main-green-title hover:bg-main-green text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Írj hozzászólást
                                </button>
                            </div>

                            {/* Add Review Form */}
                            {isComment && (
                                <div className="bg-white p-6 rounded-lg shadow-md mb-6 relative">
                                    <button
                                        onClick={() => setIsComment(false)}
                                        className="absolute top-1 right-2 text-main-green-title hover:text-main-green "
                                    >
                                        <i className="fa fa-times"></i>
                                    </button>

                                    <input
                                        placeholder="Írd ide a hozzáaszólást"
                                        type="text"
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-3 border border-main-green-title rounded-2xl focus:outline-none focus:scale-102 transition duration-300 mb-4"
                                    />

                                    <div className="flex items-center mb-4">
                                        <span className="mr-2 text-main-green-title font-bold">Értékelés:</span>
                                        <div className="flex">
                                            {Array(5).fill(0).map((_, index) => (
                                                <span
                                                    key={index}
                                                    className={`cursor-pointer text-2xl ${point > index ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    onClick={() => setPoint(index + 1)}
                                                >
                                                    &#9733;
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button
                                            onClick={handleSendReview}
                                            className="bg-main-green-title hover:bg-main-green text-white px-4 py-2 rounded-md transition-colors inline-flex items-center"
                                        >
                                            Küldés
                                            <i className="fa fa-paper-plane ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-4">
                                {reviews.map((review, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="font-bold text-main-green-title">{review.username}</h3>
                                            <div className="flex">
                                                {Array(5).fill(0).map((_, index) => (
                                                    <span
                                                        key={index}
                                                        className={`text-lg ${review.point > index ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    >
                                                        &#9733;
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-main-green font-medium">{review.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProductPage;