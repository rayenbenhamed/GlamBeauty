const SectionHeader = ({ eyebrow, title, subtitle }) => {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="text-xs uppercase tracking-[0.35em] text-gold/80">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-sm text-ink/70">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;
