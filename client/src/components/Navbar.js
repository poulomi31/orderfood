import { Link } from "react-router-dom";

export function Navbar(props) {
  const decoration = { textDecoration: "none" };
  return (
    <div className="navbar-container">
      <Link to="/" style={decoration}>
        <h2 className="title">Foodie</h2>
      </Link>
      <div className="navbar-menu">
        <Link to="/checkout" style={decoration}>
          <i className="fas fa-shopping-cart text-light ms-auto me-1"></i>
          <span className="text-light">{props.cartItems.length}</span>
        </Link>
      </div>
    </div>
  );
}
