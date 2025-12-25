import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/Inputs/input-text';
import { SwitchButton } from '@/shared/ui/switch-button';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { hardwareModel } from '@/entities/hardware/model';
import { ConfirmModal } from '../components/modal-confirm';
import { ModalCommanActive } from '../components/modal-comman-active';
import Loader from '@/shared/ui/loader/loader';

export const HardwareControlle = observer(() => {

    const { commands, changeCommands, isActiveCommand, isLoaderCommand, switchIsCommand } = hardwareModel

    const [btnCount, setBtnCount] = useState<number>(3);
    const [show, setShow] = useState<boolean>(false);
    const [showAvtive, setShowAvtive] = useState<boolean>(false);

    const confirm = () => { setShowAvtive(false); switchIsCommand() }
    const cancle = () => { setShowAvtive(false) }



    return (
        <>

            {isActiveCommand && <ConfirmModal show={show} setShow={setShow} />}

            <ModalCommanActive show={showAvtive} setShow={setShowAvtive} confirm={confirm} cancle={cancle} />


            <div className="w-full mt-10 p-[0_0_50px_0]">

                <div className='border-b border-black pb-5 mb-5 '>
                    <Button onClick={() => setShowAvtive(true)} class={`border-2 w-full justify-center text-white bg-[var(--clr-gray-dark)]`}>Активировать удалённое управление</Button>
                </div>

                {/* {isLoaderCommand ? <Loader /> : */}
                <div className={` duration-200 ${isActiveCommand ? "opacity-50" : "opacity-100"}`}>
                    <div className="flex justify-between mb-5 border-b pb-5 gap-3">
                        <Button onClick={() => { isActiveCommand && setBtnCount(0) }} class={`border-2 w-full justify-center ${btnCount == 0 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Пуск</Button>
                        <Button onClick={() => { isActiveCommand && setBtnCount(1) }} class={`border-2 w-full justify-center ${btnCount == 1 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Стоп</Button>
                        <Button onClick={() => { isActiveCommand && setBtnCount(2) }} class={`border-2 w-full justify-center ${btnCount == 2 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Cброс аварии</Button>
                    </div>

                    {commands.map((item, key) => {
                        return item.name !== "Стоп" && item.name !== "Пуск" && item.name !== "Cброс аварии" && (
                            <div key={key} className="flex justify-between gap-3 items-center mb-5 border-b pb-5">
                                <span className="font-semibold text-[14px]">{item.name}</span>
                                <div className='flex items-center gap-4'>
                                    {item.isValue ?
                                        <>
                                            <Input type="number" value={item.value} onChange={(e) => { changeCommands(e.target.value, item.id) }}
                                                className="border rounded-lg max-w-[80px] py-1 px-2"
                                                disabled={isActiveCommand}
                                                lengthOptions={{
                                                    maxLength: 5,
                                                }}
                                            />
                                        </>
                                        :
                                        <SwitchButton
                                            disabled={isActiveCommand}
                                            onChange={() => { console.log() }}
                                            classNames={{
                                                button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                                                circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                                            }}
                                        />
                                    }

                                    <div className='px-2 min-w-[40px] py-2 bg-[var(--clr-accent)] rounded-lg hover:opacity-50 cursor-pointer duration-300' onClick={() => !isActiveCommand && setShow(true)}>
                                        <Icon systemName='save-white' />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* } */}

            </div>
        </>
    );
});