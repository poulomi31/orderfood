import axios from "axios";
import "./Checkout.css"
import { Link } from "react-router-dom";

export function Checkout(props) {
  const { cartItems, fetchFoodItems } = props;

  //calculate total price of Item, with shipping cost.
  const itemsPrice = cartItems.reduce((a, c) => a + c.price, 0);
  const shippingCost = itemsPrice > 500 ? 0 : 50;
  const totalPrice = itemsPrice + shippingCost;

  async function deleteFoodItem(item){
    const deleteResponse = await axios.delete("http://localhost:8080/cartItems/deleteFoodItem",{
      data: {
        _id: item._id
    }
    })
    console.log(deleteResponse);
    fetchFoodItems();
  }

async function clearAll(){
    const deleteAllItems = await axios.delete("http://localhost:8080/cartItems/deleteAll",{})
    console.log(deleteAllItems);
    fetchFoodItems();
  }

  return (
    <div className="row">
      <div>
        {(cartItems.length === 0) && (
          <h2 className="col-12 mt-4">Cart is Empty... Buy Some Products</h2>
        ) || (<h3 className="col-12 mt-4">Product Selected:</h3>)}
      </div>
      <div className="col-lg-7 col-md-8 col-sm-12">
        <div className="row">
          {cartItems.map((item) => {
            return (
              <div key={item._id} className="product col-12 col-sm-12">
                <div className="row">
                  <div className="m-auto col-lg-6 col-md-6 col-sm-12">
                    <img
                      className="check-img"
                      src={item.image}
                      alt={item.name}
                    ></img>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 m-auto">
                    <h5>
                      <strong>{item.name}</strong>
                    </h5>
                      <p>{item.description}</p>
                    <div>
                      <strong>
                        Price: Rs. {item.price}
                      </strong>{" "}
                      <span className="card-text">
                        {item["original-price"]}
                      </span>
                    </div>
                    <button className="remove" onClick={() => deleteFoodItem(item)}>
                      Remove
                    </button>                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="col-lg-5 col-md-4">
        {cartItems.length !== 0 && (
          <div className="price-page">
            <div className="mt-2 w-100">
              <strong>Price of Products:</strong> Rs. {itemsPrice.toFixed(2)}
            </div>
            <div className="mt-2">
              <strong>Shipping Cost:</strong> Rs. {shippingCost.toFixed(2)}
            </div>
            <div className="mt-2">
              <strong>Total Price to Pay:</strong> Rs. {totalPrice.toFixed(2)}
            </div>
            <Link to="/" style={{textDecoration: "none", color: "#000"}}>
            <button
              className="checkout"
              onClick={() => clearAll()}
            >
              Place Order
            </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
