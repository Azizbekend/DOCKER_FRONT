interface Props {
    description: string;
    title: string;
}

export const RequestDescription = ({ description, title }: Props) => {
    return (
        <div className="p-3 bg-red-50 rounded-lg border border-red-200 mb-4">
            <div className="text-xs text-red-700 uppercase tracking-wide mb-1 font-medium">{title}</div>
            <p className="text-red-800 text-sm">{description}</p>
        </div>
    );
};