// параметры трассы 10

const Map10param = {

    mapName: "Трасса 10: Великий вулкан",
    prize1: 1600,
    prize2: 1100,
    prize3: 750,
    prize4: 500,
    branchA: true,
    branchA1X: 271,
    branchA1Y: 519,
    branchA1ROTATE: "none",
    branchA2X: 201,
    branchA2Y: 591,
    branchA2ROTATE: "rotate(-90deg)",
    arrowsX: 131,
    arrowsY: 86,
    arrowsUrl: "img/arrows/arrows10.svg",
    prizeX: 20,
    prizeY: 20,
    cpId: [219],
    badId: [6,114,211,215,218,231,235,239,247],
    goodId: [2,113,212,226,240,242],
    unwId: [111,112,214,221,234,237,245],
    bonId: [216,217],
    jumpId: [7,213,233],
    brId: [9],

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

let Map10 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 640,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 32,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 600,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 32,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 560,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 32,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 520,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 32,
    },

// branch A - 100

    {
        cellid: 1,
        num: "1",
        coorX: 80,
        coorY: 640,
        shift: "down",
        stepsToFin: 31,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 120,
        coorY: 640,
        type: "yellow",
        stepsToFin: 30,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 160,
        coorY: 640,
        shift: "down",
        stepsToFin: 29,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 200,
        coorY: 640,
        shift: "down",
        stepsToFin: 28,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 240,
        coorY: 640,
        shift: "down",
        stepsToFin: 27,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 280,
        coorY: 640,
        type: "red",
        teleportTo: 0,
        stepsToFin: 26,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 280,
        coorY: 600,
        shift: "right",
        stepsToFin: 25,
        zone: true,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 280,
        coorY: 560,
        type: "joker",
        teleportTo: 0,
        shift: "right",
        stepsToFin: 24,
        zone: true,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 240,
        coorY: 560,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 вверх, короткая
        branch2Type: "unwanted", // 200 влево, копилка
        shift: "down",
        stepsToFin: 23,
        zone: true,
    },

// branch A - regular 100

    {
        cellid: 110,
        num: "10",
        coorX: 240,
        coorY: 520,
        shift: "left",
        stepsToFin: 22,
    },

    {
        cellid: 111,
        num: "11",
        coorX: 240,
        coorY: 480,
        type: "green",
        shift: "right",
        stepsToFin: 21,
    },

    {
        cellid: 112,
        num: "12",
        coorX: 240,
        coorY: 440,
        bonus: -50,
        shift: "right",
        stepsToFin: 20,
    },

    {
        cellid: 113,
        num: "13",
        coorX: 240,
        coorY: 400,
        type: "yellow",
        stepsToFin: 19,
    },

    {
        cellid: 114,
        num: "14",
        coorX: 240,
        coorY: 360,
        type: "black",
        stopCondition: "join",
        joinTo: 219,
        shift: "right",
        stepsToFin: 18,
    },

// branch A - unwanted 200

    {
        cellid: 210,
        num: "10",
        coorX: 200,
        coorY: 560,
        shift: "down",
        stepsToFin: 26,
    },

    {
        cellid: 211,
        num: "11",
        coorX: 160,
        coorY: 560,
        type: "black",
        shift: "left",
        stepsToFin: 25,
    },

    {
        cellid: 212,
        num: "12",
        coorX: 160,
        coorY: 520,
        bonus: 80,
        shift: "left",
        stepsToFin: 24,
    },

    {
        cellid: 213,
        num: "13",
        coorX: 160,
        coorY: 480,
        shift: "left",
        stepsToFin: 23,
    },

    {
        cellid: 214,
        num: "14",
        coorX: 160,
        coorY: 440,
        type: "arrow",
        teleportTo: 2,
        stepsToFin: 22,
    },

    {
        cellid: 215,
        num: "15",
        coorX: 160,
        coorY: 400,
        type: "red",
        teleportTo: 0,
        stepsToFin: 21,
    },

    {
        cellid: 216,
        num: "16",
        coorX: 160,
        coorY: 360,
        type: "starRed",
        shift: "left",
        stepsToFin: 20,
    },

    {
        cellid: 217,
        num: "17",
        coorX: 160,
        coorY: 320,
        type: "moneybag",
        shift: "up",
        stepsToFin: 19,
    },

    {
        cellid: 218,
        num: "18",
        coorX: 200,
        coorY: 320,
        type: "red",
        teleportTo: 0,
        stepsToFin: 18,
    },

    {
        cellid: 219,
        num: "19",
        coorX: 240,
        coorY: 320,
        type: "checkpoint",
        shift: "up",
        stepsToFin: 17,
    },

    {
        cellid: 220,
        num: "20",
        coorX: 280,
        coorY: 320,
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 221,
        num: "21",
        coorX: 320,
        coorY: 320,
        bonus: -70,
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 222,
        num: "22",
        coorX: 360,
        coorY: 320,
        type: "hatched",
        shift: "right",
        stepsToFin: 14,
    },

    {
        cellid: 223,
        num: "23",
        coorX: 367,
        coorY: 280,
        type: "arrow",
        teleportTo: 225,
        stepsToFin: 13,
    },

    {
        cellid: 224,
        num: "24",
        coorX: 383,
        coorY: 240,
        type: "hatched",
        shift: "right",
        stepsToFin: 12,
    },

    {
        cellid: 225,
        num: "25",
        coorX: 410,
        coorY: 200,
        type: "hatched",
        shift: "right",
        stepsToFin: 11,
    },


    {
        cellid: 226,
        num: "26",
        coorX: 440,
        coorY: 160,
        type: "yellow",
        stepsToFin: 10,
    },

    {
        cellid: 227,
        num: "27",
        coorX: 480,
        coorY: 140,
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 228,
        num: "28",
        coorX: 520,
        coorY: 127,
        shift: "up",
        stepsToFin: 8,
    },

    {
        cellid: 229,
        num: "29",
        coorX: 560,
        coorY: 120,
        type: "arrow",
        teleportTo: "b1",
        stepsToFin: 7,
    },

    {
        cellid: 230,
        num: "30",
        coorX: 600,
        coorY: 127,
        type: "hatched",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 231,
        num: "31",
        coorX: 640,
        coorY: 140,
        type: "black",
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 232,
        num: "32",
        coorX: 680,
        coorY: 160,
        type: "arrow",
        teleportTo: 230,
        stepsToFin: 4,
    },

    {
        cellid: 233,
        num: "33",
        coorX: 710,
        coorY: 200,
        type: "hatched",
        shift: "right",
        stepsToFin: 3,
    },

    {
        cellid: 234,
        num: "34",
        coorX: 737,
        coorY: 240,
        type: "arrow",
        teleportTo: 238,
        stepsToFin: 2,
    },

    {
        cellid: 235,
        num: "35",
        coorX: 753,
        coorY: 280,
        type: "red",
        teleportTo: 219,
        stepsToFin: 1,
    },

    {
        cellid: 236,
        coorX: 760,
        coorY: 320,
        type: "finish",
    },

    {
        cellid: 237,
        num: "37",
        coorX: 753,
        coorY: 360,
        type: "green",
        shift: "right",
        stepsToFin: 25,
    },

    {
        cellid: 238,
        num: "38",
        coorX: 737,
        coorY: 400,
        type: "hatched",
        shift: "right",
        stepsToFin: 24,
    },

    {
        cellid: 239,
        num: "39",
        coorX: 710,
        coorY: 440,
        type: "red",
        teleportTo: 219,
        stepsToFin: 23,
    },


    {
        cellid: 240,
        num: "40",
        coorX: 680,
        coorY: 480,
        type: "yellow",
        stepsToFin: 22,
    },

    {
        cellid: 241,
        num: "41",
        coorX: 640,
        coorY: 500,
        type: "arrow",
        teleportTo: 243,
        stepsToFin: 21,
    },

    {
        cellid: 242,
        num: "42",
        coorX: 600,
        coorY: 513,
        bonus: 150,
        type: "hatched",
        shift: "down",
        stepsToFin: 20,
    },

    {
        cellid: 243,
        num: "43",
        coorX: 560,
        coorY: 520,
        type: "hatched",
        shift: "up",
        stepsToFin: 19,
    },

    {
        cellid: 244,
        num: "44",
        coorX: 520,
        coorY: 513,
        type: "hatched",
        shift: "up",
        stepsToFin: 18,
    },

    {
        cellid: 245,
        num: "45",
        coorX: 480,
        coorY: 500,
        type: "arrow",
        teleportTo: 8,
        stepsToFin: 17,
    },

    {
        cellid: 246,
        num: "46",
        coorX: 440,
        coorY: 480,
        type: "hatched",
        shift: "left",
        stepsToFin: 16,
    },

    {
        cellid: 247,
        num: "47",
        coorX: 410,
        coorY: 440,
        type: "black",
        shift: "left",
        stepsToFin: 15,
    },

    {
        cellid: 248,
        num: "48",
        coorX: 383,
        coorY: 400,
        type: "arrow",
        teleportTo: 222,
        stopCondition: "deadend",
        stepsToFin: 14,
    },

    {
        cellid: 249,
        coorX: 367,
        coorY: 360,
        type: "deadend",
    },

    {
        cellid: "b1",
        coorX: 560,
        coorY: 320,
        type: "arrowNode",
        dir1: [1,2],
        dir2: [3,4],
        dir3: [5,6],
        tele1: 247,
        tele2: 242,
        tele3: 233,
        dir1type: "regular",
        dir2type: "tasty",
        dir3type: "regular",
    },

]
