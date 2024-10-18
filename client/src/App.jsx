import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/HomePage";
import Login from "./pages/Auth/Login/LoginPage";
import Register from "./pages/Auth/Register/RegisterPage";
import OutsideRegistration from "./pages/Auth/OutsideRegistration/OutsideRegistrationPage";
import Team from "./pages/Team/TeamPage";
import Navbar from "./Components/General/Navbar";
import Footer from "./Components/General/Footer";
import CulravLanding from "./pages/Culrav/LandingPage";
import AvishkarLanding from "./pages/Avishkar/LandingPage";
import CulravEvents from "./pages/Culrav/AllEvents";
import AvishkarEvents from "./pages/Avishkar/AllEvents";
import CulravEvent from "./pages/Culrav/EventPage";
import AvishkarEvent from "./pages/Avishkar/EventPage";
import PayFeesPage from "./pages/PayFees/PayRegistrationFeePage";

const TitleUpdater = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    let title = "";

    switch (pathname) {
      case "/":
        title += "Home";
        break;
      case "/login":
        title += "Login";
        break;
      case "/registration":
        title += " Registration";
        break;
      case "/outside-registration":
        title += " Outside Registration";
        break;
      case "/outside-registration/payFee":
        title += " Pay Fees";
        break;
      case "/Culrav-Landing":
        title += " Culrav Landing";
        break;
      case "/CulravEvents":
        title += " Culrav Events";
        break;
      case "/CulravEventPage":
        title += " Culrav Event";
        break;
      case "/Avishkar-Landing":
        title += " Avishkar Landing";
        break;
      case "/AvishkarEvents":
        title += " Avishkar Events";
        break;
      case "/AvishkarEventPage":
        title += " Avishkar Event";
        break;
      case "/team":
        title += " Team";
        break;
      default:
        title += "";
    }

    document.title = title;
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <Navbar />
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/outside-registration" element={<OutsideRegistration />} />
        <Route path="/outside-registration/payFee" element={<PayFeesPage />} />
        <Route path="/Culrav-Landing" element={<CulravLanding />} />
        <Route path="/CulravEvents" element={<CulravEvents />} />
        <Route path="/CulravEventPage" element={<CulravEvent />} />
        <Route path="/Avishkar-Landing" element={<AvishkarLanding />} />
        <Route path="/AvishkarEvents" element={<AvishkarEvents />} />
        <Route path="/AvishkarEventPage" element={<AvishkarEvent />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
