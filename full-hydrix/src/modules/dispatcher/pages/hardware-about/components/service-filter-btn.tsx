export const ServiceFilterBtn = ({ name, onClick, isActive }: { name: string, onClick: () => void, isActive: boolean }) => {
    return (
        <button
            className={"px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:shadow-sm " + (isActive ? "bg-gray-400 text-white" : "hover:shadow-sm")}
            // className={"px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:shadow-sm active:bg-gray-300 " + active ? "" : ""}
            onClick={onClick}
        >
            {name}
        </button>
    );
};