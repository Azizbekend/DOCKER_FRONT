import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { tableSchemeModel } from './model/table-scheme-model';

export const InfoCh = observer(({ idwe }: { idwe: number }) => {

    const [info, setInfo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                setLoading(true);
                const result = await tableSchemeModel.infoChange(idwe);
                setInfo(result);
            } catch (error) {
                console.error('Error:', error);
                setInfo('Ошибка');
            } finally {
                setLoading(false);
            }
        };

        fetchInfo();
    }, [idwe]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className='text-center w-full underline text-[#757575] font-semibold'>
            {info}
        </div>
    );
});