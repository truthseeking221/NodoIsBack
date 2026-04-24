import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const badgeVariants = tv({
  base: "inline-flex items-center justify-center whitespace-nowrap font-semibold",
  variants: {
    tone: {
      neutral: "",
      brand: "",
      success: "",
      warning: "",
      error: "",
      info: "",
    },
    appearance: {
      filled: "",
      soft: "",
      outline: "bg-transparent border",
    },
    size: {
      sm: "h-[18px] px-1.5 text-[10px] leading-3 rounded-[10px]",
      md: "h-[22px] px-2 text-body-sm rounded-xl",
      lg: "h-[26px] px-2.5 text-body-sm rounded-[14px]",
    },
  },
  compoundVariants: [
    // Filled
    { appearance: "filled", tone: "neutral", class: "bg-neutral-400 text-text-primary" },
    { appearance: "filled", tone: "brand", class: "bg-brand-500 text-neutral-0" },
    { appearance: "filled", tone: "success", class: "bg-feedback-success text-neutral-0" },
    { appearance: "filled", tone: "warning", class: "bg-feedback-warning text-neutral-0" },
    { appearance: "filled", tone: "error", class: "bg-feedback-error text-text-primary" },
    { appearance: "filled", tone: "info", class: "bg-feedback-info text-text-primary" },
    // Soft
    { appearance: "soft", tone: "neutral", class: "bg-white/10 text-text-secondary" },
    { appearance: "soft", tone: "brand", class: "bg-brand-900/60 text-brand-300" },
    { appearance: "soft", tone: "success", class: "bg-green-700/60 text-green-200" },
    { appearance: "soft", tone: "warning", class: "bg-orange-500/25 text-cream-200" },
    { appearance: "soft", tone: "error", class: "bg-red-700/60 text-red-100" },
    { appearance: "soft", tone: "info", class: "bg-blue-500/20 text-ice-200" },
    // Outline
    { appearance: "outline", tone: "neutral", class: "border-border text-text-primary" },
    { appearance: "outline", tone: "brand", class: "border-brand-400 text-brand-300" },
    { appearance: "outline", tone: "success", class: "border-feedback-success text-green-400" },
    { appearance: "outline", tone: "warning", class: "border-feedback-warning text-orange-300" },
    { appearance: "outline", tone: "error", class: "border-feedback-error text-red-200" },
    { appearance: "outline", tone: "info", class: "border-feedback-info text-ice-200" },
  ],
  defaultVariants: { tone: "neutral", appearance: "filled", size: "md" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, appearance, size, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone, appearance, size }), className)} {...props} />
  )
);
Badge.displayName = "Badge";
