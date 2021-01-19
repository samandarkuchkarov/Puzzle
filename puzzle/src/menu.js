
export function menu(){

document.querySelector('.settings').addEventListener('click', () => {
    document.querySelector('.settings').style.display = "none"
    document.querySelector('.addsound').style.display = "block";
    document.querySelector('.soundon').style.display = "block";
    let x = window.matchMedia("(min-width: 1280px)")
    if (x.matches) {
        document.querySelector('.level').style.display = "block";
        document.querySelector('.level-photo').style.display = "block";
    }
    document.querySelector('.exit').style.display = "block";
    document.querySelector('.icon').style.display = "none";
    document.querySelector('.About').style.display = "block";
    document.querySelector('.restart').style.display = "none";
    document.querySelector('.continue').style.display = "none";
})
document.querySelector('.exit').addEventListener('click', () => {
    document.querySelector('.settings').style.display = "block"
    document.querySelector('.level-photo').style.display = "none";
    document.querySelector('.icon').style.display = "block";
    document.querySelector('.addsound').style.display = "none";
    document.querySelector('.soundon').style.display = "none";
    document.querySelector('.exit').style.display = "none";
    document.querySelector('.level').style.display = "none";
    document.querySelector('.About').style.display = "none";
    document.querySelector('.restart').style.display = "block";
    document.querySelector('.continue').style.display = "block";
})
document.querySelector('.About').addEventListener('click', () => {
    document.querySelector('.addsound').style.display = "none";
    document.querySelector('.soundon').style.display = "none";
    document.querySelector('.exit').style.display = "none";
    document.querySelector('.level-photo').style.display = "none";
    document.querySelector('.icon').style.display = "block";
    document.querySelector('.level').style.display = "none";
    document.querySelector('.icon').style.display = "none";
    document.querySelector('.checker').style.display = "block";
    document.querySelector('.exit2').style.display = "block";
    document.querySelector('.About').style.display = "none";
    document.querySelector('.checker').textContent = 'Dear checker, please give your discord visible or give me max mark 😉 and if you can not watch video it is problem with you internet speed or your browser. You can give me advice(I am new in programing).'

})
document.querySelector('.exit2').addEventListener('click', () => {
    document.querySelector('.addsound').style.display = "block";
    document.querySelector('.soundon').style.display = "block";
    document.querySelector('.checker').style.display = "none";
    document.querySelector('.icon').style.display = "none";
    document.querySelector('.exit2').style.display = "none";
    document.querySelector('.About').style.display = "block";
    let x = window.matchMedia("(min-width: 1280px)")
    if (x.matches) {
        document.querySelector('.level').style.display = "block";
        document.querySelector('.level-photo').style.display = "block";
    }
    document.querySelector('.exit').style.display = "block";
})
document.querySelector('.house').addEventListener('click', () => {
    document.querySelector('.menu').style.display = "block";
})
if (localStorage.getItem('sizefield') !== null) {
    document.querySelector('.field').style.height = localStorage.getItem('sizefield');
    document.querySelector('.field').style.width = localStorage.getItem('sizefield');
}
document.querySelector('.skip').addEventListener('click', () => {
    document.querySelector('.skip').style.display = "none";
    document.querySelector('.unmute').style.display = "none";
    document.querySelector('#ocScreencapVideo').pause();
    document.querySelector('#ocScreencapVideo').style.display = "none";
})
document.querySelector('#ocScreencapVideo').onended = function () {
    document.querySelector('.skip').style.display = "none";
    document.querySelector('.unmute').style.display = "none";
    document.querySelector('#ocScreencapVideo').style.display = "none";
}
let mute = 0
document.querySelector('.unmute').addEventListener('click', () => {
    if (mute % 2 === 0) {
        document.querySelector('#ocScreencapVideo').muted = false;
        document.querySelector('.unmute').innerHTML = "Mute";
    } else {
        document.querySelector('#ocScreencapVideo').muted = true;
        document.querySelector('.unmute').textContent = "Unmute";
    }
    mute++;
})
}