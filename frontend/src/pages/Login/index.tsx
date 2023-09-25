import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LoginInfo = {
    name: string;
    email: string;
}

function AdminLogin() {
    const [formData, setFormData] = useState<LoginInfo>({
        name: '',
        email: '',
    });

    const [errorsFormData, setErrorsFormData] = useState<Partial<LoginInfo>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const errors: Partial<LoginInfo> = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
        ) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the form
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrorsFormData(validationErrors);
            return;
        }

        // Clear any previous errors
        setErrorsFormData({});

        // Submit the form or perform authentication
        // (Add your logic here)
    };

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
                    />
                    {errorsFormData['name'] ? (
                        <span className="text-red-600">{errorsFormData['name']}</span>
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
                    />
                    {errorsFormData['email'] ? (
                        <span className="text-red-600">{errorsFormData['email']}</span>
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
    );
}

export default AdminLogin;
