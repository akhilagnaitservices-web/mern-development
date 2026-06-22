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
import Contact from './pages/Contact/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import Chat from './pages/Chat/Chat'
import ScrollToTop from "./components/ScrollToTop";
import News from './pages/News/News'

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
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/gothras"    element={<Gothras />} />
          <Route path="/gallery"    element={<Gallery />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/news"       element={<News />} />
          <Route path="/matrimony"  element={<Matrimony />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/chat"       element={<Chat />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App