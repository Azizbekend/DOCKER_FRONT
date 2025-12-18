
const viewCountColumn = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
];





useEffect(() => {
    setLocalData(props.data.slice());
}, [props.data]);

const handleSort = (columnId: string, direction: 'asc' | 'desc') => {
    setSortConfig({ columnId, direction });
    const sortedData = [...localData].sort((a, b) => {
        if (direction === 'asc') {
            return a[columnId] > b[columnId] ? 1 : -1;
        }
        return a[columnId] < b[columnId] ? 1 : -1;
    });
    setLocalData(sortedData);
};

const handleFilter = (columnId: string, filterValues: Record<string | number, boolean>) => {
    const filteredData = props.data.filter(item => {
        return Object.entries(filterValues).every(([key, isSelected]) => {
            return isSelected || item[columnId] != key;
        });
    });
    setLocalData(filteredData);
};

const handleHeaderClick = (columnId: string) => {
    setActiveColumn(prev => (prev === columnId ? null : columnId));
};
