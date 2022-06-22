const docEl = document.documentElement;

if (docEl.clientWidth > 758) {
    const fly = document.createElement('div');
    fly.style.cssText = `
        position: fixed;
        width: 50px;
        height: 50px;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: url('img/airplane.svg') center/contain no-repeat;
        `;
    
    document.body.append(fly);
    
    const calcPositionFly = () => {
        const maxTop = docEl.clientHeight - fly.clientHeight;
        // console.log('maxTop: ', maxTop);
        const maxScroll = docEl.scrollHeight - docEl.clientHeight;
        const percentScroll = (window.pageYOffset * 100) / maxScroll;
        
        const top = maxTop * (percentScroll / 100);
        
        fly.style.transform  = `translateY(${-top}px)`;
    
    };
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(calcPositionFly);
    });
    calcPositionFly();
}
