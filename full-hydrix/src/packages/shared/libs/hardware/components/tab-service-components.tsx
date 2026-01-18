import { ReactNode } from "react"

export const BlockContainer = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={"bg-white rounded-xl p-6 border border-gray-100 shadow-sm " + className}>
            {children}
        </div>
    )
}


export const BlockListContainer = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={"flex flex-col gap-5" + className}>
            {children}
        </div>
    )
}


export const BlockTitle = ({ title }: { title: string }) => {
    return (
        <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#4A85F6] rounded-full"></div>
            {title}
        </h3>
    )
}