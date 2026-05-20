import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TourDeDourPage from "./pages/TourDeDourPage";
import ActualitesPage from "./pages/ActualitesPage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import AdminPage from "./pages/AdminPage";
import MascottePage from "./pages/MascottePage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pages sans layout (fullscreen) */}
        <Route path="/admin"    element={<AdminPage />} />
        <Route path="/mascotte" element={<MascottePage />} />

        {/* Pages avec layout normal */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/"                 element={<HomePage />} />
              <Route path="/tour-de-dour"     element={<TourDeDourPage />} />
              <Route path="/actualites"       element={<ActualitesPage />} />
              <Route path="/contact"          element={<ContactPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

// rebuild-1779312575
