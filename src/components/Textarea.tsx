import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "../lib/cn";

export const textareaVariants = tv({
  base: [
    "w-full rounded-md border bg-surface-elevated px-3 py-2.5",
    "text-text-primary placeholder:text-text-tertiary",
    "transition-[border-color,box-shadow] duration-fast ease-out resize-y scrollbar-thin",
    "focus-within:border-border-focus focus-within:shadow-focus-ring",
  ],
  variants: {
    size: {
      sm: "min-h-[80px] text-body-sm",
      md: "min-h-[120px] text-body-md",
      lg: "min-h-[160px] text-body-lg",
    },
    state: {
      default: "border-border hover:border-border-strong",
      error: "border-border-error focus-within:border-border-error focus-within:shadow-focus-ring-error",
      disabled: "border-border-disabled opacity-50 pointer-events-none",
    },
  },
  defaultVariants: { size: "md", state: "default" },
});

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerClassName, size, state, label, hint, error, required, id: idProp, disabled, ...props }, ref) => {
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
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={cn(textareaVariants({ size, state: resolvedState }), "outline-none", className)}
          {...props}
        />
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
Textarea.displayName = "Textarea";
