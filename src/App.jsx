import { NavLink, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Profile from "./pages/Profile";
import {Navbar, Nav, Container} from "react-bootstrap";

export default function App() {
    const location = useLocation();
    return (
    <Container className="mt-4">
      <Navbar className="mb-3 rounded" bg="light" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">
            React Router Mini App
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/courses" as={NavLink}>
              Courses
            </Nav.Link>
            <Nav.Link to="/profile" as={NavLink}>
              Profile
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        <p className="text-muted">Current route: {location.pathname}</p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Container>
  );
}
