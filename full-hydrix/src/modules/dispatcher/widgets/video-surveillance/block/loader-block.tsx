import Loader from '@/packages/shared-ui/loader/loader';
import React from 'react';

interface LoaderBlockProps {
    text: string | React.Node;
    lookLoader?: boolean;
}


export const LoaderBlock = ({ text, lookLoader = true }: LoaderBlockProps) => {
    return (
        <div className='h-full flex flex-col justify-center items-center w-full m-auto'>
            {lookLoader && <Loader />}
            <p className='mx-auto mt-2 w-max'>{text}</p>
        </div>
    );
};