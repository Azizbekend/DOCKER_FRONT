import { Button } from '@/packages/shared-ui/button/button';
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Modal } from '@/packages/shared-ui/modal/modal';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { hardwareListModel } from "@/modules/dispatcher/pages/hardware-list/model/hardware-list-model";

type Props = {
    isOpen: boolean;
    setShow: (value: boolean) => void;
}

const selectItems: { value: string | number; title: string; }[] = [
    {
        value: 1,
        title: "Час",
    },
    {
        value: 24,
        title: "День",
    },
    {
        value: (24 * 7),
        title: "Неделя",
    },
    {
        value: (24 * 30),
        title: "Месяц",
    },
    {
        value: (24 * 365),
        title: "Год",
    },
]

export const ModalServiceCreate = observer(({ isOpen, setShow }: Props) => {
    const { createService } = hardwareListModel

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [typeDate, setTypeDate] = useState<string | number>('');
    const [myTime, setMyTime] = useState<number>(0);


    const handleSelect = (item: { value: string | number; title: string; }) => {
        setTypeDate(item.value)
    }

    useEffect(() => {
        setMyTime(Number(date) * Number(typeDate))
    }, [date, typeDate])

    const handleSubmit = () => {
        createService({
            title: title,
            description: description,
            date: myTime,
        })
    }

    return (
        <Modal
            title={"Добавление сервиса"}
            wrapperId='createService'
            type="center"
            show={isOpen}
            setShow={setShow}
            classNames={{
                panel: "max-w-[640px] w-full",
                body: "p-10 h-[500px]",
                footer: "bg-[#F6F6F6] p-[14px_24px_16px_24px]"
            }}

            children={
                <div className="max-w-[613px]">
                    <div className="gap-3 items-end animate-fade-in">
                        <InputContainer
                            headerText="Название"
                            classNames={{
                                wrapper: "w-[500px] mb-6"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Название"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            }
                        />
                        <InputContainer
                            headerText="Описание"
                            classNames={{
                                wrapper: "w-[500px] mb-6"
                            }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="text"
                                    placeholder="Описание"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            }
                        />

                        <InputContainer
                            headerText="Период"
                            classNames={{
                                wrapper: "w-[300px]"
                            }}
                            children={
                                <div className="flex items-center gap-3 w-full">
                                    <input
                                        className="w-[120px] border-[1.5px] px-3 py-3 rounded-lg outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="number"
                                        placeholder="Период"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />

                                    <Selector
                                        titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                        classWripper="!w-full"
                                        title="Период"
                                        onSelect={handleSelect}
                                        items={selectItems}
                                    />
                                </div>
                            }
                        />
                    </div>
                </div>
            }

            footerSlot={
                <div className='flex justify-end gap-4'>
                    <Button
                        styleColor={"blue"}
                        class="w-[120px] py-2" onClick={handleSubmit}>Сохранить</Button>
                    <Button
                        styleColor={"gray"}
                        class="w-[120px] py-2" onClick={() => setShow(false)}>Отмена</Button>
                </div>
            }
        />
    )
});