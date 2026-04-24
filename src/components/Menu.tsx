import * as React from "react";
import * as DM from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";

export const DropdownMenu = DM.Root;
export const DropdownMenuTrigger = DM.Trigger;
export const DropdownMenuGroup = DM.Group;
export const DropdownMenuPortal = DM.Portal;
export const DropdownMenuSub = DM.Sub;
export const DropdownMenuRadioGroup = DM.RadioGroup;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DM.Content>,
  React.ComponentPropsWithoutRef<typeof DM.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <DM.Portal>
    <DM.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[220px] overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-dropdown p-1.5",
        "animate-scale-in origin-[var(--radix-dropdown-menu-content-transform-origin)]",
        className
      )}
      {...props}
    />
  </DM.Portal>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DM.Item>,
  React.ComponentPropsWithoutRef<typeof DM.Item> & { inset?: boolean; shortcut?: string }
>(({ className, inset, shortcut, children, ...props }, ref) => (
  <DM.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-body-md text-text-primary outline-none",
      "focus:bg-white/[0.06] data-[highlighted]:bg-white/[0.06]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    {shortcut && <span className="ml-auto text-caption text-text-tertiary">{shortcut}</span>}
  </DM.Item>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DM.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DM.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <DM.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md pl-8 pr-2.5 py-2 text-body-md text-text-primary outline-none",
      "focus:bg-white/[0.06] data-[highlighted]:bg-white/[0.06]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2.5 inline-flex size-4 items-center justify-center">
      <DM.ItemIndicator>
        <Check size={14} />
      </DM.ItemIndicator>
    </span>
    {children}
  </DM.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof DM.Label>) => (
  <DM.Label className={cn("px-2.5 py-1.5 text-overline text-text-tertiary", className)} {...props} />
);
export const DropdownMenuSeparator = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof DM.Separator>) => (
  <DM.Separator className={cn("my-1 h-px bg-border-subtle", className)} {...props} />
);
