import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from "react-router-dom";

const InputField = ({ id, label, type, value, onChange }) => (
    <div className="mb-20">
        <label htmlFor={id} className="form-label fw-semibold text-primary-light text-sm mb-8">
            {label} <span className="text-danger-600">*</span>
        </label>
        <input
            type={type}
            className="form-control radius-8"
            id={id}
            placeholder={`Enter ${label}`}
            value={value}
            onChange={onChange}
            required
        />
    </div>
);

const SelectField = ({ id, label, options, value, onChange }) => (
    <div className="mb-20">
        <label htmlFor={id} className="form-label fw-semibold text-primary-light text-sm mb-8">
            {label} <span className="text-danger-600">*</span>
        </label>
        <select
            className="form-control radius-8 form-select"
            id={id}
            value={value}
            onChange={onChange}
            required
        >
            <option value="" disabled>Select {label}</option>
            {options.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.role_name}</option>
            ))}
        </select>
    </div>
);

const AvatarUpload = ({ onImageChange, imagePreviewUrl }) => (
    <div className="mb-24 mt-16">
        <div className="avatar-upload">
            <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
                <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={onImageChange}
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
);

const UserEditLayer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state?.userId;
    useEffect(() => {
        if (!id) {
            navigate("/users-list");
            return;
        }
    }, [id, navigate]);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobile_no: '',
    });
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [rolesRes, userRes] = await Promise.all([
                    axios.get('http://localhost:5000/admin/users/users_roles'),
                    axios.get(`http://localhost:5000/admin/users/user/${id}`)
                ]);

                if (rolesRes.data?.roles) setRoles(rolesRes.data.roles);
                if (userRes.data?.user) {
                    const user = userRes.data.user;
                    setFormData({
                        firstname: user.firstname || '',
                        lastname: user.lastname || '',
                        email: user.email || '',
                        mobile_no: user.mobile_no || '',
                    });
                    setSelectedRole(user.role?.toString() || '');
                }
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreviewUrl(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { id, ...formData, role: selectedRole };

        try {
            const response = await axios.put('http://localhost:5000/admin/users/users_edit', payload);
            if (response.status === 200) {
                navigate('/users-list');
            } else {
                setMessage('Failed to update user. Please try again.');
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
            setMessage(errMsg);
            console.error('Error during update:', errMsg);
        }
    };

    if (loading) return <div className="text-center mt-4">Loading...</div>;

    const { firstname, lastname, email, mobile_no } = formData;

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-body p-24">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-xl-8 col-lg-10">
                        <div className="card border">
                            <div className="card-body">
                                <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
                                <AvatarUpload onImageChange={handleImageChange} imagePreviewUrl={imagePreviewUrl} />

                                <form onSubmit={handleSubmit}>
                                    <InputField id="firstname" label="First Name" type="text" value={firstname} onChange={handleChange} />
                                    <InputField id="lastname" label="Last Name" type="text" value={lastname} onChange={handleChange} />
                                    <InputField id="email" label="Email" type="email" value={email} onChange={handleChange} />
                                    <InputField id="mobile_no" label="Phone" type="text" value={mobile_no} onChange={handleChange} />
                                    <SelectField id="role" label="Role" options={roles} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} />

                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <button
                                            type="button"
                                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                            onClick={() => navigate(-1)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>

                                {message && (
                                    <div className="mt-3 text-center text-danger">
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

export default UserEditLayer;
