import { useState, useEffect } from "react";
import apiClient from "@/api/client";

const isVideoUrl = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v|3gp|quicktime)($|\?)/i.test(url);
};

const GalleryGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await apiClient.get("/gallery");
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load gallery items", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (loading) return <div className="text-center py-10">Loading gallery...</div>;

  if (items.length === 0) {
    return <div className="text-center text-ink/50 py-10">No items in the gallery yet.</div>;
  }

  const renderMedia = (url) => {
    if (isVideoUrl(url)) {
      return (
        <div className="h-48 relative overflow-hidden bg-black flex items-center justify-center">
          <video
            src={url}
            className="w-full h-full object-cover"
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
      );
    }
    return (
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${url})` }}
      />
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.id} className="glass-panel overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-gold/10">
            <div className="relative">
              <div className="absolute top-2 left-2 z-10 bg-black/60 text-pearl text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold">
                Before
              </div>
              {renderMedia(item.beforeUrl)}
            </div>
            <div className="relative">
              <div className="absolute top-2 left-2 z-10 bg-gold/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-semibold">
                After
              </div>
              {renderMedia(item.afterUrl)}
            </div>
          </div>
          <div className="p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              {item.category}
            </p>
            <h3 className="mt-2 font-display text-lg text-ink">{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
