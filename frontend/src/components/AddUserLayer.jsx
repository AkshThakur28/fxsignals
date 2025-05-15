import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const AddUserLayer = () => {
    const navigate = useNavigate();
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile_no: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/users/users_roles');
                if (response.data && response.data.roles) {
                    setRoles(response.data.roles);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            role: selectedRole
        };

        try {
            const response = await axios.post('http://localhost:5000/admin/users/users_add', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 201) {
                navigate('/users-list');
            } else {
                setMessage('Failed to add user. Please try again.');
            }

            setMessage(response.data.message);
            setFormData({
                firstname: '',
                lastname: '',
                email: '',
                mobile_no: '',
                password: ''
            });
            setSelectedRole('');
            setImagePreviewUrl('');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred.');
            }
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                                {/* Upload Image Start */}
                                <div className="mb-24 mt-16">
                                    <div className="avatar-upload">
                                        <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept=".png, .jpg, .jpeg"
                                                hidden
                                                onChange={handleImageChange}
                                            />
                                            <label
                                                htmlFor="imageUpload"
                                                className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
                                            >
                                                <Icon icon="solar:camera-outline" className="icon" />
                                            </label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div
                                                id="imagePreview"
                                                style={{
                                                    backgroundImage: imagePreviewUrl ? `url(${imagePreviewUrl})` : '',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* Upload Image End */}

                                <form onSubmit={handleSubmit}>
                                    {/* First Name */}
                                    <div className="mb-20">
                                        <label htmlFor="firstname" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            First Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="firstname"
                                            placeholder="Enter First Name"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* Last Name */}
                                    <div className="mb-20">
                                        <label htmlFor="lastname" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Last Name <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="lastname"
                                            placeholder="Enter Last Name"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* Email */}
                                    <div className="mb-20">
                                        <label htmlFor="email" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Email <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control radius-8"
                                            id="email"
                                            placeholder="Enter email address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* Phone */}
                                    <div className="mb-20">
                                        <label htmlFor="mobile_no" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Phone <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control radius-8"
                                            id="mobile_no"
                                            placeholder="Enter phone number"
                                            value={formData.mobile_no}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* Password */}
                                    <div className="mb-20">
                                        <label htmlFor="password" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Password <span className="text-danger-600">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control radius-8"
                                            id="password"
                                            placeholder="Enter password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {/* Role Dropdown */}
                                    <div className="mb-20">
                                        <label htmlFor="role" className="form-label fw-semibold text-primary-light text-sm mb-8">
                                            Select Role <span className="text-danger-600">*</span>
                                        </label>
                                        <select
                                            className="form-control radius-8 form-select"
                                            id="role"
                                            value={selectedRole}
                                            onChange={(e) => setSelectedRole(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>{role.role_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Buttons */}
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button type="button" className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                            onClick={() => {
                                            navigate(-1);
                                                }}
                                                >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                        >
                                            Save
                                        </button>
                                    </div>

                                </form>
                                {message && (
                                    <div className="mt-3 text-center">
                                        <span>{message}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUserLayer;
