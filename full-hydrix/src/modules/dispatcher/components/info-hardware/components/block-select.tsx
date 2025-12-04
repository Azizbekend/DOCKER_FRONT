import { observer } from 'mobx-react-lite';
import { Icon } from '@/shared/ui/icon';
import { ReactNode, useState } from 'react';


interface BlockProps {
    title: string,
    children: ReactNode,
    className?: string,
}

export const BlockSelect = observer(({ title, children, className }: BlockProps) => {
    const [open, setOpen] = useState<boolean>(false);

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