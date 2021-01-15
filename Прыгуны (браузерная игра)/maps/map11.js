// параметры трассы 11

const Map11param = {

    mapName: "Трасса 11: Пила",
    prize1: 2500,
    prize2: 1500,
    prize3: 800,
    prize4: 500,
    branchA: true,
    branchA1X: 121,
    branchA1Y: 168,
    branchA1ROTATE: "rotate(90deg)",
    branchA2X: 50,
    branchA2Y: 239,
    branchA2ROTATE: "rotate(180deg)",
    branchB: true,
    branchB1X: 120,
    branchB1Y: 351,
    branchB1ROTATE: "rotate(90deg)",
    branchB2X: 50,
    branchB2Y: 360,
    branchB2ROTATE: "rotate(180deg)",
    branchC: true,
    branchC1X: 120,
    branchC1Y: 409,
    branchC1ROTATE: "rotate(90deg)",
    branchC2X: 50,
    branchC2Y: 479,
    branchC2ROTATE: "rotate(180deg)",
    branchD: true,
    branchD1X: 121,
    branchD1Y: 528,
    branchD1ROTATE: "rotate(90deg)",
    branchD2X: 50,
    branchD2Y: 600,
    branchD2ROTATE: "rotate(180deg)",
    branchE: true,
    branchE1X: 449,
    branchE1Y: 641,
    branchE1ROTATE: "none",
    branchE2X: 520,
    branchE2Y: 648,
    branchE2ROTATE: "rotate(90deg)",
    branchF: true,
    branchF1X: 600,
    branchF1Y: 472,
    branchF1ROTATE: "rotate(-90deg)",
    branchF2X: 671,
    branchF2Y: 441,
    branchF2ROTATE: "none",
    branchG: true,
    branchG1X: 600,
    branchG1Y: 351,
    branchG1ROTATE: "rotate(-90deg)",
    branchG2X: 671,
    branchG2Y: 281,
    branchG2ROTATE: "none",
    branchH: true,
    branchH1X: 600,
    branchH1Y: 231,
    branchH1ROTATE: "rotate(-90deg)",
    branchH2X: 671,
    branchH2Y: 160,
    branchH2ROTATE: "none",
    arrowsX: 49,
    arrowsY: 82,
    arrowsUrl: "img/arrows/arrows11.svg",
    prizeX: 20,
    prizeY: 20,
    cpId: [613,1033,1440],
    badId: [105,205,206,511,611,719,819,928,1028,1032,1036,1341,1441,1648,1650,1652], // 105 928 добавлены
    goodId: [1,309,308,410,513,814,817,717,821,930,932,1237,1340,1643,1644], // 1644 добавлена, 512 перемещена в bon, звезда 513 добавлена
    unwId: [409,718,929,1029,1034,1138,1544,1649,1653],
    bonId: [408,512,1030,1139], // звёзды 1543 и 513 удалены, бонус 1340 перенесен в goodId
    jumpId: [207,612,820,1645,1646,1647],
    brId: [4,207,410,613,826,1033,1236,1439,1642],
    deadBr: [1,3,5,11,13,15],

    pedestalX: 709,
    pedestalY: 185,
    pedestalCoords: [
        {
            cellid: "fin1",
            coorX: 760,
            coorY: 152,
        },

        {
            cellid: "fin2",
            coorX: 712,
            coorY: 164,
        },

        {
            cellid: "fin3",
            coorX: 811,
            coorY: 172,
        },

        {
            cellid: "fin4",
            coorX: 811,
            coorY: 259,
        },
    ],
}

// BRANCH stepsToFin брать только минимальное значение!!!

let Map11 = [

    {
        cellid: 0,
        num: "I",
        type: "start",
        busy: true,
        coorX: 80,
        coorY: 40,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 51,
    },

    {
        cellid: 0,
        num: "II",
        type: "start",
        busy: true,
        coorX: 120,
        coorY: 40,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 51,
    },

    {
        cellid: 0,
        num: "III",
        type: "start",
        busy: true,
        coorX: 160,
        coorY: 40,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 51,
    },

    {
        cellid: 0,
        num: "IV",
        type: "start",
        busy: true,
        coorX: 200,
        coorY: 40,
        stopCondition: "start",
        teleportTo: 1,
        stepsToFin: 51,
    },

// branch A - 100

    {
        cellid: 1,
        num: "1",
        coorX: 80,
        coorY: 80,
        type: "yellow",
        stepsToFin: 50,
        zone: true,
    },

    {
        cellid: 2,
        num: "2",
        coorX: 80,
        coorY: 120,
        type: "arrowEnd",
        shift: "right",
        stepsToFin: 49,
        zone: true,
        setReverse: "false",
    },

    {
        cellid: 3,
        num: "3",
        coorX: 80,
        coorY: 160,
        shift: "left",
        stepsToFin: 48,
        zone: true,
    },

    {
        cellid: 4,
        num: "4",
        coorX: 80,
        coorY: 200,
        type: "arrow",
        teleportTo: 2,
        stopCondition: "branch",
        branchid: "a",
        branch1Type: "unwanted", // 100 вправо, тупик
        branch2Type: "regular", // 200 вниз
        reverseTo: 205,
        stepsToFin: 47,
        zone: true,
    },

// branch A - unwanted 100

    {
        cellid: 105,
        num: "5",
        coorX: 120,
        coorY: 200,
        reverseTo: 4,
        stopCondition: "reverse",
        shift: "up",
        stepsToFin: 48,
        zone: true,
    },

    {
        cellid: 106,
        num: "6",
        coorX: 160,
        coorY: 200,
        type: "arrowEnd",
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 49,
        zone: true,
        setReverse: "true",
    },

    {
        cellid: 107,
        coorX: 200,
        coorY: 200,
        type: "deadend",
    },

// branch A - regular 200

    {
        cellid: 205,
        num: "5",
        coorX: 80,
        coorY: 240,
        type: "black",
        shift: "left",
        stepsToFin: 46,
        zone: true,
    },

    {
        cellid: 206,
        num: "6",
        coorX: 80,
        coorY: 280,
        type: "red",
        teleportTo: 0,
        stepsToFin: 45,
        zone: true,
    },

    {
        cellid: 207,
        num: "7",
        coorX: 80,
        coorY: 320,
        stopCondition: "branch",
        branchid: "b",
        branch1Type: "unwanted", // 300 вправо, тупик
        branch2Type: "regular", // 400 вниз
        reverseTo: 408,
        shift: "left",
        stepsToFin: 44,
        zone: true,
    },

// branch B - 300

    {
        cellid: 308,
        num: "8",
        coorX: 120,
        coorY: 320,
        type: "arrow",
        teleportTo: "b1",
        reverseTo: 207,
        stopCondition: "reverse",
        stepsToFin: 45,
        zone: true,
    },

    {
        cellid: 309,
        num: "9",
        coorX: 160,
        coorY: 320,
        type: "yellow",
        stopCondition: "deadend",
        stepsToFin: 46,
        zone: true,
    },

    {
        cellid: 310,
        coorX: 200,
        coorY: 320,
        type: "deadend",
    },

// branch B - 400

    {
        cellid: 408,
        num: "8",
        coorX: 80,
        coorY: 360,
        bonus: 80,
        shift: "left",
        stepsToFin: 43,
        zone: true,
    },

    {
        cellid: 409,
        num: "9",
        coorX: 80,
        coorY: 400,
        type: "green",
        shift: "left",
        stepsToFin: 42,
        zone: true,
    },

    {
        cellid: 410,
        num: "10",
        coorX: 80,
        coorY: 440,
        type: "arrow",
        teleportTo: 612,
        stopCondition: "branch",
        branchid: "c",
        branch1Type: "unwanted", // 500 вправо, тупик
        branch2Type: "regular", // 600 вниз
        reverseTo: 611,
        stepsToFin: 41,
        zone: true,
    },

// branch C - unwanted 500

    {
        cellid: 511,
        num: "11",
        coorX: 120,
        coorY: 440,
        type: "red",
        teleportTo: 0,
        reverseTo: 410,
        stopCondition: "reverse",
        stepsToFin: 42,
        zone: true,
    },

    {
        cellid: 512,
        num: "12",
        coorX: 160,
        coorY: 440,
        type: "arrow",
        teleportTo: 715,
        passCP: true,
        stepsToFin: 43,
        zone: true,
    },

    {
        cellid: 513,
        num: "13",
        coorX: 200,
        coorY: 440,
        type: "starOrange",
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 44,
        zone: true,
    },

    {
        cellid: 514,
        coorX: 240,
        coorY: 440,
        type: "deadend",
    },

// branch C - regular 600

    {
        cellid: 611,
        num: "11",
        coorX: 80,
        coorY: 480,
        type: "black",
        shift: "left",
        stepsToFin: 40,
        zone: true,
    },

    {
        cellid: 612,
        num: "12",
        coorX: 80,
        coorY: 520,
        type: "arrowEnd",
        shift: "left",
        stepsToFin: 39,
        zone: true,
        setReverse: "false",
    },

    {
        cellid: 613,
        num: "13",
        coorX: 80,
        coorY: 560,
        type: "checkpoint",
        stopCondition: "branch",
        branchid: "d",
        branch1Type: "regular", // 700 вправо
        branch2Type: "risky", // 800 вниз
        shift: "left",
        stepsToFin: 38,
    },

// branch D - regular 700

    {
        cellid: 714,
        num: "14",
        coorX: 120,
        coorY: 560,
        shift: "up",
        stepsToFin: 37,
    },

    {
        cellid: 715,
        num: "15",
        coorX: 160,
        coorY: 560,
        type: "arrowEnd",
        shift: "down",
        stepsToFin: 36,
        setReverse: "false",
    },

    {
        cellid: 716,
        num: "16",
        coorX: 200,
        coorY: 560,
        shift: "up",
        stepsToFin: 35,
    },

    {
        cellid: 717,
        num: "17",
        coorX: 240,
        coorY: 560,
        type: "arrow",
        teleportTo: 823,
        stepsToFin: 34,
    },

    {
        cellid: 718,
        num: "18",
        coorX: 240,
        coorY: 600,
        type: "green",
        shift: "right",
        stepsToFin: 33,
    },

    {
        cellid: 719,
        num: "19",
        coorX: 240,
        coorY: 640,
        type: "black",
        stopCondition: "join",
        joinTo: 820,
        shift: "right",
        stepsToFin: 32,
    },

// branch D - risky 800

    {
        cellid: 814,
        num: "14",
        coorX: 80,
        coorY: 600,
        type: "arrow",
        teleportTo: 818,
        stepsToFin: 37,
    },

    {
        cellid: 815,
        num: "15",
        coorX: 80,
        coorY: 640,
        shift: "left",
        stepsToFin: 36,
    },

    {
        cellid: 816,
        num: "16",
        coorX: 80,
        coorY: 680,
        type: "joker",
        teleportTo: 613,
        shift: "left",
        stepsToFin: 35,
    },

    {
        cellid: 817,
        num: "17",
        coorX: 120,
        coorY: 680,
        bonus: 100,
        shift: "up",
        stepsToFin: 34,
    },

    {
        cellid: 818,
        num: "18",
        coorX: 160,
        coorY: 680,
        type: "arrowEnd",
        shift: "up",
        stepsToFin: 33,
    },

    {
        cellid: 819,
        num: "19",
        coorX: 200,
        coorY: 680,
        type: "red",
        teleportTo: 613,
        stepsToFin: 32,
    },

    {
        cellid: 820,
        num: "20",
        coorX: 240,
        coorY: 680,
        type: "yellow",
        stepsToFin: 31,
    },

    {
        cellid: 821,
        num: "21",
        coorX: 280,
        coorY: 680,
        shift: "down",
        stepsToFin: 30,
    },

    {
        cellid: 822,
        num: "22",
        coorX: 320,
        coorY: 680,
        type: "hatched",
        shift: "up",
        stepsToFin: 29,
    },

    {
        cellid: 823,
        num: "23",
        coorX: 360,
        coorY: 680,
        type: "hatched",
        shift: "down",
        stepsToFin: 28,
    },

    {
        cellid: 824,
        num: "24",
        coorX: 400,
        coorY: 680,
        type: "hatched",
        shift: "up",
        stepsToFin: 27,
    },

    {
        cellid: 825,
        num: "25",
        coorX: 440,
        coorY: 680,
        type: "hatched",
        shift: "down",
        stepsToFin: 26,
    },

    {
        cellid: 826,
        num: "26",
        coorX: 480,
        coorY: 680,
        stopCondition: "branch",
        branchid: "e",
        branch1Type: "regular", // 900 вверх
        branch2Type: "regular", // 1000 вправо
        shift: "up",
        stepsToFin: 25,
    },

// branch E - 900

    {
        cellid: 927,
        num: "27",
        coorX: 480,
        coorY: 640,
        shift: "left",
        stepsToFin: 24,
    },

    {
        cellid: 928,
        num: "28",
        coorX: 480,
        coorY: 600,
        bonus: -150,
        shift: "left",
        stepsToFin: 23,
    },

    {
        cellid: 929,
        num: "29",
        coorX: 480,
        coorY: 560,
        type: "arrow",
        teleportTo: 823,
        stepsToFin: 22,
    },

    {
        cellid: 930,
        num: "30",
        coorX: 520,
        coorY: 560,
        type: "orange",
        stepsToFin: 21,
    },

    {
        cellid: 931,
        num: "31",
        coorX: 560,
        coorY: 560,
        type: "hatched",
        shift: "down",
        stepsToFin: 20,
        setReverse: "false",
    },

    {
        cellid: 932,
        num: "32",
        coorX: 600,
        coorY: 560,
        bonus: 100,
        stopCondition: "join",
        joinTo: 1033,
        shift: "up",
        stepsToFin: 19,
    },

// branch E - 1000

    {
        cellid: 1027,
        num: "27",
        coorX: 520,
        coorY: 680,
        shift: "up",
        stepsToFin: 24,
    },

    {
        cellid: 1028,
        num: "28",
        coorX: 560,
        coorY: 680,
        type: "black",
        shift: "up",
        stepsToFin: 23,
    },

    {
        cellid: 1029,
        num: "29",
        coorX: 600,
        coorY: 680,
        type: "green",
        shift: "up",
        stepsToFin: 22,
    },

    {
        cellid: 1030,
        num: "30",
        coorX: 640,
        coorY: 680,
        type: "speed",
        shift: "right",
        stepsToFin: 21,
    },

    {
        cellid: 1031,
        num: "31",
        coorX: 640,
        coorY: 640,
        shift: "right",
        stepsToFin: 20,
    },

    {
        cellid: 1032,
        num: "32",
        coorX: 640,
        coorY: 600,
        type: "red",
        teleportTo: 613,
        stepsToFin: 19,
    },

    {
        cellid: 1033,
        num: "33",
        coorX: 640,
        coorY: 560,
        type: "checkpoint",
        shift: "right",
        stepsToFin: 18,
    },

    {
        cellid: 1034,
        num: "34",
        coorX: 640,
        coorY: 520,
        bonus: -100,
        shift: "right",
        stepsToFin: 17,
    },

    {
        cellid: 1035,
        num: "35",
        coorX: 640,
        coorY: 480,
        type: "hatched",
        shift: "right",
        stepsToFin: 16,
    },

    {
        cellid: 1036,
        num: "36",
        coorX: 640,
        coorY: 440,
        type: "black",
        stopCondition: "branch",
        branchid: "f",
        branch1Type: "regular", // 1100 влево, копилка
        branch2Type: "regular", // 1200 вверх
        reverseTo: 1237,
        shift: "right",
        stepsToFin: 15,
    },

// branch F - 1100

    {
        cellid: 1137,
        num: "37",
        coorX: 600,
        coorY: 440,
        type: "hatched",
        reverseTo: 1036,
        stopCondition: "reverse",
        shift: "down",
        stepsToFin: 16,
    },

    {
        cellid: 1138,
        num: "38",
        coorX: 560,
        coorY: 440,
        type: "arrow",
        teleportTo: 931,
        stepsToFin: 17,
    },

    {
        cellid: 1139,
        num: "39",
        coorX: 520,
        coorY: 440,
        type: "moneybag",
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 18,
    },

    {
        cellid: 1140,
        coorX: 480,
        coorY: 440,
        type: "deadend",
    },

// branch F - 1200

    {
        cellid: 1237,
        num: "37",
        coorX: 640,
        coorY: 400,
        type: "yellow",
        stepsToFin: 14,
    },

    {
        cellid: 1238,
        num: "38",
        coorX: 640,
        coorY: 360,
        shift: "right",
        stepsToFin: 13,
    },

    {
        cellid: 1239,
        num: "39",
        coorX: 640,
        coorY: 320,
        stopCondition: "branch",
        branchid: "g",
        branch1Type: "risky", // 1300 влево
        branch2Type: "regular", // 1400 вверх
        reverseTo: 1440,
        shift: "right",
        stepsToFin: 12,
    },

// branch G - risky 1300

    {
        cellid: 1340,
        num: "40",
        coorX: 600,
        coorY: 320,
        bonus: 300,
        reverseTo: 1239,
        stopCondition: "reverse",
        shift: "up",
        stepsToFin: 13,
    },

    {
        cellid: 1341,
        num: "41",
        coorX: 560,
        coorY: 320,
        type: "red",
        teleportTo: 1033,
        stopCondition: "deadend",
        stepsToFin: 14,
    },

    {
        cellid: 1342,
        coorX: 520,
        coorY: 320,
        type: "deadend",
    },

// branch G - regular 1400

    {
        cellid: 1440,
        num: "40",
        coorX: 640,
        coorY: 280,
        type: "checkpoint",
        shift: "right",
        stepsToFin: 11,
    },

    {
        cellid: 1441,
        num: "41",
        coorX: 640,
        coorY: 240,
        type: "black",
        type2: "arrow",
        teleportTo: 1237,
        stepsToFin: 10,
    },

    {
        cellid: 1442,
        num: "42",
        coorX: 640,
        coorY: 200,
        type: "hatched",
        stopCondition: "branch",
        branchid: "h",
        branch1Type: "unwanted", // 1500 влево
        branch2Type: "regular", // 1600 вверх
        reverseTo: 1643,
        shift: "right",
        stepsToFin: 9,
    },

// branch H - unwanted 1500

    {
        cellid: 1543,
        num: "43",
        coorX: 600,
        coorY: 200,
        type: "starRed",
        reverseTo: 1442,
        stopCondition: "reverse",
        shift: "up",
        stepsToFin: 10,
    },

    {
        cellid: 1544,
        num: "44",
        coorX: 560,
        coorY: 200,
        bonus: -150,
        stopCondition: "deadend",
        shift: "up",
        stepsToFin: 11,
    },

    {
        cellid: 1545,
        coorX: 520,
        coorY: 200,
        type: "deadend",
    },

// branch H - regular 1600

    {
        cellid: 1643,
        num: "43",
        coorX: 640,
        coorY: 160,
        type: "yellow",
        stepsToFin: 8,
    },

    {
        cellid: 1644,
        num: "44",
        coorX: 640,
        coorY: 120,
        type: "joker",
        teleportTo: 1440,
        shift: "right",
        stepsToFin: 7,
    },

    {
        cellid: 1645,
        num: "45",
        coorX: 640,
        coorY: 80,
        type: "hatched",
        shift: "right",
        stepsToFin: 6,
    },

    {
        cellid: 1646,
        num: "46",
        coorX: 640,
        coorY: 40,
        type: "hatched",
        shift: "right",
        stepsToFin: 5,
    },

    {
        cellid: 1647,
        num: "47",
        coorX: 600,
        coorY: 40,
        type: "hatched",
        shift: "down",
        stepsToFin: 4,
    },

    {
        cellid: 1648,
        num: "48",
        coorX: 560,
        coorY: 40,
        type: "black",
        type2: "arrow",
        teleportTo: 1644,
        stepsToFin: 3,
    },

    {
        cellid: 1649,
        num: "49",
        coorX: 520,
        coorY: 40,
        type: "green",
        shift: "down",
        stepsToFin: 2,
    },

    {
        cellid: 1650,
        num: "50",
        coorX: 480,
        coorY: 40,
        type: "red",
        teleportTo: 1440,
        stepsToFin: 1,
    },

    {
        cellid: 1651,
        coorX: 440,
        coorY: 40,
        type: "finish",
    },

    {
        cellid: 1652,
        num: "52",
        coorX: 400,
        coorY: 40,
        type: "red",
        teleportTo: 1440,
        stepsToFin: 29,
    },

    {
        cellid: 1653,
        num: "53",
        coorX: 360,
        coorY: 40,
        type: "arrow",
        teleportTo: "b2",
        stopCondition: "deadend",
        stepsToFin: 28,
    },

    {
        cellid: 1654,
        coorX: 320,
        coorY: 40,
        type: "deadend",
    },

    {
        cellid: "b1",
        coorX: 220,
        coorY: 260,
        type: "arrowNode",
        dir1: [1,2,3,4],
        dir2: [5,6],
        tele1: 106,
        tele2: 1341,
        dir1type: "regular",
        dir2type: "tasty",
    },

    {
        cellid: "b2",
        coorX: 360,
        coorY: 160,
        type: "arrowNode",
        dir1: [1,2,3,4],
        dir2: [5,6],
        tele1: "b3",
        tele2: 1650,
        dir1type: "regular",
        dir2type: "regular",
    },

    {
        cellid: "b3",
        coorX: 360,
        coorY: 360,
        type: "arrowNode",
        dir1: [1,2,3],
        dir2: [4,5,6],
        tele1: 823,
        tele2: 1237,
        dir1type: "regular",
        dir2type: "regular",
    },
]
