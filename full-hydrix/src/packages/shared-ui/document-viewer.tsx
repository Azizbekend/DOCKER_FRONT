import { Modal } from "@/packages/shared-ui/modal/modal";


export default function DocumentViewer({ isOpen, setShow, docs }: { isOpen: boolean, setShow: (value: boolean) => void, docs: string }) {
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

            children={<iframe src={docs} className="h-full w-full"></iframe>}
        />
    );
}
