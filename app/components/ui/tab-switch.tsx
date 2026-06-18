'use client';

interface Tab {
  key: string;
  label: string;
}

interface TabSwitchProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

function TabSwitch({ tabs, activeTab, onTabChange, className = '' }: TabSwitchProps) {
  return (
    <div
      className={[
        'flex bg-white border border-border rounded-[14px] p-1',
        className,
      ].join(' ')}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={[
              'flex-1 h-9 rounded-[10px] text-xs font-extrabold transition-all',
              isActive
                ? 'bg-green-dark text-white'
                : 'bg-transparent text-muted hover:text-foreground',
            ].join(' ')}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export { TabSwitch };
export type { TabSwitchProps, Tab };
