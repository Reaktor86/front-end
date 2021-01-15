// параметры трассы 03

const Map03param = {

    mapName: "Трасса 3: Оранжевое настроение",
    prize1: 300,
    prize2: 200,
    prize3: 150,
    prize4: 100,
    arrowsX: 75,
    arrowsY: 137,
    arrowsUrl: "img/arrows/arrows03.svg",
    branchA: true,
    branchA1X: 234,
    branchA1Y: 322,
    branchA1ROTATE: "rotate(180deg)",
    branchA2X: 282,
    branchA2Y: 272,
    branchA2ROTATE: "rotate(90deg)",
    branchB: true,
    branchB1X: 447,
    branchB1Y: 321,
    branchB1ROTATE: "none",
    branchB2X: 522,
    branchB2Y: 431,
    branchB2ROTATE: "rotate(90deg)",
    branchB3: true,
    branchB3X: 448,
    branchB3Y: 480,
    branchB3ROTATE: "rotate(180deg)",
    prizeX: 20,
    prizeY: 20,
    cpId: [16, 227],
    badId: [332, 435, 437, 537, 127, 129],
    goodId: [2, 125, 222, 432, 533, 531],
    unwId: [430, 440, 532, 542, 541],
    bonId: [],
    jumpId: [128, 538, 540, 436, 439],
    brId: [16, 227],

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

// BRANCH stepsToFin брать только минимальное значение!!!

let Map03 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 33,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 560,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 33,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 520,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 33,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 480,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 33,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 120,
        coorY: 600,
        shift: "right",
        stepsToFin: 32,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        type: "orange",
        coorX: 120,
        coorY: 560,
        stepsToFin: 31,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 120,
        coorY: 520,
        shift: "right",
        stepsToFin: 30,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 120,
        coorY: 480,
        shift: "right",
        stepsToFin: 29,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 120,
        coorY: 440,
        shift: "right",
        stepsToFin: 28,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 120,
        coorY: 400,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 27,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 120,
        coorY: 360,
        shift: "right",
        stepsToFin: 26,
        zone: true,
    },

    {
        cellid: 8,
        num: "8",
        type: "arrow",
        teleportTo: 6,
        coorX: 120,
        coorY: 320,
        stepsToFin: 25,
        zone: true,
    },

    {
        cellid: 9,
        num: "9",
        type: "arrow",
        teleportTo: 12,
        coorX: 120,
        coorY: 280,
        stepsToFin: 24,
        zone: true,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 120,
        coorY: 240,
        shift: "right",
        stepsToFin: 23,
        zone: true,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 120,
        coorY: 200,
        type: "joker",
        teleportTo: 0,
        shift: "right",
        stepsToFin: 22,
        zone: true,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 120,
        coorY: 160,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 21,
        zone: true,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 160,
        coorY: 160,
        shift: "up",
        stepsToFin: 20,
        zone: true,
    },

    {
        cellid: 14,
        num: "14",
        coorX: 200,
        coorY: 160,
        shift: "up",
        stepsToFin: 19,
        zone: true,
    },

    {
        cellid: 15,
        num: "15",
        coorX: 200,
        coorY: 200,
        shift: "left",
        stepsToFin: 18,
        zone: true,
    },

    {
        cellid: 16,
        num: "16",
        type: "checkpoint",
        coorX: 200,
        coorY: 240,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "risky",
        branch2Type: "careful",
        shift: "left",
        stepsToFin: 17,
    },

    {
        cellid: 117,
        num: "17",
        coorX: 200,
        coorY: 280,
        shift: "left",
        stepsToFin: 16,
    },

    {
        cellid: 118,
        num: "18",
        coorX: 200,
        coorY: 320,
        shift: "left",
        stepsToFin: 15,
    },

    {
        cellid: 119,
        num: "19",
        coorX: 200,
        coorY: 360,
        shift: "left",
        stepsToFin: 14,
    },

    {
        cellid: 120,
        num: "20",
        coorX: 200,
        coorY: 400,
        shift: "left",
        stepsToFin: 13,
    },

    {
        cellid: 121,
        num: "21",
        type: "arrow",
        teleportTo: 221,
        coorX: 200,
        coorY: 440,
        stepsToFin: 12,
    },

    {
        cellid: 122,
        num: "22",
        coorX: 240,
        coorY: 440,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 123,
        num: "23",
        coorX: 280,
        coorY: 440,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 124,
        num: "24",
        coorX: 320,
        coorY: 440,
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 125,
        num: "25",
        type: "yellow",
        coorX: 360,
        coorY: 440,
        stepsToFin: 8,
    },

    {
        cellid: 126,
        num: "26",
        coorX: 360,
        coorY: 480,
        shift: "left",
        stepsToFin: 7,
    },

    {
        cellid: 127,
        num: "27",
        type: "red",
        teleportTo: 16,
        coorX: 360,
        coorY: 520,
        stepsToFin: 6,
    },

    {
        cellid: 128,
        num: "28",
        coorX: 400,
        coorY: 520,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 129,
        num: "29",
        type: "red",
        teleportTo: 16,
        coorX: 400,
        coorY: 560,
        stopCondition: "join",
        joinTo: 540,
        shift: "right",
        stepsToFin: 4,
    },

    {
        cellid: 217,
        num: "17",
        coorX: 240,
        coorY: 240,
        shift: "up",
        stepsToFin: 20,
    },

    {
        cellid: 218,
        num: "18",
        coorX: 280,
        coorY: 240,
        shift: "up",
        stepsToFin: 19,
    },

    {
        cellid: 219,
        num: "19",
        coorX: 320,
        coorY: 240,
        shift: "up",
        stepsToFin: 18,
    },

    {
        cellid: 220,
        num: "20",
        coorX: 360,
        coorY: 240,
        shift: "up",
        stepsToFin: 17,
    },

    {
        cellid: 221,
        num: "21",
        coorX: 400,
        coorY: 240,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 222,
        num: "22",
        type: "orange",
        coorX: 400,
        coorY: 280,
        stepsToFin: 15,
    },

    {
        cellid: 223,
        num: "23",
        coorX: 400,
        coorY: 320,
        shift: "left",
        stepsToFin: 14,
    },

    {
        cellid: 224,
        num: "24",
        coorX: 400,
        coorY: 360,
        shift: "left",
        stepsToFin: 13,
    },

    {
        cellid: 225,
        num: "25",
        type: "arrow",
        teleportTo: 125,
        coorX: 400,
        coorY: 400,
        stepsToFin: 12,
    },

    {
        cellid: 226,
        num: "26",
        coorX: 440,
        coorY: 400,
        shift: "down",
        stepsToFin: 11,
    },

    {
        cellid: 227,
        num: "27",
        type: "checkpoint",
        coorX: 480,
        coorY: 400,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "risky", // ветка 3
        branch2Type: "regular", // ветка 4
        branch3Type: "careful", // ветка 5
        shift: "right",
        stepsToFin: 10,
    },

    {
        cellid: 328,
        num: "28",
        coorX: 480,
        coorY: 360,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 9,
    },

    {
        cellid: 329,
        num: "29",
        type: "arrow",
        teleportTo: 431,
        coorX: 480,
        coorY: 320,
        stepsToFin: 8,
    },

    {
        cellid: 330,
        num: "30",
        coorX: 480,
        coorY: 280,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 7,
    },

    {
        cellid: 331,
        num: "31",
        coorX: 480,
        coorY: 240,
        shift: "right",
        stepsToFin: 6,
    },

    {
        cellid: 332,
        num: "32",
        type: "red",
        teleportTo: 227,
        coorX: 480,
        coorY: 200,
        stopCondition: "join",
        joinTo: 437,
        stepsToFin: 5,
    },

    {
        cellid: 428,
        num: "28",
        coorX: 520,
        coorY: 400,
        shift: "up",
        stepsToFin: 13,
    },

    {
        cellid: 429,
        num: "29",
        coorX: 560,
        coorY: 400,
        shift: "right",
        stepsToFin: 12,
    },

    {
        cellid: 430,
        num: "30",
        type: "arrow",
        teleportTo: 328,
        coorX: 560,
        coorY: 360,
        stepsToFin: 11,
    },

    {
        cellid: 431,
        num: "31",
        coorX: 560,
        coorY: 320,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 10,
    },

    {
        cellid: 432,
        num: "32",
        type: "yellow",
        coorX: 560,
        coorY: 280,
        stepsToFin: 9,
    },

    {
        cellid: 433,
        num: "33",
        coorX: 560,
        coorY: 240,
        shift: "right",
        stepsToFin: 8,
    },

    {
        cellid: 434,
        num: "34",
        coorX: 560,
        coorY: 200,
        shift: "right",
        stepsToFin: 7,
    },

    {
        cellid: 435,
        num: "35",
        type: "red",
        teleportTo: 227,
        coorX: 560,
        coorY: 160,
        stepsToFin: 6,
    },

    {
        cellid: 436,
        num: "36",
        coorX: 520,
        coorY: 160,
        type: "joker",
        teleportTo: 227,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 437,
        num: "37",
        type: "black",
        coorX: 480,
        coorY: 160,
        stepsToFin: 4,
    },

    {
        cellid: 438,
        num: "38",
        type: "arrow",
        teleportTo: 330,
        coorX: 480,
        coorY: 120,
        stepsToFin: 3,
    },

    {
        cellid: 439,
        num: "39",
        coorX: 480,
        coorY: 80,
        shift: "left",
        stepsToFin: 2,
    },

    {
        cellid: 440,
        num: "40",
        type: "green",
        coorX: 480,
        coorY: 40,
        shift: "left",
        stepsToFin: 1,
    },

    {
        cellid: 441,
        type: "finish",
        coorX: 520,
        coorY: 40,
        stopCondition: "pedestal",
    },

    {
        cellid: 528,
        num: "28",
        coorX: 480,
        coorY: 440,
        shift: "left",
        stepsToFin: 15,
    },

    {
        cellid: 529,
        num: "29",
        coorX: 480,
        coorY: 480,
        shift: "down",
        stepsToFin: 14,
    },

    {
        cellid: 530,
        num: "30",
        coorX: 520,
        coorY: 480,
        shift: "down",
        stepsToFin: 13,
    },

    {
        cellid: 531,
        num: "31",
        type: "arrow",
        teleportTo: 536,
        coorX: 560,
        coorY: 480,
        stepsToFin: 12,
    },

    {
        cellid: 532,
        num: "32",
        type: "green",
        coorX: 600,
        coorY: 480,
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 533,
        num: "33",
        type: "yellow",
        coorX: 600,
        coorY: 520,
        stepsToFin: 10,
    },

    {
        cellid: 534,
        num: "34",
        coorX: 600,
        coorY: 560,
        shift: "right",
        stepsToFin: 9,
    },

    {
        cellid: 535,
        num: "35",
        coorX: 600,
        coorY: 600,
        shift: "right",
        stepsToFin: 8,
    },

    {
        cellid: 536,
        num: "36",
        coorX: 560,
        coorY: 600,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 7,
    },

    {
        cellid: 537,
        num: "37",
        type: "black",
        coorX: 520,
        coorY: 600,
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 538,
        num: "38",
        coorX: 480,
        coorY: 600,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 539,
        num: "39",
        type: "arrow",
        teleportTo: 536,
        coorX: 440,
        coorY: 600,
        stepsToFin: 4,
    },

    {
        cellid: 540,
        num: "40",
        coorX: 400,
        coorY: 600,
        shift: "down",
        stepsToFin: 3,
    },

    {
        cellid: 541,
        num: "41",
        type: "arrow",
        teleportTo: 122,
        coorX: 360,
        coorY: 600,
        stepsToFin: 2,
    },

    {
        cellid: 542,
        num: "42",
        type: "green",
        coorX: 320,
        coorY: 600,
        shift: "down",
        stepsToFin: 1,
    },

    {
        cellid: 543,
        type: "finish",
        coorX: 280,
        coorY: 600,
        stopCondition: "pedestal",
    },

]
