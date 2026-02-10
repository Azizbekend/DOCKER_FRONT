export const TimModel = () => {
    return (
        <>
            <div className="bg-white rounded-2xl p-7">
                <div className="xl:mb-8 flex items-center gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 xl:text-3xl">3D-Модель</h1>
                        <div className="w-20 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
                    </div>
                </div>
                <iframe width="1024" height="640" src="http://hydrig.gsurso.ru/tim-model" className="timModel-dispatch__iframe"></iframe>
            </div>
        </>
    )
}