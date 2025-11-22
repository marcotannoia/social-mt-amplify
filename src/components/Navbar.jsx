import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link className={location.pathname === "/home" ? "active" : ""} to="/home">
        🏠
      </Link>
      <Link className={location.pathname === "/explore" ? "active" : ""} to="/explore">
        🔍
      </Link>
      <Link className={location.pathname === "/create" ? "active" : ""} to="/create">
        ➕
      </Link>
      <Link className={location.pathname === "/profile" ? "active" : ""} to="/profile">
        👤
      </Link>
    </nav>
  );
}
