import { cn } from "@/lib/utils";

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-3xl border border-white/40 bg-white/70 shadow-glow backdrop-blur-xl",
      className
    )}
    {...props}
  />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("p-6 pb-2", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-2", className)} {...props} />
);

export { Card, CardHeader, CardContent };
