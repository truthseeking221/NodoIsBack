import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const fieldVariants = tv({
  base: [
    "flex items-center gap-2 w-full rounded-md border bg-surface-elevated",
    "transition-[border-color,box-shadow,background-color] duration-fast ease-out",
    "text-text-primary placeholder:text-text-tertiary",
  ],
  variants: {
    size: {
      sm: "h-8 px-2.5 text-body-sm gap-2",
      md: "h-10 px-3 text-body-md gap-2",
      lg: "h-12 px-3.5 text-body-lg gap-2.5",
    },
    state: {
      default: "border-border hover:border-border-strong",
      focused: "border-border-focus shadow-focus-ring",
      error: "border-border-error shadow-focus-ring-error",
      disabled: "border-border-disabled bg-disabled-fill/5 pointer-events-none opacity-50",
    },
  },
  defaultVariants: { size: "md", state: "default" },
});

export interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    VariantProps<typeof fieldVariants> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerClassName,
      size,
      state,
      leadingIcon,
      trailingIcon,
      label,
      hint,
      error,
      required,
      id: idProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const reactId = React.useId();
    const id = idProp ?? reactId;
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
    const resolvedState = disabled ? "disabled" : error ? "error" : state;

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label htmlFor={id} className="text-label-lg text-text-secondary">
            {label}
            {required && <span className="text-feedback-error ml-1">*</span>}
          </label>
        )}
        <div
          className={cn(
            fieldVariants({ size, state: resolvedState }),
            "focus-within:border-border-focus focus-within:shadow-focus-ring",
            error && "focus-within:border-border-error focus-within:shadow-focus-ring-error"
          )}
        >
          {leadingIcon && (
            <span className="text-icon-muted shrink-0 [&>svg]:size-[1em]" aria-hidden>
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={describedBy}
            required={required}
            className={cn(
              "flex-1 bg-transparent outline-none border-0 placeholder:text-text-tertiary",
              "disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />
          {trailingIcon && (
            <span className="text-icon-muted shrink-0 [&>svg]:size-[1em]" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </div>
        {error ? (
          <p id={errorId} className="text-error text-feedback-error">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-helper text-text-tertiary">
            {hint}
          </p>
        ) : null}
      </div>
    );
  }
);
TextField.displayName = "TextField";
