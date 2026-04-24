import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator, className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-body-md font-semibold text-text-primary">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-body-md text-text-tertiary hover:text-text-secondary transition-colors rounded px-0.5"
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span aria-hidden className="text-icon-muted flex items-center">
                  {separator ?? <ChevronRight size={14} />}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  )
);
Breadcrumb.displayName = "Breadcrumb";
