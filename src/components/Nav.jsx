import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <img src="/media/drawing.svg" alt="abstract icon, blue square" />
        </li>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "current" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "current" : "")}
          >
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "current" : "")}
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
