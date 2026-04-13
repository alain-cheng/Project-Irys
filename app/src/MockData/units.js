export const units = [
    {
        id: 1,
        unitName: "pc/pcs"
    },
    {
        id: 2,
        unitName: "box/boxes"
    },
    {
        id: 3,
        unitName: "set/sets"
    },
    {
        id: 4,
        unitName: "pack/packs"
    },
    {
        id: 5,
        unitName: "kg/kgs"
    },
    {
        id: 6,
        unitName: "g/g"
    },
    {
        id: 7,
        unitName: "L/L"
    },
    {
        id: 8,
        unitName: "mL/mL"
    },
    {
        id: 9,
        unitName: "unit/units"
    }
];

// helpers

export const getUnitById = (id) => units.find(u => u.id === id)