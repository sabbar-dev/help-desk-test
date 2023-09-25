import { ToastContainer } from "react-toastify"
import { FormData } from "../interfaces/ticket.types"

interface Props {
    formData: FormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    errorsFormData: Partial<FormData>;
}

const CreateTicket = ({ formData, handleChange, handleSubmit, errorsFormData }: Props) => {
    return (
        <div className="max-w-md mx-auto">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your Name"
                    // required
                    />
                    {"name" in errorsFormData ? (
                        <span className="text-red-600">{errorsFormData["name"]}</span>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your Email"
                    // required
                    />
                    {"email" in errorsFormData ? (
                        <span className="text-red-600">{errorsFormData["email"]}</span>
                    ) : null}
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="description"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                        placeholder="Describe your issue..."
                    // required
                    />
                    {"description" in errorsFormData ? (
                        <span className="text-red-600">
                            {errorsFormData["description"]}
                        </span>
                    ) : null}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateTicket