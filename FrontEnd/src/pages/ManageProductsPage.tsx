import { Component } from "react";
import "../styles/manageProducts.css"
import { Product } from "../entities/Product";

interface ManageProductsPageProps {
  id?: string;
}

interface ManageProductsPageState {
  product: Product;
}
class ManageProductsPage extends Component<ManageProductsPageProps, ManageProductsPageState>{
 constructor(props: ManageProductsPageProps) {
   super(props);
   this.state = {
    product: {
      id: null,
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: 0,
      subCategoryId: 0
    }
   }
 }

 componentDidMount(): void {
  const { id } = this.props;
  if (id) {
    this.loadProductIfUpdated(Number(id));
  }
 }

  private loadProductIfUpdated = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
      });
      if (response.ok) {
        const data = await response.json();
        this.setState({product:data});
      }
    } catch (e) {

    }
  }

  private handleProductSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/products`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(this.state.product),
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  private handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
      const productToSave = {
        ...this.state.product,
        [name]: value
      };
      this.setState({ product: productToSave });
    

  };

  render(){
  return (
    <div className="product-manage-container">
      <h2>Termék hozzáadása</h2>
      <form>
        <div>
          <label>Termék neve</label>
          <input
            type="text"
            name="name"
            value={this.state.product.name}
            onChange={this.handleProductInputChange}
          />
        </div>
        <div>
          <label>Termék leírása</label>
          <input
            type="text"
            name="description"
            value={this.state.product.description}
            onChange={this.handleProductInputChange}
          />
        </div>
        <div>
          <label>Termék ára</label>
          <input
            type="text"
            name="price"
            value={this.state.product.price}
            onChange={this.handleProductInputChange}
          />
        </div>
        <div>
          <label>Termék mennyisége</label>
          <input
            type="text"
            name="quantity"
            value={this.state.product.quantity}
            onChange={this.handleProductInputChange}
          />
        </div>
        <div>
          <label>Kategória kiválasztása</label>
          <input
            type="text"
            name="categoryId"
            value={this.state.product.categoryId}
            onChange={this.handleProductInputChange}
          />
        </div>
        <div>
          <label>Alkategória kiválasztása</label>
          <input
            type="text"
            name="subCategoryId"
            value={this.state.product.subCategoryId}
            onChange={this.handleProductInputChange}
          />
        </div>

        <button onClick={this.handleProductSave}>Mentés</button>
      </form>
      <a href="/productList">
        <button>Termékek megtekintése</button>
      </a>
    </div>
  );
};

}
export default ManageProductsPage;
