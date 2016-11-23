import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Row, Col } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


export default function Layout({ children, location }) {
  return (
    <div>
      <Navbar color="faded" light className="mb-3">
        <Link to="/" className="navbar-brand">Blog</Link>
        <Nav navbar>
          <NavItem>
            <Link to="/" className="nav-link">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/account" className="nav-link">Account</Link>
          </NavItem>
          <NavItem>
            <Link to="/login" className="nav-link">Login</Link>
          </NavItem>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col className="content">
            <ReactCSSTransitionGroup
              transitionName="page"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {React.cloneElement(children, {
                key: location.pathname
              })}
            </ReactCSSTransitionGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
