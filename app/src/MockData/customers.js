export const customers = [
    {
        id: 1000,
        name: "Alpha Beta",
        title: "",
        address: "",
        city: "Manila",
        province: "NCR",
        zipCode: 1234,
        phone: "00123456789",
        fax: 12345,
        tin: 123456,
        creditLimit: 100.45,
        salesman: ""
    },
    {
        id: 1001,
        name: "Gamma Corp",
        title: "Mr.",
        address: "123 Rizal St.",
        city: "Quezon City",
        province: "NCR",
        zipCode: 1100,
        phone: "09171234567",
        fax: 22334,
        tin: 223456,
        creditLimit: 250.00,
        salesman: "John Doe"
    },
    {
        id: 1002,
        name: "Delta Trading",
        title: "",
        address: "45 Mabini Ave.",
        city: "Pasig",
        province: "NCR",
        zipCode: 1600,
        phone: "09981234567",
        fax: 32345,
        tin: 323456,
        creditLimit: 500.75,
        salesman: ""
    },
    {
        id: 1003,
        name: "Epsilon Goods",
        title: "Ms.",
        address: "",
        city: "Makati",
        province: "NCR",
        zipCode: 1200,
        phone: "09271234567",
        fax: 42345,
        tin: 423456,
        creditLimit: 150.00,
        salesman: "Jane Smith"
    },
    {
        id: 1004,
        name: "Zeta Supplies",
        title: "",
        address: "78 Bonifacio Blvd.",
        city: "Taguig",
        province: "NCR",
        zipCode: 1630,
        phone: "09391234567",
        fax: 52345,
        tin: 523456,
        creditLimit: 320.90,
        salesman: ""
    },
    {
        id: 1005,
        name: "Eta Enterprises",
        title: "Mr.",
        address: "9 Luna St.",
        city: "Caloocan",
        province: "NCR",
        zipCode: 1400,
        phone: "09451234567",
        fax: 62345,
        tin: 623456,
        creditLimit: 275.60,
        salesman: "Mark Lee"
    },
    {
        id: 1006,
        name: "Theta Retail",
        title: "",
        address: "",
        city: "Pasay",
        province: "NCR",
        zipCode: 1300,
        phone: "09561234567",
        fax: 72345,
        tin: 723456,
        creditLimit: 410.20,
        salesman: ""
    },
    {
        id: 1007,
        name: "Iota Merchants",
        title: "Mrs.",
        address: "12 Del Pilar St.",
        city: "San Juan",
        province: "NCR",
        zipCode: 1500,
        phone: "09671234567",
        fax: 82345,
        tin: 823456,
        creditLimit: 190.00,
        salesman: "Anna Cruz"
    },
    {
        id: 1008,
        name: "Kappa Logistics",
        title: "",
        address: "88 Aurora Blvd.",
        city: "Marikina",
        province: "NCR",
        zipCode: 1800,
        phone: "09781234567",
        fax: 92345,
        tin: 923456,
        creditLimit: 600.00,
        salesman: ""
    },
    {
        id: 1009,
        name: "Lambda Services",
        title: "Mr.",
        address: "",
        city: "Las Piñas",
        province: "NCR",
        zipCode: 1740,
        phone: "09891234567",
        fax: 10234,
        tin: 1023456,
        creditLimit: 350.50,
        salesman: "Carlos Reyes"
    }
];

// helper functions

/**
 * Gets all existing customers.
 * 
 * @returns customers
 */
export const getAllCustomers = () => { return customers }

/**
 * Gets a customer record given their id.
 * 
 * @param {*} id 
 * @returns a customer if it exists
 */
export const getCustomerById = (id) => customers.find(c => c.id === id)