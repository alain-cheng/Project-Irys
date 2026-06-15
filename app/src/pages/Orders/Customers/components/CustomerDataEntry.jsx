import { X } from "lucide-react"
import { useState } from "react"

/**
 * A modal form for creating a new customer data entry.
 * 
 * @returns {JSX.Element} Customer data creation form
 */
function CustomerDataEntry({ isOpen, onClose, onSuccess }) {
    if (!isOpen) return null

    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [province, setProvince] = useState("")
    const [zipCode, setZipCode] = useState(0)
    const [phone, setPhone] = useState("")
    const [fax, setFax] = useState(0)
    const [tin, setTin] = useState(0)
    const [creditLimit, setCreditLimit] = useState(0.00)
    const [salesman, setSalesman] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        // customer to be added to the db (placeholder)
        const newCustomer = {
            id: Date.now(),
            name: name,
            title: title,
            address: address,
            city: city,
            province: province,
            zipCode: parseInt(zipCode),
            phone: phone,
            fax: parseInt(fax),
            tin: parseInt(tin),
            creditLimit: parseFloat(creditLimit),
            salesman: salesman
        }
        console.log("New customer added", newCustomer)

        // after success, close modal
        onClose()
        onSuccess?.("Customer created successfully")
    }

    return(
        <div
            className="fixed flex items-center justify-center inset-0 bg-black/40 z-1000 w-full h-full"
        >
            <div
                className="flex flex-col gap-2 px-2 py-2 w-200 max-h-[80vh] overflow-hidden rounded-lg bg-background"
            >
                <div className="flex justify-between">
                    <h2 className="text-accent-strong">Add Customer</h2>

                    <button
                        className="px-1 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>

                <hr className="border-gray-200" />

                <form 
                    id="customer-form"
                    className="flex flex-col px-2 gap-3 overflow-y-auto"
                    onSubmit={handleSubmit}
                > 
                    <div className="flex flex-col">
                        <label className="font-medium">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Title
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Address
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setAddress(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            City
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setCity(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Province
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setProvince(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Zip Code
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="number"
                            placeholder="1234"
                            onChange={(e) => 
                                setZipCode(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Phone
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setPhone(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            FAX
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="number"
                            onChange={(e) => 
                                setFax(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            TIN
                        </label>
                        <span className="text-sm text-gray-500">Taxpayer Identification Number</span>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="number"
                            onChange={(e) => 
                                setTin(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Credit Limit
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="number"
                            step="any"
                            inputMode="decimal"
                            placeholder="0.00"
                            onChange={(e) => 
                                setCreditLimit(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-medium">
                            Salesman
                        </label>
                        <input
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            type="text"
                            onChange={(e) => 
                                setSalesman(e.target.value)
                            }
                        />
                    </div>
                </form>

                <hr className="border-gray-200" />

                <div className="flex px-2 py-2 justify-end gap-2">
                    <button 
                        className="px-2 py-1 border border-accent-strong rounded-lg text-accent-strong hover:bg-yellow-50 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button 
                        form="customer-form"
                        className="px-2 py-1 bg-green-400 hover:bg-green-500 text-white border rounded-lg cursor-pointer" 
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerDataEntry