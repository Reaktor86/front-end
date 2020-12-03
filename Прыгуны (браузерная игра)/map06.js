// параметры трассы 06

const Map06param = {

    mapName: "Трасса 6: Заколдованное место",
    prize1: 800,
    prize2: 560,
    prize3: 420,
    prize4: 280,
    branchA: true,
    branchA1X: 280,
    branchA1Y: 431,
    branchA1ROTATE: "rotate(90deg)",
    branchA2X: 209,
    branchA2Y: 359,
    branchA2ROTATE: "none",
    arrowsX: 102,
    arrowsY: 180,
    arrowsUrl: "img/arrows06.svg",
    cpId: [11],
    badId: [9, 231, 235, 241],
    goodId: [8, 10, 126, 128, 226, 230],
    unwId: [17, 124, 127, 233, 237, 240, 242],
    bonId: [1],
    jumpId: [19, 22, 232, 234, 236, 238, 239],
    brId: [24],
    finId: 243,

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

let Map06 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 600,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 41,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 560,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 41,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 520,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 41,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 680,
        coorY: 480,
        teleportTo: 1,
        stopCondition: "start",
        stepsToFin: 41,
    },

    {
        cellid: 1,
        num: "1",
        coorX: 640,
        coorY: 600,
        type: "starOrange",
        shift: "up",
        stepsToFin: 40,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 600,
        coorY: 600,
        shift: "up",
        stepsToFin: 39,
    },

    {
        cellid: 3,
        num: "3",
        coorX: 560,
        coorY: 600,
        shift: "up",
        stepsToFin: 38,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 520,
        coorY: 600,
        shift: "down",
        stepsToFin: 37,
    },

    {
        cellid: 5,
        num: "5",
        coorX: 480,
        coorY: 600,
        shift: "down",
        stepsToFin: 36,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 440,
        coorY: 600,
        shift: "down",
        stepsToFin: 35,
    },

    {
        cellid: 7,
        num: "7",
        coorX: 440,
        coorY: 560,
        shift: "up",
        stepsToFin: 34,
    },

    {
        cellid: 8,
        num: "8",
        coorX: 400,
        coorY: 560,
        bonus: 40,
        shift: "up",
        stepsToFin: 33,
    },

    {
        cellid: 9,
        num: "9",
        coorX: 360,
        coorY: 560,
        type: "black",
        type2: "arrow",
        teleportTo: 5,
        stepsToFin: 32,
    },

    {
        cellid: 10,
        num: "10",
        coorX: 320,
        coorY: 560,
        type: "yellow",
        stepsToFin: 31,
    },

    {
        cellid: 11,
        num: "11",
        coorX: 320,
        coorY: 520,
        type: "checkpoint",
        shift: "up",
        stepsToFin: 30,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 280,
        coorY: 520,
        shift: "up",
        stepsToFin: 29,
    },

    {
        cellid: 13,
        num: "13",
        coorX: 240,
        coorY: 520,
        shift: "up",
        stepsToFin: 28,
    },

    {
        cellid: 14,
        num: "14",
        coorX: 200,
        coorY: 520,
        shift: "up",
        stepsToFin: 27,
    },

    {
        cellid: 15,
        num: "15",
        coorX: 160,
        coorY: 520,
        shift: "down",
        stepsToFin: 26,
    },

    {
        cellid: 16,
        num: "16",
        coorX: 120,
        coorY: 520,
        shift: "down",
        stepsToFin: 25,
    },

    {
        cellid: 17,
        num: "17",
        coorX: 80,
        coorY: 520,
        type: "arrow",
        teleportTo: 10,
        stepsToFin: 24,
    },

    {
        cellid: 18,
        num: "18",
        coorX: 80,
        coorY: 480,
        type: "arrow",
        teleportTo: 12,
        stepsToFin: 23,
    },

    {
        cellid: 19,
        num: "19",
        coorX: 80,
        coorY: 440,
        shift: "left",
        stepsToFin: 22,
    },

    {
        cellid: 20,
        num: "20",
        coorX: 80,
        coorY: 400,
        type: "arrow",
        teleportTo: 15,
        stepsToFin: 21,
    },

    {
        cellid: 21,
        num: "21",
        coorX: 120,
        coorY: 400,
        shift: "up",
        stepsToFin: 20,
    },

    {
        cellid: 22,
        num: "22",
        coorX: 160,
        coorY: 400,
        bonus: 20,
        shift: "up",
        stepsToFin: 19,
    },

    {
        cellid: 23,
        num: "23",
        coorX: 200,
        coorY: 400,
        type: "green",
        shift: "down",
        stepsToFin: 18,
    },

    {
        cellid: 24,
        num: "24",
        coorX: 240,
        coorY: 400,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "regular", // 100 вправо
        branch2Type: "regular", // 200 вверх
        shift: "down",
        stepsToFin: 17,
    },

// branch A, regular 100

    {
        cellid: 125,
        num: "25",
        coorX: 280,
        coorY: 400,
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 126,
        num: "26",
        coorX: 320,
        coorY: 400,
        bonus: 80,
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 127,
        num: "27",
        coorX: 360,
        coorY: 400,
        type: "arrow",
        teleportTo: 11,
        stepsToFin: 14,
    },

    {
        cellid: 128,
        num: "28",
        coorX: 400,
        coorY: 400,
        type: "yellow",
        stopCondition: "join",
        joinTo: 231,
        stepsToFin: 13,
    },

// branch A, regular 200

    {
        cellid: 225,
        num: "25",
        coorX: 240,
        coorY: 360,
        shift: "left",
        stepsToFin: 18,
    },

    {
        cellid: 226,
        num: "26",
        coorX: 240,
        coorY: 320,
        type: "arrow",
        teleportTo: 234,
        stepsToFin: 17,
    },

    {
        cellid: 227,
        num: "27",
        coorX: 280,
        coorY: 320,
        shift: "up",
        stepsToFin: 16,
    },

    {
        cellid: 228,
        num: "28",
        coorX: 320,
        coorY: 320,
        shift: "up",
        stepsToFin: 15,
    },

    {
        cellid: 229,
        num: "29",
        coorX: 360,
        coorY: 320,
        shift: "up",
        stepsToFin: 14,
    },

    {
        cellid: 230,
        num: "30",
        coorX: 400,
        coorY: 320,
        type: "yellow",
        stepsToFin: 13,
    },

    {
        cellid: 231,
        num: "31",
        coorX: 400,
        coorY: 360,
        type: "red",
        teleportTo: 11,
        stepsToFin: 12,
    },

    {
        cellid: 232,
        num: "32",
        coorX: 440,
        coorY: 360,
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 233,
        num: "33",
        coorX: 480,
        coorY: 360,
        bonus: -30,
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 234,
        num: "34",
        coorX: 520,
        coorY: 360,
        shift: "down",
        stepsToFin: 9,
    },

    {
        cellid: 235,
        num: "35",
        coorX: 560,
        coorY: 360,
        type: "black",
        shift: "up",
        stepsToFin: 8,
    },

    {
        cellid: 236,
        num: "36",
        coorX: 600,
        coorY: 360,
        shift: "down",
        stepsToFin: 7,
    },

    {
        cellid: 237,
        num: "37",
        coorX: 640,
        coorY: 360,
        type: "green",
        shift: "right",
        stepsToFin: 6,
    },

    {
        cellid: 238,
        num: "38",
        coorX: 640,
        coorY: 320,
        shift: "right",
        stepsToFin: 5,
    },

    {
        cellid: 239,
        num: "39",
        coorX: 640,
        coorY: 280,
        shift: "right",
        stepsToFin: 4,
    },

    {
        cellid: 240,
        num: "40",
        coorX: 640,
        coorY: 240,
        type: "arrow",
        teleportTo: "b1",
        stepsToFin: 3,
    },

    {
        cellid: 241,
        num: "41",
        coorX: 640,
        coorY: 200,
        type: "arrow",
        teleportTo: 235,
        stepsToFin: 2,
    },

    {
        cellid: 242,
        num: "42",
        coorX: 640,
        coorY: 160,
        type: "green",
        type2: "arrow",
        teleportTo: 236,
        shift: "right",
        stepsToFin: 1,
    },

    {
        cellid: 243,
        type: "finish",
        coorX: 640,
        coorY: 120,
        stopCondition: "pedestal",
    },

    {
        cellid: "b1",
        coorX: 600,
        coorY: 440,
        type: "arrowNode",
        dir1: [1,2],
        dir2: [3,4,5,6],
        tele1: 235,
        tele2: 4,
    },

]
