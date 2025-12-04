import { Button } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/Inputs/input-text';
import { Modal } from '@/shared/ui/modal/modal';
import { SwitchButton } from '@/shared/ui/switch-button';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { datainpt } from '../data/data';
import { BlockSelect } from '../components/block-select';
import { hardwareModel } from '@/entities/hardware/model';

export const HardwareControlle = observer(() => {

    const { commands } = hardwareModel

    const [btnCount, setBtnCount] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);

    const [value, setValue] = useState<string>("");

    return (
        <>
            <Modal
                title="Подтвердить значение"
                wrapperId="wardhare"
                type="center"
                show={show}
                setShow={setShow}
                children={
                    <div className='py-3 px-6 h-[150px] flex items-center text-[24px] font-medium'>
                        Вы подтверждаете изменение значения
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


            <div className="w-full mt-10 p-[0_0_50px_0]">

                <div className="flex justify-between mb-5 border-b pb-5 gap-3">
                    <Button onClick={() => setBtnCount(0)} class={`border-2 w-full justify-center ${btnCount == 0 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Пуск</Button>
                    <Button onClick={() => setBtnCount(1)} class={`border-2 w-full justify-center ${btnCount == 1 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Стоп</Button>
                    <Button onClick={() => setBtnCount(2)} class={`border-2 w-full justify-center ${btnCount == 2 ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[var(--clr-border-gray)] text-[var(--clr-gray-dark)]"}`}>Cброс аварии</Button>
                </div>


                {commands.map((item, key) => {
                    return (
                        <div key={key} className="flex justify-between gap-3 items-center mb-5 border-b pb-5">
                            <span className="font-semibold text-[14px]">{item.name}</span>
                            <div className='flex items-center gap-4'>
                                {item.isValue ?
                                    <>
                                        <div>42</div>
                                        <Input type="number" value={value} onChange={setValue}
                                            className="border rounded-lg max-w-[80px] py-1 px-2"
                                            lengthOptions={{
                                                maxLength: 5,
                                            }}
                                        />
                                    </>
                                    :
                                    <SwitchButton
                                        onChange={() => { console.log() }}
                                        classNames={{
                                            button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                                            circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                                        }}
                                    />
                                }

                                <div className='px-2 min-w-[40px] py-2 bg-[var(--clr-accent)] rounded-lg hover:opacity-50 cursor-pointer duration-300' onClick={() => setShow(true)}>
                                    <Icon systemName='save-white' />
                                </div>
                            </div>
                        </div>
                    )
                })}

                {/* {datainpt.map((info, key) => {
                    return (
                        <BlockSelect key={key} title={info.title} children={
                            info.items.map((item, key) => {
                                return (
                                    <div key={key} className="flex justify-between gap-3 items-center mb-5 border-b pb-5">
                                        <span className="font-semibold text-[14px]">{item.name}</span>
                                        <div className='flex items-center gap-4'>
                                            {item.type == "boolean"
                                                ?
                                                <SwitchButton
                                                    onChange={() => { console.log() }}
                                                    classNames={{
                                                        button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                                                        circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                                                    }}
                                                />
                                                :

                                                <>
                                                    <div>42</div>
                                                    <Input type="number" value={value} onChange={setValue}
                                                        className="border rounded-lg max-w-[80px] py-1 px-2"
                                                        lengthOptions={{
                                                            maxLength: 5,
                                                        }}
                                                    />
                                                </>
                                            }

                                            <div className='px-2 min-w-[40px] py-2 bg-[var(--clr-accent)] rounded-lg hover:opacity-50 cursor-pointer duration-300' onClick={() => setShow(true)}>
                                                <Icon systemName='save-white' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        } />
                    )
                })} */}
            </div>
        </>
    );
});