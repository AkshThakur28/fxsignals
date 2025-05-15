import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const src = URL.createObjectURL(file);
            setImagePreview(src);
        }
    };

    const uploadImage = async () => {
        if (!selectedFile) return alert("Please select an image first.");
    
        const formData = new FormData();
        formData.append("image", selectedFile);
    
        try {
            const response = await fetch("http://localhost:5000/admin/upload_image/add_upload_image", {
                method: "POST",
                body: formData,
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Image uploaded successfully!");
                removeImage(); 
                navigate("/gallery"); 
            } else {
                alert("Upload failed: " + data.message);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Check console for details.");
        }
    };
    

    const removeImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Image Upload</h6>
                </div>
                <div className="card-body p-24 d-flex align-items-center justify-content-between">
                    <div className="upload-image-wrapper d-flex align-items-center gap-3">
                        {imagePreview ? (
                            <div className="uploaded-img position-relative h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50">
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="uploaded-img__remove position-absolute top-0 end-0 z-1 text-2xxl line-height-1 me-8 mt-8 d-flex"
                                    aria-label="Remove uploaded image"
                                >
                                    <Icon icon="radix-icons:cross-2" className="text-xl text-danger-600" />
                                </button>
                                <img
                                    id="uploaded-img__preview"
                                    className="w-100 h-100 object-fit-cover"
                                    src={imagePreview}
                                    alt="Preview"
                                />
                            </div>
                        ) : (
                            <label
                                className="upload-file h-120-px w-120-px border input-form-light radius-8 overflow-hidden border-dashed bg-neutral-50 bg-hover-neutral-200 d-flex align-items-center flex-column justify-content-center gap-1"
                                htmlFor="upload-file"
                            >
                                <Icon icon="solar:camera-outline" className="text-xl text-secondary-light" />
                                <span className="fw-semibold text-secondary-light">Upload</span>
                            </label>
                        )}
                        <input
                            id="upload-file"
                            type="file"
                            onChange={handleFileChange}
                            hidden
                            ref={fileInputRef}
                            accept="image/*"
                        />
                    </div>

                    <div className="d-flex flex-column align-items-center gap-3 ms-4">
                        <button
                            type="button"
                            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                            onClick={uploadImage}
                        >
                            Upload
                        </button>
                        <button
                            type="button"
                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                            onClick={() => navigate(-1)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
