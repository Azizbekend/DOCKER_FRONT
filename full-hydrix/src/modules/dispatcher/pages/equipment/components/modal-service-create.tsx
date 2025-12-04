import { Button } from '@/shared/ui/button';
import { InputContainer } from '@/shared/ui/Inputs/input-container';
import { Modal } from '@/shared/ui/modal/modal';
import { Selector } from '@/shared/ui/Selector/selector';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { hardwareListModel } from '../model/hardware-list-model';

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

    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [myTime, setMyTime] = useState<number>(0);


    const handleSelect = (item: { value: string | number; title: string; }) => {
        setMyTime(Number(date) * Number(item.value))
    }

    const handleSubmit = () => {
        createService({
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
                body: "p-10 h-[300px]",
                footer: "bg-[#F6F6F6] p-[20px_24px_16px_24px]"
            }}

            footerSlot={
                <>
                    <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>Сохранить</Button>
                    <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={() => setShow(false)}>Отмена</Button>
                </>
            }
        >
            <div className="max-w-[613px]">
                <div className="flex gap-3 items-end animate-fade-in">
                    <InputContainer
                        headerText="Описание заявки"
                        classNames={{
                            wrapper: "w-[500px]"
                        }}
                        children={
                            <input
                                className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                type="text"
                                placeholder="Название характеристики"
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
                                    title="Месяц"
                                    onSelect={handleSelect}
                                    items={selectItems}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        </Modal >
    )
});