// параметры трассы 13

const Map13param = {

    mapName: "Трасса 13: Запутанный лес",
    bone: true,
    multipleStarts: true,
    prize1: 1000,
    arrowsX: 52,
    arrowsY: 4,
    arrowsUrl: "img/arrows/arrows13.svg",
    prizeX: 20,
    prizeY: 20,
    branchA: true,
    branchA1X: 640,
    branchA1Y: 271,
    branchA1ROTATE: "rotate(90deg)",
    branchA2X: 569,
    branchA2Y: 239,
    branchA2ROTATE: "none",
    branchB: true,
    branchB1X: 640,
    branchB1Y: 191,
    branchB1ROTATE: "rotate(90deg)",
    branchB2X: 569,
    branchB2Y: 160,
    branchB2ROTATE: "none",
    branchC: true,
    branchC1X: 640,
    branchC1Y: 10,
    branchC1ROTATE: "rotate(90deg)",
    branchC2X: 560,
    branchC2Y: 11,
    branchC2ROTATE: "rotate(-90deg)",
    greenId: [9,10,118,126,132,204,211,305,310,318,728,937],
    brId: [313,315,325,527,730,933],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map13 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        coorX: 480,
        coorY: 560,
        stopCondition: "start",
        teleportTo: 301,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        coorX: 40,
        coorY: 40,
        stopCondition: "start",
        teleportTo: 201,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        coorX: 200,
        coorY: 200,
        stopCondition: "start",
        teleportTo: 101,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        coorX: 160,
        coorY: 560,
        stopCondition: "start",
        teleportTo: 1,
    },

// branch 0 - игрок IV

    {
        cellid: 1,
        num: "1",
        coorX: 120,
        coorY: 560,
        type: "arrow",
        teleportTo: 3,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 80,
        coorY: 560,
        shift: "left",
    },

    {
        cellid: 3,
        num: "3",
        coorX: 40,
        coorY: 560,
        type: "arrowEnd",
        shift: "left",
    },

    {
        cellid: 4,
        num: "4",
        coorX: 40,
        coorY: 520,
        type: "yellow",
    },

    {
        cellid: 5,
        num: "5",
        coorX: 40,
        coorY: 480,
        type: "arrow",
        teleportTo: 8,
    },

    {
        cellid: 6,
        num: "6",
        coorX: 40,
        coorY: 440,
        shift: "left",
    },

    {
        cellid: 7,
        num: "7",
        coorX: 80,
        coorY: 440,
        shift: "up",
    },

    {
        cellid: 8,
        num: "8",
        coorX: 120,
        coorY: 440,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 9,
        num: "9",
        coorX: 160,
        coorY: 440,
        type: "green",
        shift: "up",
    },

    {
        cellid: 10,
        num: "10",
        coorX: 200,
        coorY: 440,
        type: "green",
        shift: "up",
    },

    {
        cellid: 11,
        num: "11",
        coorX: 240,
        coorY: 440,
        type: "arrow",
        teleportTo: 12,
    },

    {
        cellid: 12,
        num: "12",
        coorX: 280,
        coorY: 440,
        type: "arrowEnd",
        stopCondition: "join",
        joinTo: 313,
        shift: "down",
    },

// branch 100 - игрок III

    {
        cellid: 101,
        num: "X",
        coorX: 200,
        coorY: 160,
        type: "yellow",
    },

    {
        cellid: 102,
        num: "X",
        coorX: 200,
        coorY: 120,
    },

    {
        cellid: 103,
        num: "X",
        coorX: 240,
        coorY: 120,
    },

    {
        cellid: 104,
        num: "X",
        coorX: 280,
        coorY: 120,
    },

    {
        cellid: 105,
        num: "X",
        coorX: 320,
        coorY: 120,
    },

    {
        cellid: 106,
        num: "X",
        coorX: 360,
        coorY: 120,
        type: "arrow",
        teleportTo: 108,
    },

    {
        cellid: 107,
        num: "X",
        coorX: 400,
        coorY: 120,
    },

    {
        cellid: 108,
        num: "X",
        coorX: 400,
        coorY: 160,
        type: "arrowEnd",
    },

    {
        cellid: 109,
        num: "X",
        coorX: 400,
        coorY: 200,
        type: "yellow",
    },

    {
        cellid: 110,
        num: "X",
        coorX: 400,
        coorY: 240,
    },

    {
        cellid: 111,
        num: "X",
        coorX: 400,
        coorY: 280,
    },

    {
        cellid: 112,
        num: "X",
        coorX: 360,
        coorY: 280,
        type: "arrow",
        teleportTo: 114,
    },

    {
        cellid: 113,
        num: "X",
        coorX: 320,
        coorY: 280,
    },

    {
        cellid: 114,
        num: "X",
        coorX: 280,
        coorY: 280,
        type: "arrowEnd",
    },

    {
        cellid: 115,
        num: "X",
        coorX: 240,
        coorY: 280,
    },

    {
        cellid: 116,
        num: "X",
        coorX: 200,
        coorY: 280,
    },

    {
        cellid: 117,
        num: "X",
        coorX: 160,
        coorY: 280,
        type: "arrowEnd",
    },

    {
        cellid: 118,
        num: "X",
        coorX: 120,
        coorY: 280,
        type: "green",
    },

    {
        cellid: 119,
        num: "X",
        coorX: 120,
        coorY: 240,
        type: "arrow",
        teleportTo: 117,
    },

    {
        cellid: 120,
        num: "X",
        coorX: 120,
        coorY: 200,
    },

    {
        cellid: 121,
        num: "X",
        coorX: 120,
        coorY: 160,
    },

    {
        cellid: 122,
        num: "X",
        coorX: 120,
        coorY: 120,
    },

    {
        cellid: 123,
        num: "X",
        coorX: 120,
        coorY: 80,
    },

    {
        cellid: 124,
        num: "X",
        coorX: 120,
        coorY: 40,
    },

    {
        cellid: 125,
        num: "X",
        coorX: 160,
        coorY: 40,
    },

    {
        cellid: 126,
        num: "X",
        coorX: 200,
        coorY: 40,
        type: "green",
    },

    {
        cellid: 127,
        num: "X",
        coorX: 240,
        coorY: 40,
        type: "arrowEnd",
    },

    {
        cellid: 128,
        num: "X",
        coorX: 280,
        coorY: 40,
    },

    {
        cellid: 129,
        num: "X",
        coorX: 320,
        coorY: 40,
        type: "arrow",
        teleportTo: 127,
    },

    {
        cellid: 130,
        num: "30",
        coorX: 360,
        coorY: 40,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 131,
        num: "31",
        coorX: 400,
        coorY: 40,
        type: "arrow",
        teleportTo: 934,
        passCP: true,
    },

    {
        cellid: 132,
        num: "32",
        coorX: 440,
        coorY: 40,
        type: "green",
        stopCondition: "join",
        joinTo: 933,
        shift: "up",
    },

// branch 200 - игрок II

    {
        cellid: 201,
        num: "X",
        coorX: 40,
        coorY: 80,
    },

    {
        cellid: 202,
        num: "X",
        coorX: 40,
        coorY: 120,
        type: "arrowEnd",
    },

    {
        cellid: 203,
        num: "X",
        coorX: 40,
        coorY: 160,
        type: "arrow",
        teleportTo: 202,
    },

    {
        cellid: 204,
        num: "X",
        coorX: 40,
        coorY: 200,
        type: "green",
    },

    {
        cellid: 205,
        num: "X",
        coorX: 40,
        coorY: 240,
    },

    {
        cellid: 206,
        num: "X",
        coorX: 40,
        coorY: 280,
        type: "arrowEnd",
    },

    {
        cellid: 207,
        num: "X",
        coorX: 40,
        coorY: 320,
    },

    {
        cellid: 208,
        num: "X",
        coorX: 40,
        coorY: 360,
    },

    {
        cellid: 209,
        num: "X",
        coorX: 80,
        coorY: 360,
        type: "arrow",
        teleportTo: 206,
    },

    {
        cellid: 210,
        num: "X",
        coorX: 120,
        coorY: 360,
    },

    {
        cellid: 211,
        num: "X",
        coorX: 160,
        coorY: 360,
        type: "green",
    },

    {
        cellid: 212,
        num: "X",
        coorX: 200,
        coorY: 360,
    },

    {
        cellid: 213,
        num: "X",
        coorX: 240,
        coorY: 360,
    },

    {
        cellid: 214,
        num: "X",
        coorX: 280,
        coorY: 360,
        type: "arrow",
        teleportTo: 12,
        stopCondition: "join",
        joinTo: 315,
    },

// branch 300 - игрок I

    {
        cellid: 301,
        num: "X",
        coorX: 520,
        coorY: 560,
    },

    {
        cellid: 302,
        num: "X",
        coorX: 560,
        coorY: 560,
        type: "arrowEnd",
    },

    {
        cellid: 303,
        num: "X",
        coorX: 600,
        coorY: 560,
        type: "arrow",
        teleportTo: 302,
    },

    {
        cellid: 304,
        num: "X",
        coorX: 600,
        coorY: 520,
    },

    {
        cellid: 305,
        num: "X",
        coorX: 600,
        coorY: 480,
        type: "green",
    },

    {
        cellid: 306,
        num: "X",
        coorX: 600,
        coorY: 440,
    },

    {
        cellid: 307,
        num: "X",
        coorX: 560,
        coorY: 440,
        type: "arrow",
        teleportTo: 308,
    },

    {
        cellid: 308,
        num: "X",
        coorX: 520,
        coorY: 440,
        type: "arrowEnd",
    },

    {
        cellid: 309,
        num: "X",
        coorX: 480,
        coorY: 440,
        type: "arrowEnd",
    },

    {
        cellid: 310,
        num: "X",
        coorX: 440,
        coorY: 440,
        type: "green",
    },

    {
        cellid: 311,
        num: "X",
        coorX: 400,
        coorY: 440,
        type: "arrow",
        teleportTo: 309,
    },

    {
        cellid: 312,
        num: "X",
        coorX: 360,
        coorY: 440,
    },

    {
        cellid: 313,
        num: "13",
        coorX: 320,
        coorY: 440,
        stopCondition: "skullBranch",
        vars: [0,3],
        shift: "down",
    },

    {
        cellid: 314,
        num: "14",
        type: "joker",
        teleportTo: "var",
        coorX: 320,
        coorY: 400,
        shift: "left",
    },

    {
        cellid: 315,
        num: "15",
        coorX: 320,
        coorY: 360,
        type: "arrow",
        teleportTo: 317,
        stopCondition: "skullBranch",
        vars: [2,3],
    },

    {
        cellid: 316,
        num: "16",
        coorX: 360,
        coorY: 360,
        type: "arrow",
        teleportTo: 320,
    },

    {
        cellid: 317,
        num: "17",
        coorX: 400,
        coorY: 360,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 318,
        num: "18",
        coorX: 440,
        coorY: 360,
        type: "green",
        shift: "up",
    },

    {
        cellid: 319,
        num: "19",
        coorX: 480,
        coorY: 360,
        shift: "up",
    },

    {
        cellid: 320,
        num: "20",
        coorX: 520,
        coorY: 360,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 321,
        num: "21",
        coorX: 560,
        coorY: 360,
        type: "orange",
    },

    {
        cellid: 322,
        num: "22",
        coorX: 600,
        coorY: 360,
        type: "speed",
        shift: "right",
    },

    {
        cellid: 323,
        num: "23",
        coorX: 600,
        coorY: 320,
        type: "arrow",
        teleportTo: 324,
    },

    {
        cellid: 324,
        num: "24",
        coorX: 600,
        coorY: 280,
        type: "arrowEnd",
        shift: "left",
    },

    {
        cellid: 325,
        num: "25",
        coorX: 600,
        coorY: 240,
        stopCondition: "branch",
        branchid: "a",
        reverseTo: 526,
        vars: [3,4,5],
        shift: "left",
    },

// branch 400

    {
        cellid: 426,
        num: "26",
        coorX: 640,
        coorY: 240,
        type: "checkpoint",
        stopCondition: "reverse",
        reverseTo: 325,
        shift: "up",
    },

    {
        cellid: 427,
        num: "27",
        coorX: 680,
        coorY: 240,
        bonus: 1000,
        shift: "right",
    },

    {
        cellid: 428,
        num: "28",
        coorX: 680,
        coorY: 280,
        type: "red",
        teleportTo: 426,
        stopCondition: "deadend",
    },

    {
        cellid: 426,
        coorX: 680,
        coorY: 320,
        type: "deadend",
    },

// branch 500

    {
        cellid: 526,
        num: "26",
        coorX: 600,
        coorY: 200,
        shift: "left",
    },

    {
        cellid: 527,
        num: "27",
        coorX: 600,
        coorY: 160,
        stopCondition: "branch",
        branchid: "b",
        reverseTo: 728,
        vars: [5,6,7],
        shift: "left",
    },

// branch 600

    {
        cellid: 628,
        num: "28",
        coorX: 640,
        coorY: 160,
        type: "black",
        stopCondition: "reverse",
        reverseTo: 527,
        shift: "up",
    },

    {
        cellid: 629,
        num: "29",
        coorX: 680,
        coorY: 160,
        type: "starOrange",
        stopCondition: "deadend",
        shift: "up",
    },

    {
        cellid: 630,
        coorX: 720,
        coorY: 160,
        type: "deadend",
    },

// branch 700

    {
        cellid: 728,
        num: "28",
        coorX: 600,
        coorY: 120,
        type: "green",
        shift: "left",
    },

    {
        cellid: 729,
        num: "29",
        coorX: 600,
        coorY: 80,
        shift: "left",
    },

    {
        cellid: 730,
        num: "30",
        coorX: 600,
        coorY: 40,
        stopCondition: "branch",
        branchid: "c",
        reverseTo: 931,
        vars: [7,8,9],
        shift: "up",
    },

// branch 800

    {
        cellid: 831,
        num: "31",
        coorX: 640,
        coorY: 40,
        type: "starRed",
        stopCondition: "reverse",
        reverseTo: 730,
        shift: "up",
    },

    {
        cellid: 832,
        num: "32",
        coorX: 680,
        coorY: 40,
        type: "arrow",
        teleportTo: 130,
        stopCondition: "deadend",
        passCP: true,
    },

    {
        cellid: 833,
        coorX: 720,
        coorY: 40,
        type: "deadend",
    },

// branch 900

    {
        cellid: 931,
        num: "31",
        coorX: 560,
        coorY: 40,
        type: "arrowEnd",
        shift: "up",
    },

    {
        cellid: 932,
        num: "32",
        coorX: 520,
        coorY: 40,
        type: "starOrange",
        shift: "up",
    },

    {
        cellid: 933,
        num: "33",
        coorX: 480,
        coorY: 40,
        type: "checkpoint",
        stopCondition: "skullBranch",
        vars: [1,9],
        shift: "up",
    },

    {
        cellid: 934,
        num: "34",
        coorX: 480,
        coorY: 80,
        type: "arrowEnd",
        shift: "right",
    },

    {
        cellid: 935,
        num: "35",
        coorX: 480,
        coorY: 120,
        type: "arrow",
        teleportTo: 931,
    },

    {
        cellid: 936,
        num: "36",
        coorX: 480,
        coorY: 160,
        shift: "right",
    },

    {
        cellid: 937,
        num: "37",
        coorX: 480,
        coorY: 200,
        type: "green",
        shift: "right",
    },

    {
        cellid: 938,
        num: "38",
        coorX: 480,
        coorY: 240,
        type: "red",
        teleportTo: 933,
    },

    {
        cellid: 939,
        coorX: 480,
        coorY: 280,
        type: "finish",
        stopCondition: "pedestal",
    },

]
