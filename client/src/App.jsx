import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Navbar />
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
