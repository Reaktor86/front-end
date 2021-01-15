// параметры трассы 08

const Map08param = {

    mapName: "Трасса 8: Место для кемперов",
    prize1: 1100,
    prize2: 750,
    prize3: 600,
    prize4: 400,
    branchA: true,
    branchA1X: 440,
    branchA1Y: 671,
    branchA1ROTATE: "rotate(90deg)",
    branchA2X: 368,
    branchA2Y: 600,
    branchA2ROTATE: "none",
    branchB: true,
    branchB1X: 640,
    branchB1Y: 472,
    branchB1ROTATE: "rotate(-90deg)",
    branchB2X: 711,
    branchB2Y: 440,
    branchB2ROTATE: "none",
    branchC: true,
    branchC1X: 360,
    branchC1Y: 352,
    branchC1ROTATE: "rotate(-90deg)",
    branchC2X: 431,
    branchC2Y: 279,
    branchC2ROTATE: "none",
    branchD: true,
    branchD1X: 200,
    branchD1Y: 350,
    branchD1ROTATE: "rotate(90deg)",
    branchD2X: 120,
    branchD2Y: 351,
    branchD2ROTATE: "rotate(-90deg)",
    branchE: true,
    branchE1X: 72,
    branchE1Y: 360,
    branchE1ROTATE: "rotate(180deg)",
    branchE2X: 71,
    branchE2Y: 280,
    branchE2ROTATE: "none",
    branchF: true,
    branchF1X: 552,
    branchF1Y: 161,
    branchF1ROTATE: "rotate(180deg)",
    branchF2X: 600,
    branchF2Y: 88,
    branchF2ROTATE: "rotate(90deg)",
    arrowsX: 84,
    arrowsY: 70,
    arrowsUrl: "img/arrows/arrows08.svg",
    prizeX: 20,
    prizeY: 20,
    cpId: [226,646],
    badId: [8,220,643,645,647,852,853,1071,1273],
    goodId: [1,13,115,332,433,955,1055,1057,1059],
    unwId: [216,336,432,436,644,651,1060,1062,1064,1173,1174], // зеленая 1274 убрана
    bonId: [9,219,221,956], // звезда 1172 убрана, 955 перемещена в goodId
    jumpId: [646,648,649,650,854],
    brId: [13,231,441,651,854,1071],
    deadBr: [5,7,9],

    pedestalX: 50,
    pedestalY: 50,
    pedestalCoords: [
        {
            cellid: "fin1",
            coorX: 101,
            coorY: 17,
        },

        {
            cellid: "fin2",
            coorX: 53,
            coorY: 29,
        },

        {
            cellid: "fin3",
            coorX: 152,
            coorY: 37,
        },

        {
            cellid: "fin4",
            coorX: 222,
            coorY: 62,
        },
    ],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map08 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 640,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 75,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 75,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 560,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 75,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 520,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 75,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 80,
        coorY: 640,
        type: "yellow",
        stepsToFin: 74,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 120,
        coorY: 640,
        shift: "right",
        stepsToFin: 73,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 120,
        coorY: 600,
        shift: "right",
        stepsToFin: 72,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 120,
        coorY: 560,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 71,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 160,
        coorY: 560,
        shift: "up",
        stepsToFin: 70,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 200,
        coorY: 560,
        shift: "up",
        stepsToFin: 69,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 240,
        coorY: 560,
        shift: "up",
        stepsToFin: 68,
        zone: true,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 280,
        coorY: 560,
        type: "black",
        type2: "arrow",
        teleportTo: 215,
        stepsToFin: 67,
        zone: true,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 280,
        coorY: 600,
        type: "starOrange",
        shift: "left",
        stepsToFin: 66,
        zone: true,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 280,
        coorY: 640,
        shift: "left",
        stepsToFin: 65,
        zone: true,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 320,
        coorY: 640,
        shift: "up",
        stepsToFin: 64,
        zone: true,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 360,
        coorY: 640,
        shift: "down",
        stepsToFin: 63,
        zone: true,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 400,
        coorY: 640,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 вправо, короткий
        branch2Type: "risky", // 200 вверх, копилка
        bonus: 40,
        shift: "down",
        stepsToFin: 62,
        zone: true,
    },

// branch A - regular 100

    {
        cellid: 114,
        num: "14",
        coorX: 440,
        coorY: 640,
        shift: "down",
        stepsToFin: 61,
        zone: true,
    },

    {
        cellid: 115,
        num: "15",
        coorX: 480,
        coorY: 640,
        type: "yellow",
        stopCondition: "join",
        joinTo: 222,
        stepsToFin: 60,
        zone: true,
    },

// branch A - risky 200

    {
        cellid: 214,
        num: "14",
        coorX: 400,
        coorY: 600,
        shift: "right",
        stepsToFin: 61,
        zone: true,
    },

    {
        cellid: 215,
        num: "15",
        coorX: 400,
        coorY: 560,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 60,
        zone: true,
    },

    {
        cellid: 216,
        num: "16",
        coorX: 400,
        coorY: 520,
        type: "arrow",
        teleportTo: "b1",
        stepsToFin: 59,
        zone: true,
    },

    {
        cellid: 217,
        num: "17",
        coorX: 440,
        coorY: 520,
        shift: "up",
        stepsToFin: 58,
        zone: true,
    },

    {
        cellid: 218,
        num: "18",
        coorX: 480,
        coorY: 520,
        shift: "up",
        stepsToFin: 57,
        zone: true,
    },

    {
        cellid: 219,
        num: "19",
        coorX: 520,
        coorY: 520,
        type: "moneybag",
        shift: "right",
        stepsToFin: 56,
        zone: true,
    },

    {
        cellid: 220,
        num: "20",
        coorX: 520,
        coorY: 560,
        type: "red",
        teleportTo: 0,
        stepsToFin: 55,
        zone: true,
    },

    {
        cellid: 221,
        num: "21",
        coorX: 520,
        coorY: 600,
        type: "starOrange",
        shift: "right",
        stepsToFin: 54,
        zone: true,
    },

    {
        cellid: 222,
        num: "22",
        coorX: 520,
        coorY: 640,
        shift: "down",
        stepsToFin: 53,
        zone: true,
    },

    {
        cellid: 223,
        num: "23",
        coorX: 560,
        coorY: 640,
        type: "arrow",
        teleportTo: 228,
        stepsToFin: 52,
        zone: true,
    },

    {
        cellid: 224,
        num: "24",
        coorX: 600,
        coorY: 640,
        type: "green",
        shift: "up",
        stepsToFin: 51,
        zone: true,
    },

    {
        cellid: 225,
        num: "25",
        coorX: 640,
        coorY: 640,
        shift: "up",
        stepsToFin: 50,
        zone: true,
    },

    {
        cellid: 226,
        num: "26",
        coorX: 680,
        coorY: 640,
        type: "checkpoint",
        shift: "right",
        stepsToFin: 49,
    },

    {
        cellid: 227,
        num: "27",
        coorX: 680,
        coorY: 600,
        shift: "right",
        stepsToFin: 48,
    },

    {
        cellid: 228,
        num: "28",
        coorX: 680,
        coorY: 560,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 47,
    },

    {
        cellid: 229,
        num: "29",
        coorX: 680,
        coorY: 520,
        type: "hatched",
        shift: "right",
        stepsToFin: 46,
    },

    {
        cellid: 230,
        num: "30",
        coorX: 680,
        coorY: 480,
        shift: "right",
        stepsToFin: 45,
    },

    {
        cellid: 231,
        num: "31",
        coorX: 680,
        coorY: 440,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "regular", // 300 влево
        branch2Type: "risky", // 400 вверх
        shift: "right",
        stepsToFin: 44,
    },

// branch B - regular 300

    {
        cellid: 332,
        num: "32",
        coorX: 640,
        coorY: 440,
        bonus: 60,
        shift: "up",
        stepsToFin: 43,
    },

    {
        cellid: 333,
        num: "33",
        coorX: 600,
        coorY: 440,
        shift: "up",
        stepsToFin: 42,
    },

    {
        cellid: 334,
        num: "34",
        coorX: 560,
        coorY: 440,
        type: "joker",
        teleportTo: 226,
        shift: "left",
        stepsToFin: 41,
    },

    {
        cellid: 335,
        num: "35",
        coorX: 560,
        coorY: 400,
        shift: "left",
        stepsToFin: 40,
    },

    {
        cellid: 336,
        num: "36",
        coorX: 560,
        coorY: 360,
        type: "arrow",
        teleportTo: 229,
        stopCondition: "join",
        joinTo: 437,
        stepsToFin: 39,
    },

// branch B - risky 400

    {
        cellid: 432,
        num: "32",
        coorX: 680,
        coorY: 400,
        type: "arrow",
        teleportTo: 1273,
        stepsToFin: 43,
    },

    {
        cellid: 433,
        num: "33",
        coorX: 680,
        coorY: 360,
        type: "yellow",
        stepsToFin: 42,
    },

    {
        cellid: 434,
        num: "34",
        coorX: 680,
        coorY: 320,
        type: "hatched",
        shift: "up",
        stepsToFin: 41,
    },

    {
        cellid: 435,
        num: "35",
        coorX: 640,
        coorY: 320,
        type: "hatched",
        shift: "up",
        stepsToFin: 40,
    },

    {
        cellid: 436,
        num: "36",
        coorX: 600,
        coorY: 320,
        bonus: -40,
        shift: "up",
        stepsToFin: 39,
    },

    {
        cellid: 437,
        num: "37",
        coorX: 560,
        coorY: 320,
        shift: "up",
        stepsToFin: 38,
    },

    {
        cellid: 438,
        num: "38",
        coorX: 520,
        coorY: 320,
        type: "hatched",
        shift: "up",
        stepsToFin: 37,
    },

    {
        cellid: 439,
        num: "39",
        coorX: 480,
        coorY: 320,
        type: "hatched",
        shift: "up",
        stepsToFin: 36,
    },

    {
        cellid: 440,
        num: "40",
        coorX: 440,
        coorY: 320,
        type: "hatched",
        shift: "down",
        stepsToFin: 35,
    },

    {
        cellid: 441,
        num: "41",
        coorX: 400,
        coorY: 320,
        type: "hatched",
        stopCondition: "branch",
        branchid: "c",
        branch1Type: "unwanted", // 500 влево, тупик
        branch2Type: "regular", // 600 вверх
        reverseTo: 642,
        shift: "down",
        stepsToFin: 34,
    },

// branch C - unwanted 500

    {
        cellid: 542,
        num: "42",
        coorX: 360,
        coorY: 320,
        type: "joker",
        teleportTo: 226,
        stopCondition: "reverse",
        reverseTo: 441,
        shift: "up",
        stepsToFin: 35,
    },

    {
        cellid: 543,
        num: "43",
        coorX: 320,
        coorY: 320,
        type: "hatched",
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 36,
    },

    {
        cellid: 544,
        coorX: 280,
        coorY: 320,
        type: "deadend",
    },

// branch C - regular 600

    {
        cellid: 642,
        num: "42",
        coorX: 400,
        coorY: 280,
        type: "hatched",
        shift: "right",
        stepsToFin: 33,
    },

    {
        cellid: 643,
        num: "43",
        coorX: 400,
        coorY: 240,
        type: "red",
        teleportTo: 226,
        stepsToFin: 32,
    },

    {
        cellid: 644,
        num: "44",
        coorX: 360,
        coorY: 240,
        bonus: -20,
        shift: "up",
        stepsToFin: 31,
    },

    {
        cellid: 645,
        num: "45",
        coorX: 320,
        coorY: 240,
        type: "black",
        shift: "up",
        stepsToFin: 30,
    },

    {
        cellid: 646,
        num: "46",
        coorX: 280,
        coorY: 240,
        type: "checkpoint",
        shift: "down",
        stepsToFin: 29,
    },

    {
        cellid: 647,
        num: "47",
        type: "black",
        coorX: 240,
        coorY: 240,
        shift: "up",
        stepsToFin: 28,
    },

    {
        cellid: 648,
        num: "48",
        coorX: 200,
        coorY: 240,
        shift: "up",
        stepsToFin: 27,
    },

    {
        cellid: 649,
        num: "49",
        coorX: 160,
        coorY: 240,
        shift: "up",
        stepsToFin: 26,
    },

    {
        cellid: 650,
        num: "50",
        coorX: 160,
        coorY: 280,
        shift: "left",
        stepsToFin: 25,
    },

    {
        cellid: 651,
        num: "51",
        coorX: 160,
        coorY: 320,
        type: "green",
        stopCondition: "branch",
        branchid: "d",
        branch1Type: "unwanted", // 700 вправо, тупик
        branch2Type: "regular", // 800 влево
        reverseTo: 852,
        shift: "down",
        stepsToFin: 24,
    },

// branch D - unwanted 700

    {
        cellid: 752,
        num: "52",
        coorX: 200,
        coorY: 320,
        type: "hatched",
        stopCondition: "reverse",
        reverseTo: 651,
        shift: "up",
        stepsToFin: 25,
    },

    {
        cellid: 753,
        num: "53",
        coorX: 240,
        coorY: 320,
        type: "hatched",
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 26,
    },

    {
        cellid: 754,
        coorX: 280,
        coorY: 320,
        type: "deadend",
    },

// branch D - regular 800

    {
        cellid: 852,
        num: "52",
        coorX: 120,
        coorY: 320,
        type: "red",
        teleportTo: 646,
        stepsToFin: 23,
    },

    {
        cellid: 853,
        num: "53",
        coorX: 80,
        coorY: 320,
        type: "black",
        shift: "up",
        stepsToFin: 22,
    },

    {
        cellid: 854,
        num: "54",
        coorX: 40,
        coorY: 320,
        type: "hatched",
        stopCondition: "branch",
        branchid: "e",
        branch1Type: "tasty", // 900 вниз, молния, тупик
        branch2Type: "regular", // 1000 вверх
        reverseTo: 1055,
        shift: "left",
        stepsToFin: 21,
    },

// branch E - tasty 900

    {
        cellid: 955,
        num: "55",
        coorX: 40,
        coorY: 360,
        type: "starOrange",
        stopCondition: "reverse",
        reverseTo: 854,
        shift: "left",
        stepsToFin: 22,
    },

    {
        cellid: 956,
        num: "56",
        coorX: 40,
        coorY: 400,
        type: "speed",
        stopCondition: "deadend",
        shift: "left",
        stepsToFin: 23,
    },

    {
        cellid: 957,
        coorX: 40,
        coorY: 440,
        type: "deadend",
    },

// branch E - regular 1000

    {
        cellid: 1055,
        num: "55",
        coorX: 40,
        coorY: 280,
        bonus: 70,
        shift: "left",
        stepsToFin: 20,
    },

    {
        cellid: 1056,
        num: "56",
        coorX: 40,
        coorY: 240,
        type: "hatched",
        shift: "left",
        stepsToFin: 19,
    },

    {
        cellid: 1057,
        num: "57",
        coorX: 40,
        coorY: 200,
        type: "orange",
        stepsToFin: 18,
    },

    {
        cellid: 1058,
        num: "58",
        coorX: 40,
        coorY: 160,
        shift: "left",
        stepsToFin: 17,
    },

    {
        cellid: 1059,
        num: "59",
        coorX: 40,
        coorY: 120,
        type: "yellow",
        stepsToFin: 16,
    },

    {
        cellid: 1060,
        num: "60",
        coorX: 80,
        coorY: 120,
        shift: "down",
        stepsToFin: 15,
    },

    {
        cellid: 1061,
        num: "61",
        coorX: 120,
        coorY: 120,
        bonus: -50,
        shift: "down",
        stepsToFin: 14,
    },

    {
        cellid: 1062,
        num: "62",
        coorX: 160,
        coorY: 120,
        type: "arrow",
        teleportTo: 1056,
        stepsToFin: 13,
    },

    {
        cellid: 1063,
        num: "63",
        coorX: 200,
        coorY: 120,
        shift: "down",
        stepsToFin: 12,
    },

    {
        cellid: 1064,
        num: "64",
        coorX: 240,
        coorY: 120,
        type: "green",
        shift: "down",
        stepsToFin: 11,
    },

    {
        cellid: 1065,
        num: "65",
        coorX: 280,
        coorY: 120,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 1066,
        num: "66",
        coorX: 320,
        coorY: 120,
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 1067,
        num: "67",
        coorX: 360,
        coorY: 120,
        type: "hatched",
        shift: "up",
        stepsToFin: 8,
    },

    {
        cellid: 1068,
        num: "68",
        coorX: 400,
        coorY: 120,
        type: "hatched",
        shift: "up",
        stepsToFin: 7,
    },

    {
        cellid: 1069,
        num: "69",
        coorX: 440,
        coorY: 120,
        type: "hatched",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 1070,
        num: "70",
        coorX: 480,
        coorY: 120,
        type: "joker",
        teleportTo: 646,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 1071,
        num: "71",
        coorX: 520,
        coorY: 120,
        type: "black",
        stopCondition: "branch",
        branchid: "f",
        branch1Type: "risky", // 1100 вниз
        branch2Type: "regular", // 1200 вправо
        shift: "up",
        stepsToFin: 4,
    },

// branch F - risky 1100

    {
        cellid: 1172,
        num: "72",
        coorX: 520,
        coorY: 160,
        type: "starRed",
        type2: "arrow",
        teleportTo: 646,
        stepsToFin: 3,
    },

    {
        cellid: 1173,
        num: "73",
        coorX: 520,
        coorY: 200,
        bonus: -100,
        shift: "left",
        stepsToFin: 2,
    },

    {
        cellid: 1174,
        num: "74",
        coorX: 520,
        coorY: 240,
        type: "arrow",
        teleportTo: 1057,
        stepsToFin: 1,
    },

    {
        cellid: 1175,
        coorX: 560,
        coorY: 240,
        type: "finish",
        stopCondition: "pedestal",
    },

// branch F - regular 1200

    {
        cellid: 1272,
        num: "72",
        coorX: 560,
        coorY: 120,
        type: "arrow",
        teleportTo: 1068,
        stepsToFin: 3,
    },

    {
        cellid: 1273,
        num: "73",
        coorX: 600,
        coorY: 120,
        type: "red",
        teleportTo: 646,
        stepsToFin: 2,
    },

    {
        cellid: 1274,
        num: "74",
        coorX: 640,
        coorY: 120,
        type: "green",
        type2: "arrow",
        teleportTo: 1069,
        shift: "down",
        stepsToFin: 1,
    },

    {
        cellid: 1275,
        coorX: 680,
        coorY: 120,
        type: "finish",
        stopCondition: "pedestal",
    },

    {
        cellid: "b1",
        coorX: 240,
        coorY: 440,
        type: "arrowNode",
        dir1: [1,2,3,4,5],
        dir2: [6],
        tele1: 4,
        tele2: 651,
        dir1type: "regular",
        dir2type: "tasty",
    },

]
