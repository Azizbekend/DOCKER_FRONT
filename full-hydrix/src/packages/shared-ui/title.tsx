interface TitleProps {
    title: string;
    calssName?: string;
}
// Не продуманная
export const Title = ({ title, calssName }: TitleProps) => {
    return (
        <div className=" flex items-center gap-4">
            <div>
                <h1 className="text-xl font-bold text-gray-800 xl:text-3xl">{title}</h1>
                <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
            </div>
        </div>
    );
};