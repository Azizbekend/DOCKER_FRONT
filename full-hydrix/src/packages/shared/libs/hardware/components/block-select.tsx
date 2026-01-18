import { observer } from 'mobx-react-lite';
import { Icon } from '@/packages/shared-ui/icon';
import { ReactNode, useState } from 'react';


interface BlockProps {
    title: string,
    children: ReactNode,
    className?: string,
    isOpen?: boolean,
}

export const BlockSelect = observer(({ title, children, className, isOpen = false }: BlockProps) => {
    const [open, setOpen] = useState<boolean>(isOpen);

    return (
        <div className=''>
            <div className='cursor-pointer flex items-center justify-between gap-2 cursor-pointer]' onClick={() => setOpen(!open)}>
                <div className='font-semibold !text-[var(--clr-accent)] pt-3 pb-5'>{title}</div>

                <div style={{
                    rotate: open ? "90deg" : "-90deg",
                    transitionDuration: "0.3s"
                }}>
                    <Icon systemName='arrow-left-blue' />
                </div>
            </div>

            {open &&
                <div className={`fadeInUp ${className}`}>
                    {children}
                </div>
            }
        </div>
    );
});