package com.AIWebshop.AIWebshop.req;

import com.AIWebshop.AIWebshop.entity.Address;
import com.AIWebshop.AIWebshop.entity.User;

public class UserAddressRequest {

    private User user;
    private Address address;

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
