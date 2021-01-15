// параметры трассы 07

const Map07param = {

    mapName: "Трасса 7: Ступеньки наверх",
    prize1: 1100,
    prize2: 750,
    prize3: 600,
    prize4: 400,
    branchA: true,
    branchA1X: 322,
    branchA1Y: 529,
    branchA1ROTATE: "rotate(-90deg)",
    branchA2X: 368,
    branchA2Y: 520,
    branchA2ROTATE: "none",
    branchB: true,
    branchB1X: 239,
    branchB1Y: 352,
    branchB1ROTATE: "rotate(-90deg)",
    branchB2X: 321,
    branchB2Y: 350,
    branchB2ROTATE: "rotate(90deg)",
    branchC: true,
    branchC1X: 488,
    branchC1Y: 120,
    branchC1ROTATE: "none",
    branchC2X: 561,
    branchC2Y: 128,
    branchC2ROTATE: "rotate(90deg)",
    arrowsX: 59,
    arrowsY: 34,
    arrowsUrl: "img/arrows/arrows07.svg",
    prizeX: 300,
    prizeY: 325,
    cpId: [22,233],
    badId: [9,27,132,346,351,353,444,651,653,658,663],
    goodId: [4,7,14,19,20,130,232,235,344,347,445,547],
    unwId: [18,21,25,131,341,350,352,442,648,649,650,661,662],
    bonId: [133,230,342,652,655,656],
    jumpId: [10,348,349,446,657,659,660],
    brId: [27,236,446],

    pedestalX: 605,
    pedestalY: 330,
    pedestalCoords: [
        {
            cellid: "fin1",
            coorX: 656,
            coorY: 297,
        },

        {
            cellid: "fin2",
            coorX: 608,
            coorY: 309,
        },

        {
            cellid: "fin3",
            coorX: 707,
            coorY: 317,
        },

        {
            cellid: "fin4",
            coorX: 777,
            coorY: 342,
        },
    ],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map07 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 40,
        coorY: 640,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 54,
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
        stepsToFin: 54,
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
        stepsToFin: 54,
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
        stepsToFin: 54,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 80,
        coorY: 640,
        shift: "up",
        stepsToFin: 53,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 120,
        coorY: 640,
        shift: "up",
        stepsToFin: 52,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 160,
        coorY: 640,
        shift: "up",
        stepsToFin: 51,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 200,
        coorY: 640,
        bonus: 20,
        shift: "up",
        stepsToFin: 50,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 240,
        coorY: 640,
        type: "arrow",
        teleportTo: 8,
        stepsToFin: 49,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 280,
        coorY: 640,
        shift: "up",
        stepsToFin: 48,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 320,
        coorY: 640,
        type: "yellow",
        stepsToFin: 47,
        zone: true,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 360,
        coorY: 640,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 46,
        zone: true,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 400,
        coorY: 640,
        type: "red",
        teleportTo: 0,
        stepsToFin: 45,
        zone: true,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 440,
        coorY: 640,
        shift: "up",
        stepsToFin: 44,
        zone: true,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 480,
        coorY: 640,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 43,
        zone: true,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 520,
        coorY: 640,
        type: "joker",
        teleportTo: 0,
        shift: "up",
        stepsToFin: 42,
        zone: true,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 560,
        coorY: 640,
        type: "arrow",
        teleportTo: 11,
        stepsToFin: 41,
        zone: true,
    },

    {
        cellid: 14,
        num: "14",
        coorX: 600,
        coorY: 640,
        type: "arrow",
        teleportTo: 22,
        stepsToFin: 40,
        zone: true,
    },

    {
        cellid: 15,
        num: "15",
        coorX: 640,
        coorY: 640,
        shift: "up",
        stepsToFin: 39,
        zone: true,
    },

    {
        cellid: 16,
        num: "16",
        coorX: 680,
        coorY: 640,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 38,
        zone: true,
    },

    {
        cellid: 17,
        num: "17",
        coorX: 720,
        coorY: 640,
        shift: "right",
        stepsToFin: 37,
        zone: true,
    },

    {
        cellid: 18,
        num: "18",
        coorX: 720,
        coorY: 600,
        bonus: -30,
        shift: "right",
        stepsToFin: 36,
        zone: true,
    },

    {
        cellid: 19,
        num: "19",
        coorX: 720,
        coorY: 560,
        type: "yellow",
        stepsToFin: 35,
        zone: true,
    },

    {
        cellid: 20,
        num: "20",
        coorX: 680,
        coorY: 560,
        bonus: 50,
        shift: "up",
        stepsToFin: 34,
        zone: true,
    },

    {
        cellid: 21,
        num: "21",
        coorX: 640,
        coorY: 560,
        type: "arrow",
        teleportTo: 16,
        stepsToFin: 33,
        zone: true,
    },

    {
        cellid: 22,
        num: "22",
        coorX: 600,
        coorY: 560,
        type: "checkpoint",
        shift: "up",
        stepsToFin: 32,
    },

    {
        cellid: 23,
        num: "23",
        coorX: 560,
        coorY: 560,
        shift: "up",
        stepsToFin: 31,
    },

    {
        cellid: 24,
        num: "24",
        coorX: 520,
        coorY: 560,
        type: "arrow",
        teleportTo: 229,
        stepsToFin: 30,
    },

    {
        cellid: 25,
        num: "25",
        coorX: 480,
        coorY: 560,
        type: "green",
        shift: "up",
        stepsToFin: 29,
    },

    {
        cellid: 26,
        num: "26",
        coorX: 440,
        coorY: 560,
        shift: "down",
        stepsToFin: 28,
    },

    {
        cellid: 27,
        num: "27",
        coorX: 400,
        coorY: 560,
        type: "black",
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "risky", // 100 влево, к молнии
        branch2Type: "regular", // 200 вверх
        reverseTo: 228,
        shift: "down",
        stepsToFin: 27,
    },

// branch A - risky 100

    {
        cellid: 128,
        num: "28",
        coorX: 360,
        coorY: 560,
        stopCondition: "reverse",
        reverseTo: 27,
        shift: "down",
        stepsToFin: 28,
    },

    {
        cellid: 129,
        num: "29",
        coorX: 320,
        coorY: 560,
        shift: "down",
        stepsToFin: 29,
    },

    {
        cellid: 130,
        num: "30",
        coorX: 280,
        coorY: 560,
        type: "yellow",
        stepsToFin: 30,
    },

    {
        cellid: 131,
        num: "31",
        coorX: 240,
        coorY: 560,
        bonus: -70,
        shift: "up",
        stepsToFin: 31,
    },

    {
        cellid: 132,
        num: "32",
        coorX: 200,
        coorY: 560,
        type: "red",
        teleportTo: 22,
        stepsToFin: 32,
    },

    {
        cellid: 133,
        num: "33",
        coorX: 160,
        coorY: 560,
        type: "speed",
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 33,
    },

    {
        cellid: 134,
        type: "deadend",
        coorX: 120,
        coorY: 560,
    },

// branch A - regular 200

    {
        cellid: 228,
        num: "28",
        coorX: 400,
        coorY: 520,
        shift: "right",
        stepsToFin: 26,
    },

    {
        cellid: 229,
        num: "29",
        coorX: 400,
        coorY: 480,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 25,
    },

    {
        cellid: 230,
        num: "30",
        coorX: 360,
        coorY: 480,
        type: "starOrange",
        shift: "left",
        stepsToFin: 24,
    },

    {
        cellid: 231,
        num: "31",
        coorX: 360,
        coorY: 440,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 23,
    },

    {
        cellid: 232,
        num: "32",
        coorX: 320,
        coorY: 440,
        type: "orange",
        stepsToFin: 22,
    },

    {
        cellid: 233,
        num: "33",
        coorX: 320,
        coorY: 400,
        type: "checkpoint",
        shift: "right",
        stepsToFin: 21,
    },

    {
        cellid: 234,
        num: "34",
        coorX: 280,
        coorY: 400,
        shift: "left",
        stepsToFin: 20,
    },

    {
        cellid: 235,
        num: "35",
        coorX: 280,
        coorY: 360,
        type: "yellow",
        stepsToFin: 19,
    },

    {
        cellid: 236,
        num: "36",
        coorX: 280,
        coorY: 320,
        type: "joker",
        teleportTo: 233,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "regular", // 300 влево
        branch2Type: "regular", // 400 вправо
        shift: "up",
        stepsToFin: 18,
    },

// branch B - 300

    {
        cellid: 337,
        num: "37",
        coorX: 240,
        coorY: 320,
        shift: "left",
        stepsToFin: 17,
    },

    {
        cellid: 338,
        num: "38",
        coorX: 240,
        coorY: 280,
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 339,
        num: "39",
        coorX: 200,
        coorY: 280,
        shift: "left",
        stepsToFin: 15,
    },

    {
        cellid: 340,
        num: "40",
        coorX: 200,
        coorY: 240,
        shift: "up",
        stepsToFin: 14,
    },

    {
        cellid: 341,
        num: "41",
        coorX: 160,
        coorY: 240,
        type: "green",
        shift: "left",
        stepsToFin: 13,
    },

    {
        cellid: 342,
        num: "42",
        coorX: 160,
        coorY: 200,
        type: "starOrange",
        shift: "up",
        stepsToFin: 12,
    },

    {
        cellid: 343,
        num: "43",
        coorX: 120,
        coorY: 200,
        shift: "left",
        stepsToFin: 11,
    },

    {
        cellid: 344,
        num: "44",
        coorX: 120,
        coorY: 160,
        type: "yellow",
        stepsToFin: 10,
    },

    {
        cellid: 345,
        num: "45",
        coorX: 80,
        coorY: 160,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 346,
        num: "46",
        coorX: 40,
        coorY: 160,
        type: "arrow",
        teleportTo: "b1",
        stepsToFin: 8,
    },

    {
        cellid: 347,
        num: "47",
        coorX: 40,
        coorY: 120,
        bonus: 80,
        shift: "left",
        stepsToFin: 7,
    },

    {
        cellid: 348,
        num: "48",
        coorX: 40,
        coorY: 80,
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 349,
        num: "49",
        coorX: 80,
        coorY: 80,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 350,
        num: "50",
        coorX: 120,
        coorY: 80,
        bonus: -20,
        shift: "up",
        stepsToFin: 4,
    },

    {
        cellid: 351,
        num: "51",
        coorX: 160,
        coorY: 80,
        type: "black",
        type2: "arrow",
        teleportTo: 345,
        stepsToFin: 3,
    },

    {
        cellid: 352,
        num: "52",
        coorX: 200,
        coorY: 80,
        type: "arrow",
        teleportTo: 344,
        stepsToFin: 2,
    },

    {
        cellid: 353,
        num: "53",
        coorX: 240,
        coorY: 80,
        type: "red",
        teleportTo: 233,
        stepsToFin: 1,
    },

    {
        cellid: 354,
        coorX: 280,
        coorY: 80,
        type: "finish",
        stopCondition: "pedestal",
    },

// branch B - 400

    {
        cellid: 437,
        num: "37",
        coorX: 320,
        coorY: 320,
        shift: "up",
        stepsToFin: 17,
    },

    {
        cellid: 438,
        num: "38",
        coorX: 360,
        coorY: 320,
        shift: "right",
        stepsToFin: 16,
    },

    {
        cellid: 439,
        num: "39",
        coorX: 360,
        coorY: 280,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 440,
        num: "40",
        coorX: 400,
        coorY: 280,
        shift: "right",
        stepsToFin: 14,
    },

    {
        cellid: 441,
        num: "41",
        coorX: 400,
        coorY: 240,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 13,
    },

    {
        cellid: 442,
        num: "42",
        coorX: 440,
        coorY: 240,
        type: "arrow",
        teleportTo: 231,
        stepsToFin: 12,
    },

    {
        cellid: 443,
        num: "43",
        coorX: 440,
        coorY: 200,
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 444,
        num: "44",
        coorX: 480,
        coorY: 200,
        type: "red",
        teleportTo: 233,
        stepsToFin: 10,
    },

    {
        cellid: 445,
        num: "45",
        coorX: 480,
        coorY: 160,
        bonus: 20,
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 446,
        num: "46",
        coorX: 520,
        coorY: 160,
        stopCondition: "branch",
        branchid: "c",
        branch1Type: "regular", // 500 вверх, короткий
        branch2Type: "risky", // 600 вправо, длинный
        shift: "down",
        stepsToFin: 8,
    },

// branch C - regular 500

    {
        cellid: 547,
        num: "47",
        coorX: 520,
        coorY: 120,
        type: "yellow",
        stopCondition: "join",
        joinTo: 658,
        stepsToFin: 7,
    },

// branch C - risky 600

    {
        cellid: 647,
        num: "47",
        coorX: 560,
        coorY: 160,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 17,
    },

    {
        cellid: 648,
        num: "48",
        coorX: 600,
        coorY: 160,
        type: "green",
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 649,
        num: "49",
        coorX: 640,
        coorY: 160,
        bonus: -30,
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 650,
        num: "50",
        coorX: 680,
        coorY: 160,
        type: "arrow",
        teleportTo: 647,
        stepsToFin: 14,
    },

    {
        cellid: 651,
        num: "51",
        coorX: 720,
        coorY: 160,
        type: "red",
        teleportTo: 233,
        stepsToFin: 13,
    },

    {
        cellid: 652,
        num: "52",
        coorX: 720,
        coorY: 120,
        type: "starRed",
        shift: "right",
        stepsToFin: 12,
    },

    {
        cellid: 653,
        num: "53",
        coorX: 720,
        coorY: 80,
        type: "black",
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 654,
        num: "54",
        coorX: 680,
        coorY: 80,
        type: "arrow",
        teleportTo: 657,
        stepsToFin: 10,
    },

    {
        cellid: 655,
        num: "55",
        coorX: 640,
        coorY: 80,
        bonus: 100,
        shift: "up",
        stepsToFin: 9,
    },

    {
        cellid: 656,
        num: "56",
        coorX: 600,
        coorY: 80,
        bonus: 100,
        shift: "up",
        stepsToFin: 8,
    },

    {
        cellid: 657,
        num: "57",
        coorX: 560,
        coorY: 80,
        type: "arrowEnd",
        stepsToFin: 7,
    },

    {
        cellid: 658,
        num: "58",
        coorX: 520,
        coorY: 80,
        type: "black",
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 659,
        num: "59",
        coorX: 480,
        coorY: 80,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 660,
        num: "60",
        coorX: 440,
        coorY: 80,
        shift: "up",
        stepsToFin: 4,
    },

    {
        cellid: 661,
        num: "61",
        coorX: 400,
        coorY: 80,
        bonus: -50,
        type: "arrow",
        teleportTo: 441,
        stepsToFin: 3,
    },

    {
        cellid: 662,
        num: "62",
        coorX: 360,
        coorY: 80,
        type: "green",
        type2: "arrow",
        teleportTo: 439,
        stepsToFin: 2,
    },

    {
        cellid: 663,
        num: "63",
        coorX: 320,
        coorY: 80,
        type: "red",
        teleportTo: 233,
        stepsToFin: 1,
    },

    {
        cellid: 664,
        coorX: 280,
        coorY: 80,
        type: "finish",
        stopCondition: "pedestal",
    },

    {
        cellid: "b1",
        coorX: 180,
        coorY: 375,
        type: "arrowNode",
        dir1: [1,2,3,4],
        dir2: [5,6],
        tele1: 132,
        tele2: 133,
        dir1type: "regular",
        dir2type: "tasty",
    },

]
