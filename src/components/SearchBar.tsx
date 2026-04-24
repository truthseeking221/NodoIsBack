import * as React from "react";
import { Search, X } from "lucide-react";
import { TextField, type TextFieldProps } from "./TextField";

export interface SearchBarProps extends Omit<TextFieldProps, "leadingIcon" | "trailingIcon"> {
  onClear?: () => void;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ onClear, value, ...props }, ref) => (
    <TextField
      ref={ref}
      value={value}
      leadingIcon={<Search size={16} />}
      trailingIcon={
        (value as string)?.length && onClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search"
            className="inline-flex size-5 items-center justify-center rounded-full text-icon-muted hover:text-text-primary hover:bg-white/10 transition-colors"
          >
            <X size={12} />
          </button>
        ) : undefined
      }
      {...props}
    />
  )
);
SearchBar.displayName = "SearchBar";
