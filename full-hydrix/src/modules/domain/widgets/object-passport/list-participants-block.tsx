import { getGoodName } from '@/packages/functions/get-good-name';
import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { Icon } from '@/packages/shared-ui/icon';
import { observer } from 'mobx-react-lite';


interface ListParticipantsBlockProps {
    list: any
}


export const ListParticipantsBlock = observer(({ list }: ListParticipantsBlockProps) => {

    return (
        <BlockContainer title="Обслуживающий персонал">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">№</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Должность</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ФИО</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Телефон</th>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">График</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {list.flatMap((contact, idx) =>
                            contact.users.length > 0
                                ? contact.users.map((user, userIdx) => (
                                    <tr key={`${idx}-${userIdx}`} className="hover:bg-purple-50 transition-colors">
                                        <td className="px-3 py-2 text-sm text-gray-800 font-medium">{idx + 1}</td>
                                        <td className="px-3 py-2 text-sm text-gray-800">{contact.company.companyRole}</td>
                                        <td className="px-3 py-2 text-sm text-gray-800">{getGoodName(user)}</td>
                                        <td className="px-3 py-2 text-sm text-gray-800">{user.phoneNumber}</td>
                                        <td className="px-3 py-2 text-sm text-gray-800 text-center">
                                            <button
                                                className="p-1.5 rounded-full hover:bg-purple-100 transition-colors"
                                                title="Просмотреть график работы"
                                            >
                                                <Icon systemName="calendar" className="text-purple-600 w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                : [{
                                    id: `empty-${idx}`, jsx: (
                                        <tr key={`empty-${idx}`}>
                                            <td className="px-3 py-2 text-sm text-gray-800" colSpan={5}>Нет назначенного персонала</td>
                                        </tr>
                                    )
                                }]
                        ).flatMap(item => item.jsx || item)}
                    </tbody>
                </table>
            </div>
        </BlockContainer>
    );
});