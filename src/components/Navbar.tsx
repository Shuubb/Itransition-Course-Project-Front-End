import { useState } from "react";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext/useUserContext";
import Logo from "../assets/logo.svg";
import { useSubmit } from "react-router-dom";

export default function MyNavbar() {
    const [openBasic, setOpenBasic] = useState(false);

    const { user } = useUserContext();
    const submit = useSubmit();

    return (
        <>
            <Navbar expand="lg" className="myContainer bg-light-subtle shadow vw-100">
                <Container fluid className="mx-3">
                    <NavLink className="text-decoration-none text-light-subtle px-2" to="/">
                        <Image src={Logo} alt="LOGO" width="40px" rounded className="shadow" />
                    </NavLink>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setOpenBasic(!openBasic)}>
                        <span className="navbar-toggler-icon" />
                    </Navbar.Toggle>

                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="mb-2 mb-lg-0 w-auto">
                            {user && (
                                <NavLink to="/personal" className="nav-link">
                                    Personal Page
                                </NavLink>
                            )}
                            <NavLink to="/collections" className="nav-link">
                                Collections
                            </NavLink>
                            <NavLink to="/items" className="nav-link">
                                Items
                            </NavLink>
                        </Nav>

                        <Nav className="mb-2 mb-lg-0 w-auto">
                            {user ? (
                                <Button
                                    className="nav-link"
                                    onClick={() =>
                                        submit(
                                            {},
                                            {
                                                method: "DELETE",
                                                action: "/login/",
                                            }
                                        )
                                    }
                                >
                                    Logout
                                </Button>
                            ) : (
                                <>
                                    <NavLink to="/login" className="nav-link">
                                        Login
                                    </NavLink>
                                    <NavLink to="/register" className="nav-link">
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
