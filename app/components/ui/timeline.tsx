import { Check } from 'lucide-react';

type StageStatus = 'completed' | 'active' | 'pending';

interface Stage {
  label: string;
  time?: string;
  status: StageStatus;
  subtitle?: string;
}

interface TimelineProps {
  stages: Stage[];
  className?: string;
}

const dotStyles: Record<StageStatus, string> = {
  completed: 'border-green-dark bg-green-dark',
  active: 'border-orange-main bg-yellow-soft',
  pending: 'border-[#bec8b6] bg-white',
};

function Timeline({ stages, className = '' }: TimelineProps) {
  return (
    <div className={className}>
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;

        return (
          <div
            key={`${stage.label}-${index}`}
            className="grid grid-cols-[20px_1fr_auto] gap-2.5 relative min-h-[50px]"
          >
            {/* Dot */}
            <div className="relative flex items-start justify-center pt-0.5">
              <div
                className={[
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0',
                  dotStyles[stage.status],
                ].join(' ')}
              >
                {stage.status === 'completed' && (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                )}
              </div>

              {/* Connecting line */}
              {!isLast && (
                <div className="absolute left-[9px] top-[22px] w-[2px] h-[calc(100%-4px)] bg-[#ccd5c3]" />
              )}
            </div>

            {/* Text */}
            <div className="pb-4">
              <strong className="block text-[13px] mb-0.5">{stage.label}</strong>
              {stage.subtitle && (
                <span className="text-[11px] text-muted italic">{stage.subtitle}</span>
              )}
            </div>

            {/* Time */}
            {stage.time && (
              <span className="text-[11px] text-muted pt-1">{stage.time}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Timeline };
export type { TimelineProps, Stage, StageStatus };
