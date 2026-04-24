import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "../lib/cn";

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps extends React.HTMLAttributes<HTMLElement> {
  steps: StepperStep[];
  current: number; // 0-based
  orientation?: "horizontal" | "vertical";
}

export const Stepper = ({ steps, current, orientation = "horizontal", className, ...props }: StepperProps) => {
  const isVertical = orientation === "vertical";
  return (
    <ol
      className={cn(
        "flex",
        isVertical ? "flex-col gap-4" : "flex-row items-center gap-3 w-full",
        className
      )}
      {...props}
    >
      {steps.map((s, i) => {
        const state = i < current ? "complete" : i === current ? "current" : "pending";
        return (
          <li
            key={i}
            className={cn(
              "flex gap-3 min-w-0",
              isVertical ? "items-start" : "flex-row items-center flex-1 last:flex-none"
            )}
          >
            <div className={cn("flex items-center gap-3", isVertical ? "flex-col" : "", "flex-none")}>
              <div
                className={cn(
                  "inline-flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] text-label-md font-semibold",
                  state === "complete" && "bg-action-primary border-action-primary text-text-on-primary",
                  state === "current" && "bg-brand-500 border-brand-500 text-neutral-0",
                  state === "pending" && "bg-white/5 border-border text-text-tertiary"
                )}
              >
                {state === "complete" ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div
                className={cn(
                  "text-label-lg",
                  state === "current" ? "text-text-primary font-semibold" : state === "pending" ? "text-text-tertiary" : "text-text-secondary"
                )}
              >
                {s.label}
              </div>
              {s.description && <div className="text-body-sm text-text-tertiary mt-0.5">{s.description}</div>}
            </div>
            {!isVertical && i < steps.length - 1 && (
              <div className={cn("h-px flex-1", state === "complete" ? "bg-action-primary" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
};
