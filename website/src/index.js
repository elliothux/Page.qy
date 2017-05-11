const root = document.getElementById('root');
const title = document.getElementById('title');
const logoText = document.getElementById('logoText');
const circles = document.getElementsByClassName('circle')
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const circle4 = document.getElementById('circle4');
const circle5 = document.getElementById('circle5');
const circle6 = document.getElementById('circle6');
const intros = document.getElementsByClassName('intro');
const intro1 = document.getElementById('intro1');
const intro2 = document.getElementById('intro2');
const intro3 = document.getElementById('intro3');
const intro4 = document.getElementById('intro4');
const intro5 = document.getElementById('intro5');
const intro6 = document.getElementById('intro6');
const changeStatus = [init, goIntro1, goIntro2, goIntro3, end];
let index = 0;


window.addEventListener('load', changeStatus[index]);
window.addEventListener('resize', changeStatus[index]);
window.addEventListener('mousewheel', function (e) {
    if (e.deltaY === 0) return;
    if (e.deltaY > 10 && index < 4)
        changeStatus[++index]();
    else if (e.deltaY < -10 && index > 0)
        changeStatus[--index]();
});


function init() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(circle1, {
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
    setStyle(circle2, {
        width: `20%`,
        height: 'auto',
        left: '-3%',
        top: `-${width * 0.2 * 0.4}px`
    });
    setStyle(circle3, {
        width: '9%',
        height: 'auto',
        right: '6%',
        top: '5%'
    });
    setStyle(circle4, {
        width: '4%',
        height: 'auto',
        left: '20%',
        top: `${width * 0.2 * 1.5}px`
    });
    setStyle(circle5, {
        width: '16%',
        height: 'auto',
        right: '10%',
        bottom: '10%'
    });
    setStyle(circle6, {
        width: '17%',
        height: 'auto',
        left: '10%',
        bottom: `-${width * 0.17* 0.6}px`
    });
    setStyle(intro1, {
        top: '100%',
        left: '43%',
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro2, {
        top: '100%',
        left: '13%',
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro3, {
        top: '100%',
        right: '8%',
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(root, {
        opacity: 1
    }, 450);
}

function goIntro1() {
    const [width, height] = [window.innerWidth, window.innerHeight];
    setStyle(circle1, {
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
    setStyle(circle2, {
        width: `10%`,
        height: 'auto',
        left: '-3%',
        top: `-${width * 0.1 * 0.6}px`,
    });
    setStyle(circle3, {
        width: '7%',
        height: 'auto',
        right: '3%',
        top: `-${width * 0.07 * 0.4}px`
    });
    setStyle(circle4, {
        width: '20%',
        height: 'auto',
        left: '7%',
        top: `${width * 0.1 }px`
    });
    setStyle(circle5, {
        width: '6%',
        height: 'auto',
        right: '17%',
        bottom: `${width * 0.18 * 0.8}px`
    });
    setStyle(circle6, {
        width: '27%',
        height: 'auto',
        left: '45%',
        bottom: `-${width * 0.30* 0.65}px`
    });
    setStyle(intro1, {
        top: `calc(100% - ${height * 0.55}px)`,
        fontSize: `${height * 0.3 / 12}px`,
    });
    setStyle(intro2, {
        top: `calc(100% - ${height * 0.35}px)`,
        fontSize: `${height * 0.3 / 12}px`, // transitionDelay: '0ms'
    });
    setStyle(intro3, {
        top: `calc(100% - ${height * 0.7}px)`,
        fontSize: `${height * 0.3 / 12}px`,
    });
}

function goIntro2() {
    console.log(2)

}

function goIntro3() {
    console.log(3)
}

function end() {
    console.log(4)
}


function setStyle(ele, option, delay) {
    setTimeout(function () {
        for (let name in option)
            if (option.hasOwnProperty(name))
                ele.style[name] = option[name];
    }, delay || 0);
}
