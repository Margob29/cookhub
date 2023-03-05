import "../App.css";
import { PersonOutline, Person } from "react-ionicons";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/logo_violet.png";

export default function CHNavbar() {
  return (
    <Navbar className="navbar justify-content-between">
      <Navbar.Brand
        href="#home"
        style={{ color: "#5837B3", fontSize: "1.5rem" }}
      >
        <img alt="Logo CookHub" src={logo} className="logo d-inline-block" />
        {"  "}
        CookHub
      </Navbar.Brand>
      <Nav.Link href="#" className="align-right me-1">
        <PersonOutline
          color="#5837B3"
          title="Mon compte"
          height="30px"
          width="auto"
        />
      </Nav.Link>
    </Navbar>
  );
}
