import * as React from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const trackVariants = tv({
  base: "relative w-full overflow-hidden rounded-full bg-white/10",
  variants: {
    size: { sm: "h-1", md: "h-2", lg: "h-3" },
  },
  defaultVariants: { size: "md" },
});
const fillVariants = tv({
  base: "h-full w-full flex-1 transition-transform duration-slow ease-emphasized",
  variants: {
    tone: {
      brand: "bg-brand-500",
      success: "bg-feedback-success",
      warning: "bg-feedback-warning",
      error: "bg-feedback-error",
    },
  },
  defaultVariants: { tone: "brand" },
});

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixProgress.Root>, "value">,
    VariantProps<typeof trackVariants>,
    VariantProps<typeof fillVariants> {
  value?: number | null;
}

export const Progress = React.forwardRef<React.ElementRef<typeof RadixProgress.Root>, ProgressProps>(
  ({ className, size, tone, value = 0, ...props }, ref) => {
    const v = Math.max(0, Math.min(100, value ?? 0));
    return (
      <RadixProgress.Root ref={ref} className={cn(trackVariants({ size }), className)} value={v} {...props}>
        <RadixProgress.Indicator
          className={fillVariants({ tone })}
          style={{ transform: `translateX(-${100 - v}%)` }}
        />
      </RadixProgress.Root>
    );
  }
);
Progress.displayName = "Progress";
