export const ServiceStatisticItem = ({ name, progress }: { name: string, progress: number }) => {
    return (
        <div className="flex flex-col gap-2 py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{name}</span>
                <span className="text-sm font-semibold text-gray-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                    className="h-full bg-[var(--clr-accent)] rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>

    );
};