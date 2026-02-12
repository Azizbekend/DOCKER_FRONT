import { observer } from 'mobx-react-lite';

interface ImageBlockProps {
    imagePassport: any;
}

export const ImageBlock = observer(({ imagePassport }: ImageBlockProps) => {
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="relative w-full aspect-video">
                <img
                    src={`https://triapi.ru/research/api/FileStorage/download?id=${imagePassport || ''}`}
                    alt="Объект"
                    className="w-full h-full object-cover rounded-lg object-right"
                />
                <div className="absolute bg-gray-700/50 top-3 left-3 bg-white/30 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                    Подключено
                </div>
            </div>
        </div>
    );
});