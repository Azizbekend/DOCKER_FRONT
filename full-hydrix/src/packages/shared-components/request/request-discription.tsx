interface Props {
    description: string;
    isCancelled?: boolean;
    className?: string;
}

export const RequestDescription = ({ description, isCancelled, className }: Props) => {

    return (
        <div className={`p-3 rounded-lg border ${isCancelled ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"} ${className}`}>
            <div className={`text-xs uppercase tracking-wide mb-1 font-medium ${isCancelled ? "text-red-700" : "text-green-700"}`}>{isCancelled ? "Причина отмены" : "Результат"}</div>
            <p className={`text-sm ${isCancelled ? "text-red-800" : "text-green-800"}`}>{description}</p>
        </div>
    );
};