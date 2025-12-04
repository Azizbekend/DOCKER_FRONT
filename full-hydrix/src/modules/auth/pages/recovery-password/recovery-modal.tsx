// import { Button, Input, Modal } from "@/app/cores/core-trieco/UIKit";
// import { observer } from "mobx-react-lite";
// import recoveryPasswordModel from "../model/recovery-password-model";

// type Props = {
//     show: boolean;
//     setShow: (value: boolean) => void
// }

// export const RecoveryModal = observer(({ show, setShow }: Props) => {
//     const { changeEmail, email, isRecovery, send } = recoveryPasswordModel;

//     return (
//         <Modal setShow={setShow} show={show} title="" className="max-w-[442px] py-10 px-12 ">
//             {
//                 !isRecovery ?
//                     <div className="w-full flex flex-col ">
//                         <span className='text-center font-bold text-[22px]'>Забыли пароль?</span>
//                         <span className='text-center font-semibold text-[16px] mt-9 mb-4 line'>Введите адрес электронной почты,с которым вы зарегистрированы.</span>
//                         <Input
//                             onChange={(v) => changeEmail(v)}
//                             value={email}
//                             type='email'
//                             headerText='E-mail'
//                             isRequired
//                             placeholder=''
//                             class='h-[56px] rounded-[10px] pl-[14px]' />
//                         <Button
//                             disabled={email == ""}
//                             onClick={send}
//                             children="Восстановить пароль"
//                             class='text-white font-bold flex items-center justify-center rounded-xl bg-[#4A85F6] py-4 mt-4' />
//                         <hr className="w-[calc(100% + 40px)]  my-4 border-t-[#D1D1D1] border-1" />
//                         <Button onClick={() => { setShow(false) }}
//                             children="Вернуться на страницу авторизации"
//                             class='!text-[#4A85F6] font-bold flex items-center justify-center rounded-xl border-[#4A85F6] border-[3px] py-4' />
//                     </div> :
//                     <div className="w-full flex flex-col">
//                         <span className='text-center font-bold text-[22px]'>Пароль восстановлен</span>
//                         <span className='text-center font-semibold text-[16px]'>На почту был отправлен новый пароль</span>
//                         <Button onClick={() => { setShow(false) }}
//                             children="Вернуться на страницу авторизации"
//                             class='!text-[#4A85F6] font-bold flex items-center justify-center rounded-xl border-[#4A85F6] border-[3px] py-4 mt-4' />
//                     </div>
//             }

//         </Modal>
//     )
// })