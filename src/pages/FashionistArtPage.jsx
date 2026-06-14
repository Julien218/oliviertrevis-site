import { useEffect } from "react";

export default function FashionistArtPage() {
  useEffect(() => {
    // Rediriger vers la vraie landing page statique
    // (servie directement par nginx pour garder la vidéo + timeline intactes)
    window.location.replace("/unesco");
  }, []);
  return null;
}
