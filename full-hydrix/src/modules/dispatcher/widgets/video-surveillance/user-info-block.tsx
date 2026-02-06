export const UserInfoBlock = () => {
    return (
        <div className='w-full max-w-6xl flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200'>
            <div className='mx-auto flex items-center gap-2'>
                <div className={`w-3 h-3 rounded-full bg-red-500`}></div>
                <span className='text-sm text-gray-600'>
                    Доступ к камерам ограничен администратором
                </span>
            </div>
        </div>
    );
};