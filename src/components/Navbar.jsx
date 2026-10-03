import { Link } from "react-router-dom";

function Navbar({ cartItemCount }) {
  return (
    <nav className="navbar">
      <h2 className="logo">MyStore</h2>

      <div>
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartItemCount})
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;