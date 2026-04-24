import * as React from "react";
import { cn } from "../lib/cn";

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  nav?: React.ReactNode;
  actions?: React.ReactNode;
  /** Sticky to top, transparent until scrolled — good for landing pages. */
  sticky?: boolean;
  /** Glass backdrop blur — nice with sticky. */
  glass?: boolean;
}

export const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  ({ logo, nav, actions, sticky, glass, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "w-full z-40",
        sticky && "sticky top-0",
        glass
          ? "bg-bg/70 backdrop-blur-md border-b border-border-subtle"
          : "bg-surface-elevated border-b border-border-subtle",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-4 md:gap-6 px-4 md:px-6">
        {logo && <div className="flex items-center gap-2 shrink-0">{logo}</div>}
        {nav && <nav className="hidden md:flex items-center gap-1 flex-1">{nav}</nav>}
        <div className="flex-1 md:flex-none" />
        {actions && <div className="flex items-center gap-2 md:gap-3 shrink-0">{actions}</div>}
      </div>
    </header>
  )
);
TopBar.displayName = "TopBar";
