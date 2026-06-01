import { cn } from "@/lib/utils";

const Badge = ({ className, ...props }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-ink/20 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink/70",
      className
    )}
    {...props}
  />
);

export default Badge;
