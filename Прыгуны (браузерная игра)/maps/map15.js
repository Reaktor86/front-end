// параметры трассы 15

const Map15param = {

    mapName: "Трасса 15: Замок супер-фишек",
    bone: true,
    multipleStarts: true,
    prize1: 5000,
    arrowsX: 35,
    arrowsY: 166,
    arrowsUrl: "img/arrows/arrows15.svg",
    prizeX: 20,
    prizeY: 20,
    branchA: true,
    branchA1X: 391,
    branchA1Y: 160,
    branchA1ROTATE: "none",
    branchA2X: 400,
    branchA2Y: 231,
    branchA2ROTATE: "rotate(90deg)",
    branchB: true,
    branchB1X: 680,
    branchB1Y: 670,
    branchB1ROTATE: "rotate(90deg)",
    branchB2X: 600,
    branchB2Y: 671,
    branchB2ROTATE: "rotate(-90deg)",
    greenId: [5,105,206,308,522,542,549,762,819],
    brId: [318,556],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map15 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        coorX: 320,
        coorY: 640,
        teleportTo: 1,
        stopCondition: "start",
        zone: true,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        coorX: 240,
        coorY: 640,
        teleportTo: 101,
        stopCondition: "start",
        zone: true,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        coorX: 160,
        coorY: 640,
        teleportTo: 201,
        stopCondition: "start",
        zone: true,
    },

    {
        cellid: 0, // старт юзера
        num: "IV",
        type: "start",
        coorX: 80,
        coorY: 640,
        teleportTo: 301,
        stopCondition: "start",
        zone: true,
    },

// старт 1

    {
        cellid: 1,
        num: "X",
        coorX: 320,
        coorY: 600,
        type: "orange",
        zone: true,
    },

    {
        cellid: 2,
        num: "X",
        coorX: 320,
        coorY: 560,
        zone: true,
    },

    {
        cellid: 3,
        num: "X",
        coorX: 320,
        coorY: 520,
        zone: true,
    },

    {
        cellid: 4,
        num: "X",
        coorX: 320,
        coorY: 480,
        type: "arrowEnd",
        zone: true,
    },

    {
        cellid: 5,
        num: "X",
        coorX: 320,
        coorY: 440,
        type: "green",
        zone: true,
    },

    {
        cellid: 6,
        num: "X",
        coorX: 320,
        coorY: 400,
        zone: true,
    },

    {
        cellid: 7,
        num: "X",
        coorX: 320,
        coorY: 360,
        type: "arrow",
        teleportTo: 4,
        zone: true,
    },

    {
        cellid: 8,
        num: "X",
        coorX: 320,
        coorY: 320,
        type: "yellow",
        zone: true,
    },

    {
        cellid: 9,
        num: "X",
        coorX: 320,
        coorY: 280,
        zone: true,
    },

    {
        cellid: 10,
        num: "X",
        coorX: 280,
        coorY: 280,
        zone: true,
    },

    {
        cellid: 11,
        num: "X",
        coorX: 240,
        coorY: 280,
        zone: true,
    },

    {
        cellid: 12,
        num: "X",
        coorX: 200,
        coorY: 280,
        zone: true,
    },

    {
        cellid: 13,
        num: "X",
        coorX: 160,
        coorY: 280,
        zone: true,
    },

    {
        cellid: 14,
        num: "X",
        coorX: 120,
        coorY: 280,
        stopCondition: "join",
        joinTo: 309,
        zone: true,
    },

// старт 2

    {
        cellid: 101,
        num: "X",
        coorX: 240,
        coorY: 600,
        type: "yellow",
        zone: true,
    },

    {
        cellid: 102,
        num: "X",
        coorX: 240,
        coorY: 560,
        zone: true,
    },

    {
        cellid: 103,
        num: "X",
        coorX: 240,
        coorY: 520,
        zone: true,
    },

    {
        cellid: 104,
        num: "X",
        coorX: 240,
        coorY: 480,
        zone: true,
    },

    {
        cellid: 105,
        num: "X",
        coorX: 240,
        coorY: 440,
        type: "green",
        zone: true,
    },

    {
        cellid: 106,
        num: "X",
        coorX: 240,
        coorY: 400,
        zone: true,
    },

    {
        cellid: 107,
        num: "X",
        coorX: 240,
        coorY: 360,
        type: "arrow",
        teleportTo: 108,
        zone: true,
    },

    {
        cellid: 108,
        num: "X",
        coorX: 200,
        coorY: 360,
        type: "arrowEnd",
        zone: true,
    },

    {
        cellid: 109,
        num: "X",
        coorX: 160,
        coorY: 360,
        zone: true,
    },

    {
        cellid: 110,
        num: "X",
        coorX: 120,
        coorY: 360,
        stopCondition: "join",
        joinTo: 307,
        zone: true,
    },

// старт 3

    {
        cellid: 201,
        num: "X",
        coorX: 160,
        coorY: 600,
        type: "yellow",
        zone: true,
    },

    {
        cellid: 202,
        num: "X",
        coorX: 160,
        coorY: 560,
        zone: true,
    },

    {
        cellid: 203,
        num: "X",
        coorX: 160,
        coorY: 520,
        zone: true,
    },

    {
        cellid: 204,
        num: "X",
        coorX: 160,
        coorY: 480,
        type: "arrowEnd",
        zone: true,
    },

    {
        cellid: 205,
        num: "X",
        coorX: 160,
        coorY: 440,
        type: "arrow",
        teleportTo: 204,
        zone: true,
    },

    {
        cellid: 206,
        num: "X",
        coorX: 120,
        coorY: 440,
        type: "green",
        stopCondition: "join",
        joinTo: 305,
        zone: true,
    },

// старт 4 - юзер

    {
        cellid: 301,
        num: "1",
        coorX: 80,
        coorY: 600,
        type: "arrow",
        teleportTo: 304,
        zone: true,
    },

    {
        cellid: 302,
        num: "2",
        coorX: 80,
        coorY: 560,
        type: "yellow",
        zone: true,
    },

    {
        cellid: 303,
        num: "3",
        coorX: 80,
        coorY: 520,
        type: "yellow",
        zone: true,
    },

    {
        cellid: 304,
        num: "4",
        coorX: 80,
        coorY: 480,
        type: "arrowEnd",
        shift: "left",
        zone: true,
    },

    {
        cellid: 305,
        num: "5",
        coorX: 80,
        coorY: 440,
        shift: "left",
        zone: true,
    },

    {
        cellid: 306,
        num: "6",
        coorX: 80,
        coorY: 400,
        shift: "left",
        zone: true,
    },

    {
        cellid: 307,
        num: "7",
        coorX: 80,
        coorY: 360,
        type: "black",
        shift: "left",
        zone: true,
    },

    {
        cellid: 308,
        num: "8",
        coorX: 80,
        coorY: 320,
        type: "green",
        shift: "left",
        zone: true,
    },

    {
        cellid: 309,
        num: "9",
        coorX: 80,
        coorY: 280,
        shift: "left",
        zone: true,
    },

    {
        cellid: 310,
        num: "10",
        coorX: 80,
        coorY: 240,
        type: "black",
        shift: "left",
        zone: true,
    },

    {
        cellid: 311,
        num: "11",
        coorX: 80,
        coorY: 200,
        type: "checkpoint",
        shift: "up",
    },

    {
        cellid: 312,
        num: "12",
        coorX: 120,
        coorY: 200,
        type: "arrow",
        teleportTo: 314,
    },

    {
        cellid: 313,
        num: "13",
        coorX: 160,
        coorY: 200,
        type: "starOrange",
        shift: "down",
    },

    {
        cellid: 314,
        num: "14",
        coorX: 200,
        coorY: 200,
        type: "arrowEnd",
        shift: "down",
    },

    {
        cellid: 315,
        num: "15",
        coorX: 240,
        coorY: 200,
        type: "black",
        shift: "down",
    },

    {
        cellid: 316,
        num: "16",
        coorX: 280,
        coorY: 200,
        type: "yellow",
    },

    {
        cellid: 317,
        num: "17",
        coorX: 320,
        coorY: 200,
        type: "hatched",
        shift: "down",
    },

    {
        cellid: 318,
        num: "18",
        coorX: 360,
        coorY: 200,
        type: "hatched",
        stopCondition: "branch",
        branchid: "a",
        reverseTo: 519,
        shift: "down",
    },

// branch A - вверх 400

    {
        cellid: 419,
        num: "19",
        coorX: 360,
        coorY: 160,
        stopCondition: "reverse",
        reverseTo: 318,
        type: "arrow",
        teleportTo: 315,
    },

    {
        cellid: 420,
        num: "20",
        coorX: 360,
        coorY: 120,
        type: "red",
        teleportTo: 311,
    },

    {
        cellid: 421,
        num: "21",
        coorX: 360,
        coorY: 80,
        type: "red",
        teleportTo: 311,
    },

    {
        cellid: 422,
        num: "22",
        coorX: 320,
        coorY: 80,
        type: "speed",
        stopCondition: "deadend",
    },

    {
        cellid: 423,
        coorX: 280,
        coorY: 80,
        type: "deadend",
    },

// branch A - вправо 500

    {
        cellid: 519,
        num: "19",
        coorX: 400,
        coorY: 200,
        type: "hatched",
        shift: "up",
    },

    {
        cellid: 520,
        num: "20",
        coorX: 440,
        coorY: 200,
        type: "checkpoint",
        stopCondition: "reverse",
        reverseTo: 819,
        shift: "down",
    },

    {
        cellid: 521,
        num: "21",
        coorX: 480,
        coorY: 200,
        type: "hatched",
        shift: "down",
    },

    {
        cellid: 522,
        num: "22",
        coorX: 520,
        coorY: 200,
        type: "green",
        shift: "up",
    },

    {
        cellid: 523,
        num: "23",
        coorX: 560,
        coorY: 200,
        type: "hatched",
        shift: "up",
    },

    {
        cellid: 524,
        num: "24",
        coorX: 600,
        coorY: 200,
        type: "hatched",
        shift: "up",
    },

    {
        cellid: 525,
        num: "25",
        coorX: 640,
        coorY: 200,
        type: "hatched",
        shift: "up",
    },

    {
        cellid: 526,
        num: "26",
        coorX: 640,
        coorY: 240,
        type: "arrow",
        teleportTo: 531,
    },

    {
        cellid: 527,
        num: "27",
        coorX: 640,
        coorY: 280,
        type: "arrowEnd",
        shift: "right",
    },

    {
        cellid: 528,
        num: "28",
        coorX: 640,
        coorY: 320,
        type: "yellow",
    },

    {
        cellid: 529,
        num: "29",
        coorX: 600,
        coorY: 320,
        type: "arrow",
        teleportTo: 527,
    },

    {
        cellid: 530,
        num: "30",
        coorX: 560,
        coorY: 320,
        type: "black",
        shift: "down",
    },

    {
        cellid: 531,
        num: "31",
        coorX: 560,
        coorY: 280,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 532,
        num: "32",
        coorX: 520,
        coorY: 280,
        type: "starOrange",
        shift: "up",
    },

    {
        cellid: 533,
        num: "33",
        coorX: 480,
        coorY: 280,
        type: "arrow",
        teleportTo: 536,
    },

    {
        cellid: 534,
        num: "34",
        coorX: 440,
        coorY: 280,
        shift: "up",
    },

    {
        cellid: 535,
        num: "35",
        coorX: 400,
        coorY: 280,
        shift: "up",
    },

    {
        cellid: 536,
        num: "36",
        coorX: 400,
        coorY: 320,
        type: "arrowEnd",
        shift: "left",
    },

    {
        cellid: 537,
        num: "37",
        coorX: 400,
        coorY: 360,
        shift: "left",
    },

    {
        cellid: 538,
        num: "38",
        coorX: 400,
        coorY: 400,
        shift: "left",
    },

    {
        cellid: 539,
        num: "39",
        coorX: 400,
        coorY: 440,
        shift: "left",
    },

    {
        cellid: 540,
        num: "40",
        coorX: 400,
        coorY: 480,
        shift: "left",
    },

    {
        cellid: 541,
        num: "41",
        coorX: 440,
        coorY: 480,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 542,
        num: "42",
        coorX: 480,
        coorY: 480,
        type: "green",
        shift: "right",
    },

    {
        cellid: 543,
        num: "43",
        coorX: 480,
        coorY: 440,
        shift: "right",
    },

    {
        cellid: 544,
        num: "44",
        coorX: 480,
        coorY: 400,
        type: "arrow",
        teleportTo: 541,
    },

    {
        cellid: 545,
        num: "45",
        coorX: 520,
        coorY: 400,
        type: "black",
        shift: "up",
    },

    {
        cellid: 546,
        num: "46",
        coorX: 560,
        coorY: 400,
        type: "yellow",
    },

    {
        cellid: 547,
        num: "47",
        coorX: 600,
        coorY: 400,
        type: "arrow",
        teleportTo: 551,
    },

    {
        cellid: 548,
        num: "48",
        coorX: 640,
        coorY: 400,
        type: "checkpoint",
        shift: "up",
    },

    {
        cellid: 549,
        num: "49",
        coorX: 640,
        coorY: 440,
        type: "green",
        shift: "right",
    },

    {
        cellid: 550,
        num: "50",
        coorX: 640,
        coorY: 480,
        type: "arrowEnd",
        shift: "right",
    },

    {
        cellid: 551,
        num: "51",
        coorX: 600,
        coorY: 480,
        type: "arrowEnd",
        shift: "left",
    },

    {
        cellid: 552,
        num: "52",
        coorX: 600,
        coorY: 520,
        shift: "left",
    },

    {
        cellid: 553,
        num: "53",
        coorX: 600,
        coorY: 560,
        type: "arrow",
        teleportTo: 757,
    },

    {
        cellid: 554,
        num: "54",
        coorX: 640,
        coorY: 560,
        type: "arrow",
        teleportTo: 550,
    },

    {
        cellid: 555,
        num: "55",
        coorX: 640,
        coorY: 600,
        shift: "left",
    },

    {
        cellid: 556,
        num: "56",
        coorX: 640,
        coorY: 640,
        type: "yellow",
        stopCondition: "branch",
        branchid: "b",
        reverseTo: 757,
    },

// branch B - вправо 600

    {
        cellid: 657,
        num: "57",
        coorX: 680,
        coorY: 640,
        stopCondition: "reverse",
        reverseTo: 556,
        shift: "up",
    },

    {
        cellid: 658,
        num: "58",
        coorX: 720,
        coorY: 640,
        shift: "right",
    },

    {
        cellid: 659,
        num: "59",
        coorX: 720,
        coorY: 600,
        type: "arrow",
        teleportTo: 550,
    },

    {
        cellid: 660,
        num: "60",
        coorX: 720,
        coorY: 560,
        type: "starRed",
        stopCondition: "deadend",
        shift: "right",
    },

    {
        cellid: 661,
        coorX: 720,
        coorY: 520,
        type: "deadend",
    },

// branch B - влево 700

    {
        cellid: 757,
        num: "57",
        coorX: 600,
        coorY: 640,
        type: "arrowEnd",
        shift: "down",
        stopCondition: "reverse",
        reverseTo: 556,
    },

    {
        cellid: 758,
        num: "58",
        coorX: 560,
        coorY: 640,
        shift: "down",
    },

    {
        cellid: 759,
        num: "59",
        coorX: 520,
        coorY: 640,
        shift: "down",
    },

    {
        cellid: 760,
        num: "60",
        coorX: 480,
        coorY: 640,
        type: "joker",
        teleportTo: 548,
        shift: "down",
    },

    {
        cellid: 761,
        num: "61",
        coorX: 440,
        coorY: 640,
        type: "red",
        teleportTo: 548,
    },

    {
        cellid: 762,
        num: "62",
        coorX: 440,
        coorY: 600,
        type: "green",
        shift: "left",
    },

    {
        cellid: 763,
        coorX: 440,
        coorY: 560,
        type: "jail",
        stopCondition: "jail",
    },

// выход с трассы - 800

    {
        cellid: 819,
        num: "19",
        coorX: 440,
        coorY: 160,
        type: "green",
        shift: "right",
    },

    {
        cellid: 818,
        num: "18",
        coorX: 440,
        coorY: 120,
        type: "red",
        teleportTo: 520,
    },

    {
        cellid: 817,
        num: "17",
        coorX: 440,
        coorY: 80,
        type: "red",
        teleportTo: 520,
    },

    {
        cellid: 816,
        coorX: 440,
        coorY: 40,
        type: "finish",
        stopCondition: "pedestal",
    },

    // сундук

    {
        coorX: 502,
        coorY: 568,
        type: "chest",
    },
]

function remixMap15() {
    let index = getCellIndexById(761);
    Map15[index].teleportTo = 763;
    index = getCellIndexById(760);
    Map15[index].teleportTo = 763;
}

function originalMap15() {
    let index = getCellIndexById(761);
    Map15[index].teleportTo = 548;
    index = getCellIndexById(760);
    Map15[index].teleportTo = 548;
}