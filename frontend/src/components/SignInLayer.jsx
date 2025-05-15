import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignInLayer = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:5000/admin/auth/login",
                { email, password },
                { withCredentials: true } 
            );

            if (response.status === 200) {
                navigate("/index-2"); 
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <section className="auth bg-base d-flex flex-wrap">
            <div className="auth-left d-lg-block d-none">
                <div className="d-flex align-items-center flex-column h-100 justify-content-center">
                    <img src="admin/assets/images/auth/auth-img.png" alt="" />
                </div>
            </div>
            <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
                <div className="max-w-464-px mx-auto w-100">
                    <div>
                        <Link to="/" className="mb-40 max-w-290-px">
                            <img src="admin/assets/images/logo.png" alt="" />
                        </Link>
                        <h4 className="mb-12">Sign In to your Account</h4>
                        <p className="mb-32 text-secondary-light text-lg">
                            Welcome back! please enter your detail
                        </p>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="icon-field mb-16">
                            <span className="icon top-50 translate-middle-y">
                                <Icon icon="mage:email" />
                            </span>
                            <input
                                type="email"
                                className="form-control h-56-px bg-neutral-50 radius-12"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="position-relative mb-20">
        <div className="icon-field">
            <span className="icon top-50 translate-middle-y">
                <Icon icon="solar:lock-password-outline" />
            </span>
            <input
                type={showPassword ? "text" : "password"}
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <span
            className="cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
            onClick={() => setShowPassword(!showPassword)}
        >
            <Icon icon={showPassword ? "ri-eye-off-line" : "ri-eye-line"} />
        </span>
    </div>
                        <div className="">
                            <div className="d-flex justify-content-between gap-2">
                                <div className="form-check style-check d-flex align-items-center">
                                    <input
                                        className="form-check-input border border-neutral-300"
                                        type="checkbox"
                                        defaultValue=""
                                        id="remeber"
                                    />
                                    <label className="form-check-label" htmlFor="remeber">
                                        Remember me{" "}
                                    </label>
                                </div>
                                <Link to="#" className="text-primary-600 fw-medium">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                        >
                            {" "}
                            Sign In
                        </button>
                        <div className="mt-32 center-border-horizontal text-center">
                            <span className="bg-base z-1 px-4">Or sign in with</span>
                        </div>
                        <div className="mt-32 d-flex align-items-center gap-3">
                            <button
                                type="button"
                                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                            >
                                <Icon
                                    icon="ic:baseline-facebook"
                                    className="text-primary-600 text-xl line-height-1"
                                />
                                Google
                            </button>
                            <button
                                type="button"
                                className="fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50"
                            >
                                <Icon
                                    icon="logos:google-icon"
                                    className="text-primary-600 text-xl line-height-1"
                                />
                                Google
                            </button>
                        </div>
                        <div className="mt-32 text-center text-sm">
                            <p className="mb-0">
                                Don’t have an account?{" "}
                                <Link to="/sign-up" className="text-primary-600 fw-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}

export default SignInLayer