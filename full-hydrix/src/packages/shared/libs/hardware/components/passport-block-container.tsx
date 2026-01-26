import { observer } from 'mobx-react-lite';


interface PassportBlockContainerProps {
    title?: string | React.ReactNode,
    children: React.ReactNode,
    className?: string,
    style?: React.CSSProperties,
}




export const PassportBlockContainer = observer(({ title, children, className, style }: PassportBlockContainerProps) => {
    return (
        <div className={`rounded-2xl bg-white shadow-sm ${className}`}
            style={style}
        >
            {title && typeof title === 'string' ? <h3 className="font-bold text-gray-800 mb-5">{title}</h3> : title}
            {children}
        </div>
    );
});