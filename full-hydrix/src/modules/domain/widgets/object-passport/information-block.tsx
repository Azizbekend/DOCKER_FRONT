import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import image from "@/modules/domain/assets/images/image.png"
import { useState } from 'react';
import { Icon } from '@/packages/shared-ui/icon';
import { Button } from '@/packages/shared-ui/button/button';
import { PassportDataType } from '@/packages/entities/object/type';

interface InformationBlockProps {
    objectData: PassportDataType
}

export const InformationBlock = observer(({ objectData }: InformationBlockProps) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <BlockContainer title="Описание технологии очистки">

            <div className={`text-[0.9rem] text-gray-800 text-justify leading-relaxed relative transition-all whitespace-pre-line ${isExpanded ? '' : 'line-clamp-6'}`}>

                {objectData.objectDiscription}
                {objectData.objectDiscriptionFileId != 0 &&
                    <img className='w-[100%] mx-auto mt-5' src={`https://triapi.ru/research/api/FileStorage/download?id=${objectData.objectDiscriptionFileId}`} alt="" />
                }

                {!isExpanded && (
                    <div className='absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none'>
                        {/* Или более заметная тень */}
                        {/* <div className='absolute inset-0 shadow-[inset_0_0_20px_0_rgba(0,0,0,0.1)] pointer-events-none'></div> */}
                    </div>
                )}

            </div>

            <Button
                onClick={toggleExpand}
                class="mt-4 mx-auto px-8 justify-items-center font-medium text-sm"
                styleColor='blueOutline'
            >
                {isExpanded ? (
                    <>
                        <span>Свернуть</span>
                    </>
                ) : (
                    <>
                        <span>Подробнее</span>
                    </>
                )}
            </Button>

        </BlockContainer>

        
    )
});