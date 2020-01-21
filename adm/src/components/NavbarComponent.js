  
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";

const NavBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/home">Painel Administrativo</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/home">
                <span className="fa fa-home"></span> Home
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/produtos">
                <span className="fa fa-television"></span> Produtos
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/configuracoes">
                <span className="fa fa-wrench"></span> Configurações
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
};

export default withRouter(NavBar);