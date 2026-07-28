import React, { useState, useRef, KeyboardEvent } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  ariaLabel: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, ariaLabel }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = items.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(newIndex);
    tabRefs.current[newIndex]?.focus();
  };

  return (
    <div className="w-full">
      <div role="tablist" aria-label={ariaLabel} className="flex border-b border-slate-200">
        {items.map((tab, idx) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[idx] = el;
            }}
            role="tab"
            aria-selected={activeTab === idx}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === idx ? 0 : -1}
            onClick={() => setActiveTab(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === idx ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {items.map((tab, idx) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== idx}
          className="p-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};