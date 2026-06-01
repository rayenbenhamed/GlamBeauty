import SectionHeader from "@/components/SectionHeader.jsx";
import GalleryGrid from "@/components/GalleryGrid.jsx";

const Gallery = () => {
  return (
    <main className="section-shell py-16">
      <SectionHeader
        eyebrow="Gallery"
        title="Before and after transformations"
        subtitle="Witness the artistry behind each glow-up."
      />
      <GalleryGrid />
    </main>
  );
};

export default Gallery;
