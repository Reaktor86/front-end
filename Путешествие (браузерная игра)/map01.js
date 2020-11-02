// параметры трассы 01

let cellMap = [

    {
        cellid: 0,
        teleportTo: 1,
        idChange: 1,
        nextStep: "start",
    },

    {
        cellid: 1,
        coorX: 200,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 2,
        coorX: 240,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 3,
        coorX: 280,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 4,
        type: "arrow",
        teleportTo: 7,
        idChange: 3,
        coorX: 320,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 5,
        type: "yellow",
        coorX: 360,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 6,
        coorX: 400,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 7,
        coorX: 440,
        coorY: 560,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 8,
        coorX: 480,
        coorY: 560,
        nextStep: "top",
        shift: "right",
    },

    {
        cellid: 9,
        coorX: 480,
        coorY: 520,
        nextStep: "top",
        shift: "right",
    },

    {
        cellid: 10,
        coorX: 480,
        coorY: 480,
        nextStep: "top",
        shift: "right",
    },

    {
        cellid: 11,
        type: "arrow",
        teleportTo: 15,
        idChange: 4,
        coorX: 480,
        coorY: 480,
        nextStep: "right",
        shift: "left",
    },

    {
        cellid: 12,
        coorX: 520,
        coorY: 440,
        nextStep: "right",
        shift: "up",
    },

    {
        cellid: 13,
        type: "yellow",
        coorX: 560,
        coorY: 440,
        nextStep: "top",
        shift: "right",
    },

    {
        cellid: 14,
        coorX: 560,
        coorY: 400,
        nextStep: "top",
        shift: "right",
    },

    {
        cellid: 15,
        type: "checkpoint",
        coorX: 560,
        coorY: 360,
        nextStep: "top",
        shift: "right",
    },

    {
        cellid: 16,
        coorX: 560,
        coorY: 320,
        nextStep: "top",
        shift: "left",
    },

    {
        cellid: 17,
        type: "green",
        coorX: 260,
        coorY: 280,
        nextStep: "top",
        shift: "left",
    },

    {
        cellid: 18,
        type: "arrow",
        teleportTo: 16,
        idChange: -2,
        coorX: 560,
        coorY: 280,
        nextStep: "top",
        shift: "left",
    },

    {
        cellid: 19,
        type: "arrow",
        teleportTo: 21,
        idChange: 2,
        coorX: 560,
        coorY: 200,
        nextStep: "top",
        shift: "left",
    },

    {
        cellid: 20,
        coorX: 560,
        coorY: 160,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 21,
        coorX: 520,
        coorY: 160,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 22,
        type: "yellow",
        coorX: 480,
        coorY: 160,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 23,
        coorX: 440,
        coorY: 160,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 24,
        type: "arrow",
        teleportTo: 27,
        idChange: 3,
        coorX: 400,
        coorY: 160,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 25,
        type: "red",
        teleportTo: 15,
        idChange: -10,
        coorX: 360,
        coorY: 160,
        nextStep: "down",
        shift: "up",
    },

    {
        cellid: 26,
        type: "yellow",
        coorX: 360,
        coorY: 200,
        nextStep: "left",
        shift: "down",
    },

    {
        cellid: 27,
        coorX: 320,
        coorY: 200,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 28,
        coorX: 280,
        coorY: 200,
        nextStep: "down",
        shift: "up",
    },

    {
        cellid: 29,
        coorX: 280,
        coorY: 240,
        nextStep: "left",
        shift: "down",
    },

    {
        cellid: 30,
        coorX: 240,
        coorY: 240,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 31,
        coorX: 200,
        coorY: 240,
        nextStep: "left",
        shift: "up",
    },

    {
        cellid: 32,
        type: "green",
        coorX: 160,
        coorY: 240,
        nextStep: "down",
        shift: "up",
    },

    {
        cellid: 33,
        coorX: 160,
        coorY: 240,
        nextStep: "down",
        shift: "left",
    },

    {
        cellid: 34,
        type: "arrow",
        teleportTo: 31,
        idChange: -3,
        coorX: 360,
        coorY: 320,
        nextStep: "down",
        shift: "left",
    },

    {
        cellid: 35,
        type: "finish",
        coorX: 160,
        coorY: 360,
        nextStep: "pedestal",
    },

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
]







