// параметры трассы 01

/*
Принцип работы скриптов map - это универсальность.
Любая фишка должна в любой момент иметь доступ ко всей необходимой информации о клетке.
Вся система должна работать на любой трассе с любыми условиями и кол-вом веток.
Кол-во объектов в массиве MapXX должно соответствовать кол-ву клеток на поле, включая старт, финиш, узлы синих стрелок.
Свойство currentCell у фишки - первично. Оно высчитывается движком по формулам. На основе полученной цифры высчитывается id и индексы клеток.
currentCell должен соответствовать id одной из клеток.

Свойства клеток:
cellid - уникальный id клетки, к которому обращается фишка или другие скрипты
num - обозначение числа или символа внутри клетки
type - тип клетки
coorX - координата left
coorY - координата top
stopCondition - специальне стоп-условие, которое выполняется после движения на 1 клетку. Если его нет, то движение продолжается
teleportTo - если клетка со стрелкой или старт, то указывается id, на какую клетку надо телепортироваться
shift - направление смещения фишки, если на одну клетку попадает несколько фишек
stepsToFin - сколько клеток до финиша. Если впереди бранч, то считается по самой длинной ветке
    !!! BRANCH stepsToFin брать только минимальное значение !!!
branchXType - тип ответвления (используется Ai для принятия решений)
join - на следующей клетке будет соединение с другой веткой
arrowEnd - ставится на концах стрелок, если больше нет других типов (используется в расчетах при выборе клетки в режиме швабры или капкана)

Разметка клеток для Ai
cpId - чекпойнты // ближайший указывается первым!!!
badId - плохие клетки: чёрные, красные, стрелки (ведущие на плохие клетки)
goodId - хорошие клетки: желтые, оранжевые, некоторые стрелки, бонусы
unwId - нежелательные клетки: зеленые, некоторые стрелки, штрафы
bonId - лучшие клетки на поле: звёзды, крупные бонусы, молнии, копилка
brId - бранчи
jumpId - клетки, через которые можно безопасно перейти до финиша за 2 хода, либо обогнуть опасные клетки
deadBr - тупиковые ветки (используется ai при использовании imp)

 */

const Map01param = {

    mapName: "Трасса 1: Разминка",
    prize1: 200,
    prize2: 150,
    prize3: 100,
    prize4: 70,
    arrowsX: 200,
    arrowsY: 124,
    arrowsUrl: "img/arrows/arrows01.svg",
    prizeX: 20,
    prizeY: 20,
    cpId: [15],
    badId: [25],
    goodId: [5, 13, 22, 26],
    unwId: [17, 32],
    bonId: [],
    brId: [],
    jumpId: [],

    pedestalX: 50,
    pedestalY: 80,
    pedestalCoords: [
        {
            cellid: "fin1",
            coorX: 101,
            coorY: 47,
        },

        {
            cellid: "fin2",
            coorX: 53,
            coorY: 59,
        },

        {
            cellid: "fin3",
            coorX: 152,
            coorY: 67,
        },

        {
            cellid: "fin4",
            coorX: 222,
            coorY: 92,
        },
    ],
}

let Map01 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 160,
        coorY: 560,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 35,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 160,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 35,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 160,
        coorY: 640,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 35,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 160,
        coorY: 680,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 35,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 200,
        coorY: 560,
        shift: "up",
        stepsToFin: 34,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 240,
        coorY: 560,
        shift: "up",
        stepsToFin: 33,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 280,
        coorY: 560,
        shift: "up",
        stepsToFin: 32,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        type: "arrow",
        teleportTo: 7,
        coorX: 320,
        coorY: 560,
        stepsToFin: 31,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        type: "yellow",
        coorX: 360,
        coorY: 560,
        stepsToFin: 30,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 400,
        coorY: 560,
        shift: "up",
        stepsToFin: 29,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 440,
        coorY: 560,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 28,
        zone: true,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 480,
        coorY: 560,
        shift: "right",
        stepsToFin: 27,
        zone: true,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 480,
        coorY: 520,
        shift: "right",
        stepsToFin: 26,
        zone: true,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 480,
        coorY: 480,
        shift: "right",
        stepsToFin: 25,
        zone: true,
    },

    {
        cellid: 11,
        num: "11",
        type: "arrow",
        teleportTo: 15,
        coorX: 480,
        coorY: 440,
        stepsToFin: 24,
        zone: true,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 520,
        coorY: 440,
        shift: "up",
        stepsToFin: 23,
        zone: true,
    },

    {
        cellid: 13,
        num: "13",
        type: "yellow",
        coorX: 560,
        coorY: 440,
        stepsToFin: 22,
        zone: true,
    },

    {
        cellid: 14,
        num: "14",
        coorX: 560,
        coorY: 400,
        shift: "right",
        stepsToFin: 21,
        zone: true,
    },

    {
        cellid: 15,
        num: "15",
        type: "checkpoint",
        coorX: 560,
        coorY: 360,
        shift: "right",
        stepsToFin: 20,
    },

    {
        cellid: 16,
        num: "16",
        coorX: 560,
        coorY: 320,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 19,
    },

    {
        cellid: 17,
        num: "17",
        type: "green",
        coorX: 560,
        coorY: 280,
        shift: "left",
        stepsToFin: 18,
    },

    {
        cellid: 18,
        num: "18",
        type: "arrow",
        teleportTo: 16,
        coorX: 560,
        coorY: 240,
        stepsToFin: 17,
    },

    {
        cellid: 19,
        num: "19",
        type: "arrow",
        teleportTo: 21,
        coorX: 560,
        coorY: 200,
        stepsToFin: 16,
    },

    {
        cellid: 20,
        num: "20",
        coorX: 560,
        coorY: 160,
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 21,
        num: "21",
        coorX: 520,
        coorY: 160,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 14,
    },

    {
        cellid: 22,
        num: "22",
        type: "yellow",
        coorX: 480,
        coorY: 160,
        stepsToFin: 13,
    },

    {
        cellid: 23,
        num: "23",
        coorX: 440,
        coorY: 160,
        shift: "up",
        stepsToFin: 12,
    },

    {
        cellid: 24,
        num: "24",
        type: "arrow",
        teleportTo: 27,
        coorX: 400,
        coorY: 160,
        stepsToFin: 11,
    },

    {
        cellid: 25,
        num: "25",
        type: "red",
        teleportTo: 15,
        coorX: 360,
        coorY: 160,
        stepsToFin: 10,
    },

    {
        cellid: 26,
        num: "26",
        type: "yellow",
        coorX: 360,
        coorY: 200,
        stepsToFin: 9,
    },

    {
        cellid: 27,
        num: "27",
        coorX: 320,
        coorY: 200,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 8,
    },

    {
        cellid: 28,
        num: "28",
        coorX: 280,
        coorY: 200,
        shift: "up",
        stepsToFin: 7,
    },

    {
        cellid: 29,
        num: "29",
        coorX: 280,
        coorY: 240,
        shift: "down",
        stepsToFin: 6,
    },

    {
        cellid: 30,
        num: "30",
        coorX: 240,
        coorY: 240,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 31,
        num: "31",
        coorX: 200,
        coorY: 240,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 4,
    },

    {
        cellid: 32,
        num: "32",
        type: "green",
        coorX: 160,
        coorY: 240,
        shift: "up",
        stepsToFin: 3,
    },

    {
        cellid: 33,
        num: "33",
        coorX: 160,
        coorY: 280,
        shift: "left",
        stepsToFin: 2,
    },

    {
        cellid: 34,
        num: "34",
        type: "arrow",
        teleportTo: 31,
        coorX: 160,
        coorY: 320,
        stepsToFin: 1,
    },

    {
        cellid: "35",
        type: "finish",
        coorX: 160,
        coorY: 360,
        stopCondition: "pedestal",
    },
]

