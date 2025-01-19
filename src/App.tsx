/* eslint-disable @typescript-eslint/no-unused-expressions */
import "./App.css";
import { SignUpSignInToggle } from "./pages/SignUpSignInToggle";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Dashboard } from "./pages/Dashboard";
import { Contact } from "./pages/Contact";
import { Footer } from "./components/Footer";

SignUpSignInToggle;
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
