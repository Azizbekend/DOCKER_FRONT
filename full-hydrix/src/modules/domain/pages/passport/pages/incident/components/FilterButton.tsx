interface FilterButtonProps {
    name: string,
    isActive: boolean,
    onClick: () => void
}

export const FilterButton = ({ name, isActive, onClick }: FilterButtonProps) => {
    return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}