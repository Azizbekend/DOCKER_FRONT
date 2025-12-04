type Props = {
    title: string;
    firstName: string;
    secondName: string;
    email: string;
    phoneNumber: string;
}
export const Contact = (props: Props) => {
    return(
        <>
            <div className="mb-[14px]">
                <h2 className="text-[15px] font-semibold leading-normal mb-[12px]">{props.title}</h2>
                <div className="flex flex-col text-[13px] leading-normal">
                    <p>{props.secondName} {props.firstName}</p>
                    <a href={`mailto:{${props.email}}`} className="text-[#4a85f6]">{props.email}</a>
                    <a href={`tel:{${props.phoneNumber}}`} className="text-[#4a85f6]">{props.phoneNumber}</a>
                </div>
            </div>
        </>
    )
}