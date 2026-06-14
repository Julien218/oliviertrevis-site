import { useEffect } from "react";

export default function MascotteSeo({ mascotte }) {
  useEffect(() => {
    if (!mascotte) return;

    document.title = mascotte.seo_titre || `${mascotte.nom} — Mascotte du Tour de Dour`;

    const setMeta = (name, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", mascotte.seo_description || mascotte.description);
    setMeta("keywords", mascotte.seo_mots_cles);
    setMeta("og:title", mascotte.seo_titre || `${mascotte.nom} — Tour de Dour`);
    setMeta("og:description", mascotte.seo_description || mascotte.description);
    setMeta("og:image", mascotte.image_og || mascotte.image_principale);
    setMeta("og:type", "website");
    setMeta("og:url", window.location.href);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", mascotte.seo_titre || `${mascotte.nom} — Tour de Dour`);
    setMeta("twitter:description", mascotte.seo_description || mascotte.description);
    setMeta("twitter:image", mascotte.image_og || mascotte.image_principale);

    return () => {
      document.title = "Olivier Trevis";
    };
  }, [mascotte]);

  return null;
}