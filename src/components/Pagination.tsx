import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

function makeRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const Pagination = ({ page, pageCount, onPageChange, siblingCount = 1, className, ...props }: PaginationProps) => {
  const pages = React.useMemo<(number | "dots")[]>(() => {
    const total = pageCount;
    if (total <= 7) return makeRange(1, total);
    const leftSibling = Math.max(page - siblingCount, 2);
    const rightSibling = Math.min(page + siblingCount, total - 1);
    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < total - 1;
    if (!showLeftDots && showRightDots) return [...makeRange(1, 3 + siblingCount * 2), "dots", total];
    if (showLeftDots && !showRightDots) return [1, "dots", ...makeRange(total - 2 - siblingCount * 2, total)];
    return [1, "dots", ...makeRange(leftSibling, rightSibling), "dots", total];
  }, [page, pageCount, siblingCount]);

  const btn = (opts: { active?: boolean; disabled?: boolean; label: React.ReactNode; onClick?: () => void; aria?: string }) => (
    <button
      type="button"
      disabled={opts.disabled}
      onClick={opts.onClick}
      aria-label={opts.aria}
      aria-current={opts.active ? "page" : undefined}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-body-md font-medium transition-colors",
        "disabled:opacity-40 disabled:pointer-events-none",
        opts.active
          ? "bg-action-primary text-text-on-primary font-semibold"
          : "text-text-primary hover:bg-white/[0.06]"
      )}
    >
      {opts.label}
    </button>
  );

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)} {...props}>
      {btn({ disabled: page <= 1, label: <ChevronLeft size={16} />, onClick: () => onPageChange(page - 1), aria: "Previous page" })}
      {pages.map((p, i) =>
        p === "dots" ? (
          <span key={`dots-${i}`} className="inline-flex size-9 items-center justify-center text-text-tertiary" aria-hidden>
            …
          </span>
        ) : (
          <React.Fragment key={p}>
            {btn({ active: p === page, label: p, onClick: () => onPageChange(p), aria: `Page ${p}` })}
          </React.Fragment>
        )
      )}
      {btn({ disabled: page >= pageCount, label: <ChevronRight size={16} />, onClick: () => onPageChange(page + 1), aria: "Next page" })}
    </nav>
  );
};
