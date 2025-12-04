import { Button, Modal } from "@/app/cores/core-trieco/UIKit"
import { CodeInput } from "@/app/cores/core-trieco/UIKit/code-input";
import { observer } from "mobx-react-lite";
import profileModel from "../../models/profile-model";

type Props = {
    show: boolean;
    setShow: (v: boolean) => void
}

export const EmailConfirmModal = observer(({ show, setShow }: Props) => {
    const { changeCode, confirmCode, code } = profileModel;
    return (
        <Modal title="Подтверждение почты" show={show} setShow={setShow} className={"w-[500px]"}>
            <div className='flex flex-col bg-white items-center w-full gap-2 text-[#0D0C22]'>
                <span className='text-center font-bold text-[22px]'>Введите код</span>
                <span className='text-[14px] text-[#6E6D7ACC] text-center mb-4'>Мы отправили письмо с кодом на почту { }</span>
                <CodeInput length={7} onComplete={() => { }} onChange={(v) => changeCode(v)} />
                {/* {isError === true && <span className='text-[#CB0D0D] text-rightw w-full'>Неправильный код</span>} */}
                {/* {isError === true && <span className='text-[#CB0D0D]'>Неправильный логин или пароль</span>} */}
                {/* <Button onClick={() => { login(setUser) }}
                        disabled={!canAuth}
                        children="Войти"
                        class='mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4' /> */}
                <Button onClick={() => { confirmCode(() => setShow(false)); }}
                    children="Отправить"
                    class='mt-4 text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4 w-full' />
            </div>
        </Modal>
    )
})