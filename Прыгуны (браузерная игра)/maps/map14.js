// параметры трассы 14

const Map14param = {

    mapName: "Трасса 14: Вход",
    bone: true,
    multipleStarts: true,
    prize1: 1000,
    arrowsX: 128,
    arrowsY: 207,
    arrowsUrl: "img/arrows/arrows14.png",
    prizeX: 20,
    prizeY: 20,
    branchA: true,
    branchA1X: 209,
    branchA1Y: 441,
    branchA1ROTATE: "none",
    branchA2X: 280,
    branchA2Y: 510,
    branchA2ROTATE: "rotate(90deg)",
    greenId: [219],
    brId: [10],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map14 = [

    {
        cellid: 221, // клетка черепа
        num: "I",
        type: "start",
        coorX: 560,
        coorY: 600,
        stopCondition: "start",
        teleportTo: 222,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        coorX: 280,
        coorY: 600,
        stopCondition: "start",
        teleportTo: 1,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 240,
        coorY: 600,
        type: "arrow",
        teleportTo: 4,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 200,
        coorY: 600,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 160,
        coorY: 600,
        type: "yellow",
    },

    {
        cellid: 4,
        num: "4",
        coorX: 120,
        coorY: 600,
        type: "arrowEnd",
    },

    {
        cellid: 5,
        num: "5",
        coorX: 120,
        coorY: 560,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 120,
        coorY: 520,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 120,
        coorY: 480,
        type: "arrowEnd",
    },

    {
        cellid: 8,
        num: "8",
        coorX: 160,
        coorY: 480,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 200,
        coorY: 480,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 240,
        coorY: 480,
        stopCondition: "branch",
        branchid: "a",
        reverseTo: 211,
    },

// branch 100 вверх

    {
        cellid: 111,
        num: "11",
        coorX: 240,
        coorY: 440,
        type: "black",
        stopCondition: "reverse",
        reverseTo: 10,
    },

    {
        cellid: 112,
        num: "12",
        coorX: 240,
        coorY: 400,
        stopCondition: "deadend",
    },

    {
        cellid: 113,
        coorX: 240,
        coorY: 360,
        type: "deadend",
    },

// branch 200 вправо

    {
        cellid: 211,
        num: "11",
        coorX: 280,
        coorY: 480,
        type: "arrow",
        teleportTo: 229,
    },

    {
        cellid: 212,
        num: "12",
        coorX: 320,
        coorY: 480,
    },

    {
        cellid: 213,
        num: "13",
        coorX: 360,
        coorY: 480,
        type: "arrow",
        teleportTo: 216,
    },

    {
        cellid: 214,
        num: "14",
        coorX: 400,
        coorY: 480,
        type: "arrowEnd",
    },

    {
        cellid: 215,
        num: "15",
        coorX: 440,
        coorY: 480,
        type: "yellow",
    },

    {
        cellid: 216,
        num: "16",
        coorX: 480,
        coorY: 480,
    },

    {
        cellid: 217,
        num: "17",
        coorX: 520,
        coorY: 480,
    },

    {
        cellid: 218,
        num: "18",
        coorX: 560,
        coorY: 480,
        type: "arrowEnd",
    },

    {
        cellid: 219,
        num: "19",
        coorX: 560,
        coorY: 520,
        type: "green",
    },

    {
        cellid: 220,
        num: "20",
        coorX: 560,
        coorY: 560,
    },

// здесь старт I

    {
        cellid: 222,
        num: "22",
        coorX: 520,
        coorY: 600,
    },

    {
        cellid: 223,
        num: "23",
        coorX: 480,
        coorY: 600,
    },

    {
        cellid: 224,
        num: "24",
        coorX: 440,
        coorY: 600,
        type: "arrowEnd",
    },

    {
        cellid: 225,
        num: "25",
        coorX: 400,
        coorY: 600,
    },

    {
        cellid: 226,
        num: "26",
        coorX: 360,
        coorY: 600,
        type: "arrow",
        teleportTo: 224,
    },

    {
        cellid: 227,
        num: "27",
        coorX: 320,
        coorY: 600,
        stopCondition: "join",
        joinTo: 0,
    },

// второе кольцо

    {
        cellid: 229,
        num: "29",
        coorX: 280,
        coorY: 280,
        type: "arrowEnd",
    },

    {
        cellid: 230,
        num: "30",
        coorX: 240,
        coorY: 280,
    },

    {
        cellid: 231,
        num: "31",
        coorX: 200,
        coorY: 280,
        type: "arrow",
        teleportTo: 237,
    },

    {
        cellid: 232,
        num: "32",
        coorX: 160,
        coorY: 280,
        type: "arrowEnd",
    },

    {
        cellid: 233,
        num: "33",
        coorX: 120,
        coorY: 280,
        type: "arrow",
        teleportTo: 7,
        arrowSkull: true,
    },

    {
        cellid: 234,
        num: "34",
        coorX: 120,
        coorY: 240,
        type: "yellow",
    },

    {
        cellid: 235,
        num: "35",
        coorX: 120,
        coorY: 200,
    },

    {
        cellid: 236,
        num: "36",
        coorX: 160,
        coorY: 200,
        type: "arrow",
        teleportTo: 232,
    },

    {
        cellid: 237,
        num: "37",
        coorX: 200,
        coorY: 200,
        type: "arrowEnd",
    },

    {
        cellid: 238,
        num: "38",
        coorX: 240,
        coorY: 200,
    },

    {
        cellid: 239,
        num: "39",
        coorX: 280,
        coorY: 200,
    },

    {
        cellid: 240,
        num: "40",
        coorX: 280,
        coorY: 240,
        type: "arrow",
        teleportTo: 241,
        stopCondition: "join",
        joinTo: 229,
    },

// финишная прямая

    {
        cellid: 241,
        num: "41",
        coorX: 360,
        coorY: 240,
        type: "arrow",
        teleportTo: 214,
        arrowSkull: true,
    },

    {
        cellid: 242,
        num: "42",
        coorX: 400,
        coorY: 240,
        type: "starOrange",
    },

    {
        cellid: 243,
        num: "43",
        coorX: 440,
        coorY: 240,
        type: "checkpoint",
    },

    {
        cellid: 244,
        num: "44",
        coorX: 480,
        coorY: 240,
        type: "joker",
        teleportTo: 243,
    },

    {
        cellid: 245,
        num: "45",
        coorX: 520,
        coorY: 240,
        type: "joker",
        teleportTo: 243,
    },

    {
        cellid: 246,
        num: "46",
        coorX: 560,
        coorY: 240,
        type: "arrowEnd",
    },

    {
        cellid: 247,
        num: "47",
        coorX: 600,
        coorY: 240,
        type: "arrow",
        teleportTo: 246,
    },

    {
        cellid: 248,
        num: "48",
        coorX: 640,
        coorY: 240,
        type: "red",
        teleportTo: 243,
    },

    {
        cellid: 249,
        num: "49",
        coorX: 680,
        coorY: 240,
        type: "arrow",
        teleportTo: "b1",
    },

    {
        cellid: 250,
        coorX: 720,
        coorY: 240,
        type: "finish",
        stopCondition: "pedestal",
    },

    {
        cellid: "b1",
        coorX: 680,
        coorY: 320,
        type: "arrowNode",
        dir1: [1,2,3],
        dir2: [4,5,6],
        tele1: 247,
        tele2: 218,
    },

]
