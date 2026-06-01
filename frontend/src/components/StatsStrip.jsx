const StatsStrip = () => {
  const stats = [
    { label: "Luxury Services", value: "80+" },
    { label: "Expert Estheticians", value: "12" },
    { label: "5-Star Reviews", value: "1.2k" }
  ];

  return (
    <div className="glass-panel grid gap-6 p-8 text-center md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-3xl text-ink">{stat.value}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ink/60">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;
