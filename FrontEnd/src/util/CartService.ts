// cart.service.ts
import { Cart } from "../entities/Cart";
import authService from "./AuthService";

class CartService {
  private cartContent: Cart[] | null;

  constructor() {
    const savedCart = sessionStorage.getItem('cartContent');
    this.cartContent = savedCart ? JSON.parse(savedCart) : null;
  }

  getCartContent(): Cart[] | null {
    return this.cartContent;
  }

  setCartContent(cartContent: Cart[] | null): void {
    this.cartContent = cartContent;
    if (cartContent) {
      sessionStorage.setItem('cartContent', JSON.stringify(cartContent));
    } else {
      sessionStorage.removeItem('cartContent');
    }
  }

  isCartEmpty(): boolean {
    return !this.cartContent || this.cartContent.length === 0;
  }

  async fetchCartContent(): Promise<Cart[] | null> {
    try {
      const response = await fetch(`http://localhost:8080/cart/userId/${authService.getUser()?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        this.setCartContent(data);
        return data;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

const cartService = new CartService();

export default cartService;