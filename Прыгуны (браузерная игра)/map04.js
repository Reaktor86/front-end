// параметры трассы 04

const Map04param = {

    mapName: "Трасса 4: Ловушка",
    prize1: 500,
    prize2: 300,
    prize3: 220,
    prize4: 150,
    branchA: true,
    branchA1X: 488,
    branchA1Y: 481,
    branchA1ROTATE: "rotate(180deg)",
    branchA2X: 480,
    branchA2Y: 408,
    branchA2ROTATE: "rotate(-90deg)",
    branchB: true,
    branchB1X: 357,
    branchB1Y: 410,
    branchB1ROTATE: "rotate(-90deg)",
    branchB2X: 368,
    branchB2Y: 359,
    branchB2ROTATE: "none",
    branchC: true,
    branchC1X: 369,
    branchC1Y: 162,
    branchC1ROTATE: "none",
    branchC2X: 322,
    branchC2Y: 271,
    branchC2ROTATE: "rotate(-90deg)",
    branchD: true,
    branchD1X: 208,
    branchD1Y: 162,
    branchD1ROTATE: "none",
    branchD2X: 199,
    branchD2Y: 209,
    branchD2ROTATE: "rotate(-90deg)",
    arrowsX: 218,
    arrowsY: 84,
    arrowsUrl: "img/arrows04.svg",
    cpId: [230, 137],
    badId: [19, 131, 134, 135, 446, 550, 551, 857, 858, 861, 864, 865],
    goodId: [11, 13, 21, 138, 437, 443, 434, 854, 856, 860],
    unwId: [12, 22, 24, 133, 229, 331, 332, 440, 548, 648, 755, 862],
    bonId: [130, 859],
    jumpId: [20, 23, 136, 863, 860],
    brId: [27, 230, 447, 651],
    finId: 866,

    pedestalX: 490,
    pedestalY: 80,
    pedestalCoords: [
        {
            cellid: "fin1",
            coorX: 541,
            coorY: 47,
        },

        {
            cellid: "fin2",
            coorX: 493,
            coorY: 59,
        },

        {
            cellid: "fin3",
            coorX: 592,
            coorY: 67,
        },

        {
            cellid: "fin4",
            coorX: 662,
            coorY: 92,
        },
    ],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map04 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 680,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 48,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 640,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 48,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 48,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 560,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 48,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 120,
        coorY: 680,
        shift: "up",
        stepsToFin: 47,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 160,
        coorY: 680,
        shift: "up",
        stepsToFin: 46,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 200,
        coorY: 680,
        type: "arrow",
        teleportTo: 7,
        stepsToFin: 45,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 240,
        coorY: 680,
        shift: "down",
        stepsToFin: 44,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 280,
        coorY: 680,
        shift: "down",
        stepsToFin: 43,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 280,
        coorY: 640,
        shift: "left",
        stepsToFin: 42,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 280,
        coorY: 600,
        shift: "up",
        stepsToFin: 41,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 320,
        coorY: 600,
        shift: "up",
        stepsToFin: 40,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 360,
        coorY: 600,
        shift: "down",
        stepsToFin: 39,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 400,
        coorY: 600,
        shift: "down",
        stepsToFin: 38,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 440,
        coorY: 600,
        bonus: 20,
        shift: "right",
        stepsToFin: 37,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 440,
        coorY: 640,
        type: "arrow",
        teleportTo: 6,
        stepsToFin: 36,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 440,
        coorY: 680,
        type: "orange",
        stepsToFin: 35,
    },

    {
        cellid: 14,
        num: "14",
        coorX: 480,
        coorY: 680,
        type: "arrow",
        teleportTo: 16,
        stepsToFin: 34,
    },

    {
        cellid: 15,
        num: "15",
        coorX: 520,
        coorY: 680,
        shift: "up",
        stepsToFin: 33,
    },

    {
        cellid: 16,
        num: "16",
        coorX: 560,
        coorY: 680,
        shift: "up",
        stepsToFin: 32,
    },

    {
        cellid: 17,
        num: "17",
        coorX: 600,
        coorY: 680,
        shift: "right",
        stepsToFin: 31,
    },

    {
        cellid: 18,
        num: "18",
        coorX: 600,
        coorY: 640,
        shift: "right",
        stepsToFin: 30,
    },

    {
        cellid: 19,
        num: "19",
        coorX: 600,
        coorY: 600,
        type: "red",
        teleportTo: 0,
        stepsToFin: 29,
    },

    {
        cellid: 20,
        num: "20",
        coorX: 600,
        coorY: 560,
        shift: "left",
        stepsToFin: 28,
    },

    {
        cellid: 21,
        num: "21",
        coorX: 600,
        coorY: 520,
        bonus: 30,
        shift: "left",
        stepsToFin: 27,
    },

    {
        cellid: 22,
        num: "22",
        coorX: 640,
        coorY: 520,
        type: "green",
        shift: "right",
        stepsToFin: 26,
    },

    {
        cellid: 23,
        num: "23",
        coorX: 640,
        coorY: 480,
        shift: "right",
        stepsToFin: 25,
    },

    {
        cellid: 24,
        num: "24",
        coorX: 640,
        coorY: 440,
        type: "arrow",
        teleportTo: 18,
        stepsToFin: 24,
    },

    {
        cellid: 25,
        num: "25",
        coorX: 600,
        coorY: 440,
        shift: "up",
        stepsToFin: 23,
    },

    {
        cellid: 26,
        num: "26",
        coorX: 560,
        coorY: 440,
        shift: "up",
        stepsToFin: 22,
    },

    {
        cellid: 27,
        num: "27",
        coorX: 520,
        coorY: 440,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "extreme", // 100 ведет вниз на 2 красные клетки
        branch2Type: "regular", // 200 влево
        shift: "up",
        stepsToFin: 21,
    },

// branch A, extreme 100

    {
        cellid: 128,
        num: "28",
        coorX: 520,
        coorY: 480,
        shift: "right",
        stepsToFin: 24,
    },

    {
        cellid: 129,
        num: "29",
        coorX: 520,
        coorY: 520,
        type: "yellow",
        stepsToFin: 23,
    },

    {
        cellid: 130,
        num: "30",
        coorX: 480,
        coorY: 520,
        bonus: 100,
        shift: "down",
        stepsToFin: 22,
    },

    {
        cellid: 131,
        num: "31",
        coorX: 440,
        coorY: 520,
        type: "red",
        teleportTo: 0,
        stepsToFin: 21,
    },

    {
        cellid: 132,
        num: "32",
        coorX: 400,
        coorY: 520,
        shift: "down",
        stepsToFin: 20,
    },

    {
        cellid: 133,
        num: "33",
        coorX: 360,
        coorY: 520,
        type: "arrow",
        teleportTo: 10,
        stepsToFin: 19,
    },

    {
        cellid: 134,
        num: "34",
        coorX: 320,
        coorY: 520,
        type: "red",
        teleportTo: 0,
        stepsToFin: 18,
    },

    {
        cellid: 135,
        num: "35",
        coorX: 280,
        coorY: 520,
        type: "black",
        shift: "left",
        stepsToFin: 17,
    },

    {
        cellid: 136,
        num: "36",
        coorX: 280,
        coorY: 480,
        shift: "left",
        stepsToFin: 16,
    },

    {
        cellid: 137,
        num: "37",
        coorX: 280,
        coorY: 440,
        type: "checkpoint",
        shift: "left",
        stepsToFin: 15,
    },

    {
        cellid: 138,
        num: "38",
        coorX: 280,
        coorY: 400,
        type: "yellow",
        stepsToFin: 14,
    },

    {
        cellid: 139,
        num: "39",
        coorX: 280,
        coorY: 360,
        type: "arrow",
        teleportTo: 141,
        stepsToFin: 13,
    },

    {
        cellid: 140,
        num: "40",
        coorX: 280,
        coorY: 320,
        shift: "left",
        stepsToFin: 12,
    },

    {
        cellid: 141,
        num: "41",
        coorX: 280,
        coorY: 280,
        stopCondition: "join",
        joinTo: 650,
        shift: "left",
        stepsToFin: 11,
    },

// branch A, regular 200

    {
        cellid: 228,
        num: "28",
        coorX: 480,
        coorY: 440,
        shift: "up",
        stepsToFin: 20,
    },

    {
        cellid: 229,
        num: "29",
        coorX: 440,
        coorY: 440,
        type: "arrow",
        teleportTo: 431,
        stepsToFin: 19,
        passCP: true,
    },

    {
        cellid: 230,
        num: "30",
        coorX: 400,
        coorY: 440,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "regular", // 300 влево, соединяется с 100
        branch2Type: "rudiment", // 400 вверх, ловушка
        type: "checkpoint",
        shift: "down",
        stepsToFin: 18,
    },

// branch B, regular 300

    {
        cellid: 331,
        num: "31",
        coorX: 360,
        coorY: 440,
        type: "arrow",
        teleportTo: 132,
        stepsToFin: 17,
    },

    {
        cellid: 332,
        num: "32",
        coorX: 320,
        coorY: 440,
        bonus: -30,
        stopCondition: "join",
        joinTo: 137,
        shift: "up",
        stepsToFin: 16,
    },

// branch B, rudiment 400

    {
        cellid: 431,
        num: "31",
        coorX: 400,
        coorY: 400,
        shift: "right",
        stepsToFin: 21,
    },

    {
        cellid: 432,
        num: "32",
        coorX: 400,
        coorY: 360,
        shift: "right",
        stepsToFin: 20,
    },

    {
        cellid: 433,
        num: "33",
        coorX: 400,
        coorY: 320,
        shift: "left",
        stepsToFin: 19,
    },

    {
        cellid: 434,
        num: "34",
        coorX: 440,
        coorY: 320,
        type: "arrow",
        teleportTo: 444,
        stepsToFin: 18,
    },

    {
        cellid: 435,
        num: "35",
        coorX: 480,
        coorY: 320,
        shift: "down",
        stepsToFin: 17,
    },

    {
        cellid: 436,
        num: "36",
        coorX: 520,
        coorY: 320,
        shift: "down",
        stepsToFin: 16,
    },

    {
        cellid: 437,
        num: "37",
        coorX: 560,
        coorY: 320,
        type: "orange",
        stepsToFin: 15,
    },

    {
        cellid: 438,
        num: "38",
        coorX: 600,
        coorY: 320,
        shift: "down",
        stepsToFin: 14,
    },

    {
        cellid: 439,
        num: "39",
        coorX: 640,
        coorY: 320,
        shift: "right",
        stepsToFin: 13,
    },

    {
        cellid: 440,
        num: "40",
        coorX: 640,
        coorY: 280,
        type: "green",
        shift: "right",
        stepsToFin: 12,
    },

    {
        cellid: 441,
        num: "41",
        coorX: 640,
        coorY: 240,
        shift: "right",
        stepsToFin: 11,
    },

    {
        cellid: 442,
        num: "42",
        coorX: 600,
        coorY: 240,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 443,
        num: "43",
        coorX: 560,
        coorY: 240,
        type: "yellow",
        stepsToFin: 9,
    },

    {
        cellid: 444,
        num: "44",
        coorX: 520,
        coorY: 240,
        shift: "up",
        stepsToFin: 8,
    },

    {
        cellid: 445,
        num: "45",
        coorX: 480,
        coorY: 240,
        shift: "down",
        stepsToFin: 7,
    },

    {
        cellid: 446,
        num: "46",
        coorX: 440,
        coorY: 240,
        type: "red",
        teleportTo: 230,
        stepsToFin: 6,
    },

    {
        cellid: 447,
        num: "47",
        coorX: 400,
        coorY: 240,
        stopCondition: "branch",
        branchid: "c",
        branch1Type: "regular", // 500 вверх до финиша
        branch2Type: "regular", // 600 влево, соединяется с 100
        type: "arrow",
        teleportTo: 433,
        stepsToFin: 5,
    },

// branch C, regular 500

    {
        cellid: 548,
        num: "48",
        coorX: 400,
        coorY: 200,
        type: "arrow",
        teleportTo: 648,
        stepsToFin: 4,
    },

    {
        cellid: 549,
        num: "49",
        coorX: 400,
        coorY: 160,
        type: "arrow",
        teleportTo: 445,
        stepsToFin: 3,
    },

    {
        cellid: 550,
        num: "50",
        coorX: 400,
        coorY: 120,
        type: "arrow",
        teleportTo: 446,
        stepsToFin: 2,
    },

    {
        cellid: 551,
        num: "51",
        coorX: 400,
        coorY: 80,
        type: "black",
        shift: "right",
        stepsToFin: 1,
    },

    {
        cellid: 552,
        type: "finish",
        coorX: 400,
        coorY: 40,
        stopCondition: "pedestal",
    },

// branch C, regular 600

    {
        cellid: 648,
        num: "48",
        coorX: 360,
        coorY: 240,
        type: "arrow",
        teleportTo: 433,
        stepsToFin: 12,
    },

    {
        cellid: 649,
        num: "49",
        coorX: 320,
        coorY: 240,
        type: "arrow",
        teleportTo: 650,
        stepsToFin: 11,
    },

    {
        cellid: 650,
        num: "50",
        coorX: 280,
        coorY: 240,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 651,
        num: "51",
        coorX: 240,
        coorY: 240,
        stopCondition: "branch",
        branchid: "d",
        branch1Type: "careful", // 700 вверх короткий путь
        branch2Type: "risky", // 800 влево длинный путь с крупными бонусами
        shift: "down",
        stepsToFin: 9,
    },

// branch D, careful 700

    {
        cellid: 752,
        num: "52",
        coorX: 240,
        coorY: 200,
        shift: "right",
        stepsToFin: 8,
    },

    {
        cellid: 753,
        num: "53",
        coorX: 240,
        coorY: 160,
        shift: "right",
        stepsToFin: 7,
    },

    {
        cellid: 754,
        num: "54",
        coorX: 240,
        coorY: 120,
        shift: "right",
        stepsToFin: 6,
    },

    {
        cellid: 755,
        num: "55",
        coorX: 240,
        coorY: 80,
        bonus: -20,
        stopCondition: "join",
        joinTo: 862,
        shift: "right",
        stepsToFin: 5,
    },

// branch D, risky 800

    {
        cellid: 852,
        num: "52",
        coorX: 200,
        coorY: 240,
        shift: "down",
        stepsToFin: 14,
    },

    {
        cellid: 853,
        num: "53",
        coorX: 160,
        coorY: 240,
        shift: "down",
        stepsToFin: 13,
    },

    {
        cellid: 854,
        num: "54",
        coorX: 120,
        coorY: 240,
        type: "yellow",
        stepsToFin: 12,
    },

    {
        cellid: 855,
        num: "55",
        coorX: 120,
        coorY: 200,
        shift: "left",
        stepsToFin: 11,
    },

    {
        cellid: 856,
        num: "56",
        coorX: 120,
        coorY: 160,
        bonus: 50,
        shift: "left",
        stepsToFin: 10,
    },

    {
        cellid: 857,
        num: "57",
        coorX: 120,
        coorY: 120,
        type: "black",
        shift: "left",
        stepsToFin: 9,
    },

    {
        cellid: 858,
        num: "58",
        coorX: 120,
        coorY: 80,
        type: "red",
        teleportTo: 137,
        stepsToFin: 8,
    },

    {
        cellid: 859,
        num: "59",
        coorX: 120,
        coorY: 40,
        type: "starOrange",
        shift: "left",
        stepsToFin: 7,
    },

    {
        cellid: 860,
        num: "60",
        coorX: 160,
        coorY: 40,
        bonus: 50,
        shift: "down",
        stepsToFin: 6,
    },

    {
        cellid: 861,
        num: "61",
        coorX: 200,
        coorY: 40,
        type: "red",
        teleportTo: 137,
        stepsToFin: 5,
    },

    {
        cellid: 862,
        num: "62",
        coorX: 240,
        coorY: 40,
        type: "green",
        shift: "up",
        stepsToFin: 4,
    },

    {
        cellid: 863,
        num: "63",
        coorX: 280,
        coorY: 40,
        shift: "down",
        stepsToFin: 3,
    },

    {
        cellid: 864,
        num: "64",
        coorX: 320,
        coorY: 40,
        type: "arrow",
        teleportTo: 550,
        stepsToFin: 2,
    },

    {
        cellid: 865,
        num: "65",
        coorX: 360,
        coorY: 40,
        type: "black",
        shift: "down",
        stepsToFin: 1,
    },

    {
        cellid: 866,
        type: "finish",
        coorX: 400,
        coorY: 40,
        stopCondition: "pedestal",
    },

]
