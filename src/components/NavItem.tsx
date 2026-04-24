import * as React from "react";
import { cn } from "../lib/cn";

export interface NavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  collapsed?: boolean;
}

export const NavItem = React.forwardRef<HTMLButtonElement, NavItemProps>(
  ({ icon, active, collapsed, children, className, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center gap-3 rounded-md px-3 h-10 text-label-lg w-full",
          "transition-colors duration-fast focus-visible:shadow-focus-ring",
          active
            ? "bg-white/[0.09] text-text-primary font-semibold"
            : "text-text-secondary hover:bg-white/[0.05] hover:text-text-primary",
          collapsed && "w-11 justify-center px-0",
          className
        )}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        {icon && (
          <span className={cn("shrink-0 inline-flex", active ? "text-brand-300" : "text-icon-muted")} aria-hidden>
            {icon}
          </span>
        )}
        {!collapsed && <span className="truncate flex-1 text-left">{children}</span>}
      </button>
    );
  }
);
NavItem.displayName = "NavItem";
