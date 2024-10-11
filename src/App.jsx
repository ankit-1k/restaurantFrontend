import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import "./assets/css/animate/animate.css";
import "./assets/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import MenuTab from "./Components/Menu/MenuTab";
import Booking from "./Components/Pages/Booking";
import Ourteam from "./Components/Pages/Ourteam";
import Contact from "./Components/Contact/Contact";
import TestimonialTab from "./Components/Pages/TestimonialTab";
import Login from "./Auth/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import Register from "./Auth/Register";
import Terms from "./Components/Terms/Terms";

const App = () => {
  const about = "About Us";
  const services = "Services";
  const foodmenu = "Food Menu";
  const booking = "Booking";
  const ourteam = "Our Team";
  const testimonial = "Testimonial";
  const contact = "Contact Us";
  const terms = "Terms & Conditions";
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); // User successfully logged in
  };

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} /> {/* Ensure this uses onLogin */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About props={about} />} />
        <Route path="/services" element={<Services props={services} />} />
        <Route path="/menu" element={<MenuTab props={foodmenu} />} />
        <Route path="/booking" element={<Booking props={booking} />} />
        <Route path="/team" element={<Ourteam props={ourteam} />} />
        <Route
          path="/testimonial"
          element={<TestimonialTab props={testimonial} />}
        />
        <Route path="/contact" element={<Contact props={contact} />} />
        <Route path="/terms" element={<Terms props={terms} />} />
      </Routes>
    </Router>
  );
};

export default App;
