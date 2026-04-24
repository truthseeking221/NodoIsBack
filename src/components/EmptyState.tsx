import * as React from "react";
import { cn } from "../lib/cn";

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, primaryAction, secondaryAction, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center text-center gap-4 py-12 px-6 max-w-md mx-auto",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="inline-flex size-20 items-center justify-center rounded-full bg-white/5 text-icon-muted">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-h4 text-text-primary">{title}</h3>
        {description && <p className="text-body-md text-text-secondary">{description}</p>}
      </div>
      {(primaryAction || secondaryAction) && (
        <div className="flex items-center gap-3 mt-2">
          {secondaryAction}
          {primaryAction}
        </div>
      )}
    </div>
  )
);
EmptyState.displayName = "EmptyState";
