import "../../App.css";
import { Icon } from "@iconify/react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../../images/logo_violet.png";

//TODO : ajouter la barre de recherche

// CH = CookHub : navbar for the web appli
export default function CHNavbar() {
  return (
    <Navbar className="navbar justify-content-between">
      {/* Logo */}
      <Navbar.Brand href="/" style={{ color: "#5837B3", fontSize: "1.5rem" }}>
        <img alt="Logo CookHub" src={logo} className="logo d-inline-block" />
        CookHub
      </Navbar.Brand>
      {/* Profil access */}
      <Nav.Link href="#" className="align-right me-1">
        <Icon icon="gg:profile" color={"#5837B3"} width={40}></Icon>
      </Nav.Link>
    </Navbar>
  );
}
