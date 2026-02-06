import Loader from '@/packages/shared-ui/loader/loader';
import React from 'react';

interface LoaderBlockProps {
    text: string | React.Node;
    lookLoader?: boolean;
}


export const LoaderBlock = ({ text, lookLoader= true }: LoaderBlockProps) => {
    return (
        <div className='h-full block w-full flex flex-col items-center justify-center mx-auto gap-2'>
            {lookLoader && <Loader />}
            <div>{text}</div>
        </div>
    );
};