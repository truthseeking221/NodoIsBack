import * as React from "react";
import * as RadixToast from "@radix-ui/react-toast";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { tv } from "tailwind-variants";
import { cn } from "../lib/cn";

const toastVariants = tv({
  base: [
    "flex items-start gap-3 rounded-lg border bg-surface-elevated border-border",
    "px-4 py-3 pr-2 shadow-dropdown min-w-[320px] max-w-[420px]",
    "data-[state=open]:animate-slide-up data-[state=closed]:animate-fade-out",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
  ],
});

const iconByTone = {
  neutral: Info,
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

export const ToastProvider = RadixToast.Provider;

export interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Viewport> {}
export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  ToastViewportProps
>(({ className, ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2",
      "p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

export interface ToastProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixToast.Root>, "title"> {
  tone?: keyof typeof iconByTone;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const Toast = React.forwardRef<React.ElementRef<typeof RadixToast.Root>, ToastProps>(
  ({ className, tone = "neutral", title, description, action, ...props }, ref) => {
    const Icon = iconByTone[tone];
    const color = iconColorByTone[tone];
    return (
      <RadixToast.Root ref={ref} className={cn(toastVariants(), className)} {...props}>
        <span className={cn("mt-0.5 shrink-0", color)} aria-hidden>
          <Icon size={20} />
        </span>
        <div className="flex-1 min-w-0 py-0.5">
          {title && <RadixToast.Title className="text-h6 text-text-primary">{title}</RadixToast.Title>}
          {description && (
            <RadixToast.Description className="text-body-sm text-text-secondary">
              {description}
            </RadixToast.Description>
          )}
        </div>
        {action}
        <RadixToast.Close
          className="text-icon-muted hover:text-text-primary inline-flex size-8 items-center justify-center rounded-md hover:bg-white/5 transition-colors shrink-0"
          aria-label="Close"
        >
          <X size={16} />
        </RadixToast.Close>
      </RadixToast.Root>
    );
  }
);
Toast.displayName = "Toast";
