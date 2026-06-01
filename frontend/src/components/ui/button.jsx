import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const variants = {
      primary: "bg-ink text-pearl hover:bg-black/80",
      outline: "border border-ink/20 text-ink hover:border-ink",
      ghost: "text-ink hover:bg-ink/5"
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-5 py-3 text-sm",
      lg: "px-6 py-4 text-base"
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-full transition duration-300 font-semibold tracking-wide",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
