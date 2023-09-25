import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { LoginInfo } from '../../interfaces/ticket.types';
import { showLoading, showSuccessToast, url } from '../../helpers';
import { login } from '../../services/createTask.service';
import { toast } from "react-toastify";
import Login from '../../component/Login';

function AdminLogin() {
    const [formData, setFormData] = useState<LoginInfo>({
        email: '',
        password: ''
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

        if (!formData.password.trim()) {
            errors.password = 'password is required';
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
        showLoading("Processing");
        login(`${url}/user/user-login`, formData)
            .then((res) => {
                if (res.status == 200) {
                    showSuccessToast("Login successfully");
                    setFormData({
                        password: "",
                        email: "",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("something went wrong")
            });

    };

    return (
        <Login handleChange={handleChange} formData={formData} errorsFormData={errorsFormData} handleSubmit={handleSubmit} />
    );
}

export default AdminLogin;
