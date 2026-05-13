import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AProposPage from "./pages/AProposPage";
import ProjetsPage from "./pages/ProjetsPage";
import TourDeDourPage from "./pages/TourDeDourPage";
import VideosPage from "./pages/VideosPage";
import ActualitesPage from "./pages/ActualitesPage";
import GaleriePage from "./pages/GaleriePage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin sans Layout */}
        <Route path="/admin" element={<AdminPage />} />
        {/* Site public avec Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/"                  element={<HomePage />} />
              <Route path="/a-propos"          element={<AProposPage />} />
              <Route path="/projets"           element={<ProjetsPage />} />
              <Route path="/tour-de-dour"      element={<TourDeDourPage />} />
              <Route path="/videos"            element={<VideosPage />} />
              <Route path="/actualites"        element={<ActualitesPage />} />
              <Route path="/galerie"           element={<GaleriePage />} />
              <Route path="/contact"           element={<ContactPage />} />
              <Route path="/mentions-legales"  element={<MentionsLegalesPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}
