import React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-2xl border border-ink/15 bg-white/80 px-4 py-3 text-sm text-ink",
      "placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-gold/50",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export default Textarea;
