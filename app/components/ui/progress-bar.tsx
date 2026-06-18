interface ProgressBarProps {
  /** Progress value between 0 and 100 */
  value: number;
  className?: string;
  showLabel?: boolean;
}

function ProgressBar({ value, className = '', showLabel = false }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      <div className="w-full h-2 bg-[#e7ece1] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-dark to-green-light rounded-full transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-[11px] text-muted mt-1.5 text-right font-bold">
          {Math.round(clamped)}%
        </p>
      )}
    </div>
  );
}

export { ProgressBar };
export type { ProgressBarProps };
