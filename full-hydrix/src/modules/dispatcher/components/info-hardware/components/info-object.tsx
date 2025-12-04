import { observer } from 'mobx-react-lite';
import { useState } from 'react';

interface InfoObjectProps {
    children: React.ReactNode;
    info?: string;
    className?: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
}

export const InfoObject = observer(({ children, info, className, position = 'top' }: InfoObjectProps) => {

    const [hover, setHover] = useState(false);

    const positionClasses = {
        top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
        bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2",
        left: "left-0 -translate-x-full top-1/2 -translate-y-1/2 -ml-2",
        right: "right-0 translate-x-full top-1/2 -translate-y-1/2 ml-2",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {children}

            {info && hover && (
                <div
                    className={`
                        absolute
                        px-2 py-1
                        max-w-full
                        bg-black text-white text-sm 
                        rounded-md
                        text-center
                        shadow-lg z-50
                        ${className}
                        ${positionClasses[position]}
                    `}

                    style={{
                        animation: 'fadeInInOpacity 0.2s ease forwards'
                    }}
                >
                    {info}
                </div>
            )}
        </div>
    );
});
