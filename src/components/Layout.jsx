import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Layout() {
    const navItems = [
        { href: "/", displayText: "Szobrok listázása" },
        { href: "create", displayText: "Szobrok felvétele" }
    ];
  return (
    <>
      <Nav navItems={navItems} />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
