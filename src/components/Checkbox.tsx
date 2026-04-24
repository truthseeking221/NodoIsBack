import * as React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const box = tv({
  base: [
    "peer shrink-0 inline-flex items-center justify-center",
    "border transition-[background-color,border-color,box-shadow] duration-fast ease-out",
    "focus-visible:shadow-focus-ring disabled:opacity-50",
    "data-[state=checked]:bg-action-primary data-[state=checked]:border-action-primary",
    "data-[state=indeterminate]:bg-action-primary data-[state=indeterminate]:border-action-primary",
  ],
  variants: {
    size: {
      sm: "size-4 rounded-sm",
      md: "size-5 rounded-sm",
      lg: "size-6 rounded",
    },
    state: {
      default: "border-border bg-transparent hover:border-border-strong",
      error: "border-border-error",
    },
  },
  defaultVariants: { size: "md", state: "default" },
});

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, "children">,
    VariantProps<typeof box> {
  label?: React.ReactNode;
  hint?: string;
  error?: string;
  containerClassName?: string;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, containerClassName, size = "md", state, label, hint, error, id: idProp, ...props }, ref) => {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const iconSize = size === "sm" ? 12 : size === "md" ? 14 : 16;
  return (
    <div className={cn("flex flex-col gap-1", containerClassName)}>
      <label htmlFor={id} className="inline-flex items-start gap-2 cursor-pointer select-none">
        <RadixCheckbox.Root
          ref={ref}
          id={id}
          className={cn(box({ size, state: error ? "error" : state }), className)}
          {...props}
        >
          <RadixCheckbox.Indicator className="text-text-on-primary">
            {props.checked === "indeterminate" ? (
              <Minus size={iconSize} strokeWidth={3} />
            ) : (
              <Check size={iconSize} strokeWidth={3} />
            )}
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <span className={cn("text-label-lg text-text-primary leading-[1.3]", props.disabled && "text-text-disabled")}>
            {label}
          </span>
        )}
      </label>
      {error ? (
        <p className="text-error text-feedback-error ml-7">{error}</p>
      ) : hint ? (
        <p className="text-helper text-text-tertiary ml-7">{hint}</p>
      ) : null}
    </div>
  );
});
Checkbox.displayName = "Checkbox";
