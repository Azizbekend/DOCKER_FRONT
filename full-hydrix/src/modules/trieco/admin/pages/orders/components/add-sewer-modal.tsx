import { Input, Button, Modal } from "@/app/cores/core-trieco/UIKit";
import { observer } from "mobx-react-lite";
import attachSewerModel from "../model/attach-sewer-model";
import { useEffect, useState, useRef } from "react";
import orderListModel from "../model/order-list-model";
import { Sewer } from "../../sewer-list/services/sewers";
import { useAuth } from "@/entities/user/context";

type Props = {
    show: boolean;
    setShow: (value: boolean) => void;
};

export const AttachSewerModal = observer(({ show, setShow }: Props) => {
    const { filteredSewers, handleInput, init, selectedSewer, handleSelect, attach, orderId } = attachSewerModel;

    const [showList, setShowList] = useState(false);
    const [inputValue, setInput] = useState("");

    const { user } = useAuth()

    const listRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        init(user?.companyId || 0);
    }, []);

    useEffect(() => {
        if (!show) {
            setInput("");
            setShowList(false);
        }
    }, [show]);

    const handleSewerSelect = (sewer: Sewer) => {
        setInput(`${sewer.lastName} ${sewer.firstName}`);
        handleSelect(sewer);
        setShowList(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
            setShowList(false);
        }
    };

    useEffect(() => {
        if (showList) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showList]);


    return (
        <Modal title="Назначение ассенизатора" show={show} setShow={setShow} className="w-[30%]">
            <div className="mt-1 flex flex-col gap-4">
                <span className="text-[#332C2C] text-[15px]">Данные об ассенизаторе</span>
                <div className="relative">
                    <Input
                        placeholder="ФИО водителя*"
                        value={inputValue}
                        onChange={(v) => {
                            setInput(v);
                            handleInput(v);
                            setShowList(true);
                            handleSelect(null);
                        }}
                        onFocus={() => setShowList(true)}
                        class="border-1"
                        icon="arrow-down-fill"
                        iconActive="arrow-down-fill-active"
                    />

                    {showList && (
                        <div ref={listRef} className="flex flex-col border border-[#E6EEFE] bg-white text-[#4A85F6] max-h-[160px] w-full overflow-y-auto absolute shadow-[1px_1px_5px_0px_#0000001A] rounded-lg">
                            {filteredSewers.length > 0 ? (
                                filteredSewers.map((x) => (
                                    <div
                                        key={x.id}
                                        onClick={() => {
                                            handleSewerSelect(x)
                                        }}
                                        className={`flex items-center justify-between text-[14px] cursor-pointer px-3 py-2 border-b  hover-item transition-all text-[#000] ${selectedSewer?.id === x.id ? "bg-[#F0F5FF]" : ""
                                            }`}
                                    >
                                        {x.lastName} {x.firstName}
                                        {selectedSewer?.id === x.id && <span>✔</span>}
                                    </div>
                                ))
                            ) : (
                                <div className="text-[#4A85F6] px-3 py-2">Ассенизатор не найден</div>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-row-reverse gap-8">
                    <Button class="g-[#4A85F6] rounded-lg py-2 px-2 font-semibold" onClick={() => setShow(false)}>
                        <span className="text-[#8F9BB3]">Отмена</span>
                    </Button>
                    <Button
                        disabled={selectedSewer === null}
                        children="Добавить"
                        onClick={() => {
                            attach();
                            selectedSewer && orderListModel.attachSewer(orderId, selectedSewer);
                            setShow(false);
                        }}
                        class="bg-[#4A85F6] rounded-lg py-2 px-2 font-semibold"
                    />
                </div>
            </div>
        </Modal>
    );
});
