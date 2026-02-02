import { Modal } from '@/packages/shared-ui/modal/modal';
import { Button } from '@/packages/shared-ui/button/button';


export const ConfirmModal = ({ setShow, show }: { setShow: (value: boolean) => void, show: boolean }) => {
    return (
        <Modal
            title="Подтвердить выполнение задачи"
            wrapperId="wardhare"
            type="center"
            show={show}
            setShow={setShow}
            children={
                <div className='py-3 px-6 h-[200px] flex items-center text-[18px] font-medium'>
                    Вы подтверждаете изменение значения?
                </div>
            }
            footerSlot={
                <div className='flex justify-end gap-3 py-3 px-6'>
                    <Button class='px-3 py-2 bg-[var(--clr-accent)] text-white hover:opacity-50' onClick={() => setShow(false)}>Подтвердить</Button>
                    <Button class='px-3 py-2 bg-[var(--clr-gray-dark)] text-white hover:opacity-50' onClick={() => setShow(false)}>Отмена</Button>
                </div>
            }
            classNames={{
                panel: "max-w-[800px]"
            }}
        />
    )
}