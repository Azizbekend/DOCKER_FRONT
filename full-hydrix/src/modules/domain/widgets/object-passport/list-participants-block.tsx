import { getGoodName } from '@/packages/functions/get-data/get-good-name';
import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { Icon } from '@/packages/shared-ui/icon';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';


interface ListParticipantsBlockProps {
    list: any
}


export const ListParticipantsBlock = observer(({ list }: ListParticipantsBlockProps) => {

    let idblock: number = 1;
    const gridGridColumns = "grid grid-cols-[40px_1fr_1fr_1fr_0.5fr]";


    const chekCompany = (txt: string) => {
        const result = txt != 'ГУП "Электрические сети"' && txt != "ГКУ «Главное управление инженерных сетей РТ»";
        return result;
    }

    return (
        <BlockContainer title="Обслуживающий персонал">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <div className={`bg-gray-50 ${gridGridColumns}`}>
                        <div className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">№</div>
                        <div className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Компания</div>
                        <div className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ФИО</div>
                        <div className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Телефон</div>
                        <div className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">График</div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                        {list.map((contact, key) => {
                            return chekCompany(contact.company.companyName) && (contact.users.length > 0 ? contact.users.map((user, userIdx) => (
                                <div key={`${key}-${userIdx}`} className={`hover:bg-purple-50 transition-colors ${gridGridColumns}`}>
                                    <div className="px-3 py-2 text-sm text-gray-800 font-medium">{idblock++}</div>
                                    <div className="px-3 py-2 text-sm text-gray-800">{contact.company.companyName}</div>
                                    <div className="px-3 py-2 text-sm text-gray-800">{getGoodName(user)}</div>
                                    <div className="px-3 py-2 text-sm text-gray-800">{user.phoneNumber}</div>
                                    <div className="px-3 py-2 text-sm text-gray-800 text-center">
                                        <button className="p-1.5 rounded-full hover:bg-purple-100 transition-colors" title="Просмотреть график работы">
                                            <Icon systemName="calendar" className="text-purple-600 w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )) :

                                <div className={`${gridGridColumns}`}>
                                    <div className="px-3 py-2 text-sm text-gray-800 font-medium">{idblock++}</div>
                                    <div className="px-3 py-2 text-sm text-gray-800 font-medium">{contact.company.companyName}</div>
                                    <div className="px-3 py-2 text-sm text-gray-800 col-span-3">Нет назначенного персонала</div>
                                </div>
                            )
                        })}
                    </div>
                </table>
            </div>
        </BlockContainer>
    );
});