import * as React from "react";
import { cn } from "../lib/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "subtle" | "default" | "strong";
  label?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = "horizontal", variant = "default", label, className, ...props }, ref) => {
    const color =
      variant === "strong" ? "bg-border-strong" : variant === "subtle" ? "bg-border-subtle" : "bg-border";
    if (orientation === "vertical") {
      return <div ref={ref} role="separator" aria-orientation="vertical" className={cn("w-px h-full shrink-0", color, className)} {...props} />;
    }
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("flex items-center gap-3 w-full text-caption text-text-tertiary", className)}
          {...props}
        >
          <div className={cn("h-px flex-1", color)} />
          <span>{label}</span>
          <div className={cn("h-px flex-1", color)} />
        </div>
      );
    }
    return <div ref={ref} role="separator" className={cn("h-px w-full", color, className)} {...props} />;
  }
);
Divider.displayName = "Divider";
