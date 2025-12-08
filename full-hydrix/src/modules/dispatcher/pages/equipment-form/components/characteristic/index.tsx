// components/InputContainer.tsx
import React from 'react';

interface InputContainerProps {
    headerText: string;
    classNames?: {
        wrapper?: string;
    };
    children: React.ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({
    headerText,
    classNames = {},
    children
}) => {
    return (
        <div className={classNames.wrapper}>
            <div className="text-sm font-medium mb-2 text-gray-700">
                {headerText}
            </div>
            {children}
        </div>
    );
};

export default InputContainer;