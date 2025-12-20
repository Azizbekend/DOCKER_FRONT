import { Modal } from "@/shared/ui/modal/modal";

export default function DocumentViewer({ isOpen, setShow }: { isOpen: boolean, setShow: (value: boolean) => void }) {
    return (

        <Modal
            title={"Просмотр документа"}
            wrapperId='viewDoc'
            type="center"
            show={isOpen}
            setShow={setShow}
            classNames={{
                body: "h-screen",
            }}

            children={<iframe src="/public/docs/functionGuide.pdf" className="h-full w-full"></iframe>}
        />
    );
}
