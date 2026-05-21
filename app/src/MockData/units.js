export const units = [
    {
        id: 1,
        unitName: "PC/s"
    },
    {
        id: 2,
        unitName: "BOX/s"
    },
    {
        id: 3,
        unitName: "SET/s"
    },
    {
        id: 4,
        unitName: "PACK/s"
    },
    {
        id: 5,
        unitName: "KG/s"
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
        unitName: "UNIT/s"
    },
    {
        id:10,
        unitName: "GAL/s"
    }
];

// helpers

export const getAllUnits = () => { return units }

export const getUnitById = (id) => units.find(u => u.id === id)