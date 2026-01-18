interface InputTextareaProps {
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
    className?: string;
}


export const Textarea = (props: InputTextareaProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        props.onChange(newValue);
    };

    return (
        <textarea
            className={`px-3 py-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:border-transparent ${props.className}`}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => handleChange(e)}
        />
    );
};
