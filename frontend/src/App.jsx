import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Gothras from './pages/Gothras/Gothras'
import Events from './pages/Events/Events'
import EventDetails from './components/events/EventDetails'
import Gallery from './pages/Gallery/Gallery'
import Membership from './pages/Membership/Membership'
import Matrimony from './pages/Matrimony/Matrimony'
import MatrimonyRegister from './pages/Matrimony/MatrimonyRegister'
import Contact from './pages/Contact/Contact'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import ChangePassword from './pages/Auth/ChangePassword'
import Profile from './pages/Profile/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from "./components/ScrollToTop";
import News from './pages/News/News'
import NewsDetails from './pages/News/NewsDetails'
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/events"     element={<Events />} />
          <Route path="/events/:slug" element={<EventDetails />} />
          <Route path="/gothras"    element={<Gothras />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/news"       element={<News />} />
          <Route path="/news/:slug" element={<NewsDetails />} />
          <Route path="/matrimony"  element={<Matrimony />} />
          <Route path="/matrimony/register" element={<MatrimonyRegister />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/membership/forgot-password" element={<ForgotPassword />} />
          <Route path="/membership/reset-password" element={<ResetPassword />} />
          <Route path="/profile"    element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App