import * as React from "react";
import { X } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const tagVariants = tv({
  base: "inline-flex items-center gap-1.5 whitespace-nowrap font-medium",
  variants: {
    tone: {
      neutral: "bg-white/10 text-text-secondary",
      brand: "bg-brand-900/60 text-brand-300",
      success: "bg-green-700/60 text-green-200",
      warning: "bg-orange-500/25 text-cream-200",
      error: "bg-red-700/60 text-red-100",
      info: "bg-blue-500/20 text-ice-200",
    },
    size: {
      sm: "h-[22px] px-2 text-body-sm rounded-md",
      md: "h-7 px-2.5 text-[13px] rounded-md",
      lg: "h-8 px-3 text-body-md rounded-lg",
    },
  },
  defaultVariants: { tone: "neutral", size: "md" },
});

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, tone, size = "md", onRemove, children, ...props }, ref) => {
    const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;
    return (
      <span ref={ref} className={cn(tagVariants({ tone, size }), className)} {...props}>
        <span className="truncate">{children}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className="inline-flex shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={iconSize} />
          </button>
        )}
      </span>
    );
  }
);
Tag.displayName = "Tag";
