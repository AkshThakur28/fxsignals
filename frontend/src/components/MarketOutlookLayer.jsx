import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const getPlainTextPreview = (html, wordLimit = 25) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const words = text.split(/\s+/);
    return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..."
        : text;
};

const NewsRow = ({ news, index, onDelete }) => (
    <tr>
        <td>
            <div className="d-flex align-items-center gap-10">
                {index}
            </div>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{getPlainTextPreview(news.title, 8)}</span>
        </td>
        <td>
            <img
                src={`http://localhost:5000/uploads/news/${news.news_image}`}
                alt={news.title}
                className="img-fluid radius-8"
                style={{ width: "80px", height: "auto", objectFit: "cover" }}
            />
        </td>

        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{new Date(news.publish_date).toISOString().split('T')[0]}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{getPlainTextPreview(news.news_desc, 5)}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{news.category_name}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{news.sub_category_name}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{news.news_type_name}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{news.news_package_name}</span>
        </td>
        <td className="text-center">
            <div className="d-flex align-items-center gap-10 justify-content-center">
                <Link
                    to="/edit-news"
                    state={{ id: news.id }}
                    className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                >
                    <Icon icon="lucide:edit" className="menu-icon" />
                </Link>
                <button
                    type="button"
                    onClick={() => onDelete(news.id)}
                    className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                >
                    <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                </button>
            </div>
        </td>
    </tr>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        const maxButtons = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (endPage - startPage < maxButtons - 1) {
            if (startPage === 1) {
                endPage = Math.min(startPage + maxButtons - 1, totalPages);
            } else if (endPage === totalPages) {
                startPage = Math.max(endPage - maxButtons + 1, 1);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return { pageNumbers, startPage, endPage };
    };

    const { pageNumbers, startPage, endPage } = generatePageNumbers();

    return (
        <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
            <li className="page-item">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                >
                    <Icon icon="ep:d-arrow-left" />
                </button>
            </li>

            {startPage > 1 && (
                <>
                    <li className="page-item">
                        <button
                            onClick={() => onPageChange(1)}
                            className="page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-neutral-200 text-secondary-light"
                        >
                            1
                        </button>
                    </li>
                    {startPage > 2 && <li className="page-item">...</li>}
                </>
            )}

            {pageNumbers.map((page) => (
                <li key={page} className="page-item">
                    <button
                        onClick={() => onPageChange(page)}
                        className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md ${currentPage === page ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-secondary-light'}`}
                    >
                        {page}
                    </button>
                </li>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <li className="page-item">...</li>}
                    <li className="page-item">
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md bg-neutral-200 text-secondary-light"
                        >
                            {totalPages}
                        </button>
                    </li>
                </>
            )}

            <li className="page-item">
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
                >
                    <Icon icon="ep:d-arrow-right" />
                </button>
            </li>
        </ul>
    );
};

const MarketOutlookLayer = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 10;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch("http://localhost:5000/admin/news/news_view");
                const data = await res.json();
                if (res.ok) {
                    setNews(data.news);
                    setFilteredNews(data.news);
                } else {
                    setError(data.message || "Failed to fetch news");
                }
            } catch {
                setError("Error fetching news");
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = news.filter(news =>
            news.title.toLowerCase().includes(lowerSearch) ||
            news.publish_date.toLowerCase().includes(lowerSearch) ||
            news.news_desc.toLowerCase().includes(lowerSearch) ||
            news.category.toLowerCase().includes(lowerSearch) ||
            news.sub_category.toLowerCase().includes(lowerSearch) ||
            news.news_type.toLowerCase().includes(lowerSearch) ||
            news.news_package.toLowerCase().includes(lowerSearch)
        );
        setFilteredNews(filtered);
        setCurrentPage(1);
    }, [search, news]);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(filteredNews.length / newsPerPage);

    const deleteNews = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            const res = await fetch(`http://localhost:5000/admin/news/news_delete/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            const result = await res.json();
            if (res.ok) {
                setNews(prev => prev.filter(news => news.id !== id));
            } else {
                alert(result.message || "Failed to delete record.");
            }
        } catch (err) {
            console.error("Error deleting News:", err);
            alert("An error occurred while deleting the news.");
        }
    };

    return (
        <div className="card h-100 p-0 radius-12">
            <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                <div className="d-flex align-items-center flex-wrap gap-3">
                    <span className="text-md fw-medium text-secondary-light mb-0">Search</span>
                    <form className="navbar-search">
                        <input
                            type="text"
                            className="bg-base h-40-px w-auto"
                            placeholder="Search news..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                </div>
                <Link
                    to="/add-news"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                >
                    <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                    Add News
                </Link>
            </div>

            <div className="card-body p-24">
                {loading ? (
                    <p>Loading News...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <>
                        <div className="table-responsive scroll-sm">
                            <table className="table bordered-table sm-table mb-0">
                                <thead>
                                    <tr>
                                        <th>S.L</th>
                                        <th>Title</th>
                                        <th>News Image</th>
                                        <th>Published Date</th>
                                        <th>News Description</th>
                                        <th>Category</th>
                                        <th>Sub Category</th>
                                        <th>News Type</th>
                                        <th>News Package</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentNews.length ? (
                                        currentNews.map((news, i) => (
                                            <NewsRow
                                                key={news.id || i}
                                                news={news}
                                                index={indexOfFirstNews + i + 1}
                                                onDelete={deleteNews}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No news found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                            <span>
                                Showing {indexOfFirstNews + 1} to{" "}
                                {Math.min(indexOfLastNews, filteredNews.length)} of{" "}
                                {filteredNews.length} entries
                            </span>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MarketOutlookLayer;
