import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EditNewsLayers = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const newsId = location.state?.id;

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        publish_date: "",
        news_package: "",
        category: "",
        sub_category: "",
        news_type: "",
        news_desc: "",
        author: "",
        created_by: "",
    });

    const [newsImage, setNewsImage] = useState(null);
    const [newsPackages, setNewsPackages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [newsTypes, setNewsTypes] = useState([]);

    useEffect(() => {
        if (!newsId) {
            alert("No news ID provided.");
            navigate("/market-outlook");
            return;
        }

        // Fetch dropdowns
        fetch("http://localhost:5000/admin/news/news-packages")
            .then((res) => res.json())
            .then((data) => setNewsPackages(data));

        fetch("http://localhost:5000/admin/news/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));

        fetch("http://localhost:5000/admin/news/sub-categories")
            .then((res) => res.json())
            .then((data) => setSubCategories(data));

        fetch("http://localhost:5000/admin/news/news-types")
            .then((res) => res.json())
            .then((data) => setNewsTypes(data));

        // Fetch the news data by ID
        // OLD (❌ wrong path)
        // axios.get(`http://localhost:5000/admin/news/news/${newsId}`, { withCredentials: true })

        // ✅ NEW - Correct API route
        axios
            .get(`http://localhost:5000/admin/news/news_detail/${newsId}`, { withCredentials: true })
            .then((res) => {
                const news = res.data.news;
                setFormData({
                    id: news.id,
                    title: news.title,
                    publish_date: news.publish_date.split("T")[0],
                    news_package: news.news_package,
                    category: news.category,
                    sub_category: news.sub_category,
                    news_type: news.news_type,
                    news_desc: news.news_desc,
                    author: news.author,
                    created_by: news.created_by,
                });
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to load news data.");
                navigate("/market-outlook");
            });

    }, [newsId, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewsImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        if (newsImage) data.append("news_image", newsImage);

        try {
            const response = await axios.put(
                `http://localhost:5000/admin/news/news_edit/${formData.id}`,
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );

            alert(response.data.message);
            navigate("/market-outlook");
        } catch (error) {
            console.error(error);
            alert("Failed to update news.");
        }
    };

    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title mb-0">Edit News</h5>
                </div>
                <div className="card-body">
                    <form className="row gy-3 needs-validation" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                        <div className="col-md-6">
                            <label className="form-label">News Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">News Image</label>
                            <input
                                className="form-control"
                                type="file"
                                name="news_image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Publish Date</label>
                            <input
                                type="date"
                                name="publish_date"
                                className="form-control"
                                value={formData.publish_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">News Package</label>
                            <select
                                name="news_package"
                                className="form-control"
                                value={formData.news_package}
                                onChange={handleChange}
                            >
                                <option value="">Select News Package</option>
                                {newsPackages.map((pkg) => (
                                    <option key={pkg.id} value={pkg.id}>
                                        {pkg.package_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Category</label>
                            <select
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Sub Category</label>
                            <select
                                name="sub_category"
                                className="form-control"
                                value={formData.sub_category}
                                onChange={handleChange}
                            >
                                <option value="">Select Sub Category</option>
                                {subCategories.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.pair_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">News Type</label>
                            <select
                                name="news_type"
                                className="form-control"
                                value={formData.news_type}
                                onChange={handleChange}
                            >
                                <option value="">Select News Type</option>
                                {newsTypes.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.news_type_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">News Description</label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={formData.news_desc || ""} 
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setFormData((prev) => ({
                                        ...prev,
                                        news_desc: data,
                                    }));
                                }}
                            />
                        </div>

                        {/* Hidden Fields */}
                        <input type="hidden" name="author" value={formData.author} />
                        <input type="hidden" name="created_by" value={formData.created_by} />

                        <div className="col-12">
                            <button className="btn btn-primary-600" type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditNewsLayers;
