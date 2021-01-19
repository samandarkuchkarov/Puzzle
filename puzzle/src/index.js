import './style.css';
import {
    generate
} from './generate';
import {
    menu
} from './menu';

generate();
menu();
let soundon = 2;
let top = [];
let answer = [];
let seconds = '00';
let tens = '00';
let Interval;
let missions = [1, 2, 3, 4, 5];
let currentMission = 0;
let n = 0;
let way = 1;
const field = document.querySelector('.field');
let cellsize = 100;
const third = document.querySelector('.third');
const sound = document.querySelector('.first');
const ul = document.querySelector('.ul');
let rank = localStorage.getItem('rank');
let cells = [];
let empty = {
    top: 0,
    value: 0,
    left: 0
};
cells.push(empty);
let photo = [
    ['a'],
    ['b'],
    ['c'],
    ['d'],
    ['e']
];
let ranphoto = photo[Math.floor(Math.random() * photo.length)];
// checking text content of level and set it
if (localStorage.getItem('level') !== null) {
    currentMission = Number(localStorage.getItem('level'));
    document.querySelector('.level-photo').src = `../src/img/${Number(localStorage.getItem('level'))+1}x.jpg`
    switch (localStorage.getItem('level')) {
        case '0':
            document.querySelector('.mission').textContent = 'Easy';
            break;
        case '1':
            document.querySelector('.mission').textContent = 'Normal';
            break;
        case '2':
            document.querySelector('.mission').textContent = 'Hard';
            break;
        case '3':
            document.querySelector('.mission').textContent = 'Super hard';
            break;
        case '4':
            document.querySelector('.mission').textContent = 'Extremely hard';
            break;
    }
}
// checking textcontent of move and set it
if (localStorage.getItem('way') !== null) {
    way = Number(localStorage.getItem('way'));
    document.querySelector('.move').textContent = `Move ${way}`;
}
// checking solutions of array and set it
if (localStorage.getItem('answer') === null) {
    answer = [];
} else {
    answer = localStorage.getItem('answer');
    answer = answer.split(',');
    for (let i = 0; i < answer.length; i++) {
        answer[i] = Number(answer[i]);
    }
    answer.reverse();
}
// checking textcontent of ranking and set it
if (rank !== null) {
    ul.innerHTML = rank;
    let place = document.querySelectorAll('.place');
    for (let x = 0; x < place.length; x++) {
        top.push(place[x].value)
    }
}
// checking empty cells position and set it
if (localStorage.getItem('top') !== null) {
    empty.top = Number(localStorage.getItem('top'))
    empty.left = Number(localStorage.getItem('left'))
}
// function for randomlize game field
function move() {
    while (n < 25) {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        let item = array[Math.floor(Math.random() * array.length)];
        const cell = cells[item];
        const leftdiff = Math.abs(empty.left - cell.left);
        const topdiff = Math.abs(empty.top - cell.top);
        if (leftdiff + topdiff > 1) {
            continue
        } else {
            if (answer.length > 2 && answer[n - 1] === item) {
                continue
            } else {
                answer.push(item);
                n++;
                cell.element.style.left = `${empty.left * cellsize}px`;
                cell.element.style.top = `${empty.top * cellsize}px`;
                const empetyleft = empty.left;
                const empetytop = empty.top;
                empty.left = cell.left;
                empty.top = cell.top;
                cell.left = empetyleft;
                cell.top = empetytop;
            }
        }
    }
}
// function for movement of cells
function move2(index) {
    const cell = cells[index];
    const leftdiff = Math.abs(empty.left - cell.left);
    const topdiff = Math.abs(empty.top - cell.top);
    if (leftdiff + topdiff > 1) {
        return;
    }
    answer.reverse();
    answer.push(index)
    answer.reverse();
    cell.element.style.left = `${empty.left * cellsize}px`;
    cell.element.style.top = `${empty.top * cellsize}px`;
    const empetyleft = empty.left;
    const empetytop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = empetyleft;
    cell.top = empetytop;
    const isFinished = cells.every(cell => {
        if (document.querySelectorAll('.cell').length === 15) {
            return cell.value === cell.top * 4 + cell.left;
        } else if (document.querySelectorAll('.cell').length === 24) {
            return cell.value === cell.top * 5 + cell.left;
        } else if (document.querySelectorAll('.cell').length === 35) {
            return cell.value === cell.top * 6 + cell.left;
        } else if (document.querySelectorAll('.cell').length === 48) {
            return cell.value === cell.top * 7 + cell.left;
        } else if (document.querySelectorAll('.cell').length === 63) {
            return cell.value === cell.top * 8 + cell.left;
        }
    });
    if (isFinished) {
        top.push(way);
        complete(way);
        rayting();
        if (document.querySelectorAll('.cell').length === 15) {
            randomres();
        } else if (document.querySelectorAll('.cell').length === 24) {
            randomres5x5(24, 'f');
        } else if (document.querySelectorAll('.cell').length === 35) {
            randomres5x5(35, 'g');
        } else if (document.querySelectorAll('.cell').length === 48) {
            randomres5x5(48, 'h');
        } else if (document.querySelectorAll('.cell').length === 63) {
            randomres5x5(63, 'o');
        }
        answer.reverse();
    }
    localStorage.setItem('all', field.innerHTML)
    localStorage.setItem('top', empty.top);
    localStorage.setItem('left', empty.left);
    localStorage.setItem('answer', answer)
    way++;
}
// function for create ranking list
const rayting = () => {
    const ul = document.querySelector('.ul');
    top.sort((a, rank) => a - rank);
    if (top.length > 10) {
        top.pop();
    }
    ul.innerHTML = '';
    for (let j = 0; j < top.length; j++) {
        ul.innerHTML += `<li class="place"value="${top[j]}">${j+1} place moves:${top[j]}</li>`
    }
    localStorage.setItem("rank", ul.innerHTML);
}
// function for finish game
function complete(way) {
    localStorage.setItem('way', 0);

    function addrespect(way) {
        document.querySelector('.complete').style.display = 'block';
        document.querySelector('.result').textContent = `You win with ${way} moves and ${document.getElementById('seconds').textContent} seconds`;
        document.querySelector('.second').play();
        clearInterval(Interval);
        tens = "00";
        seconds = "00";
        document.getElementById("tens").innerHTML = tens;
        document.getElementById("seconds").innerHTML = seconds;
        document.querySelector('.complete').style.opacity = '1';
    }
    setTimeout(function () {
        document.querySelector('.complete').style.opacity = '1';
        document.querySelector('.complete').style.display = 'none';
    }, 4000);
    addrespect(way);
}
// function for create diiferent size field
function square5x5(looplength, picture) {
    field.innerHTML = '';
    let numbers = [...Array(looplength).keys()];
    cells = [];
    cells.push(empty)
    for (let i = 1; i <= looplength; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        const value = numbers[i - 1] + 1;
        cell.value = value;
        cell.innerHTML = `<img class="img" src="../src/img/${picture}${i}.jpg" alt="">`
        const left = i % Math.sqrt(looplength + 1);
        cell.draggable = true;
        const top = (i - left) / Math.sqrt(looplength + 1);
        cells.push({
            left: left,
            top: top,
            value: value,
            element: cell
        });
        cell.style.left = `${left*cellsize}px`;
        cell.style.top = `${top*cellsize}px`;
        field.append(cell);
        cell.addEventListener('dragstart', dragStart)
        let dragStart = function () {
            setTimeout(() => {
                cell.classList.add('hide');
            }, 0)
        }
        cell.addEventListener('dragend', () => {
            document.querySelector('.move').textContent = `move ${way}`;

            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            cell.classList.remove('hide')
            move2(cell.value);
        })
        document.body.addEventListener("dragover", (event) => {
            event.preventDefault();
        })
        cell.addEventListener('click', () => {
            document.querySelector('.move').textContent = `move ${way}`;

            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            move2(cell.value);
            setTimeout(function () {}, 1000);
        })
    }
}
// checking condition of game field and set it 
if (localStorage.getItem('all') !== null) {
    field.innerHTML = localStorage.getItem('all');
    document.querySelector('.continue').disabled = false;
    if (document.querySelectorAll('.cell').length === 15) {
        document.querySelector('.solution').style.display = "block";
    } else {
        document.querySelector('.solution').style.display = "none";
        document.querySelector('.solution2').style.display = "block";
    }
    for (let i = 1; i <= document.querySelectorAll('.cell').length; i++) {
        const cell = document.querySelectorAll('.cell')[i - 1];
        const value = cell.value;
        let left = cell.style.left.substring(0, cell.style.top.length - 2);
        if (left === '0px') {
            left = 0
        }
        if (Number(left) > 20) {
            left = Number(left) / 100;
        } else {
            left = Number(left)
        }
        let top = cell.style.top.substring(0, cell.style.top.length - 2);
        if (Number(top) > 20) {
            top = Number(top) / 100;
        } else {
            top = Number(top)
        }
        cells.push({
            left: Number(left),
            top: top,
            value: Number(value),
            element: cell
        });
        let dragStart = function () {
            setTimeout(() => {
                cell.classList.add('hide')
            }, 0)
        }
        cell.addEventListener('dragstart', dragStart);
        cell.addEventListener('dragend', () => {
            document.querySelector('.move').textContent = `move ${way}`;
            localStorage.setItem('way', way)
            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            if (document.querySelectorAll('.cell').length === 15) {
                move2(i);
                cell.classList.remove('hide');
            } else {
                move2(i);
            }
            setTimeout(function () {}, 1000);
        })
        document.body.addEventListener("dragover", (event) => {
            event.preventDefault();
        })
        cell.addEventListener('click', () => {
            document.querySelector('.move').textContent = `move ${way}`;
            localStorage.setItem('way', way)
            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            if (document.querySelectorAll('.cell').length === 15) {
                move2(i);
            } else {
                move2(i);
            }
            setTimeout(function () {

            }, 1000);
        })
    }
} else {
    if (localStorage.getItem('level') === null) {
        randomres()
    }
}
if (localStorage.getItem('all') === null && document.querySelectorAll('.cell').length === 15) {
    move()
}
answer.reverse();
document.querySelector('.solution').addEventListener('click', () => {
    way = way + 5;
    document.querySelector('.move').textContent = `move ${way}`
    const cell = cells[answer[0]];
    if (typeof cell === 'undefined') {
        return
    }
    cell.element.style.left = `${empty.left * cellsize}px`;
    cell.element.style.top = `${empty.top * cellsize}px`;
    const empetyleft = empty.left;
    const empetytop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = empetyleft;
    cell.top = empetytop;
    answer.shift();
})
const continues = document.querySelector('.continue');
continues.addEventListener('click', () => {
    document.querySelector('.menu').style.display = "none";
})
// stopwatch function
window.onload = function () {
    seconds = '00';
    tens = '00';
    document.getElementById('button-start').onclick = function () {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
    document.getElementById('button-stop').onclick = function () {
        clearInterval(Interval);
    }
    let loops;
    if (localStorage.getItem('disabled') !== null) {
        document.querySelector('.continue').disabled = false;
    }
    document.querySelector('.restart').onclick = function () {
        document.querySelector('.continue').disabled = false;
        localStorage.setItem('disabled', 0)
        clearInterval(Interval);
        document.querySelector('.menu').style.display = "none"
        loops = document.getElementsByClassName('cell').length;
        if (loops === 15) {
            randomres();
            answer.reverse();
        } else if (loops === 24) {
            randomres5x5(loops, "f");
        } else if (loops === 35) {
            randomres5x5(loops, "g");
        } else if (loops === 48) {
            randomres5x5(loops, "h");
        } else if (loops === 63) {
            randomres5x5(loops, "o");
        }
        localStorage.setItem('way', 0)
        tens = "00";
        seconds = "00";
        document.getElementById("tens").innerHTML = tens;
        document.getElementById("seconds").innerHTML = seconds;
    }

    function startTimer() {
        tens++;
        if (tens < 9) {
            document.getElementById("tens").innerHTML = "0" + tens;
        }
        if (tens > 9) {
            document.getElementById("tens").innerHTML = tens;
        }
        if (tens > 99) {
            seconds++;
            document.getElementById("seconds").innerHTML = "0" + seconds;
            tens = 0;
            document.getElementById("tens").innerHTML = "0" + 0;
        }
        if (seconds > 9) {
            document.getElementById("seconds").innerHTML = seconds;
        }
    }
}
// function for new game for 4x4
function randomres() {
    field.innerHTML = "";
    n = 0;
    const numbers = [...Array(15).keys()];
    way = 1;
    document.querySelector('.move').textContent = 'move 0';
    answer = [];
    cellsize = 100;
    cells = [];
    empty = {
        top: 0,
        value: 0,
        left: 0
    };
    cells.push(empty);
    photo = [
        ['a'],
        ['b'],
        ['c'],
        ['d'],
        ['e']
    ];
    ranphoto = photo[Math.floor(Math.random() * photo.length)];
    for (let i = 1; i <= 15; i++) {
        const value = numbers[i - 1] + 1;
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.innerHTML = `<img class="img" src="../src/img/${ranphoto}${i}.jpg" alt="">`;
        cell.value = value;
        const left = i % 4;
        const top = (i - left) / 4;
        cells.push({
            left: left,
            top: top,
            value: value,
            element: cell,
        });
        cell.style.left = `${left*cellsize}px`;
        cell.style.top = `${top*cellsize}px`;
        field.append(cell);
        let dragStart = function () {
            setTimeout(() => {
                cell.classList.add('hide')
            }, 0)
        }
        cell.addEventListener('dragstart', dragStart)
        cell.addEventListener('dragend', () => {
            document.querySelector('.move').textContent = `move ${way}`;

            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            move2(i);
            cell.classList.remove('hide')
        })
        document.body.addEventListener("dragover", (event) => {
            event.preventDefault();
        })
        cell.addEventListener('click', () => {
            document.querySelector('.move').textContent = `move ${way}`;
            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            move2(i);
            setTimeout(function () {}, 1000);
        })
    }
    move()
}
// function for new game for 5x5,6x6,7x7,8x8
function randomres5x5(looplength, picture) {
    field.innerHTML = "";
    n = 0;
    let numbers;
    if (looplength === 24) {
        numbers = [...Array(looplength + 1).keys()];
        numbers.shift();
        numbers.sort(() => Math.random() - 0.5);
    } else if (looplength === 35) {
        numbers = [...Array(looplength + 1).keys()];
        numbers.shift();
        numbers.sort(() => Math.random() - 0.5);
    } else if (looplength === 48) {
        numbers = [...Array(looplength + 1).keys()];
        numbers.shift();
        numbers.sort(() => Math.random() - 0.5);
    } else if (looplength === 63) {
        numbers = [...Array(looplength + 1).keys()];
        numbers.shift();
        numbers.sort(() => Math.random() - 0.5);
    }
    way = 1;
    document.querySelector('.move').textContent = 'move 0'
    answer = [];
    cellsize = 100;
    cells = [];
    empty = {
        top: 0,
        value: 0,
        left: 0
    };
    cells.push(empty);
    ranphoto = photo[Math.floor(Math.random() * photo.length)];
    for (let i = 1; i <= looplength; i++) {
        let value = numbers[i - 1] + 1;
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.innerHTML = `<img class="img" src="../src/img/${picture}${numbers[i-1]}.jpg" alt="">`;
        cell.value = value
        const left = i % Math.sqrt(looplength + 1);
        const top = (i - left) / Math.sqrt(looplength + 1);
        cells.push({
            left: left,
            top: top,
            value: value,
            element: cell,
        });
        cell.style.left = `${left*cellsize}px`;
        cell.style.top = `${top*cellsize}px`;
        field.append(cell);
        let dragStart = function () {
            setTimeout(() => {
                cell.classList.add('hide')
            }, 0)
        }
        cell.addEventListener('dragstart', dragStart);
        cell.addEventListener('dragend', () => {
            document.querySelector('.move').textContent = `move ${way}`;

            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            move2(i);
            cell.classList.remove('hide')
        })
        document.body.addEventListener("dragover", (event) => {
            event.preventDefault();
        })
        cell.addEventListener('click', () => {
            document.querySelector('.move').textContent = `move ${way}`;

            if (soundon % 2 === 0) {
                third.currentTime = 0;
                third.play();
            }
            move2(i);
        })
    }
    answer.reverse();
}

document.querySelector('.soundon').addEventListener('click', () => {
    soundon++;
    if (soundon % 2 === 0) {
        document.querySelector('.soundon').textContent = 'Sound on'
    } else {
        document.querySelector('.soundon').textContent = 'Sound off'
    }
})

document.querySelector('.addsound').addEventListener('click', () => {
    if (document.querySelector('.addsound').textContent === 'Music on') {
        sound.pause();
        document.querySelector('.addsound').textContent = 'Music off';
        return;
    }
    sound.load();
    sound.play();
    document.querySelector('.addsound').textContent = 'Music on'
})
// set gamefield size
document.querySelector('.mission').addEventListener('click', () => {
    currentMission++;
    if (currentMission > 4) {
        currentMission = 0;
    }
    document.querySelector('.level-photo').src = `../src/img/${missions[currentMission]}x.jpg`
    let looplength;
    switch (missions[currentMission]) {
        case 1:
            document.querySelector('.mission').textContent = 'Easy';
            randomres();
            localStorage.setItem('empty', `${empty.top},${empty.value}`);
            document.querySelector('.solution2').style.display = "none";
            document.querySelector('.field').style.height = '400px';
            document.querySelector('.solution').style.display = "block";
            document.querySelector('.field').style.width = '400px';
            answer.reverse()
            localStorage.setItem('answer', answer)
            break;
        case 2:
            looplength = 24;
            square5x5(looplength, "f");
            document.querySelector('.solution').style.display = "none";
            randomres5x5(looplength, "f");
            document.querySelector('.solution2').style.display = "block";
            localStorage.setItem('all', field.innerHTML)
            document.querySelector('.field').style.height = '500px';
            document.querySelector('.mission').textContent = 'Normal';
            document.querySelector('.field').style.width = '500px';
            break;
        case 3:
            looplength = 35;
            square5x5(looplength, "g");
            randomres5x5(looplength, "g");
            document.querySelector('.solution').style.display = "none";
            localStorage.setItem('all', field.innerHTML);
            document.querySelector('.solution2').style.display = "block";
            document.querySelector('.field').style.height = '600px';
            document.querySelector('.field').style.width = '600px';
            localStorage.setItem('sizefield', document.querySelector('.field').style.height);
            document.querySelector('.mission').textContent = 'Hard';
            break;
        case 4:
            document.querySelector('.mission').textContent = 'Super hard';
            looplength = 48;
            square5x5(looplength, "h");
            randomres5x5(looplength, "h");
            document.querySelector('.solution2').style.display = "block";
            document.querySelector('.solution').style.display = "none";
            localStorage.setItem('all', field.innerHTML);
            document.querySelector('.field').style.height = '700px';
            document.querySelector('.field').style.width = '700px';
            localStorage.setItem('sizefield', document.querySelector('.field').style.height);
            break;
        case 5:
            document.querySelector('.mission').textContent = 'Extremely hard';
            document.querySelector('.solution2').style.display = "block";
            looplength = 63;
            square5x5(looplength, "o");
            randomres5x5(looplength, "o");
            document.querySelector('.solution').style.display = "none";
            localStorage.setItem('all', field.innerHTML)
            document.querySelector('.field').style.height = '800px';
            document.querySelector('.field').style.width = '800px';
            localStorage.setItem('sizefield', document.querySelector('.field').style.height);
            break;
    }
    localStorage.setItem('level', currentMission);
})
document.querySelector('.solution2').addEventListener('click', () => {
    let looplength = document.querySelectorAll('.cell').length;
    let characterOfPhoto;
    if (looplength === 24) {
        characterOfPhoto = "f"
    } else if (looplength === 35) {
        characterOfPhoto = "g"
    } else if (looplength === 48) {
        characterOfPhoto = "h"
    } else if (looplength === 63) {
        characterOfPhoto = "o"
    }
    empty = {
        top: 0,
        value: 0,
        left: 0
    };
    square5x5(looplength, characterOfPhoto);
})