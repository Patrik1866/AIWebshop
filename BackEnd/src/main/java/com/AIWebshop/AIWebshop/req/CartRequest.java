package com.AIWebshop.AIWebshop.req;

import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.entity.User;

public class CartRequest {



    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    public int getProduct() {
        return product;
    }

    public void setProduct(int product) {
        this.product = product;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    private int user;
    private int product;
    private int quantity;
}
