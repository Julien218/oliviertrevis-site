import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/"                 element={<HomePage />} />
              <Route path="/projets"          element={<ProjetsPage />} />
              <Route path="/tour-de-dour"     element={<TourDeDourPage />} />
              <Route path="/videos"           element={<VideosPage />} />
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
