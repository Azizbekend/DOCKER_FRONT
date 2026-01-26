// components/TableEmpty.tsx
export const TableEmpty = ({ colSpan }: { colSpan: number }) => (
    <tbody>
        <tr>
            <td colSpan={colSpan} className="py-12 text-center text-gray-500">
                Список пустой
            </td>
        </tr>
    </tbody>
);
