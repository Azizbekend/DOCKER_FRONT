export const TimModel = () => {
    return (
        <>
            <div className="informations-dispatch__timModel timModel-dispatch dispatch-background">
                {/* Заголовок в едином стиле */}
      
                <div className="timModel-dispatch__container">
                    <div className="mb-8 flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">3D-Модель</h1>
          <div className="w-20 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>
      </div>
                    <iframe width="1024" height="640" src="http://hydrig.gsurso.ru/tim-model/applications/Waterclean/Waterclean.html" className="timModel-dispatch__iframe"></iframe>


                    
                </div>
            </div>
        </>
    )
}