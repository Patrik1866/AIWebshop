import { useLocation } from "react-router-dom";
import "../styles/viewProductpage.scss"
import { useEffect, useState } from "react";
import { Reviews } from "../entities/Reviews";

export function ViewProductPage() {
    const location = useLocation();
    const product = location.state?.product;
    const [reviews, setReviews] = useState<Reviews[]>([]);

    useEffect(()=>{
        loadReviewsForProduct(product.id)
    }, [product.id])


    const loadReviewsForProduct = async (productId: number) =>{
        try{
            if (product){
                const response = await fetch(`http://localhost:8080/reviews/productId/${productId}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                });
                if (response.ok){
                    setReviews(await response.json());
                    console.log("ok")
                }
            }
            
        }catch (e){
            console.error(e)
        }
    }

    return (
        <>
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
                            <p style={{marginLeft: "2%"}}>{product.description}</p>
                        </div>
                        <div>
                            <label> Ár: {product.price}</label>
                        </div>
                    </div>
                    <div className="productReviews">
                        {reviews.map((review, index) =>(
                            <div key={index}>
                                <div>
                                    User
                                </div>
                                <div>
                                    {review.point}
                                </div>
                                <div>
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