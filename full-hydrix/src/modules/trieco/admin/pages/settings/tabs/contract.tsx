import { Button } from "@/app/cores/core-trieco/UIKit"
import FileUpload from "../components/file-upload/file-upload"
import { observer } from "mobx-react-lite";
import fileStore from "../components/file-upload/model/file-model";

export const Contract = observer(() => {
    const handleSave = () => {
        if (fileStore.file) {
            // Handle the save logic here, for example, send the file to the server
            const formData = new FormData();
            formData.append('file', fileStore.file);

            fetch('/your-server-endpoint', {
                method: 'POST',
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    alert('File uploaded successfully');
                    fileStore.clearFile();
                } else {
                    alert('File upload failed');
                }
            });
        }
    };
    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="w-full flex flex-row justify-between items-center">
                <span className="text-[20px] font-bold">
                    Договор
                </span>
                <div className="flex flex-row gap-3">
                    <Button onClick={handleSave} disabled={!fileStore.isEmpty()} children="Сохранить документ" class="bg-[#4A85F6] rounded-md !py-2 !px-3 disabled:bg-[#757575]" />
                    <Button onClick={fileStore.clearFile} disabled={!fileStore.isEmpty()} children="Удалить документ" class="!text-[#B41B1B] font-semibold !py-2 !px-3 disabled:bg-transparent disabled:!text-[#757575]" />
                </div>

            </div>

            <div className="flex flex-row gap-7 h-full">
                <FileUpload />
            </div>
        </div>
    )
})