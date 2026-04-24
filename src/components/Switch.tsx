import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

const track = tv({
  base: [
    "peer inline-flex shrink-0 items-center rounded-full border-0 transition-colors duration-fast ease-out",
    "focus-visible:shadow-focus-ring disabled:opacity-50",
    "data-[state=checked]:bg-brand-500 data-[state=unchecked]:bg-neutral-400",
  ],
  variants: {
    size: {
      sm: "h-4 w-7 p-0.5",
      md: "h-5 w-9 p-0.5",
      lg: "h-6 w-11 p-0.5",
    },
  },
  defaultVariants: { size: "md" },
});
const thumb = tv({
  base: [
    "pointer-events-none block rounded-full bg-white shadow-sm",
    "transition-transform duration-[160ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
  ],
  variants: {
    size: {
      sm: "size-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0",
      md: "size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      lg: "size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
    },
  },
  defaultVariants: { size: "md" },
});

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>, "children">,
    VariantProps<typeof track> {
  label?: React.ReactNode;
  containerClassName?: string;
}

export const Switch = React.forwardRef<React.ElementRef<typeof RadixSwitch.Root>, SwitchProps>(
  ({ className, containerClassName, size, label, id: idProp, ...props }, ref) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    return (
      <label htmlFor={id} className={cn("inline-flex items-center gap-2 cursor-pointer select-none", containerClassName)}>
        <RadixSwitch.Root ref={ref} id={id} className={cn(track({ size }), className)} {...props}>
          <RadixSwitch.Thumb className={thumb({ size })} />
        </RadixSwitch.Root>
        {label && (
          <span className={cn("text-label-lg text-text-primary", props.disabled && "text-text-disabled")}>
            {label}
          </span>
        )}
      </label>
    );
  }
);
Switch.displayName = "Switch";
