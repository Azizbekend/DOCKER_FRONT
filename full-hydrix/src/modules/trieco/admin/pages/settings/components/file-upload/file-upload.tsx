import { observer } from 'mobx-react-lite';
import fileStore from './model/file-model';
import { Icon } from '@/app/cores/core-trieco/UIKit/icon';

const FileUpload = observer(() => {

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      fileStore.setFile(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  return (
    <div className="border-dashed border-2 border-gray-400 p-4 rounded-lg h-full flex items-center w-full justify-center">
      {fileStore.previewUrl ? (
        <embed
          src={fileStore.previewUrl}
          type="application/pdf"
          className="w-full h-full"
        />
      ) : (
        <div className="text-center">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className='flex flex-col items-center'>
              <Icon systemName='folder' width={48} height={48} />
              <span className='text-[14px] font-semibold'>Нажмите или перетащите файл сюда</span>
              <span className='text-[14px]'>Загрузите документ в формате PDF</span>
            </div>
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
        </div>
      )}
    </div>
  );
});

export default FileUpload;