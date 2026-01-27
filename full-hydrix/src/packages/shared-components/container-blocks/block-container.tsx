import { ReactNode } from "react"

export const BlockContainer = ({ title, children }: { title: string, children: ReactNode }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
            {children}
        </div>
    )
}