import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import githubIcon from "../assets/img/Github.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

import userIcon from "../assets/img/user.svg";
import cartIcon from "../assets/img/cart.svg";

export const NavBar = ({ cartCount, onExpand }) => {
  const [avatar, setAvatar] = useState("");
  const [user, setUser] = useState(null);
  const [ruolo, setRuolo] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(false);

  // Funzione per aggiornare i dati utente
  const updateUserData = () => {
    const nome = localStorage.getItem("nome");
    const cognome = localStorage.getItem("cognome");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (token && nome && cognome) {
      setUser({ nome, cognome, email });
    } else {
      setUser(null);
    }

    setRuolo(localStorage.getItem("ruolo") || "");
    setAvatar(localStorage.getItem(`avatar_${email}`) || "");
  };

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
    // Carica i dati iniziali
    updateUserData();
  }, []);

  useEffect(() => {
    // Listener per cambiamenti nel localStorage (avatar)
    const onStorage = () => {
      const email = localStorage.getItem("email");
      setAvatar(localStorage.getItem(`avatar_${email}`) || "");
    };

    // Listener per login dell'utente
    const onUserLogin = () => {
      updateUserData();
    };

    // Listener per logout dell'utente
    const onUserLogout = () => {
      setUser(null);
      setRuolo("");
      setAvatar("");
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("userLoggedIn", onUserLogin);
    window.addEventListener("userLoggedOut", onUserLogout);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("userLoggedIn", onUserLogin);
      window.removeEventListener("userLoggedOut", onUserLogout);
    };
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <>
      <Navbar
        expand="md"
        expanded={expanded}
        onToggle={(val) => {
          setExpanded(val);
          if (onExpand) onExpand(val);
        }}
        className={`navbar${scrolled ? " scrolled" : ""}`}
      >
        <Container>
          <Navbar.Brand href="/" className={show ? "logo-hide" : ""}>
            <img src={logo} alt="Logo" className="logo2" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvas-navbar"
            onClick={() => setShow((prev) => !prev)}
            style={{ border: "none" }}
          />
          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-md-flex">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/shop"
                className={
                  activeLink === "Shop" ? "active navbar-link" : "navbar-link"
                }
                title="shop"
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
                title="Home"
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
                title="Chi siamo"
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
                  title="Backoffice"
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
                  <img src={navIcon1} alt="linkedIn" title="LinkedIn" />
                </a>
                <a
                  href="https://github.com/Roberto2ciancio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon} alt="GitHub" title="GitHub" />
                </a>
                <a href="https://www.instagram.com/robertociancio__/">
                  <img src={navIcon3} alt="Instagram" title="Instagram" />
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

      <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        id="offcanvas-navbar"
        style={{
          background: "#181a1b",
          color: "#fff",
          width: "270px",
          maxWidth: "80vw",
          zIndex: 5000, //
        }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <span style={{ color: "orange", fontWeight: 700, fontSize: 24 }}>
              PCSTORE
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/shop"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => {
                setShow(false);
                onUpdateActiveLink("Shop");
              }}
            >
              Shop
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => {
                setShow(false);
                onUpdateActiveLink("Home");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/chi-siamo"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => {
                setShow(false);
                onUpdateActiveLink("Chi Siamo");
              }}
            >
              Chi Siamo
            </Nav.Link>
            {ruolo === "ADMIN" && (
              <Nav.Link
                as={Link}
                to="/admin/backoffice"
                style={{ color: "#fff", textDecoration: "none" }}
                onClick={() => {
                  setShow(false);
                  onUpdateActiveLink("Backoffice");
                }}
              >
                Backoffice
              </Nav.Link>
            )}
            <Nav.Link
              as={Link}
              to="/cart"
              style={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
              onClick={() => setShow(false)}
            >
              Carrello
              {cartCount > 0 && (
                <span
                  style={{
                    background: "orange",
                    color: "#222",
                    borderRadius: "50%",
                    padding: "2px 7px",
                    fontSize: 12,
                    fontWeight: 700,
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={user ? "/profile" : "/account"}
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => setShow(false)}
            >
              {user ? "Profilo" : "Accedi"}
            </Nav.Link>
          </Nav>

          {/* Social Media Icons Section */}
          <div
            style={{
              marginTop: "30px",
              paddingTop: "20px",
              borderTop: "1px solid #444",
            }}
          >
            <h6
              style={{
                color: "orange",
                marginBottom: "15px",
                fontWeight: 600,
              }}
            >
              Seguici su
            </h6>
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "flex-start",
              }}
            >
              <a
                href="https://www.linkedin.com/in/roberto-ciancio-373ba5293/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
              >
                <img
                  src={navIcon1}
                  alt="linkedin"
                  title="linkedin"
                  style={{ width: 32, height: 32 }}
                />
              </a>
              <a
                href="https://github.com/Roberto2ciancio"
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  title="GitHub"
                  style={{ width: 32, height: 32 }}
                />
              </a>
              <a
                href="https://www.instagram.com/robertociancio__/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: 0.8, transition: "opacity 0.2s" }}
                onMouseEnter={(e) => (e.target.style.opacity = 1)}
                onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
              >
                <img
                  src={navIcon3}
                  alt="Instagram"
                  title="Instagram"
                  style={{ width: 32, height: 32 }}
                />
              </a>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
