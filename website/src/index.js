const root = document.getElementById('root');
const title = document.getElementById('title');
const logoText = document.getElementById('logoText');
const circle = document.getElementsByClassName('circle');
const intro = document.getElementsByClassName('intro');


const changeStatus = [init, goIntro1, goIntro2, end];
let index = 0;


window.addEventListener('load', changeStatus[index]);
window.addEventListener('resize', changeStatus[index]);
window.addEventListener('mousewheel', handleMouseWheel);

function handleMouseWheel(e) {
    if (Math.abs(e.deltaY) < 10) return;
    if (e.deltaY > 0 && index < 3)
        changeStatus[++index]();
    else if (e.deltaY < 0 && index > 0)
        changeStatus[--index]();
    window.removeEventListener('mousewheel', handleMouseWheel);
    setTimeout(function () {
        window.addEventListener('mousewheel', handleMouseWheel);
    }, 1000);
}


function init() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(circle[0], {
        height: `55%`,
        width: 'auto',
        top: '10%',
        left: `calc(50% - ${0.55 * height * 0.5}px)`
    });
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
    setStyle(root, {
        opacity: 1
    }, 450);
}

function goIntro1() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(circle[0], {
        top: `-30%`,
        left: `calc(50% - ${0.55 * height * 0.5}px)`
    });
    setStyle(title, {
        top: '-30%',
    });
    setStyle(logoText, {
        width: `${height * 0.3}px`,
        height: 'auto',
        top: '8%',
        left: `calc(50% - ${0.5 * height * 0.3}px)`,
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
}

function goIntro2() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(circle[1], {
        width: `7%`,
        height: 'auto',
        left: '48%',
        top: `${width * 0.01}px`,
    });
    setStyle(circle[2], {
        width: '14%',
        height: 'auto',
        right: '43%',
        top: `-${width * 0.14 * 0.5}px`
    });
    setStyle(circle[3], {
        width: '20%',
        height: 'auto',
        left: '-10%',
        top: `-${width * 0.15}px`
    });
    setStyle(circle[4], {
        width: '18%',
        height: 'auto',
        right: '8%',
        bottom: `${width * 0.24 * 1.3}px`
    });
    setStyle(circle[5], {
        width: '10%',
        height: 'auto',
        left: '12%',
        bottom: `${width * 0.06* 6.5}px`
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
        top: `55%`,
        left: '8%',
        opacity: 1,
    });
    setStyle(intro[4], {
        top: `68%`,
        left: '40%',
    });
    setStyle(intro[5], {
        height: '15%',
        overflow: 'hidden',
        top: `-15%`,
        right: '40%',
        opacity: 0,
    });
}

function end() {
    // console.log(4)
}


function setStyle(ele, option, delay) {
    setTimeout(function () {
        for (let name in option)
            if (option.hasOwnProperty(name))
                ele.style[name] = option[name];
    }, delay || 0);
}
