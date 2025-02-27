import cartService from "../util/CartService";


const CartPage = () => {
    const content = cartService.getCartContent();

    console.log(content)


    return (
        <>
            <div>
                <label>
                    CartPage
                </label>
            </div>
            <div>
                {content?.map((item, index) => 
                   (
                    <div key={index}>
                        <div>
                            <label>
                                {item.productName}
                            </label>
                        </div>
                        <div>

                        </div>
                    </div>
                    )
                )}
            </div>
        </>

    )
}

export default CartPage;