import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

import userIcon from "../assets/img/user.svg";
import cartIcon from "../assets/img/cart.svg";

export const NavBar = ({ cartCount }) => {
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState(null);
  const [ruolo, setRuolo] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

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

  useEffect(() => {
    const nome = localStorage.getItem("nome");
    const cognome = localStorage.getItem("cognome");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    if (token && nome && cognome) {
      setUser({ nome, cognome, email });
    }
    setRuolo(localStorage.getItem("ruolo"));

    setAvatar(localStorage.getItem(`avatar_${email}`) || "");
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const email = localStorage.getItem("email");
      setAvatar(localStorage.getItem(`avatar_${email}`) || "");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
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

            {ruolo === "ADMIN" && (
              <Nav.Link
                as={Link}
                to="/admin/backoffice"
                className={
                  activeLink === "Backoffice"
                    ? "active navbar-link"
                    : "navbar-link"
                }
                onClick={() => onUpdateActiveLink("Backoffice")}
              >
                Backoffice
              </Nav.Link>
            )}
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/roberto-ciancio-373ba5293/
"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon1} alt="Instagram" />
              </a>
              <a href="" target="_blank" rel="noopener noreferrer">
                <img src={navIcon2} alt="LinkedIn" />
              </a>
              <a href="https://www.instagram.com/robertociancio__/">
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
            {user ? (
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  marginLeft: 12,
                  display: "inline-block",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, orange 60%, #23272b 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        setAvatar("");
                        localStorage.removeItem(`avatar_${user.email}`);
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: "#23272b",
                        fontWeight: 700,
                        fontSize: 18,
                      }}
                    >
                      {user.nome?.[0] || ""}
                      {user.cognome?.[0] || ""}
                    </span>
                  )}
                </div>
              </Link>
            ) : (
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
            )}
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
