import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { cn } from "../lib/cn";

export const TooltipProvider = RadixTooltip.Provider;

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
  className,
}: TooltipProps) => (
  <RadixTooltip.Root delayDuration={delayDuration}>
    <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        side={side}
        align={align}
        sideOffset={6}
        className={cn(
          "z-50 rounded-md bg-surface-strong px-2.5 py-1.5 text-label-md text-text-primary",
          "shadow-dropdown animate-scale-in origin-[var(--radix-tooltip-content-transform-origin)]",
          "data-[state=closed]:animate-fade-out",
          className
        )}
      >
        {content}
        <RadixTooltip.Arrow className="fill-surface-strong" />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  </RadixTooltip.Root>
);
