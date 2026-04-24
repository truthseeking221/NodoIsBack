import * as React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/cn";

export const Accordion = RadixAccordion.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn("border border-border-subtle rounded-lg bg-surface-elevated overflow-hidden", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between gap-3 px-4 py-3.5 text-left",
        "text-h6 text-text-primary hover:bg-white/[0.03] transition-colors",
        "focus-visible:shadow-focus-ring",
        "[&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown size={18} className="text-icon shrink-0 transition-transform duration-200" aria-hidden />
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-body-md text-text-secondary",
      "data-[state=open]:animate-[slide-up_200ms_ease-out]",
      className
    )}
    {...props}
  >
    <div className="border-t border-border-subtle px-4 py-3">{children}</div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = "AccordionContent";
