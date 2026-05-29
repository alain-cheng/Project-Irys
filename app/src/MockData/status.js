export const status = [
    {
        id: 0,
        statusName: "Closed",
    },
    {
        id: 1,
        statusName: "Open",
    },
    {
        id: 2,
        statusName: "Cancelled",
    }
]

export const getAllStatuses = () => { return status }

export const getStatusById = (id) => status.find(s => s.id === id)