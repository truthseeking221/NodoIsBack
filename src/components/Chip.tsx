import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const chipVariants = tv({
  base: [
    "inline-flex items-center justify-center whitespace-nowrap font-medium rounded-full border",
    "transition-[background-color,color,border-color] duration-fast ease-out",
    "focus-visible:shadow-focus-ring disabled:opacity-50 disabled:pointer-events-none",
  ],
  variants: {
    size: {
      sm: "h-7 px-2.5 text-body-sm",
      md: "h-8 px-3 text-body-md",
      lg: "h-9 px-3.5 text-body-md",
    },
    state: {
      default: "bg-white/5 text-text-primary border-border hover:bg-white/[0.09] hover:border-border-strong",
      selected: "bg-action-primary text-text-on-primary border-action-primary",
    },
  },
  defaultVariants: { size: "md", state: "default" },
});

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof chipVariants> {
  selected?: boolean;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, size, state, selected, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      className={cn(chipVariants({ size, state: selected ? "selected" : state }), className)}
      {...props}
    />
  )
);
Chip.displayName = "Chip";
