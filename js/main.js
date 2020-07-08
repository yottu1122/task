window.onload = () => {
    new Swiper('.swiper-container', {
        loop: true,
        autoHeight: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        speed: 500,
        effect: 'fade',
    });

    smoothScroll();
}

const smoothScroll = () => {
    const smooth = 10;
    const divisor = 8;
    const range = (divisor / 2) + 1;
    const links = document.querySelectorAll('a[href^="#"]');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {

            e.preventDefault();
            let moveY;
            let currentY = window.pageYOffset;
            const href = e.target.getAttribute('href');
            const target = document.querySelector(href);
            const position = target.getBoundingClientRect();
            const targetY = position.top + currentY;

            // スクロール終了まで繰り返される処理
            (scroll = () => {
                moveY = currentY + Math.round((targetY - currentY) / divisor);
                window.scrollTo(0, moveY);
                currentY = moveY;

                if (document.body.clientHeight - window.innerHeight < moveY) {
                    //最下部にスクロールしても対象まで届かない場合は下限までスクロールして強制終了。
                    window.scrollTo(0, document.body.clientHeight);
                    return;
                }
                if (moveY >= targetY + range || moveY <= targetY - range) {
                    //rangeの範囲内へ近づくまで繰り返す。
                    window.setTimeout(scroll, smooth);
                } else {
                    //rangeの範囲内に来れば正確な値へ移動して終了。
                    window.scrollTo(0, targetY);
                }
            })();
        });
    }
}
