import React from 'react'
import { ToastContainer } from 'react-toastify';
import { LoginInfo } from '../interfaces/ticket.types';

interface Props {
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: LoginInfo;
    errorsFormData: Partial<LoginInfo>
}

const Login = ({ handleSubmit, handleChange, formData, errorsFormData }: Props) => {
    return (
        <div className="max-w-md mx-auto">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >

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
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your Password"
                    />
                    {errorsFormData['password'] ? (
                        <span className="text-red-600">{errorsFormData['password']}</span>
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

export default Login