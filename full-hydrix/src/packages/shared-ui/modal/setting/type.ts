import type { ReactNode } from "react";

export type PortalProps = {
    children: ReactNode;
    wrapperId: string;
}

export type ModalClassNames = {
    overlay?: string;
    container?: string;
    panel?: string;
    header?: string;
    title?: string;
    close?: string;
    content?: string;
    body?: string;
    footer?: string;
}

export type ModalProps = {
    show: boolean;
    title?: string | ReactNode;
    setShow: (value: boolean) => void;
    children: ReactNode;
    footerSlot?: ReactNode;
    classNames?: ModalClassNames;
    closeOnOverlay?: boolean;
    type: "center" | "right";
    wrapperId: string;
}


export type ModalDeleteProps = {
    show: boolean,
    wrapperId: string,
    children?: ReactNode,
    text?: string
    classNames?: {
        overlay?: string,
        container?: string;
        header?: string,
        text?: string,
        footer?: string,
    }


    onClickDelete: () => void,
    setShow: (value: boolean) => void;
}
