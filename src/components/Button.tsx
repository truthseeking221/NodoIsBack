import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

/**
 * Button — maps 1:1 to Figma `Button` component set.
 *
 * Variants: 6 types × 3 sizes × 6 states. Tokens:
 *   Primary   → bg Action/Primary (white) + text On Primary (black)
 *   Secondary → bg Action/Secondary + border Default
 *   Tertiary  → bordered ghost
 *   Ghost     → transparent, hover lights bg
 *   Danger    → red
 *   Link      → underlined text-only
 */
export const buttonVariants = tv({
  base: [
    "inline-flex items-center justify-center gap-2 rounded-md font-bold whitespace-nowrap",
    "transition-[background-color,color,border-color,box-shadow] duration-fast ease-out",
    "disabled:pointer-events-none disabled:opacity-50 select-none",
    "focus-visible:shadow-focus-ring",
  ],
  variants: {
    variant: {
      primary: [
        "bg-action-primary text-text-on-primary",
        "hover:bg-action-primary-hover active:bg-action-primary-pressed",
      ],
      secondary: [
        "bg-action-secondary/5 text-text-primary border border-border",
        "hover:bg-action-secondary-hover/[0.09] hover:border-border-strong",
        "active:bg-white/[0.12]",
      ],
      tertiary: [
        "bg-transparent text-text-primary border border-border",
        "hover:bg-action-ghost-hover/5 hover:border-border-strong",
        "active:bg-white/[0.12]",
      ],
      ghost: [
        "bg-transparent text-text-primary border-0",
        "hover:bg-action-ghost-hover/5",
        "active:bg-white/[0.12]",
      ],
      danger: [
        "bg-action-danger text-text-primary",
        "hover:bg-action-danger-hover active:bg-red-700",
      ],
      link: [
        "bg-transparent text-brand-300 underline underline-offset-4 px-0 h-auto",
        "hover:text-brand-400 active:text-brand-500",
      ],
    },
    size: {
      sm: "h-8 px-3 text-button-sm gap-1.5",
      md: "h-10 px-4 text-button-md gap-2",
      lg: "h-12 px-5 text-button-lg gap-2",
    },
    fullWidth: { true: "w-full" },
    iconOnly: { true: "px-0 aspect-square" },
  },
  compoundVariants: [
    { variant: "link", class: "h-auto p-0" },
    { variant: "link", size: "sm", class: "text-button-sm" },
    { variant: "link", size: "md", class: "text-button-md" },
    { variant: "link", size: "lg", class: "text-button-lg" },
  ],
  defaultVariants: { variant: "primary", size: "md" },
});

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonVariants> {
  type?: "button" | "submit" | "reset";
  asChild?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      iconOnly,
      asChild,
      leadingIcon,
      trailingIcon,
      loading,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size, fullWidth, iconOnly }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <Loader2 size={iconSize} className="animate-spin-slow shrink-0" aria-hidden />
        ) : (
          leadingIcon && (
            <span className="shrink-0 [&>svg]:size-[1em]" aria-hidden>
              {leadingIcon}
            </span>
          )
        )}
        {children && <span className="truncate">{children}</span>}
        {!loading && trailingIcon && (
          <span className="shrink-0 [&>svg]:size-[1em]" aria-hidden>
            {trailingIcon}
          </span>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

/** Square icon-only button. Pairs with the Figma `Button/Icon` set. */
export interface IconButtonProps
  extends Omit<ButtonProps, "leadingIcon" | "trailingIcon" | "children" | "iconOnly" | "fullWidth"> {
  "aria-label": string;
  icon: React.ReactNode;
}
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", className, ...props }, ref) => {
    const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;
    return (
      <Button
        ref={ref}
        size={size}
        iconOnly
        className={cn(className)}
        {...props}
      >
        <span
          className="inline-flex items-center justify-center"
          style={{ width: iconSize, height: iconSize }}
          aria-hidden
        >
          {icon}
        </span>
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";
