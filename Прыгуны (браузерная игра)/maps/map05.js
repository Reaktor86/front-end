// параметры трассы 05

const Map05param = {

    mapName: "Трасса 5: Кто тут смелый?",
    prize1: 700,
    prize2: 400,
    prize3: 300,
    prize4: 200,
    branchA: true,
    branchA1X: 360,
    branchA1Y: 672,
    branchA1ROTATE: "rotate(-90deg)",
    branchA2X: 432,
    branchA2Y: 599,
    branchA2ROTATE: "none",
    branchB: true,
    branchB1X: 361,
    branchB1Y: 512,
    branchB1ROTATE: "rotate(-90deg)",
    branchB2X: 440,
    branchB2Y: 511,
    branchB2ROTATE: "rotate(90deg)",
    branchC: true,
    branchC1X: 321,
    branchC1Y: 169,
    branchC1ROTATE: "rotate(-90deg)",
    branchC2X: 401,
    branchC2Y: 168,
    branchC2ROTATE: "rotate(90deg)",
    arrowsX: 98,
    arrowsY: 163,
    arrowsUrl: "img/arrows/arrows05.svg",
    prizeX: 20,
    prizeY: 20,
    cpId: [211],
    badId: [112, 113, 116, 117, 320, 422, 636, 642, 643],
    goodId: [1, 4, 208, 319, 424, 421, 425, 630],
    unwId: [5, 111, 114, 115, 314, 317, 318, 322, 416, 420, 423, 532, 640],
    bonId: [321, 533, 632],
    jumpId: [324, 423, 426, 638, 639, 640],
    brId: [7, 211, 429],
    deadBr: [5],

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

let Map05 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 640,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 44,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 44,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 560,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 44,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 520,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 44,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 640,
        coorY: 640,
        type: "yellow",
        stepsToFin: 43,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 600,
        coorY: 640,
        shift: "up",
        stepsToFin: 42,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 560,
        coorY: 640,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 41,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 520,
        coorY: 640,
        bonus: 20,
        shift: "up",
        stepsToFin: 40,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 480,
        coorY: 640,
        bonus: -20,
        shift: "up",
        stepsToFin: 39,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 440,
        coorY: 640,
        shift: "down",
        stepsToFin: 38,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 400,
        coorY: 640,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "extreme", // 100 влево, экстремальный финиш
        branch2Type: "regular", // 200 вверх
        shift: "down",
        stepsToFin: 37,
        zone: true,
    },

// branch A, extreme 100

    {
        cellid: 108,
        num: "8",
        coorX: 360,
        coorY: 640,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 109,
        num: "9",
        coorX: 320,
        coorY: 640,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 9,
    },

    {
        cellid: 110,
        num: "10",
        coorX: 280,
        coorY: 640,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 8,
    },

    {
        cellid: 111,
        num: "11",
        coorX: 240,
        coorY: 640,
        type: "green",
        shift: "up",
        stepsToFin: 7,
    },

    {
        cellid: 112,
        num: "12",
        coorX: 200,
        coorY: 640,
        type: "black",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 113,
        num: "13",
        coorX: 160,
        coorY: 640,
        type: "red",
        teleportTo: 0,
        stepsToFin: 5,
    },

    {
        cellid: 114,
        num: "14",
        coorX: 120,
        coorY: 640,
        type: "arrow",
        teleportTo: 110,
        stepsToFin: 4,
    },

    {
        cellid: 115,
        num: "15",
        coorX: 80,
        coorY: 640,
        type: "arrow",
        teleportTo: 111,
        stepsToFin: 3,
    },

    {
        cellid: 116,
        num: "16",
        coorX: 80,
        coorY: 600,
        type: "red",
        teleportTo: 0,
        stepsToFin: 2,
    },

    {
        cellid: 117,
        num: "17",
        coorX: 80,
        coorY: 560,
        type: "red",
        teleportTo: 0,
        stepsToFin: 1,
    },

    {
        cellid: 118,
        type: "finish",
        coorX: 80,
        coorY: 520,
        stopCondition: "pedestal",
    },

// branch A, regular 200

    {
        cellid: 208,
        num: "8",
        coorX: 400,
        coorY: 600,
        type: "yellow",
        stepsToFin: 36,
        zone: true,
    },

    {
        cellid: 209,
        num: "9",
        coorX: 400,
        coorY: 560,
        shift: "left",
        stepsToFin: 35,
        zone: true,
    },

    {
        cellid: 210,
        num: "10",
        coorX: 400,
        coorY: 520,
        shift: "left",
        stepsToFin: 34,
        zone: true,
    },

    {
        cellid: 211,
        num: "11",
        coorX: 400,
        coorY: 480,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "regular", // 300 влево
        branch2Type: "regular", // 400 вправо
        type: "checkpoint",
        shift: "up",
        stepsToFin: 33,
    },

// branch B, regular 300

    {
        cellid: 312,
        num: "12",
        coorX: 360,
        coorY: 480,
        shift: "up",
        stepsToFin: 32,
    },

    {
        cellid: 313,
        num: "13",
        coorX: 320,
        coorY: 480,
        shift: "up",
        stepsToFin: 31,
    },

    {
        cellid: 314,
        num: "14",
        coorX: 320,
        coorY: 520,
        type: "arrow",
        teleportTo: 109,
        stepsToFin: 30,
    },

    {
        cellid: 315,
        num: "15",
        coorX: 280,
        coorY: 520,
        shift: "up",
        stepsToFin: 29,
    },

    {
        cellid: 316,
        num: "16",
        coorX: 240,
        coorY: 520,
        shift: "up",
        stepsToFin: 28,
    },

    {
        cellid: 317,
        num: "17",
        coorX: 200,
        coorY: 520,
        bonus: -20,
        shift: "left",
        stepsToFin: 27,
    },

    {
        cellid: 318,
        num: "18",
        coorX: 200,
        coorY: 480,
        type: "green",
        shift: "left",
        stepsToFin: 26,
    },

    {
        cellid: 319,
        num: "19",
        coorX: 200,
        coorY: 440,
        bonus: 40,
        shift: "left",
        stepsToFin: 25,
    },

    {
        cellid: 320,
        num: "20",
        coorX: 200,
        coorY: 400,
        type: "red",
        teleportTo: 211,
        stepsToFin: 24,
    },

    {
        cellid: 321,
        num: "21",
        coorX: 240,
        coorY: 400,
        type: "starOrange",
        shift: "up",
        stepsToFin: 23,
    },

    {
        cellid: 322,
        num: "22",
        coorX: 280,
        coorY: 400,
        type: "arrow",
        teleportTo: 412,
        stepsToFin: 22,
    },

    {
        cellid: 323,
        num: "23",
        coorX: 280,
        coorY: 360,
        type: "arrow",
        teleportTo: 427,
        stepsToFin: 21,
    },

    {
        cellid: 324,
        num: "24",
        coorX: 320,
        coorY: 360,
        stopCondition: "join",
        joinTo: 425,
        shift: "down",
        stepsToFin: 20,
    },

// branch B, regular 400

    {
        cellid: 412,
        num: "12",
        coorX: 440,
        coorY: 480,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 32,
    },

    {
        cellid: 413,
        num: "13",
        coorX: 480,
        coorY: 480,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 31,
    },

    {
        cellid: 414,
        num: "14",
        coorX: 480,
        coorY: 520,
        shift: "down",
        stepsToFin: 30,
    },

    {
        cellid: 415,
        num: "15",
        coorX: 520,
        coorY: 520,
        shift: "down",
        stepsToFin: 29,
    },

    {
        cellid: 416,
        num: "16",
        coorX: 560,
        coorY: 520,
        type: "arrow",
        teleportTo: 3,
        stepsToFin: 28,
    },

    {
        cellid: 417,
        num: "17",
        coorX: 560,
        coorY: 480,
        type: "arrow",
        teleportTo: 413,
        stepsToFin: 27,
    },

    {
        cellid: 418,
        num: "18",
        coorX: 560,
        coorY: 440,
        shift: "right",
        stepsToFin: 26,
    },

    {
        cellid: 419,
        num: "19",
        coorX: 560,
        coorY: 400,
        type: "black",
        shift: "right",
        stepsToFin: 25,
    },

    {
        cellid: 420,
        num: "20",
        coorX: 520,
        coorY: 400,
        bonus: -20,
        shift: "up",
        stepsToFin: 24,
    },

    {
        cellid: 421,
        num: "21",
        coorX: 480,
        coorY: 400,
        type: "arrow",
        teleportTo: 427,
        stepsToFin: 23,
    },

    {
        cellid: 422,
        num: "22",
        coorX: 440,
        coorY: 400,
        type: "red",
        teleportTo: 211,
        stepsToFin: 22,
    },

    {
        cellid: 423,
        num: "23",
        coorX: 440,
        coorY: 360,
        type: "green",
        shift: "up",
        stepsToFin: 21,
    },

    {
        cellid: 424,
        num: "24",
        coorX: 400,
        coorY: 360,
        bonus: 70,
        shift: "up",
        stepsToFin: 20,
    },

    {
        cellid: 425,
        num: "25",
        coorX: 360,
        coorY: 360,
        type: "yellow",
        stepsToFin: 19,
    },

    {
        cellid: 426,
        num: "26",
        coorX: 360,
        coorY: 320,
        shift: "left",
        stepsToFin: 18,
    },

    {
        cellid: 427,
        num: "27",
        coorX: 360,
        coorY: 280,
        type: "joker",
        teleportTo: 211,
        shift: "left",
        stepsToFin: 17,
    },

    {
        cellid: 428,
        num: "28",
        coorX: 360,
        coorY: 240,
        shift: "left",
        stepsToFin: 16,
    },

    {
        cellid: 429,
        num: "29",
        coorX: 360,
        coorY: 200,
        type: "black",
        stopCondition: "branch",
        branchid: "c",
        branch1Type: "risky", // 500 влево к тупику
        branch2Type: "regular", // 600 вправо до финиша
        shift: "up",
        stepsToFin: 15,
        reverseTo: 630,
    },

// branch C, risky 500

    {
        cellid: 530,
        num: "30",
        coorX: 320,
        coorY: 200,
        shift: "down",
        stepsToFin: 16,
        stopCondition: "reverse",
        reverseTo: 429,
    },

    {
        cellid: 531,
        num: "31",
        coorX: 280,
        coorY: 200,
        shift: "down",
        stepsToFin: 17,
    },

    {
        cellid: 532,
        num: "32",
        coorX: 240,
        coorY: 200,
        bonus: -80,
        shift: "down",
        stepsToFin: 18,
    },

    {
        cellid: 533,
        num: "33",
        coorX: 200,
        coorY: 200,
        type: "speed",
        stopCondition: "deadend",
        shift: "down",
        stepsToFin: 19,
    },

    {
        cellid: 534,
        type: "deadend",
        coorX: 160,
        coorY: 200,
    },

// branch C, regular 600

    {
        cellid: 630,
        num: "30",
        coorX: 400,
        coorY: 200,
        bonus: 40,
        shift: "up",
        stepsToFin: 14,
    },

    {
        cellid: 631,
        num: "31",
        coorX: 440,
        coorY: 200,
        shift: "down",
        stepsToFin: 13,
    },

    {
        cellid: 632,
        num: "32",
        coorX: 480,
        coorY: 200,
        type: "starOrange",
        shift: "down",
        stepsToFin: 12,
    },

    {
        cellid: 633,
        num: "33",
        coorX: 520,
        coorY: 200,
        shift: "right",
        stepsToFin: 11,
    },

    {
        cellid: 634,
        num: "34",
        coorX: 520,
        coorY: 160,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 10,
    },

    {
        cellid: 635,
        num: "35",
        coorX: 520,
        coorY: 120,
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 636,
        num: "36",
        coorX: 560,
        coorY: 120,
        type: "red",
        teleportTo: 211,
        stepsToFin: 8,
    },

    {
        cellid: 637,
        num: "37",
        coorX: 600,
        coorY: 120,
        type: "arrow",
        teleportTo: 634,
        stepsToFin: 7,
    },

    {
        cellid: 638,
        num: "38",
        coorX: 640,
        coorY: 120,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 639,
        num: "39",
        coorX: 680,
        coorY: 120,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 640,
        num: "40",
        coorX: 680,
        coorY: 160,
        type: "green",
        shift: "right",
        stepsToFin: 4,
    },

    {
        cellid: 641,
        num: "41",
        coorX: 680,
        coorY: 200,
        type: "arrow",
        teleportTo: 638,
        stepsToFin: 3,
    },

    {
        cellid: 642,
        num: "42",
        coorX: 680,
        coorY: 240,
        type: "black",
        shift: "right",
        stepsToFin: 2,
    },

    {
        cellid: 643,
        num: "43",
        coorX: 680,
        coorY: 280,
        type: "red",
        teleportTo: 211,
        stepsToFin: 1,
    },

    {
        cellid: 644,
        type: "finish",
        coorX: 680,
        coorY: 320,
        stopCondition: "pedestal",
    },


]
