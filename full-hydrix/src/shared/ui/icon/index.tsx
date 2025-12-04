// import React from "react";

type Props = {
    systemName: string;
    className?: string;
    cursor?: string;
    action?: Function;
    width?: number;
    height?: number;
    onClick?: (e: any) => void;
    style?: React.CSSProperties;
};

export const Icon = (props: Props) => {
    const styles: React.CSSProperties = {};

    if (props.width) styles.width = `${props.width}px`;
    if (props.height) styles.height = `${props.height}px`;
    if (props.cursor) styles.cursor = props.cursor;

    const img = new URL(`./svg/${props.systemName}.svg`, import.meta.url).href;

    return (
        <div style={styles} className={` ${props.className}`}>
            <img
                draggable="false"
                onClick={props.onClick ? (e) => props.onClick!(e) : () => { }}
                src={img}
                alt=""
                style={{ ...styles, ...props.style }}
            />
        </div>
    );
};
