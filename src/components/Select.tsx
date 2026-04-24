import * as React from "react";
import * as Sel from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const trigger = tv({
  base: [
    "inline-flex items-center justify-between gap-2 w-full rounded-md border bg-surface-elevated",
    "text-text-primary outline-none",
    "transition-[border-color,box-shadow] duration-fast",
    "border-border hover:border-border-strong",
    "focus-visible:border-border-focus focus-visible:shadow-focus-ring",
    "data-[state=open]:border-border-focus data-[state=open]:shadow-focus-ring",
    "disabled:opacity-50 disabled:pointer-events-none",
    "data-[placeholder]:text-text-tertiary",
  ],
  variants: {
    size: {
      sm: "h-8 px-2.5 text-body-sm",
      md: "h-10 px-3 text-body-md",
      lg: "h-12 px-3.5 text-body-lg",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof Sel.Root>,
    VariantProps<typeof trigger> {
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  triggerClassName?: string;
}

export const Select = ({
  size,
  placeholder = "Select option",
  label,
  hint,
  error,
  className,
  triggerClassName,
  children,
  ...props
}: SelectProps) => {
  const id = React.useId();
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label htmlFor={id} className="text-label-lg text-text-secondary">
          {label}
        </label>
      )}
      <Sel.Root {...props}>
        <Sel.Trigger
          id={id}
          className={cn(trigger({ size }), error && "border-border-error", triggerClassName)}
          aria-invalid={!!error}
        >
          <Sel.Value placeholder={placeholder} />
          <Sel.Icon className="text-icon-muted shrink-0">
            <ChevronDown size={16} />
          </Sel.Icon>
        </Sel.Trigger>
        <Sel.Portal>
          <Sel.Content
            position="popper"
            sideOffset={6}
            className={cn(
              "z-50 min-w-[var(--radix-select-trigger-width)] max-h-[320px] overflow-hidden",
              "rounded-lg border border-border bg-surface-elevated shadow-dropdown",
              "animate-scale-in origin-[var(--radix-select-content-transform-origin)]"
            )}
          >
            <Sel.ScrollUpButton className="flex items-center justify-center py-1 text-icon-muted">
              <ChevronUp size={14} />
            </Sel.ScrollUpButton>
            <Sel.Viewport className="p-1.5">{children}</Sel.Viewport>
            <Sel.ScrollDownButton className="flex items-center justify-center py-1 text-icon-muted">
              <ChevronDown size={14} />
            </Sel.ScrollDownButton>
          </Sel.Content>
        </Sel.Portal>
      </Sel.Root>
      {error ? <p className="text-error text-feedback-error">{error}</p> : hint ? <p className="text-helper text-text-tertiary">{hint}</p> : null}
    </div>
  );
};

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof Sel.Item>,
  React.ComponentPropsWithoutRef<typeof Sel.Item>
>(({ className, children, ...props }, ref) => (
  <Sel.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2.5 py-2 text-body-md",
      "outline-none text-text-primary",
      "focus:bg-white/[0.06] data-[highlighted]:bg-white/[0.06]",
      "data-[state=checked]:bg-white/[0.09] data-[state=checked]:font-medium",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <Sel.ItemText>{children}</Sel.ItemText>
    <Sel.ItemIndicator className="ml-auto text-brand-300">
      <Check size={14} />
    </Sel.ItemIndicator>
  </Sel.Item>
));
SelectItem.displayName = "SelectItem";

export const SelectSeparator = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Sel.Separator>) => (
  <Sel.Separator className={cn("my-1 h-px bg-border-subtle", className)} {...props} />
);

export const SelectLabel = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Sel.Label>) => (
  <Sel.Label className={cn("px-2.5 py-1.5 text-overline text-text-tertiary", className)} {...props} />
);
