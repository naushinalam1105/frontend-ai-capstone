import React, { useState } from 'react';

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  id: string;
}

export const Disclosure: React.FC<DisclosureProps> = ({ title, children, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-2">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`content-${id}`}
          id={`button-${id}`}
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between py-2 text-left text-lg font-semibold text-slate-900"
        >
          <span>{title}</span>
          <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
        </button>
      </h3>
      <div
        id={`content-${id}`}
        role="region"
        aria-labelledby={`button-${id}`}
        hidden={!isOpen}
        className="py-2 text-slate-700"
      >
        {children}
      </div>
    </div>
  );
};