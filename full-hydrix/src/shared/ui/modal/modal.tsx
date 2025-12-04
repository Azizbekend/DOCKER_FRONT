import { useCallback, useEffect } from "react"
import type { MouseEvent } from "react"
import PortalModal from "./portal"
import { Icon } from "../icon"
import type { ModalProps } from "./setting/type"

export const Modal = ({ show, title, setShow, children, footerSlot, classNames, closeOnOverlay = false, type, wrapperId }: ModalProps) => {
    const handleClose = useCallback(() => {
        setShow(false)
    }, [setShow])

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") handleClose()
        },
        [handleClose],
    )

    useEffect(() => {
        if (!show) return undefined
        document.addEventListener("keydown", handleKeyPress)
        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress, show])

    if (!show) return null

    const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }


    const classOverlay = (type == "center" && "flex items-center justify-center ") + (classNames?.overlay ?? "");
    const classContainer = (type == "center" ? "justify-center px-4" : "justify-end ") + (classNames?.container ?? "");
    const classPanel = (type == "center" ? "hidrex-modal-fade-in rounded-2xl max-h-[90vh] " : "hidrex-modal-slide-in-right relative h-screen ") + (classNames?.panel ?? "");

    return (
        <PortalModal wrapperId={wrapperId}>
            <div className={`fixed inset-0 z-[60] bg-[#192038]/40 backdrop-blur-[1px] ${classOverlay}`}
                onClick={handleClose}>
                <div className={`w-full flex ${classContainer}`}>
                    <div className={`w-full overflow-hidden flex flex-col bg-white shadow-[0_20px_50px_rgba(16,24,40,0.25)] ${classPanel}`}
                        role="dialog"
                        aria-modal="true"
                        onClick={stopPropagation}
                    >
                        <div className={`flex shrink-0 items-center justify-between border-b border-[#EFF4FA] px-6 py-4 ${classNames?.header ?? ""}`}>
                            <span className={`text-xl font-semibold ${classNames?.title ?? ""}`}>{title}</span>
                            <Icon
                                className={`cursor-pointer text-[#8F9BB3] transition-opacity duration-200 hover:opacity-60 ${classNames?.close ?? ""}`}
                                systemName="close"
                                width={24}
                                height={24}
                                onClick={handleClose}
                            />
                        </div>

                        <div className={`flex min-h-0 grow flex-col overflow-hidden ${classNames?.content ?? ""}`}>
                            <div className={`min-h-0 grow overflow-auto ${classNames?.body ?? ""}`}>
                                {children}
                            </div>
                        </div>

                        {footerSlot && (
                            <div className={`shrink-0 border-t border-[#EFF4FA] ${classNames?.footer ?? ""}`}>
                                {footerSlot}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </PortalModal>
    )
}
