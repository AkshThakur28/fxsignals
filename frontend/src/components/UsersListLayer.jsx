import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const UserRow = ({ user, index, onDelete }) => (
    <tr>
        <td>
            <div className="d-flex align-items-center gap-10">
                {index}
            </div>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{user.firstname}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{user.lastname}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{user.email}</span>
        </td>
        <td>
            <span className="text-md mb-0 fw-normal text-secondary-light">{user.mobile_no}</span>
        </td>
        <td className="text-center">
            <div className="d-flex align-items-center gap-10 justify-content-center">
            <Link
                to="/user-edit"
                state={{ userId: user.id }}
                className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
            >
            <Icon icon="lucide:edit" className="menu-icon" />
            </Link>

                <button
                    type="button"
                    onClick={() => onDelete(user.id)}
                    className="bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                >
                    <Icon icon="fluent:delete-24-regular" className="menu-icon" />
                </button>
            </div>
        </td>
    </tr>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
        <li className="page-item">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className="page-link bg-neutral-200 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px text-md"
            >
                <Icon icon="ep:d-arrow-left" />
            </button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
            <li key={i + 1} className="page-item">
                <button
                    onClick={() => onPageChange(i + 1)}
                    className={`page-link fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md ${currentPage === i + 1 ? 'bg-primary-600 text-white' : 'bg-neutral-200 text-secondary-light'}`}
                >
                    {i + 1}
                </button>
            </li>
        ))}
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

const UsersListLayer = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:5000/admin/users/users_view");
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setFilteredUsers(data.users);
                } else {
                    setError(data.message || "Failed to fetch users");
                }
            } catch {
                setError("Error fetching users");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = users.filter(user =>
            user.firstname.toLowerCase().includes(lowerSearch) ||
            user.lastname.toLowerCase().includes(lowerSearch) ||
            user.email.toLowerCase().includes(lowerSearch) ||
            user.mobile_no.toLowerCase().includes(lowerSearch)
        );
        setFilteredUsers(filtered);
        setCurrentPage(1);
    }, [search, users]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const deleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const res = await fetch("http://localhost:5000/admin/users/users_delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const result = await res.json();
            if (res.ok) {
                setUsers(prev => prev.filter(user => user.id !== id));
            } else {
                alert(result.message || "Failed to delete user.");
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("An error occurred while deleting the user.");
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
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Icon icon="ion:search-outline" className="icon" />
                    </form>
                </div>
                <Link
                    to="/add-user"
                    className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2"
                >
                    <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                    Add New User
                </Link>
            </div>

            <div className="card-body p-24">
                {loading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : (
                    <>
                        <div className="table-responsive scroll-sm">
                            <table className="table bordered-table sm-table mb-0">
                                <thead>
                                    <tr>
                                        <th>S.L</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Mobile No.</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.length ? (
                                        currentUsers.map((user, i) => (
                                            <UserRow
                                                key={user.id || i}
                                                user={user}
                                                index={indexOfFirstUser + i + 1}
                                                onDelete={deleteUser}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No users found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                            <span>
                                Showing {indexOfFirstUser + 1} to{" "}
                                {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
                                {filteredUsers.length} entries
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

export default UsersListLayer;
