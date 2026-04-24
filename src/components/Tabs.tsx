import * as React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "../lib/cn";

export const Tabs = RadixTabs.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn("inline-flex items-end gap-1 border-b border-border-subtle", className)}
    {...props}
  />
));
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center gap-2 px-4 pt-2 pb-2.5 text-label-lg text-text-secondary",
      "border-b-2 border-transparent -mb-px",
      "transition-colors duration-fast hover:text-text-primary",
      "data-[state=active]:text-text-primary data-[state=active]:border-action-primary",
      "data-[state=active]:font-semibold",
      "disabled:opacity-50 disabled:pointer-events-none",
      "focus-visible:shadow-focus-ring rounded-t-md",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn("pt-4 outline-none focus-visible:ring-0", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";
