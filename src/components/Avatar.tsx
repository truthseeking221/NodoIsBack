import * as React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const avatarVariants = tv({
  base: "relative inline-flex shrink-0 overflow-visible",
  variants: {
    size: {
      xs: "size-5",
      sm: "size-6",
      md: "size-8",
      lg: "size-10",
      xl: "size-14",
    },
  },
  defaultVariants: { size: "md" },
});
const imgVariants = tv({
  base: "size-full rounded-full overflow-hidden",
});
const statusDot = tv({
  base: "absolute bottom-0 right-0 rounded-full ring-2 ring-bg",
  variants: {
    size: {
      xs: "size-1.5",
      sm: "size-2",
      md: "size-2.5",
      lg: "size-3",
      xl: "size-3.5",
    },
    status: {
      online: "bg-feedback-success",
      offline: "bg-neutral-600",
      busy: "bg-feedback-error",
    },
  },
});
const initialsText = tv({
  base: "inline-flex size-full items-center justify-center font-semibold bg-brand-500 text-neutral-0 rounded-full",
  variants: {
    size: {
      xs: "text-[10px]",
      sm: "text-[11px]",
      md: "text-[13px]",
      lg: "text-body-md",
      xl: "text-h5",
    },
  },
});

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  fallback?: React.ReactNode;
  status?: "online" | "offline" | "busy";
  className?: string;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, initials, fallback, status, size = "md", className }, ref) => (
    <RadixAvatar.Root ref={ref} className={cn(avatarVariants({ size }), className)}>
      {src && (
        <RadixAvatar.Image src={src} alt={alt ?? ""} className={imgVariants()} />
      )}
      <RadixAvatar.Fallback className={initialsText({ size })}>
        {initials ?? fallback}
      </RadixAvatar.Fallback>
      {status && <span className={statusDot({ size, status })} aria-label={status} />}
    </RadixAvatar.Root>
  )
);
Avatar.displayName = "Avatar";
