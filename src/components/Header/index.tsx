import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.css";
import { Nav } from "react-bootstrap";

interface IHeader {

}

const Header : React.FC<IHeader> = (props) => {
  return (
    <Navbar expand="lg" className="my-navbar">
      <Container>
        <Navbar.Brand href="#">Prisha Policy</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="navbar-collapse">
          <Nav.Link className="mx-4 nav-link">Home</Nav.Link>{" "}
          <Nav.Link className="nav-link">Favourites</Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
            <span className="avatar">A</span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
