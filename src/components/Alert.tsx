import * as React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Bell } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const alertVariants = tv({
  base: "flex gap-3 items-start rounded-lg border px-4 py-3",
  variants: {
    tone: {
      neutral: "bg-white/5 border-border text-text-primary",
      success: "bg-green-700/60 border-feedback-success text-text-primary",
      warning: "bg-orange-500/20 border-feedback-warning text-text-primary",
      error: "bg-red-700/60 border-feedback-error text-text-primary",
      info: "bg-blue-500/20 border-feedback-info text-text-primary",
    },
  },
  defaultVariants: { tone: "neutral" },
});

const iconByTone = {
  neutral: Bell,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
} as const;
const iconColorByTone = {
  neutral: "text-icon",
  success: "text-feedback-success",
  warning: "text-feedback-warning",
  error: "text-feedback-error",
  info: "text-feedback-info",
} as const;

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, tone = "neutral", title, description, action, icon, children, ...props }, ref) => {
    const IconCmp = iconByTone[tone ?? "neutral"];
    const color = iconColorByTone[tone ?? "neutral"];
    return (
      <div ref={ref} role="alert" className={cn(alertVariants({ tone }), className)} {...props}>
        <span className={cn("shrink-0 mt-0.5", color)} aria-hidden>
          {icon ?? <IconCmp size={20} />}
        </span>
        <div className="flex-1 min-w-0">
          {title && <p className="text-h6 mb-0.5">{title}</p>}
          {description && <p className="text-body-md text-text-secondary">{description}</p>}
          {children}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    );
  }
);
Alert.displayName = "Alert";
