export function useScrollLock() {
    const lockScroll = () => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`;
    };

    const unlockScroll = () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    };

    return { lockScroll, unlockScroll };
}
