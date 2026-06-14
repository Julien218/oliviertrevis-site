import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SPIRIT_COLORS } from "@/api/mascottes";

function GalleryItem({ src, alt, spirit, index }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06 }}
        className="cursor-pointer rounded-2xl overflow-hidden relative group"
        style={{ border: `1px solid ${spirit.primary}15` }}
        onClick={() => setOpen(true)}
      >
        <img src={src} alt={alt} className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={src}
              alt={alt}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
              style={{ boxShadow: `0 0 80px ${spirit.glow}` }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function MediaVault({ mascotte }) {
  const spirit = SPIRIT_COLORS[mascotte?.slug] || SPIRIT_COLORS.lion;

  // Collect all gallery images
  const images = [];
  if (mascotte?.galerie_photos) {
    (Array.isArray(mascotte.galerie_photos) ? mascotte.galerie_photos : [mascotte.galerie_photos])
      .forEach(url => url && images.push(url));
  }
  if (mascotte?.galerie_illustrations) {
    (Array.isArray(mascotte.galerie_illustrations) ? mascotte.galerie_illustrations : [mascotte.galerie_illustrations])
      .forEach(url => url && images.push(url));
  }
  if (mascotte?.galerie_ia) {
    (Array.isArray(mascotte.galerie_ia) ? mascotte.galerie_ia : [mascotte.galerie_ia])
      .forEach(url => url && images.push(url));
  }
  // Fallback to image_principale if no gallery
  if (images.length === 0 && mascotte?.image_principale) {
    images.push(mascotte.image_principale);
  }

  // Collect videos
  const videos = [];
  if (mascotte?.videos) {
    (Array.isArray(mascotte.videos) ? mascotte.videos : [mascotte.videos])
      .forEach(url => url && videos.push(url));
  }

  if (images.length === 0 && videos.length === 0) return null;

  return (
    <section className="relative py-24 px-6" style={{ background: "#0A0A0B" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${spirit.primary}20, transparent)` }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-3"
            style={{ color: spirit.primary, opacity: 0.5 }}>
            Médias
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Cinzel', serif", color: "#F5F5F7" }}>
            Galerie & Vidéos
          </h2>
          <div className="mt-4 h-px w-24"
            style={{ background: `linear-gradient(90deg, ${spirit.primary}, transparent)` }} />
        </motion.div>

        {/* Gallery bento grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-12">
            {images.map((img, i) => (
              <GalleryItem key={i} src={img} alt={`${mascotte?.nom} - ${i + 1}`} spirit={spirit} index={i} />
            ))}
          </div>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${spirit.primary}15` }}
              >
                {url.includes("youtube") || url.includes("youtu.be") ? (
                  <iframe
                    src={url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                    title={`Vidéo ${mascotte?.nom} ${i + 1}`}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={url} controls className="w-full aspect-video" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}