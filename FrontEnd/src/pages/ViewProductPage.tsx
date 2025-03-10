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
            <div>
                <button onClick={() => window.location.replace("/products")} className="back-button"><i style={{ marginRight: "10px" }} className="fas fa-arrow-left"></i>Vissza</button>
            </div>
            <div className="productPage">
                <div className="productContainer">
                    <div className="productHeader">
                        <div className="productTitle">
                            <label>{product.name}</label>
                        </div>
                    </div>
                    <div className="productInformation">
                        <div>
                            <label> Termékleírás: <br /></label>
                            <p style={{ marginLeft: "2%" }}>{product.description}</p>
                        </div>
                        <div>
                            <label> Ár: {product.price}</label>
                        </div>
                    </div>
                    <div className="productReviews">
                        <div className="addDescriptionButton">
                            <button onClick={() => setIsComment(true)}>Írj hozzászólást</button>
                        </div>
                        {isComment &&
                            <div className="addReviewArea">
                                <div onClick={() => setIsComment(false)}>
                                    <i className="fa fa-times"></i>
                                </div>
                                <input placeholder="Írd ide a hozzáaszólást" type="text" onChange={(e) => setDescription(e.target.value)} />
                                <div className="rating">
                                    {Array(5).fill(0).map((_, index) => (
                                        <span key={index} className={`star ${point > index ? 'active' : ''}`} onClick={() => setPoint(index + 1)}>&#9733;</span>
                                    ))}
                                </div>
                                <div className="sendReview">
                                    <button onClick={handleSendReview} className="sendReviewButton">Küldés
                                        <i className="fa fa-paper-plane"></i>
                                    </button>
                                </div>
                            </div>
                        }
                        {reviews.map((review, index) => (
                            <div className="review" key={index}>
                                <div>
                                    <strong>{review.username}</strong>
                                </div>
                                <div className="stars">
                                    {Array(5).fill(0).map((_, index) => (
                                        <span key={index} className={`star ${review.point > index ? 'active' : ''}`}>&#9733;</span>
                                    ))}
                                </div>
                                <div className="reviewDescription">
                                    {review.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProductPage;