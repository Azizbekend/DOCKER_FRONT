import { Button } from '@/packages/shared-ui/button/button';
import { observer } from 'mobx-react-lite';


interface BlockAdminBtnsProps {
    isActive: boolean;
    CameraActivate: () => void;
    CameraDeactivate: () => void;

}


export const BlockAdminBtns = observer(({ isActive, CameraActivate, CameraDeactivate }: BlockAdminBtnsProps) => {
    return (
        <div className='w-full flex flex-wrap gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200'>
            <Button
                styleColor={isActive == true ? "red" : "gray"}
                class="px-4 py-2"
                onClick={() => CameraDeactivate()}
                disabled={isActive == false}
            >
                Отключить доступ к камерам
            </Button>

            <Button
                styleColor={isActive == false ? "green" : "gray"}
                class="px-4 py-2"
                onClick={() => CameraActivate()}
                disabled={isActive == true}
            >
                Включить доступ к камерам
            </Button>

            <div className='ml-auto flex items-center gap-2'>
                <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className='text-sm text-gray-600'>
                    {isActive ? 'Камеры активны' : 'Камеры отключены'}
                </span>
            </div>
        </div>
    );
});