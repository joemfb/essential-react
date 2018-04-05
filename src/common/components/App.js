import React from 'react';

import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default ({children}) => {
  return (
    <div className="content">
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Toggle/>
          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer onlyActiveOnIndex={true} to="/">
                <NavItem eventKey={1}>home</NavItem>
              </LinkContainer>
              <LinkContainer to="/search">
                <NavItem eventKey={2}>search</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar.Header>
      </Navbar>
      <div id="container" className="container">
        {children}
      </div>
    </div>
  );
}
