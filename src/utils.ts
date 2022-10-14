export const disableScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
/*     document.body.style.left = '0';
    document.body.style.right = '0'; */
};

export const enableScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scroll(0, parseInt(scrollY) * -1);
}