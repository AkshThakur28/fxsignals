import React from 'react'

const WizardWithBesideLabel = () => {
    return (
        <div className="col-md-6">
            <div className="card">
                <div className="card-body">
                    <h6 className="mb-4 text-xl">Wizard with beside label</h6>
                    <p className="text-neutral-500">
                        Fill up your details and proceed next steps.
                    </p>
                    {/* Form Wizard Start */}
                    <div className="form-wizard">
                        <form action="#" method="post">
                            <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                                <ul className="list-unstyled form-wizard-list style-three">
                                    <li className="form-wizard-list__item d-flex align-items-center gap-8 active">
                                        <div className="form-wizard-list__line">
                                            <span className="count">1</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">
                                            Order Details{" "}
                                        </span>
                                    </li>
                                    <li className="form-wizard-list__item d-flex align-items-center gap-8">
                                        <div className="form-wizard-list__line">
                                            <span className="count">2</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Manufactures</span>
                                    </li>
                                    <li className="form-wizard-list__item d-flex align-items-center gap-8">
                                        <div className="form-wizard-list__line">
                                            <span className="count">3</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Order Plan</span>
                                    </li>
                                    <li className="form-wizard-list__item d-flex align-items-center gap-8">
                                        <div className="form-wizard-list__line">
                                            <span className="count">4</span>
                                        </div>
                                        <span className="text text-xs fw-semibold">Completed</span>
                                    </li>
                                </ul>
                            </div>
                            <fieldset className="wizard-fieldset show">
                                <h6 className="text-md text-neutral-500">Personal Information</h6>
                                <div className="row gy-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">First Name*</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control wizard-required"
                                                placeholder="Enter First Name"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Last Name*</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control wizard-required"
                                                placeholder="Enter Last Name"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email*</label>
                                        <div className="position-relative">
                                            <input
                                                type="email"
                                                className="form-control wizard-required"
                                                placeholder="Enter Email"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Password*</label>
                                        <div className="position-relative">
                                            <input
                                                type="password"
                                                className="form-control wizard-required"
                                                placeholder="Enter Password"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Confirm Password*</label>
                                        <div className="position-relative">
                                            <input
                                                type="password"
                                                className="form-control wizard-required"
                                                placeholder="Enter Confirm Password"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="form-group text-end">
                                        <button
                                            type="button"
                                            className="form-wizard-next-btn btn btn-primary-600 px-32"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="wizard-fieldset">
                                <h6 className="text-md text-neutral-500">Account Information</h6>
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">User Name*</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control wizard-required"
                                                placeholder="Enter User Name"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label className="form-label">Card Number*</label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                className="form-control wizard-required"
                                                placeholder="Enter Card Number "
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label className="form-label">Card Expiration(MM/YY)*</label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                className="form-control wizard-required"
                                                placeholder="Enter Card Expiration"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label className="form-label">CVV Number*</label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                className="form-control wizard-required"
                                                placeholder="CVV Number"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Password*</label>
                                        <div className="position-relative">
                                            <input
                                                type="password"
                                                className="form-control wizard-required"
                                                placeholder="Enter Password"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8">
                                        <button
                                            type="button"
                                            className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            className="form-wizard-next-btn btn btn-primary-600 px-32"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="wizard-fieldset">
                                <h6 className="text-md text-neutral-500">Bank Information</h6>
                                <div className="row gy-3">
                                    <div className="col-sm-6">
                                        <label className="form-label">Bank Name*</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control wizard-required"
                                                placeholder="Enter Bank Name"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Branch Name*</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control wizard-required"
                                                placeholder="Enter Branch Name"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Account Name*</label>
                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="form-control wizard-required"
                                                placeholder="Enter Account Name"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="form-label">Account Number*</label>
                                        <div className="position-relative">
                                            <input
                                                type="number"
                                                className="form-control wizard-required"
                                                placeholder="Enter Account Number"
                                                required=""
                                            />
                                            <div className="wizard-form-error" />
                                        </div>
                                    </div>
                                    <div className="form-group d-flex align-items-center justify-content-end gap-8">
                                        <button
                                            type="button"
                                            className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            className="form-wizard-next-btn btn btn-primary-600 px-32"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset className="wizard-fieldset">
                                <div className="text-center mb-40">
                                    <img
                                        src="admin/assets/images/gif/success-img3.gif"
                                        alt=""
                                        className="gif-image mb-24"
                                    />
                                    <h6 className="text-md text-neutral-600">Congratulations </h6>
                                    <p className="text-neutral-400 text-sm mb-0">
                                        Well done! You have successfully completed.
                                    </p>
                                </div>
                                <div className="form-group d-flex align-items-center justify-content-end gap-8">
                                    <button
                                        type="button"
                                        className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        className="form-wizard-submit btn btn-primary-600 px-32"
                                    >
                                        Publish
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    {/* Form Wizard End */}
                </div>
            </div>
        </div>
    )
}

export default WizardWithBesideLabel