import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TourDeDourPage from "./pages/TourDeDourPage";
import ActualitesPage from "./pages/ActualitesPage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import AdminPage from "./pages/AdminPage";
import MascottesListPage from "./pages/MascottesListPage";
import MascotteDetailPage from "./pages/MascotteDetailPage";
import FabianoPage from "./pages/FabianoPage";
import FashionistArtPage from "./pages/FashionistArtPage";

export default function App() {
  return (
    <Router>
      <CookieBanner />
      <Routes>
        <Route path="/admin"     element={<AdminPage />} />
        <Route path="/mascotte"  element={<MascottesListPage />} />
        <Route path="/mascottes" element={<MascottesListPage />} />
        <Route path="/lion"      element={<MascotteDetailPage />} />
        <Route path="/canari"    element={<MascotteDetailPage />} />
        <Route path="/biche"     element={<MascotteDetailPage />} />
        <Route path="/renard"    element={<MascotteDetailPage />} />
        <Route path="/ours"      element={<MascotteDetailPage />} />
        <Route path="/licorne"   element={<MascotteDetailPage />} />
        <Route path="/fabiano"   element={<FabianoPage />} />
        <Route path="/fashionistart" element={<FashionistArtPage />} />
        <Route path="/unesco"       element={<FashionistArtPage />} />
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
