import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "@/lib/LanguageContext.jsx";
import Navbar from "@/components/layout/Navbar.jsx";
import Footer from "@/components/layout/Footer.jsx";
import Home from "@/pages/Home.jsx";
import Services from "@/pages/Services.jsx";
import ServiceDetails from "@/pages/ServiceDetails.jsx";
import Packs from "@/pages/Packs.jsx";
import Promotions from "@/pages/Promotions.jsx";
import Estheticians from "@/pages/Estheticians.jsx";
import Booking from "@/pages/Booking.jsx";
import Gallery from "@/pages/Gallery.jsx";
import Blog from "@/pages/Blog.jsx";
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import UserProfile from "@/pages/UserProfile.jsx";
import AdminDashboard from "@/pages/AdminDashboard.jsx";
import ClientDashboard from "@/pages/ClientDashboard.jsx";
import EstheticianDashboard from "@/pages/EstheticianDashboard.jsx";
import NotFound from "@/pages/NotFound.jsx";

const App = () => {
  return (
    <LanguageProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-pearl text-ink font-body">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/packs" element={<Packs />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/estheticians" element={<Estheticians />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/esthetician" element={<EstheticianDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
