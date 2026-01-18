import { Icon } from '@/core/UIKit/icon';
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  onCopy: () => void;
  onMouseLeave: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ text, onCopy, onMouseLeave }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => { setShowTooltip(false); onMouseLeave()}}
      onClick={onCopy}
    >
      <Icon systemName="copy" />
      {showTooltip && (
        <div
          className="absolute z-10 transform rounded-[2px] -translate-y-1/2 text-[12px] leading-none flex items-center justify-center px-[8px] py-[5px] bg-white shadow border-[#eff4fa] w-fit"
          style={{ top: '100%', left: '850%', transform: 'translateX(-50%)' }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;