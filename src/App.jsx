import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import "simpledotcss/simple.min.css";
import "./style.css";

export default function App() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
