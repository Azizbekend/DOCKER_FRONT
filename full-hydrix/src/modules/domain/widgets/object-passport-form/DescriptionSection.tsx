// components/objects-form/DescriptionSection.tsx
import { InputContainer } from '@/packages/shared-ui/Inputs/input-container';
import { Textarea } from '@/packages/shared-ui/textarea';
import { Icon } from '@/packages/shared-ui/icon';

interface Props {
    imgPreview: string | null;
    imgPreviewDiscription: string | null;
    setImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setImgDiscription: (e: React.ChangeEvent<HTMLInputElement>) => void;
    description: string;
    setDescription: (value: string) => void;
}

export const DescriptionSection = ({
    imgPreview,
    imgPreviewDiscription,
    setImg,
    setImgDiscription,
    description,
    setDescription,
}: Props) => {
    return (
        <>
            <p className="mt-10 text-lg mb-3 font-bold pt-5 border-t border-gray-500">Описание</p>
            <div className="flex gap-[40px]">
                <label className="w-[40%] h-[350px] rounded-lg mb-8 bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                    <input className="hidden" type="file" onChange={setImg} />
                    {imgPreview ? (
                        <img src={imgPreview} className="p-5 max-w-full max-h-full object-contain" />
                    ) : (
                        <>
                            <Icon systemName="file-plus-blue" />
                            <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                        </>
                    )}
                </label>

                <InputContainer
                    isRequired
                    classNames={{ wrapper: 'w-[calc(60%_-_40px)]' }}
                    children={
                        <Textarea
                            className="h-[350px]"
                            placeholder="Описание объекта"
                            value={description}
                            onChange={(e) => setDescription(e)}
                        />
                    }
                />
            </div>
        </>
    );
};
