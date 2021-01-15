// параметры трассы 12

const Map12param = {

    mapName: "Трасса 12: Костяной мир",
    bone: true,
    multipleStarts: true,
    prize1: 500,
    arrowsX: 163,
    arrowsY: 43,
    arrowsUrl: "img/arrows/arrows12.svg",
    prizeX: 20,
    prizeY: 20,
    greenId: [4,103,116,118],
    brId: [117],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map12 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        coorX: 120,
        coorY: 640,
        stopCondition: "start",
        teleportTo: 101,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        coorX: 600,
        coorY: 640,
        stopCondition: "start",
        teleportTo: 1,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 600,
        coorY: 600,
        type: "arrow",
        teleportTo: 3,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 600,
        coorY: 560,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 600,
        coorY: 520,
        type: "arrowEnd",
    },

    {
        cellid: 4,
        num: "4",
        coorX: 600,
        coorY: 480,
        type: "green",
    },

    {
        cellid: 5,
        num: "5",
        coorX: 600,
        coorY: 440,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 600,
        coorY: 400,
        type: "arrow",
        teleportTo: 8,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 600,
        coorY: 360,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 600,
        coorY: 320,
        type: "arrowEnd",
    },

    {
        cellid: 9,
        num: "9",
        coorX: 600,
        coorY: 280,
        type: "yellow",
    },

    {
        cellid: 10,
        num: "10",
        coorX: 600,
        coorY: 240,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 600,
        coorY: 200,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 560,
        coorY: 200,
        type: "arrow",
        teleportTo: 9,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 520,
        coorY: 200,
    },

    {
        cellid: 14,
        num: "14",
        coorX: 480,
        coorY: 200,
    },

    {
        cellid: 15,
        num: "15",
        coorX: 440,
        coorY: 200,
    },

    {
        cellid: 16,
        num: "16",
        coorX: 400,
        coorY: 200,
        stopCondition: "join",
        joinTo: 117,
    },

    {
        cellid: 117,
        num: "17",
        coorX: 360,
        coorY: 200,
        type: "checkpoint",
        stopCondition: "skullBranch",
        vars: [0,1],
    },

    {
        cellid: 118,
        num: "18",
        coorX: 360,
        coorY: 160,
        type: "green",
    },

    {
        cellid: 119,
        num: "19",
        coorX: 360,
        coorY: 120,
    },

    {
        cellid: 120,
        num: "20",
        coorX: 360,
        coorY: 80,
        type: "arrowEnd",
    },

    {
        cellid: 121,
        num: "21",
        coorX: 400,
        coorY: 80,
        type: "arrow",
        teleportTo: 120,
    },

    {
        cellid: 122,
        num: "22",
        coorX: 440,
        coorY: 80,
        type: "red",
        teleportTo: 117,
    },

    {
        cellid: 123,
        coorX: 480,
        coorY: 80,
        type: "finish",
        stopCondition: "pedestal",
    },

    {
        cellid: 101,
        num: "X",
        coorX: 120,
        coorY: 600,
    },

    {
        cellid: 102,
        num: "X",
        coorX: 120,
        coorY: 560,
    },

    {
        cellid: 103,
        num: "X",
        coorX: 120,
        coorY: 520,
        type: "green",
    },

    {
        cellid: 104,
        num: "X",
        coorX: 120,
        coorY: 480,
    },

    {
        cellid: 105,
        num: "X",
        coorX: 120,
        coorY: 440,
        type: "arrowEnd",
    },

    {
        cellid: 106,
        num: "X",
        coorX: 120,
        coorY: 400,
    },

    {
        cellid: 107,
        num: "X",
        coorX: 120,
        coorY: 360,
        type: "yellow",
    },

    {
        cellid: 108,
        num: "X",
        coorX: 120,
        coorY: 320,
        type: "arrow",
        teleportTo: 105,
    },

    {
        cellid: 109,
        num: "X",
        coorX: 120,
        coorY: 280,
    },

    {
        cellid: 110,
        num: "X",
        coorX: 120,
        coorY: 240,
    },

    {
        cellid: 111,
        num: "X",
        coorX: 120,
        coorY: 200,
    },

    {
        cellid: 112,
        num: "X",
        coorX: 160,
        coorY: 200,
        type: "arrow",
        teleportTo: 115,
    },

    {
        cellid: 113,
        num: "X",
        coorX: 200,
        coorY: 200,
    },

    {
        cellid: 114,
        num: "X",
        coorX: 240,
        coorY: 200,
    },

    {
        cellid: 115,
        num: "X",
        coorX: 280,
        coorY: 200,
        type: "arrowEnd",
    },

    {
        cellid: 116,
        num: "X",
        coorX: 320,
        coorY: 200,
        type: "green",
    },

]
