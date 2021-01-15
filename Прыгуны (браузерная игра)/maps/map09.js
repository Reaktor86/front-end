// параметры трассы 09

const Map09param = {

    mapName: "Трасса 9: Миксер",
    prize1: 1100,
    prize2: 750,
    prize3: 600,
    prize4: 400,
    branchA: true,
    branchA1X: 440,
    branchA1Y: 691,
    branchA1ROTATE: "rotate(90deg)",
    branchA2X: 360,
    branchA2Y: 692,
    branchA2ROTATE: "rotate(-90deg)",
    branchB: true,
    branchB1X: 120,
    branchB1Y: 509,
    branchB1ROTATE: "rotate(-90deg)",
    branchB2X: 192,
    branchB2Y: 581,
    branchB2ROTATE: "rotate(180deg)",
    branchC: true,
    branchC1X: 80,
    branchC1Y: 170,
    branchC1ROTATE: "rotate(90deg)",
    branchC2X: 9,
    branchC2Y: 101,
    branchC2ROTATE: "none",
    branchD: true,
    branchD1X: 369,
    branchD1Y: 100,
    branchD1ROTATE: "none",
    branchD2X: 441,
    branchD2Y: 108,
    branchD2ROTATE: "rotate(90deg)",
    branchD3: true,
    branchD3X: 370,
    branchD3Y: 180,
    branchD3ROTATE: "rotate(180deg)",
    arrowsX: 14,
    arrowsY: 19,
    arrowsUrl: "img/arrows/arrows09.svg",
    prizeX: 20,
    prizeY: 20,
    cpId: [217,444],
    badId: [109,110,210,222,435,438,550,650,653,660,768,769,864,866,867,968,969],
    goodId: [103,104,108,111,202,224,431,442,448,656,658,661,863,966], // 863 добавлена для баланса
    unwId: [207,208,211,213,434,443,766,767,869,967],
    bonId: [209,214,331,432,436,437,654], // 209 стрелка добавлена как крупный бонус
    jumpId: [212,221,439,440,441,655,765,864,965],
    brId: [0,229,448,661],

    pedestalX: 657,
    pedestalY: 405,
    pedestalCoords: [
        {
            cellid: "fin1",
            coorX: 708,
            coorY: 372,
        },

        {
            cellid: "fin2",
            coorX: 660,
            coorY: 384,
        },

        {
            cellid: "fin3",
            coorX: 759,
            coorY: 392,
        },

        {
            cellid: "fin4",
            coorX: 829,
            coorY: 417,
        },
    ],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map09 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 400,
        coorY: 660,
        teleportTo: 1,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 влево
        branch2Type: "regular", // 200 вправо
        stepsToFin: 58,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 400,
        coorY: 620,
        teleportTo: 1,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 влево
        branch2Type: "regular", // 200 вправо
        stepsToFin: 58,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 400,
        coorY: 580,
        teleportTo: 1,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 влево
        branch2Type: "regular", // 200 вправо
        stepsToFin: 58,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 400,
        coorY: 540,
        teleportTo: 1,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 вправо
        branch2Type: "regular", // 200 влево
        stepsToFin: 58,
    },

// branch A - 100

    {
        cellid: 101,
        num: "1",
        coorX: 440,
        coorY: 660,
        shift: "up",
        stepsToFin: 57,
        zone: true,
    },

    {
        cellid: 102,
        num: "2",
        coorX: 480,
        coorY: 660,
        type: "joker",
        teleportTo: 0,
        shift: "up",
        stepsToFin: 56,
        zone: true,
    },

    {
        cellid: 103,
        num: "3",
        coorX: 520,
        coorY: 660,
        type: "arrow",
        teleportTo: 107,
        stepsToFin: 55,
        zone: true,
    },

    {
        cellid: 104,
        num: "4",
        coorX: 560,
        coorY: 660,
        type: "yellow",
        stepsToFin: 54,
        zone: true,
    },

    {
        cellid: 105,
        num: "5",
        coorX: 560,
        coorY: 620,
        shift: "right",
        stepsToFin: 53,
        zone: true,
    },

    {
        cellid: 106,
        num: "6",
        coorX: 560,
        coorY: 580,
        shift: "right",
        stepsToFin: 52,
        zone: true,
    },

    {
        cellid: 107,
        num: "7",
        coorX: 560,
        coorY: 540,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 51,
        zone: true,
    },

    {
        cellid: 108,
        num: "8",
        coorX: 560,
        coorY: 500,
        bonus: 60,
        shift: "right",
        stepsToFin: 50,
        zone: true,
    },

    {
        cellid: 109,
        num: "9",
        coorX: 560,
        coorY: 460,
        type: "black",
        shift: "left",
        stepsToFin: 49,
        zone: true,
    },

    {
        cellid: 110,
        num: "10",
        coorX: 560,
        coorY: 420,
        type: "black",
        shift: "up",
        stepsToFin: 48,
        zone: true,
    },

    {
        cellid: 111,
        num: "11",
        coorX: 520,
        coorY: 420,
        bonus: 70,
        shift: "up",
        stepsToFin: 47,
        zone: true,
    },

    {
        cellid: 112,
        num: "12",
        coorX: 480,
        coorY: 420,
        type: "arrow",
        teleportTo: 212,
        stepsToFin: 46,
        zone: true,
    },

    {
        cellid: 113,
        num: "13",
        coorX: 440,
        coorY: 420,
        stopCondition: "join",
        joinTo: 214,
        shift: "down",
        stepsToFin: 45,
        zone: true,
    },

// branch A - 200

    {
        cellid: 201,
        num: "1",
        coorX: 360,
        coorY: 660,
        shift: "up",
        stepsToFin: 57,
        zone: true,
    },

    {
        cellid: 202,
        num: "2",
        coorX: 320,
        coorY: 660,
        type: "joker",
        teleportTo: 0,
        stepsToFin: 56,
        zone: true,
    },

    {
        cellid: 203,
        num: "3",
        coorX: 280,
        coorY: 660,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 55,
        zone: true,
    },

    {
        cellid: 204,
        num: "4",
        coorX: 240,
        coorY: 660,
        shift: "down",
        stepsToFin: 54,
        zone: true,
    },

    {
        cellid: 205,
        num: "5",
        coorX: 240,
        coorY: 620,
        shift: "right",
        stepsToFin: 53,
        zone: true,
    },

    {
        cellid: 206,
        num: "6",
        coorX: 240,
        coorY: 580,
        shift: "right",
        stepsToFin: 52,
        zone: true,
    },

    {
        cellid: 207,
        num: "7",
        coorX: 240,
        coorY: 540,
        type: "arrow",
        teleportTo: 203,
        stepsToFin: 51,
        zone: true,
    },

    {
        cellid: 208,
        num: "8",
        coorX: 240,
        coorY: 500,
        type: "green",
        shift: "right",
        stepsToFin: 50,
        zone: true,
    },

    {
        cellid: 209,
        num: "9",
        coorX: 240,
        coorY: 460,
        type: "arrow",
        teleportTo: 227,
        stepsToFin: 49,
        zone: true,
    },

    {
        cellid: 210,
        num: "10",
        coorX: 240,
        coorY: 420,
        type: "red",
        teleportTo: 0,
        stepsToFin: 48,
        zone: true,
    },

    {
        cellid: 211,
        num: "11",
        coorX: 280,
        coorY: 420,
        bonus: -40,
        shift: "up",
        stepsToFin: 47,
        zone: true,
    },

    {
        cellid: 212,
        num: "12",
        coorX: 320,
        coorY: 420,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 46,
        zone: true,
    },

    {
        cellid: 213,
        num: "13",
        coorX: 360,
        coorY: 420,
        bonus: -70,
        shift: "up",
        stepsToFin: 45,
        zone: true,
    },

    {
        cellid: 214,
        num: "14",
        coorX: 400,
        coorY: 420,
        type: "speed",
        shift: "down",
        stepsToFin: 44,
        zone: true,
    },

    {
        cellid: 215,
        num: "15",
        coorX: 400,
        coorY: 380,
        shift: "right",
        stepsToFin: 43,
        zone: true,
    },

    {
        cellid: 216,
        num: "16",
        coorX: 400,
        coorY: 340,
        shift: "right",
        stepsToFin: 42,
        zone: true,
    },

    {
        cellid: 217,
        num: "17",
        coorX: 400,
        coorY: 300,
        type: "checkpoint",
        shift: "up",
        stepsToFin: 41,
    },

    {
        cellid: 218,
        num: "18",
        coorX: 360,
        coorY: 300,
        shift: "up",
        stepsToFin: 40,
    },

    {
        cellid: 219,
        num: "19",
        coorX: 320,
        coorY: 300,
        shift: "up",
        stepsToFin: 39,
    },

    {
        cellid: 220,
        num: "20",
        coorX: 280,
        coorY: 300,
        shift: "up",
        stepsToFin: 38,
    },

    {
        cellid: 221,
        num: "21",
        coorX: 240,
        coorY: 300,
        type: "arrow",
        teleportTo: 225,
        stepsToFin: 37,
    },

    {
        cellid: 222,
        num: "22",
        coorX: 200,
        coorY: 300,
        type: "black",
        shift: "down",
        stepsToFin: 36,
    },

    {
        cellid: 223,
        num: "23",
        coorX: 160,
        coorY: 300,
        type: "arrow",
        teleportTo: "b1",
        stepsToFin: 35,
    },

    {
        cellid: 224,
        num: "24",
        coorX: 160,
        coorY: 340,
        bonus: 60,
        shift: "left",
        stepsToFin: 34,
    },

    {
        cellid: 225,
        num: "25",
        coorX: 160,
        coorY: 380,
        type: "hatched",
        shift: "left",
        stepsToFin: 33,
    },

    {
        cellid: 226,
        num: "26",
        coorX: 160,
        coorY: 420,
        type: "hatched",
        shift: "left",
        stepsToFin: 32,
    },

    {
        cellid: 227,
        num: "27",
        coorX: 160,
        coorY: 460,
        type: "hatched",
        shift: "left",
        stepsToFin: 31,
    },

    {
        cellid: 228,
        num: "28",
        coorX: 160,
        coorY: 500,
        type: "hatched",
        shift: "right",
        stepsToFin: 30,
    },

    {
        cellid: 229,
        num: "29",
        coorX: 160,
        coorY: 540,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "careful", // 300 влево, короткая
        branch2Type: "risky", // 400 вниз, длинная
        shift: "right",
        stepsToFin: 29,
    },

// branch B - careful 300

    {
        cellid: 330,
        num: "30",
        coorX: 120,
        coorY: 540,
        type: "hatched",
        shift: "down",
        stepsToFin: 28,
    },

    {
        cellid: 331,
        num: "31",
        coorX: 80,
        coorY: 540,
        type: "starOrange",
        stopCondition: "join",
        joinTo: 438,
        shift: "down",
        stepsToFin: 27,
    },

// branch B - careful 400

    {
        cellid: 430,
        num: "30",
        coorX: 160,
        coorY: 580,
        type: "hatched",
        shift: "right",
        stepsToFin: 34,
    },

    {
        cellid: 431,
        num: "31",
        coorX: 160,
        coorY: 620,
        type: "yellow",
        stepsToFin: 33,
    },

    {
        cellid: 432,
        num: "32",
        coorX: 160,
        coorY: 660,
        type: "hatched",
        shift: "right",
        stepsToFin: 32,
    },

    {
        cellid: 433,
        num: "33",
        coorX: 120,
        coorY: 660,
        type: "hatched",
        shift: "up",
        stepsToFin: 31,
    },

    {
        cellid: 434,
        num: "34",
        coorX: 80,
        coorY: 660,
        type: "arrow",
        teleportTo: 330,
        stepsToFin: 30,
    },

    {
        cellid: 435,
        num: "35",
        coorX: 40,
        coorY: 660,
        type: "black",
        shift: "left",
        stepsToFin: 29,
    },

    {
        cellid: 436,
        num: "36",
        coorX: 40,
        coorY: 620,
        type: "speed",
        shift: "left",
        stepsToFin: 28,
    },

    {
        cellid: 437,
        num: "37",
        coorX: 40,
        coorY: 580,
        type: "starRed",
        shift: "left",
        stepsToFin: 27,
    },

    {
        cellid: 438,
        num: "38",
        coorX: 40,
        coorY: 540,
        type: "red",
        teleportTo: 217,
        stepsToFin: 26,
    },

    {
        cellid: 439,
        num: "39",
        coorX: 40,
        coorY: 500,
        type: "hatched",
        shift: "left",
        stepsToFin: 25,
    },

    {
        cellid: 440,
        num: "40",
        coorX: 40,
        coorY: 460,
        type: "hatched",
        shift: "right",
        stepsToFin: 24,
    },

    {
        cellid: 441,
        num: "41",
        coorX: 40,
        coorY: 420,
        shift: "right",
        stepsToFin: 23,
    },

    {
        cellid: 442,
        num: "42",
        coorX: 40,
        coorY: 380,
        type: "yellow",
        stepsToFin: 22,
    },

    {
        cellid: 443,
        num: "43",
        coorX: 40,
        coorY: 340,
        type: "green",
        shift: "right",
        stepsToFin: 21,
    },

    {
        cellid: 444,
        num: "44",
        coorX: 40,
        coorY: 300,
        type: "checkpoint",
        shift: "right",
        stepsToFin: 20,
    },

    {
        cellid: 445,
        num: "45",
        coorX: 40,
        coorY: 260,
        type: "hatched",
        shift: "right",
        stepsToFin: 19,
    },

    {
        cellid: 446,
        num: "46",
        coorX: 40,
        coorY: 220,
        shift: "right",
        stepsToFin: 18,
    },

    {
        cellid: 447,
        num: "47",
        coorX: 40,
        coorY: 180,
        type: "arrow",
        teleportTo: 445,
        shift: "left",
        stepsToFin: 17,
    },

    {
        cellid: 448,
        num: "48",
        coorX: 40,
        coorY: 140,
        type: "orange",
        stopCondition: "branch",
        branchid: "c",
        branch1Type: "regular", // 500 вправо, короткая
        branch2Type: "risky", // 600 вверх, с копилкой
        stepsToFin: 16,
    },

// branch C - regular 500

    {
        cellid: 549,
        num: "49",
        coorX: 80,
        coorY: 140,
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 550,
        num: "50",
        coorX: 120,
        coorY: 140,
        type: "black",
        stopCondition: "join",
        joinTo: 655,
        shift: "down",
        stepsToFin: 14,
    },

// branch C - risky 600

    {
        cellid: 649,
        num: "49",
        coorX: 40,
        coorY: 100,
        type: "hatched",
        shift: "left",
        stepsToFin: 19,
    },

    {
        cellid: 650,
        num: "50",
        coorX: 40,
        coorY: 60,
        type: "black",
        shift: "up",
        stepsToFin: 18,
    },

    {
        cellid: 651,
        num: "51",
        coorX: 80,
        coorY: 60,
        type: "hatched",
        shift: "up",
        stepsToFin: 17,
    },

    {
        cellid: 652,
        num: "52",
        coorX: 120,
        coorY: 60,
        type: "hatched",
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 653,
        num: "53",
        coorX: 160,
        coorY: 60,
        type: "red",
        teleportTo: 444,
        stepsToFin: 15,
    },

    {
        cellid: 654,
        num: "54",
        coorX: 160,
        coorY: 100,
        type: "moneybag",
        shift: "left",
        stepsToFin: 14,
    },

    {
        cellid: 655,
        num: "55",
        coorX: 160,
        coorY: 140,
        shift: "down",
        stepsToFin: 13,
    },

    {
        cellid: 656,
        num: "56",
        coorX: 200,
        coorY: 140,
        type: "arrow",
        teleportTo: 659,
        stepsToFin: 12,
    },

    {
        cellid: 657,
        num: "57",
        coorX: 240,
        coorY: 140,
        type: "arrow",
        teleportTo: 659,
        stepsToFin: 11,
    },

    {
        cellid: 658,
        num: "58",
        coorX: 280,
        coorY: 140,
        bonus: 150,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 659,
        num: "59",
        coorX: 320,
        coorY: 140,
        type: "hatched",
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 660,
        num: "60",
        coorX: 360,
        coorY: 140,
        type: "red",
        teleportTo: 444,
        stepsToFin: 8,
    },

    {
        cellid: 661,
        num: "61",
        coorX: 400,
        coorY: 140,
        type: "yellow",
        stopCondition: "branch",
        branchid: "d",
        branch1Type: "regular", // 700 верхняя
        branch2Type: "regular", // 800 средняя
        branch3Type: "regular", // 900 нижняя
        stepsToFin: 7,
    },

// branch D - regular 700

    {
        cellid: 762,
        num: "62",
        coorX: 400,
        coorY: 100,
        type: "hatched",
        shift: "left",
        stepsToFin: 8,
    },

    {
        cellid: 763,
        num: "63",
        coorX: 400,
        coorY: 60,
        type: "hatched",
        shift: "left",
        stepsToFin: 7,
    },

    {
        cellid: 764,
        num: "64",
        coorX: 440,
        coorY: 60,
        type: "hatched",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 765,
        num: "65",
        coorX: 480,
        coorY: 60,
        type: "hatched",
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 766,
        num: "66",
        coorX: 520,
        coorY: 60,
        type: "hatched",
        bonus: -50,
        shift: "up",
        stepsToFin: 4,
    },

    {
        cellid: 767,
        num: "67",
        coorX: 560,
        coorY: 60,
        type: "green",
        type2: "arrow",
        teleportTo: 763,
        shift: "up",
        stepsToFin: 3,
    },

    {
        cellid: 768,
        num: "68",
        coorX: 600,
        coorY: 60,
        type: "black",
        type2: "arrow",
        teleportTo: "b2",
        stepsToFin: 2,
    },

    {
        cellid: 769,
        num: "69",
        coorX: 640,
        coorY: 60,
        type: "red",
        teleportTo: 444,
        stepsToFin: 1,
    },

    {
        cellid: 770,
        coorX: 680,
        coorY: 60,
        type: "finish",
        stopCondition: "pedestal",
    },

// branch D - regular 800

    {
        cellid: 862,
        num: "62",
        coorX: 440,
        coorY: 140,
        type: "hatched",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 863,
        num: "63",
        coorX: 480,
        coorY: 140,
        type: "hatched",
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 864,
        num: "64",
        coorX: 520,
        coorY: 140,
        type: "red",
        teleportTo: 444,
        stepsToFin: 4,
    },

    {
        cellid: 865,
        num: "65",
        coorX: 560,
        coorY: 140,
        type: "green",
        type2: "arrow",
        teleportTo: 768,
        shift: "up",
        stepsToFin: 3,
    },

    {
        cellid: 866,
        num: "66",
        coorX: 600,
        coorY: 140,
        type: "black",
        type2: "arrow",
        teleportTo: 865,
        stepsToFin: 2,
    },

    {
        cellid: 867,
        num: "67",
        coorX: 640,
        coorY: 140,
        type: "red",
        teleportTo: 444,
        stepsToFin: 1,
    },

    {
        cellid: 868,
        coorX: 680,
        coorY: 140,
        type: "finish",
        stopCondition: "pedestal",
    },

// branch D - regular 900

    {
        cellid: 962,
        num: "62",
        coorX: 400,
        coorY: 180,
        type: "hatched",
        shift: "right",
        stepsToFin: 8,
    },

    {
        cellid: 963,
        num: "63",
        coorX: 400,
        coorY: 220,
        type: "hatched",
        shift: "left",
        stepsToFin: 7,
    },

    {
        cellid: 964,
        num: "64",
        coorX: 440,
        coorY: 220,
        type: "hatched",
        shift: "down",
        stepsToFin: 6,
    },

    {
        cellid: 965,
        num: "65",
        coorX: 480,
        coorY: 220,
        type: "hatched",
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 966,
        num: "66",
        coorX: 520,
        coorY: 220,
        type: "hatched",
        bonus: 50,
        shift: "up",
        stepsToFin: 4,
    },

    {
        cellid: 967,
        num: "67",
        coorX: 560,
        coorY: 220,
        type: "green",
        type2: "arrow",
        teleportTo: 963,
        shift: "up",
        stepsToFin: 3,
    },

    {
        cellid: 968,
        num: "68",
        coorX: 600,
        coorY: 220,
        type: "black",
        type2: "arrow",
        teleportTo: "b3",
        stepsToFin: 2,
    },

    {
        cellid: 969,
        num: "69",
        coorX: 640,
        coorY: 220,
        type: "red",
        teleportTo: 444,
        stepsToFin: 1,
    },

    {
        cellid: 970,
        coorX: 680,
        coorY: 220,
        type: "finish",
        stopCondition: "pedestal",
    },

    {
        cellid: "b1",
        coorX: 160,
        coorY: 220,
        type: "arrowNode",
        dir1: [1,2,3,4],
        dir2: [5,6],
        tele1: 222,
        tele2: 444,
        dir1type: "regular",
        dir2type: "tasty",
    },

    {
        cellid: "b2",
        coorX: 240,
        coorY: 20,
        type: "arrowNode",
        dir1: [1,2,3,4],
        dir2: [5,6],
        tele1: 653,
        tele2: 656,
        dir1type: "regular",
        dir2type: "tasty",
    },

    {
        cellid: "b3",
        coorX: 600,
        coorY: 300,
        type: "arrowNode",
        dir1: [1,2,3],
        dir2: [4,5,6],
        tele1: 969,
        tele2: 217,
        dir1type: "regular",
        dir2type: "tasty",
    },

]
