import React from 'react';

interface DiamondSeparatorProps {
  className?: string;
}

export const DiamondSeparator: React.FC<DiamondSeparatorProps> = ({ className = '' }) => {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rotate-45 border border-white/40 bg-white/20 mx-2 align-middle shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
};
