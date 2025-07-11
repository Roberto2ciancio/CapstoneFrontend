import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { HashLink } from "react-router-hash-link";
import userIcon from "../assets/img/user.svg";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={`navbar${scrolled ? " scrolled" : ""}`}>
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} alt="Logo" className="logo2" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="#Shop"
              className={
                activeLink === "Shop" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("Shop")}
            >
              Shop
            </Nav.Link>
            <Nav.Link
              href="#Account"
              className={
                activeLink === "Account" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("Account")}
            >
              Account
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              className={
                activeLink === "Home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("Home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#Chi Siamo"
              className={
                activeLink === "Chi Siamo"
                  ? "active navbar-link"
                  : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("Chi Siamo")}
            >
              Chi Siamo
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="#">
                <img src={navIcon1} alt="" />
              </a>
              <a href="#">
                <img src={navIcon2} alt="" />
              </a>
              <a href="#">
                <img src={navIcon3} alt="" />
              </a>
            </div>
            {/* Icona profilo utente */}
            <a
              href="#account"
              className="profile-icon"
              style={{ marginLeft: 12 }}
            >
              <img
                src={userIcon}
                alt="Profilo utente"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                }}
              />
            </a>
            <HashLink to="#connect">
              <button className="vvd">
                <span>Let’s Connect</span>
              </button>
            </HashLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
