import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const GalleryLayer = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch("http://localhost:5000/admin/upload_image/upload_image_view");
            const data = await res.json();
            if (res.ok) {
                setImages(data.images);
            } else {
                setError(data.message || "Failed to fetch images");
            }
        } catch (err) {
            console.error("Error fetching images:", err);
            setError("Error fetching images");
        } finally {
            setLoading(false);
        }
    };
    
        const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/admin/upload_image/upload_image_delete/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setImages(images.filter(image => image.id !== id));
            } else {
                alert("Failed to delete image");
            }
        } catch (err) {
            console.error("Error deleting image:", err);
        }
    };

    const handleViewImage = (imageUrl) => {
        setSelectedImage(imageUrl);
        setModalShow(true);
    };

    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden">
            <div className="card-header border-bottom-0 pb-0 pt-0 px-0 d-flex justify-content-between align-items-center flex-wrap">
                <ul className="nav border-gradient-tab nav-pills mb-0 border-top-0" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">
                            Uploaded Images
                        </button>
                    </li>
                </ul>

                <Link to="/image-upload" className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2 me-1 mt-1">
                    <Icon icon="ic:baseline-plus" className="text-xl line-height-1" />
                    Add Images
                </Link>
            </div>

            <div className="card-body p-24">
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabIndex={0}>
                        {loading ? (
                            <p>Loading images...</p>
                        ) : error ? (
                            <p className="text-danger">{error}</p>
                        ) : images.length === 0 ? (
                            <p>No images found.</p>
                        ) : (
                            <div className="row gy-4">
                                {images.map((image, index) => {
                                    const imageUrl = `http://localhost:5000/uploads/upload-image/${encodeURIComponent(image.images)}`;
                                    return (
                                        <div key={image.id || index} className="col-xxl-3 col-md-4 col-sm-6 d-flex justify-content-center">
                                            <div className="image-container">
                                                <div className="hover-scale-img">
                                                    <div className="fixed-image-container">
                                                        <img src={imageUrl} alt={image.images} className="image-fit" />
                                                    </div>
                                                </div>

                                                <div className="hover-buttons">
                                                    <button className="btn btn-primary view-image-btn" onClick={() => handleViewImage(imageUrl)}>
                                                        <Icon icon="fa-solid:eye" />
                                                    </button>
                                                    <button className="btn btn-danger btn-flat" onClick={() => handleDelete(image.id)}>
                                                        <Icon icon="fa-solid:trash" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body className="text-center">
                    <img src={selectedImage} alt="Preview" className="img-fluid" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GalleryLayer;
