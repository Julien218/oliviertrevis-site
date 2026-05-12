import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AProposPage from "./pages/AProposPage";
import AsblPage from "./pages/AsblPage";
import MissMisterDourPage from "./pages/MissMisterDourPage";
import TourDeDourPage from "./pages/TourDeDourPage";
import VideosPage from "./pages/VideosPage";
import ActualitesPage from "./pages/ActualitesPage";
import GaleriePage from "./pages/GaleriePage";
import PartenairesPage from "./pages/PartenairesPage";
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
              <Route path="/" element={<HomePage />} />
              <Route path="/a-propos" element={<AProposPage />} />
              <Route path="/asbl" element={<AsblPage />} />
              <Route path="/miss-mister-dour" element={<MissMisterDourPage />} />
              <Route path="/tour-de-dour" element={<TourDeDourPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/actualites" element={<ActualitesPage />} />
              <Route path="/galerie" element={<GaleriePage />} />
              <Route path="/partenaires" element={<PartenairesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}
