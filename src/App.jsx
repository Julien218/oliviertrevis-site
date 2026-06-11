import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CookieBanner from "./components/CookieBanner";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TourDeDourPage from "./pages/TourDeDourPage";
import ActualitesPage from "./pages/ActualitesPage";
import ContactPage from "./pages/ContactPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";
import AdminPage from "./pages/AdminPage";
import MascottePage from "./pages/MascottePage";
import FabianoPage from "./pages/FabianoPage";
import JsInnoviaPage from "./pages/JsInnoviaPage";
import JyTrixAiPage from "./pages/JyTrixAiPage";
import JsInnoviaPage2 from "./pages/JsInnoviaPage2";

export default function App() {
  return (
    <Router>
      <CookieBanner />
      <Routes>
        <Route path="/admin"     element={<AdminPage />} />
        <Route path="/mascotte"  element={<MascottePage />} />
        <Route path="/fabiano"   element={<FabianoPage />} />
        <Route path="/jytrixai"  element={<JyTrixAiPage />} />
        <Route path="/jsinnovia" element={<JsInnoviaPage2 />} />
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
