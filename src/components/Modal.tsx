import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const contentVariants = tv({
  base: [
    "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
    "rounded-2xl border border-border bg-surface-elevated shadow-modal overflow-hidden",
    "w-[calc(100%-32px)] max-h-[calc(100vh-64px)] flex flex-col",
    "data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out",
  ],
  variants: {
    size: {
      sm: "max-w-[400px]",
      md: "max-w-[520px]",
      lg: "max-w-[720px]",
      xl: "max-w-[960px]",
    },
  },
  defaultVariants: { size: "md" },
});

export const ModalRoot = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;

export const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof Dialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof Dialog.Overlay>
>(({ className, ...props }, ref) => (
  <Dialog.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-surface-overlay/65 backdrop-blur-sm",
      "data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = "ModalOverlay";

export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
    VariantProps<typeof contentVariants> {
  hideClose?: boolean;
}

export const ModalContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  ModalContentProps
>(({ className, size, hideClose, children, ...props }, ref) => (
  <Dialog.Portal>
    <ModalOverlay />
    <Dialog.Content ref={ref} className={cn(contentVariants({ size }), className)} {...props}>
      {children}
      {!hideClose && (
        <Dialog.Close
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md text-icon-muted hover:text-text-primary hover:bg-white/5 transition-colors"
        >
          <X size={18} />
        </Dialog.Close>
      )}
    </Dialog.Content>
  </Dialog.Portal>
));
ModalContent.displayName = "ModalContent";

export const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-6 pt-5 pb-4 pr-14", className)} {...props} />
);
export const ModalTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title ref={ref} className={cn("text-h4 text-text-primary", className)} {...props} />
));
ModalTitle.displayName = "ModalTitle";
export const ModalDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description ref={ref} className={cn("text-body-md text-text-secondary mt-1", className)} {...props} />
));
ModalDescription.displayName = "ModalDescription";

export const ModalBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 px-6 pb-6 overflow-auto scrollbar-thin", className)} {...props} />
);
export const ModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-end gap-3 border-t border-border-subtle bg-bg-subtle/50 px-6 py-4",
      className
    )}
    {...props}
  />
);

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Footer: ModalFooter,
  Close: Dialog.Close,
});
