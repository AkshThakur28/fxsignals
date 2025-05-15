import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewsLayers = () => {
  const navigate = useNavigate();

  const [newsPackages, setNewsPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [newsTypes, setNewsTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin/auth/me", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        const { username, id } = data.user;
        setFormData((prev) => ({
          ...prev,
          author: username,
          created_by: id,
        }));
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });

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
  }, []);

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewsImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newsImage) {
      alert("Please upload a news image.");
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("news_image", newsImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/news/add_news",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      alert(response.data.message);
      navigate("/market-outlook");

    } catch (error) {
      console.error(error);
      alert("Failed to add news.");
    }
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Add News</h5>
        </div>
        <div className="card-body">
          <form
            className="row gy-3 needs-validation"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            noValidate
          >
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
                required
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
                required
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
                required
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
                required
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
                required
              >
                <option value="">Select News Type</option>
                {newsTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.news_type_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">News Description</label>
              <textarea
                name="news_desc"
                className="form-control"
                value={formData.news_desc}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Hidden fields for created_by and author */}
            <input type="hidden" name="author" value={formData.author} />
            <input
              type="hidden"
              name="created_by"
              value={formData.created_by}
            />

            <div className="col-12">
              <button className="btn btn-primary-600" type="submit">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewsLayers;
