import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';

interface InfoObjectProps {
  children: React.ReactNode;
  info?: string;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const InfoObject = observer(({ 
  children, 
  info, 
  className = "", 
  position = 'top' 
}: InfoObjectProps) => {
  const [hover, setHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Плавное появление/исчезновение
  useEffect(() => {
    if (hover) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [hover]);

  // Позиционирование тултипа
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return "bottom-full left-1/2 -translate-x-1/2 -translate-y-2";
      case 'bottom':
        return "top-full left-1/2 -translate-x-1/2 translate-y-2";
      case 'left':
        return "right-full top-1/2 -translate-y-1/2 -translate-x-2";
      case 'right':
        return "left-full top-1/2 -translate-y-1/2 translate-x-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 -translate-y-2";
    }
  };

  if (!info) {
    return <>{children}</>;
  }

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Основной контент */}
      {children}

      {/* Тултип */}
      {hover && (
        <div
          className={`
            absolute z-50
            min-w-max max-w-xs
            px-3 py-2
            bg-gray-800 text-white
            text-xs font-medium
            rounded-lg shadow-lg
            transition-all duration-200 ease-out
            ${getPositionClasses()}
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        >
          {info}
          {/* Стрелка тултипа */}
          <div className={`
            absolute w-2 h-2 bg-gray-800 rotate-45
            ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-0.5' : ''}
            ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-0.5' : ''}
            ${position === 'left' ? 'right-full top-1/2 -translate-y-1/2 -translate-x-0.5' : ''}
            ${position === 'right' ? 'left-full top-1/2 -translate-y-1/2 translate-x-0.5' : ''}
          `} />
        </div>
      )}
    </div>
  );
});