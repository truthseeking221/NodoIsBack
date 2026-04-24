import * as React from "react";
import * as RadixRadio from "@radix-ui/react-radio-group";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const indicator = tv({
  base: [
    "peer shrink-0 inline-flex items-center justify-center rounded-full border-[1.5px]",
    "transition-[background-color,border-color,box-shadow] duration-fast ease-out",
    "focus-visible:shadow-focus-ring",
    "disabled:opacity-50",
    "data-[state=checked]:border-action-primary",
  ],
  variants: {
    size: { sm: "size-4", md: "size-5", lg: "size-6" },
    state: {
      default: "border-border hover:border-border-strong",
      error: "border-border-error",
    },
  },
  defaultVariants: { size: "md", state: "default" },
});

export const RadioGroup = RadixRadio.Root;

export interface RadioItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixRadio.Item>, "children">,
    VariantProps<typeof indicator> {
  label?: React.ReactNode;
  containerClassName?: string;
}

export const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Item>,
  RadioItemProps
>(({ className, containerClassName, size = "md", state, label, id: idProp, ...props }, ref) => {
  const reactId = React.useId();
  const id = idProp ?? reactId;
  const dotSize = size === "sm" ? 8 : size === "md" ? 10 : 12;
  return (
    <label htmlFor={id} className={cn("inline-flex items-center gap-2 cursor-pointer select-none", containerClassName)}>
      <RadixRadio.Item
        ref={ref}
        id={id}
        className={cn(indicator({ size, state }), className)}
        {...props}
      >
        <RadixRadio.Indicator asChild>
          <span
            className="block rounded-full bg-action-primary"
            style={{ width: dotSize, height: dotSize }}
          />
        </RadixRadio.Indicator>
      </RadixRadio.Item>
      {label && (
        <span className={cn("text-label-lg text-text-primary", props.disabled && "text-text-disabled")}>
          {label}
        </span>
      )}
    </label>
  );
});
RadioItem.displayName = "RadioItem";
