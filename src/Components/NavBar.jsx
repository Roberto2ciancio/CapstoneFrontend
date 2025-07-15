import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import { HashLink } from "react-router-hash-link";
import userIcon from "../assets/img/user.svg";
import cartIcon from "../assets/img/cart.svg"; // usa una tua icona

export const NavBar = ({ cartCount }) => {
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
              as={Link}
              to="/shop"
              className={
                activeLink === "Shop" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("Shop")}
            >
              Shop
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
              as={Link}
              to="/chi-siamo"
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
            <Link
              to="/cart"
              className="cart-icon"
              style={{
                marginLeft: 18,
                marginRight: 8,
                position: "relative",
              }}
            >
              <img
                src={cartIcon}
                alt="Carrello"
                style={{ width: 36, height: 36 }}
              />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    background: "orange",
                    color: "#222",
                    borderRadius: "50%",
                    padding: "2px 7px",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="profile-icon"
              style={{
                marginLeft: 24,
                display: "inline-block",
              }}
            >
              <img
                src={userIcon}
                alt="Profilo utente"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "3px solid orange",
                  boxShadow: "0 0 0 4px rgba(255,140,0,0.15)",
                  background: "#222",
                  objectFit: "cover",
                  transition: "box-shadow 0.2s",
                }}
              />
            </Link>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
