import { galleryItems } from "@/data/mockData";

const GalleryGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {galleryItems.map((item) => (
        <div key={item.id} className="glass-panel overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.before})` }}
            />
            <div
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.after})` }}
            />
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
