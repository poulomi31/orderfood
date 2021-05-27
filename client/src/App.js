import { useState,useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Products } from "./components/Products";
import { Checkout } from "./components/Checkout";
import { SubItems } from "./components/SubItems";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";

function App() {
  const [cartItems, setCartItems] = useState([]);
 
  async function fetchFoodItems() {
    const foodData = await axios.get("http://localhost:8080/cartItems/getAll")
    console.log(foodData.data.results);
    // const dataFromAPI = groceryData.data.results;
    setCartItems(foodData.data.results);
    console.log(cartItems)
  }

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar cartItems={cartItems} setCartItems={setCartItems} />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Products
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            )}
          />
          <Route
            path="/data/:id"
            render={(props) => (
              <SubItems
                cartItems={cartItems}
                setCartItems={setCartItems}
                fetchFoodItems={fetchFoodItems}
                {...props}
              />
            )}
          />
          <Route
            path="/checkout"
            exact
            render={(props) => (
              <Checkout
                cartItems={cartItems}
                fetchFoodItems={fetchFoodItems}
                setCartItems={setCartItems}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
