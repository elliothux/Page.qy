const root = document.getElementById('root');
const title = document.getElementById('title');
const logoText = document.getElementById('logoText');
const circle = document.getElementsByClassName('circle');
const intro = document.getElementsByClassName('intro');
const button = document.getElementsByClassName('button');
const download = document.getElementsByClassName('download');
const downloadText = document.getElementById('downloadText');


const changeStatus = [init, goIntro1, goIntro2, end];
let index = 0;
let maxScroll = document.body.offsetHeight * 5 / 6;


window.addEventListener('load', () => {
    document.body.scrollTop = 0;
    changeStatus[index]();
});
window.addEventListener('resize', () => {
    maxScroll = document.body.offsetHeight * 5 / 6;
    changeStatus[index]();
});
window.addEventListener('scroll', handleScroll);
download[0].addEventListener('mouseover', function () {
    downloadText.innerHTML = 'Page.qy for Windows'
});
download[0].addEventListener('mouseout', function () {
    downloadText.innerHTML = ''
});
download[1].addEventListener('mouseover', function () {
    downloadText.innerHTML = 'Page.qy for macOS'
});
download[1].addEventListener('mouseout', function () {
    downloadText.innerHTML = ''
});
download[2].addEventListener('mouseover', function () {
    downloadText.innerHTML = 'Page.qy for Linux'
});
download[2].addEventListener('mouseout', function () {
    downloadText.innerHTML = ''
});
button[2].addEventListener('click', function () {
    const download = document.getElementById('download');
    if (download.style.display === 'none') {
        download.style.display = 'block';
        setTimeout(function () {
            download.style.opacity = 1;
        }, 50)
    } else {
        download.style.opacity = 0;
        setTimeout(function () {
            download.style.display = 'none';
        }, 400)
    }
});



function handleScroll() {
    const scroll = document.body.scrollTop;
    if (scroll < maxScroll / 6) {
        if (index === 0) return;
        index = 0;
        changeStatus[index]();
    }
    else if (scroll <= maxScroll / 6 * 3) {
        if (index === 1) return;
        index = 1;
        changeStatus[index]();
    }
    else if (scroll <= maxScroll / 6 * 5) {
        if (index === 2) return;
        index = 2;
        changeStatus[index]();
    } else {
        if (index === 3) return;
        index = 3;
        changeStatus[index]();
    }
}



function setStyle(ele, option, delay) {
    setTimeout(function () {
        for (let name in option)
            if (option.hasOwnProperty(name))
                ele.style[name] = option[name];
    }, delay || 0);
}


function init() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(title, {
        top: '70%',
        height: '30%',
        fontSize: `${height * 0.3 / 8}px`,
    });
    setStyle(logoText, {
        width: `${height * 0.46}px`,
        height: 'auto',
        top: '32.5%',
        left: `calc(50% - ${0.5 * height * 0.46}px)`
    });
    setStyle(circle[0], {
        height: `55%`,
        width: 'auto',
        top: '10%',
        left: `calc(50% - ${0.55 * height * 0.5}px)`
    });
    setStyle(circle[1], {
        width: `20%`,
        height: 'auto',
        left: '-3%',
        top: `-${width * 0.2 * 0.4}px`
    });
    setStyle(circle[2], {
        width: '9%',
        height: 'auto',
        right: '6%',
        top: '5%'
    });
    setStyle(circle[3], {
        width: '4%',
        height: 'auto',
        left: '20%',
        top: `${width * 0.2 * 1.5}px`
    });
    setStyle(circle[4], {
        width: '16%',
        height: 'auto',
        right: '10%',
        bottom: '10%'
    });
    setStyle(circle[5], {
        width: '17%',
        height: 'auto',
        left: '10%',
        bottom: `-${width * 0.17* 0.6}px`
    });
    setStyle(circle[6], {
        width: '10%',
        bottom: `-${width * 0.1}px`
    });
    setStyle(circle[7], {
        width: '25%',
        left: '-25%',
        bottom: `-${width * 0.25}px`
    });
    setStyle(circle[8], {
        width: '6%',
        height: 'auto',
        right: '95%',
        bottom: `-${width * 0.06}px`
    });
    setStyle(intro[0], {
        top: '100%',
        left: '43%',
        fontSize: `${height * 0.3 / 12}px`,
        opacity: 0
    });
    setStyle(intro[1], {
        top: '100%',
        left: '13%',
        fontSize: `${height * 0.3 / 12}px`,
        opacity: 0
    });
    setStyle(intro[2], {
        top: '100%',
        right: '8%',
        fontSize: `${height * 0.3 / 12}px`,
        opacity: 0
    });
    setStyle(intro[3], {
        top: `100%`,
        left: '8%',
        opacity: 0,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro[4], {
        top: `100%`,
        left: '40%',
        opacity: 0,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro[5], {
        top: `100%`,
        right: '10%',
        opacity: 0,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(button[0], {
        bottom: '-45px',
        display: 'none'
    });
    setStyle(button[1], {
        bottom: '-45px',
        display: 'none'
    });
    setStyle(button[2], {
        bottom: '-45px',
        display: 'none'
    });
    setStyle(root, {
        opacity: 1
    }, 500);
}

function goIntro1() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(title, {
        top: '-30%',
    });
    setStyle(logoText, {
        width: `${height * 0.3}px`,
        height: 'auto',
        top: '8%',
        left: `calc(50% - ${0.5 * height * 0.3}px)`,
    });
    setStyle(circle[0], {
        top: `-30%`,
        left: `calc(50% - ${0.55 * height * 0.5}px)`
    });
    setStyle(circle[1], {
        width: `10%`,
        height: 'auto',
        left: '-3%',
        top: `-${width * 0.1 * 0.6}px`,
    });
    setStyle(circle[2], {
        width: '7%',
        height: 'auto',
        right: '3%',
        top: `-${width * 0.07 * 0.4}px`
    });
    setStyle(circle[3], {
        width: '20%',
        height: 'auto',
        left: '7%',
        top: `${width * 0.1 }px`
    });
    setStyle(circle[4], {
        width: '6%',
        height: 'auto',
        right: '17%',
        bottom: `${width * 0.18 * 0.8}px`
    });
    setStyle(circle[5], {
        width: '27%',
        height: 'auto',
        left: '45%',
        bottom: `-${width * 0.30* 0.65}px`
    });
    setStyle(circle[6], {
        width: '10%',
        bottom: `-${width * 0.1}px`
    });
    setStyle(circle[7], {
        width: '25%',
        left: '-25%',
        bottom: `-${width * 0.25}px`
    });
    setStyle(circle[8], {
        width: '6%',
        height: 'auto',
        right: '95%',
        bottom: `-${width * 0.06}px`
    });
    setStyle(intro[0], {
        top: `calc(100% - ${height * 0.55}px)`,
        fontSize: `${height * 0.3 / 12}px`,
        opacity: 1,
        left: '43%',
        height: 'auto'
    });
    setStyle(intro[1], {
        top: `calc(100% - ${height * 0.35}px)`,
        fontSize: `${height * 0.3 / 12}px`,
        opacity: 1,
        left: '13%',
        height: 'auto'
    });
    setStyle(intro[2], {
        top: `calc(100% - ${height * 0.7}px)`,
        fontSize: `${height * 0.3 / 12}px`,
        opacity: 1,
        right: '8%',
        height: 'auto'
    });
    setStyle(intro[3], {
        top: `100%`,
        left: '8%',
        opacity: 0,
    });
    setStyle(intro[4], {
        top: `100%`,
        left: '40%',
        opacity: 0
    });
    setStyle(intro[5], {
        top: `100%`,
        right: '10%',
        opacity: 0
    });
    setStyle(button[0], {
        bottom: '-65px',
        display: 'block'
    });
    setStyle(button[1], {
        bottom: '-65px',
        display: 'block'
    });
    setStyle(button[2], {
        bottom: '-65px',
        display: 'block'
    });
}

function goIntro2() {
    const download = document.getElementById('download');
    download.style.display = 'none';
    download.style.opacity = 0;
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(title, {
        top: '-30%',
    });
    setStyle(logoText, {
        width: `${height * 0.3}px`,
        height: 'auto',
        top: '8%',
        left: `calc(50% - ${0.5 * height * 0.3}px)`,
    });
    setStyle(circle[0], {
        top: `-30%`,
        left: `calc(50% - ${0.55 * height * 0.5}px)`
    });
    setStyle(circle[1], {
        width: `18%`,
        height: 'auto',
        left: '-14%',
        top: `${width * 0.18 * 1.4}px`,
    });
    setStyle(circle[2], {
        width: '16%',
        height: 'auto',
        right: '42%',
        top: `-${width * 0.16 * 0.6}px`
    });
    setStyle(circle[3], {
        width: `7%`,
        height: 'auto',
        left: '48%',
        top: `${width * 0.01}px`,
    });
    setStyle(circle[4], {
        width: '18%',
        height: 'auto',
        right: '8%',
        bottom: `${height - width * 0.18 * 1.2}px`
    });
    setStyle(circle[5], {
        width: '10%',
        height: 'auto',
        left: '12%',
        bottom: `${height - width * 0.12}px`
    });
    setStyle(circle[6], {
        width: '16%',
        height: 'auto',
        right: '60%',
        bottom: `-${width * 0.16 * 0.5}px`
    });
    setStyle(circle[7], {
        width: '5%',
        height: 'auto',
        left: '40%',
        bottom: `${width * 0.25}px`
    });
    setStyle(circle[8], {
        width: '6%',
        height: 'auto',
        right: '95%',
        bottom: `-${width * 0.06}px`
    });
    setStyle(intro[0], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        left: '40%',
        opacity: 0,
    });
    setStyle(intro[1], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        left: '40%',
        opacity: 0,
    });
    setStyle(intro[2], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        right: '40%',
        opacity: 0,
    });
    setStyle(intro[3], {
        height: 'auto',
        top: `40%`,
        left: '8%',
        opacity: 1,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro[4], {
        height: 'auto',
        top: `65%`,
        left: '40%',
        opacity: 1,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro[5], {
        top: `50%`,
        height: 'auto',
        right: '10%',
        opacity: 1,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(button[0], {
        bottom: '-65px',
        display: 'block',
        transitionDelay: '120ms'
    });
    setStyle(button[1], {
        bottom: '-65px',
        display: 'block',
        transitionDelay: '70ms'
    });
    setStyle(button[2], {
        bottom: '-65px',
        display: 'block',
        transitionDelay: '0ms'
    });
}

function end() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(title, {
        top: '-30%',
    });
    setStyle(logoText, {
        width: `${height * 0.3}px`,
        height: 'auto',
        top: '8%',
        left: `calc(50% - ${0.5 * height * 0.3}px)`,
    });
    setStyle(circle[0], {
        top: `-30%`,
        left: `calc(50% - ${0.55 * height * 0.5}px)`
    });
    setStyle(circle[1], {
        width: `16%`,
        height: 'auto',
        left: '-3%',
        top: `-${width * 0.16 * 0.6}px`,
    });
    setStyle(circle[2], {
        width: '16%',
        height: 'auto',
        right: '42%',
        top: `-${width * 0.16 * 0.6}px`
    });
    setStyle(circle[3], {
        width: `7%`,
        height: 'auto',
        left: '48%',
        top: `${width * 0.01}px`,
    });
    setStyle(circle[4], {
        width: '8%',
        height: 'auto',
        right: '46%',
        bottom: `${height - width * 0.04}px`
    });
    setStyle(circle[5], {
        width: '18%',
        height: 'auto',
        left: '41%',
        bottom: `${height - width * 0.09}px`
    });
    setStyle(circle[6], {
        width: '5%',
        height: 'auto',
        right: '75%',
        bottom: `${height - width * 0.05 * 5}px`
    });
    setStyle(circle[7], {
        width: '13%',
        height: 'auto',
        left: '76%',
        bottom: `${height - width * 0.13 * 2}px`
    });
    setStyle(circle[8], {
        width: '22%',
        height: 'auto',
        right: '65%',
        bottom: `-${width * 0.22 * 0.8}px`
    });
    setStyle(intro[0], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        left: '40%',
        opacity: 0,
    });
    setStyle(intro[1], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        left: '40%',
        opacity: 0,
    });
    setStyle(intro[2], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        right: '40%',
        opacity: 0,
    });
    setStyle(intro[3], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        left: '40%',
        opacity: 0,
    });
    setStyle(intro[4], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        left: '40%',
        opacity: 0,
    });
    setStyle(intro[5], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        right: '40%',
        opacity: 0,
    });
    setStyle(button[0], {
        bottom: '45%',
        display: 'block',
        opacity: 1,
        transitionDelay: '0ms'
});
    setStyle(button[1], {
        bottom: 'calc(45% - 50px)',
        display: 'block',
        opacity: 1,
        transitionDelay: '70ms'
    });
    setStyle(button[2], {
        bottom: 'calc(45% - 100px)',
        display: 'block',
        opacity: 1,
        transitionDelay: '120ms'
    });
}
