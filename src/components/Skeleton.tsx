import * as React from "react";
import { cn } from "../lib/cn";

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white/[0.08] rounded-md relative overflow-hidden",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent",
        "before:animate-[shimmer_1.6s_infinite]",
        className
      )}
      style={{ ["--tw-shimmer" as string]: "1" }}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

export const Spinner = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={cn("animate-spin-slow text-text-primary", className)}
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.2" />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);
