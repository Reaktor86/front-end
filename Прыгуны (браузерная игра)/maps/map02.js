// параметры трассы 02

const Map02param = {

    mapName: "Трасса 2: Два пути",
    prize1: 300,
    prize2: 200,
    prize3: 150,
    prize4: 100,
    arrowsX: 92,
    arrowsY: 104,
    arrowsUrl: "img/arrows/arrows02.svg",
    branchA: true,
    branchA1X: 353,
    branchA1Y: 222,
    branchA1ROTATE: "none",
    branchA2X: 400,
    branchA2Y: 286,
    branchA2ROTATE: "rotate(90deg)",
    branchB: true,
    branchB1X: 392,
    branchB1Y: 520,
    branchB1ROTATE: "rotate(180deg)",
    branchB2X: 322,
    branchB2Y: 449,
    branchB2ROTATE: "rotate(-90deg)",

    // !!! эти бранчи не удалять, если больше нигде не пригодятся
    branchA3: false,
    branchA3X: 0,
    branchA3Y: 0,
    branchA3ROTATE: "none",
    branchC3: false,
    branchC3X: 0,
    branchC3Y: 0,
    branchC3ROTATE: "none",
    branchE3: false,
    branchE3X: 0,
    branchE3Y: 0,
    branchE3ROTATE: "none",
    branchF3: false,
    branchF3X: 0,
    branchF3Y: 0,
    branchF3ROTATE: "none",
    // !!! эти бранчи не удалять, если больше нигде не пригодятся

    prizeX: 20,
    prizeY: 20,
    cpId: [14],
    badId: [122, 126],
    goodId: [7, 123, 218, 222, 428, 429, 436], // 428 добавлена для баланса
    unwId: [124, 427, 426, 443],
    bonId: [430],
    jumpId: [125],
    brId: [14, 224],

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

let Map02 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 30,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 120,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 30,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 160,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 30,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 200,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 30,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 80,
        coorY: 560,
        shift: "left",
        stepsToFin: 29,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 80,
        coorY: 520,
        shift: "left",
        stepsToFin: 28,
        zone: true,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 80,
        coorY: 480,
        shift: "left",
        stepsToFin: 27,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        type: "arrow",
        teleportTo: 8,
        coorX: 80,
        coorY: 440,
        stepsToFin: 26,
        zone: true,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 80,
        coorY: 400,
        shift: "left",
        stepsToFin: 25,
        zone: true,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 80,
        coorY: 360,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 24,
        zone: true,
    },

    {
        cellid: 7,
        num: "7",
        type: "yellow",
        coorX: 120,
        coorY: 360,
        stepsToFin: 23,
        zone: true,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 160,
        coorY: 360,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 22,
        zone: true,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 160,
        coorY: 320,
        shift: "right",
        stepsToFin: 21,
        zone: true,
    },

    {
        cellid: 10,
        num: "10",
        type: "arrow",
        teleportTo: 6,
        coorX: 160,
        coorY: 280,
        stepsToFin: 20,
        zone: true,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 200,
        coorY: 280,
        shift: "up",
        stepsToFin: 19,
        zone: true,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 240,
        coorY: 280,
        shift: "up",
        stepsToFin: 18,
        zone: true,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 280,
        coorY: 280,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 17,
        zone: true,
    },

    {
        cellid: 14,
        num: "14",
        type: "checkpoint",
        coorX: 320,
        coorY: 280,
        shift: "right",
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "risky",
        branch2Type: "careful",
        stepsToFin: 16,
    },

    {
        cellid: 115,
        num: "15",
        coorX: 320,
        coorY: 240,
        shift: "right",
        stepsToFin: 15,
    },

    {
        cellid: 116,
        num: "16",
        coorX: 320,
        coorY: 200,
        shift: "left",
        stepsToFin: 14,
    },

    {
        cellid: 117,
        num: "17",
        coorX: 320,
        coorY: 160,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 13,
    },

    {
        cellid: 118,
        num: "18",
        coorX: 360,
        coorY: 160,
        shift: "up",
        stepsToFin: 12,
    },

    {
        cellid: 119,
        num: "19",
        coorX: 400,
        coorY: 160,
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 120,
        num: "20",
        type: "arrow",
        teleportTo: 117,
        coorX: 400,
        coorY: 200,
        stepsToFin: 10,
    },

    {
        cellid: 121,
        num: "21",
        coorX: 400,
        coorY: 240,
        shift: "down",
        stepsToFin: 9,
    },

    {
        cellid: 122,
        num: "22",
        type: "red",
        teleportTo: 14,
        coorX: 440,
        coorY: 240,
        stepsToFin: 8,
    },

    {
        cellid: 123,
        num: "23",
        type: "yellow",
        coorX: 480,
        coorY: 240,
        stepsToFin: 7,
    },

    {
        cellid: 124,
        num: "24",
        type: "green",
        coorX: 520,
        coorY: 240,
        shift: "up",
        stepsToFin: 6,
    },

    {
        cellid: 125,
        num: "25",
        coorX: 560,
        coorY: 240,
        shift: "up",
        stepsToFin: 5,
    },

    {
        cellid: 126,
        num: "26",
        type: "red",
        teleportTo: 14,
        coorX: 600,
        coorY: 240,
        stopCondition: "join",
        joinTo: 447,
        stepsToFin: 4,
    },

    {
        cellid: 215,
        num: "15",
        coorX: 320,
        coorY: 320,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 35,
    },

    {
        cellid: 216,
        num: "16",
        coorX: 360,
        coorY: 320,
        shift: "down",
        stepsToFin: 34,
    },

    {
        cellid: 217,
        num: "17",
        coorX: 400,
        coorY: 320,
        shift: "down",
        stepsToFin: 33,
    },

    {
        cellid: 218,
        num: "18",
        type: "yellow",
        coorX: 440,
        coorY: 320,
        stepsToFin: 32,
    },

    {
        cellid: 219,
        num: "19",
        coorX: 440,
        coorY: 360,
        shift: "right",
        stepsToFin: 31,
    },

    {
        cellid: 220,
        num: "20",
        type: "arrow",
        teleportTo: 215,
        coorX: 440,
        coorY: 400,
        stepsToFin: 30,
    },

    {
        cellid: 221,
        num: "21",
        coorX: 440,
        coorY: 440,
        shift: "right",
        stepsToFin: 29,
    },

    {
        cellid: 222,
        num: "22",
        type: "yellow",
        coorX: 440,
        coorY: 480,
        stepsToFin: 28,
    },

    {
        cellid: 223,
        num: "23",
        coorX: 400,
        coorY: 480,
        shift: "up",
        stepsToFin: 27,
    },

    {
        cellid: 224,
        num: "24",
        coorX: 360,
        coorY: 480,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "regular", // 300 вниз
        branch2Type: "regular", // 400 влево к молнии
        shift: "up",
        stepsToFin: 26,
    },
    
// branch B - 300

    {
        cellid: 325,
        num: "25",
        coorX: 360,
        coorY: 520,
        stopCondition: "join",
        joinTo: 432,
        shift: "left",
        stepsToFin: 25,
    },
    
// branch B - 400    

    {
        cellid: 425,
        num: "25",
        coorX: 320,
        coorY: 480,
        shift: "up",
        stepsToFin: 25,
    },

    {
        cellid: 426,
        num: "26",
        type: "arrow",
        teleportTo: 13,
        coorX: 280,
        coorY: 480,
        stepsToFin: 24,
    },

    {
        cellid: 427,
        num: "27",
        type: "green",
        coorX: 240,
        coorY: 480,
        shift: "up",
        stepsToFin: 23,
    },

    {
        cellid: 428,
        num: "28",
        coorX: 240,
        coorY: 520,
        shift: "left",
        stepsToFin: 22,
    },

    {
        cellid: 429,
        num: "29",
        type: "arrow",
        teleportTo: 435,
        coorX: 240,
        coorY: 560,
        stepsToFin: 21,
    },

    {
        cellid: 430,
        num: "30",
        coorX: 280,
        coorY: 560,
        type: "speed",
        shift: "up",
        stepsToFin: 20,
    },

    {
        cellid: 431,
        num: "31",
        coorX: 320,
        coorY: 560,
        shift: "down",
        stepsToFin: 19,
    },

    {
        cellid: 432,
        num: "32",
        coorX: 360,
        coorY: 560,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 18,
    },

    {
        cellid: 433,
        num: "33",
        coorX: 400,
        coorY: 560,
        type: "joker",
        teleportTo: 14,
        shift: "up",
        stepsToFin: 17,
    },

    {
        cellid: 434,
        num: "34",
        type: "arrow",
        teleportTo: 432,
        coorX: 440,
        coorY: 560,
        stepsToFin: 16,
    },

    {
        cellid: 435,
        num: "35",
        coorX: 480,
        coorY: 560,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 436,
        num: "36",
        type: "yellow",
        coorX: 520,
        coorY: 560,
        stepsToFin: 14,
    },

    {
        cellid: 437,
        num: "37",
        type: "arrow",
        teleportTo: 439,
        coorX: 560,
        coorY: 560,
        stepsToFin: 13,
    },

    {
        cellid: 438,
        num: "38",
        coorX: 600,
        coorY: 560,
        shift: "up",
        stepsToFin: 12,
    },

    {
        cellid: 439,
        num: "39",
        coorX: 640,
        coorY: 560,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 11,
    },

    {
        cellid: 440,
        num: "40",
        coorX: 640,
        coorY: 520,
        shift: "right",
        stepsToFin: 10,
    },

    {
        cellid: 441,
        num: "41",
        coorX: 640,
        coorY: 480,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 9,
    },

    {
        cellid: 442,
        num: "42",
        type: "arrow",
        teleportTo: 444,
        coorX: 640,
        coorY: 440,
        stepsToFin: 8,
    },

    {
        cellid: 443,
        num: "43",
        type: "green",
        coorX: 640,
        coorY: 400,
        shift: "right",
        stepsToFin: 7,
    },

    {
        cellid: 444,
        num: "44",
        coorX: 640,
        coorY: 360,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 6,
    },

    {
        cellid: 445,
        num: "45",
        type: "arrow",
        teleportTo: 441,
        coorX: 640,
        coorY: 320,
        stepsToFin: 5,
    },

    {
        cellid: 446,
        num: "46",
        coorX: 640,
        coorY: 280,
        shift: "right",
        stepsToFin: 4,
    },

    {
        cellid: 447,
        num: "47",
        coorX: 640,
        coorY: 240,
        shift: "right",
        stepsToFin: 3,
    },

    {
        cellid: 448,
        num: "48",
        coorX: 640,
        coorY: 200,
        type: "joker",
        teleportTo: 14,
        shift: "left",
        stepsToFin: 2,
    },

    {
        cellid: 449,
        num: "49",
        type: "arrow",
        teleportTo: 123,
        coorX: 640,
        coorY: 160,
        stepsToFin: 1,
    },

    {
        cellid: 450,
        type: "finish",
        coorX: 640,
        coorY: 120,
        stopCondition: "pedestal",
    },


]
