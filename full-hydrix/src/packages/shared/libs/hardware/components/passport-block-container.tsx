import { observer } from 'mobx-react-lite';

export const PassportBlockContainer = observer(({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) => {
    return (
        <div className={`rounded-2xl bg-white shadow-sm ${className}`}>
            {title && <h3 className="font-bold text-gray-800 mb-5">{title}</h3>}
            {children}
        </div>
    );
});