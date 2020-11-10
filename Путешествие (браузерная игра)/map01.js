// параметры трассы 01

/*
Принцип работы скриптов map - это универсальность.
Любая фишка должна в любой момент иметь доступ ко всей необходимой информации о клетке, не прибегая к сложным вычислениям.
Вся система должна работать на любой трассе с любыми условиями и кол-вом веток.
Кол-во объектов в массиве MapXX должно соответствовать кол-ву клеток на поле, включая старт, финиш, узлы синих стрелок.
У каждой фишки могут быть свойства:
cellid - уникальный id клетки, к которому обращается фишка или другие скрипты
num - обозначение числа или символа внутри клетки
type - тип клетки
coorX - координата left
coorY - координата top
stopCondition - специальне стоп-условие, которое выполняется во время движения фишки. Если его нет, то обычное движение.
teleportTo - если клетка со стрелкой, то указывается id, на какую клетку надо телепортироваться
shift - направление смещения фишки, если на одну клетку попадает несколько фишек
countRed - кол-во красных клеток впереди
stepsToRed - расстояние до ближайшей красной клетки
countBlack - кол-во чёрных клеток впереди
stepsToBlack - расстояние до ближайшей чёрной клетки
stepsToFin - расстояние до финиша

 */

const Map01prise1 = 200;
const Map01prise2 = 150;
const Map01prise3 = 100;
const Map01prise4 = 70;
let cpId = 15; // чекпойнт
let redId = 25; // красная
let finId = 35; // финиш

const Map01 = [

    {
        cellid: 0,
        teleportTo: 1,
        idChange: 1,
        stopCondition: "start",
    },

    {
        cellid: 1,
        coorX: 200,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 2,
        coorX: 240,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 3,
        coorX: 280,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 4,
        type: "arrow",
        teleportTo: 7,
        idChange: 3,
        coorX: 320,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 5,
        type: "yellow",
        coorX: 360,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 6,
        coorX: 400,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 7,
        coorX: 440,
        coorY: 560,
        shift: "up",
    },

    {
        cellid: 8,
        coorX: 480,
        coorY: 560,
        shift: "right",
    },

    {
        cellid: 9,
        coorX: 480,
        coorY: 520,
        shift: "right",
    },

    {
        cellid: 10,
        coorX: 480,
        coorY: 480,
        shift: "right",
    },

    {
        cellid: 11,
        type: "arrow",
        teleportTo: 15,
        idChange: 4,
        coorX: 480,
        coorY: 440,
        shift: "left",
    },

    {
        cellid: 12,
        coorX: 520,
        coorY: 440,
        shift: "up",
    },

    {
        cellid: 13,
        type: "yellow",
        coorX: 560,
        coorY: 440,
        shift: "right",
    },

    {
        cellid: 14,
        coorX: 560,
        coorY: 400,
        shift: "right",
    },

    {
        cellid: 15,
        type: "checkpoint",
        coorX: 560,
        coorY: 360,
        shift: "right",
    },

    {
        cellid: 16,
        coorX: 560,
        coorY: 320,
        shift: "left",
    },

    {
        cellid: 17,
        type: "green",
        coorX: 560,
        coorY: 280,
        shift: "left",
    },

    {
        cellid: 18,
        type: "arrow",
        teleportTo: 16,
        idChange: -2,
        coorX: 560,
        coorY: 240,
        shift: "left",
    },

    {
        cellid: 19,
        type: "arrow",
        teleportTo: 21,
        idChange: 2,
        coorX: 560,
        coorY: 200,
        shift: "left",
    },

    {
        cellid: 20,
        coorX: 560,
        coorY: 160,
        shift: "up",
    },

    {
        cellid: 21,
        coorX: 520,
        coorY: 160,
        shift: "up",
    },

    {
        cellid: 22,
        type: "yellow",
        coorX: 480,
        coorY: 160,
        shift: "up",
    },

    {
        cellid: 23,
        coorX: 440,
        coorY: 160,
        shift: "up",
    },

    {
        cellid: 24,
        type: "arrow",
        teleportTo: 27,
        idChange: 3,
        coorX: 400,
        coorY: 160,
        shift: "up",
    },

    {
        cellid: 25,
        type: "red",
        teleportTo: 15,
        idChange: -10,
        coorX: 360,
        coorY: 160,
        shift: "up",
    },

    {
        cellid: 26,
        type: "yellow",
        coorX: 360,
        coorY: 200,
        shift: "down",
    },

    {
        cellid: 27,
        coorX: 320,
        coorY: 200,
        shift: "up",
    },

    {
        cellid: 28,
        coorX: 280,
        coorY: 200,
        shift: "up",
    },

    {
        cellid: 29,
        coorX: 280,
        coorY: 240,
        shift: "down",
    },

    {
        cellid: 30,
        coorX: 240,
        coorY: 240,
        shift: "up",
    },

    {
        cellid: 31,
        coorX: 200,
        coorY: 240,
        shift: "up",
    },

    {
        cellid: 32,
        type: "green",
        coorX: 160,
        coorY: 240,
        shift: "up",
    },

    {
        cellid: 33,
        coorX: 160,
        coorY: 280,
        shift: "left",
    },

    {
        cellid: 34,
        type: "arrow",
        teleportTo: 31,
        idChange: -3,
        coorX: 160,
        coorY: 320,
        shift: "left",
    },

    {
        cellid: 35,
        type: "finish",
        coorX: 160,
        coorY: 360,
        stopCondition: "pedestal",
    },

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
]






