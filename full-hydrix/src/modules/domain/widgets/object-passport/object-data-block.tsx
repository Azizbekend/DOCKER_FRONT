import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';



interface ObjectDataBlockProps {
    data: any
    items: any
}

export const ObjectDataBlock = observer(({ data, items }: ObjectDataBlockProps) => {

    const [copied, setCopied] = useState(false);


    const handleCopyCoordinates = async () => {

    }


    return (
        <BlockContainer title="Общая информация" >
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {data.adress}
                </h3>

                <div>
                    <p className='text-[1rem] font-semibold text-gray-800'>Дата введения в эксплуатацию</p>
                    <p className='text-[0.9rem] font-semibold text-gray-800'>Декабрь 2025</p>
                </div>

                {items.map((item, index) => (
                    <div key={index} className="space-y-1">
                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                            {item.name}
                        </div>
                        <div className="text-gray-800 text-sm">
                            {item.value}
                            {item.coord && (
                                <div className="mt-1.5 flex items-center">
                                    <span className={`text-xs ${copied ? 'text-[#4A85F6]' : 'text-gray-600'}`}>
                                        {/* {coordinates} */}
                                    </span>
                                    <button
                                        onClick={handleCopyCoordinates}
                                        className="ml-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                                        title="Копировать координаты"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </BlockContainer >
    );
});