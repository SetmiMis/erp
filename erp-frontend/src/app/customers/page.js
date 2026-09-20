"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "../../lib/apiClient";

// Matches erp-backend/src/customers/customer.entity.ts
export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [flashMessage, setFlashMessage] = useState({ success: "", error: "" });

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCustomers();
    }, 400);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({ status, search }).toString();
      const data = await apiClient.get(`/customers?${query}`);
      setCustomers(data ?? []);
    } catch (err) {
      setFlashMessage({ success: "", error: err.message || "Error loading customers" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;

    try {
      await apiClient.delete(`/customers/${id}`);
      setCustomers(customers.filter((c) => c.id !== id));
      setFlashMessage({ success: "Customer deleted successfully!", error: "" });
    } catch (err) {
      setFlashMessage({ success: "", error: err.message || "Delete failed" });
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h2>Customers</h2>
        <Link href="/customers/create" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Create Customer
        </Link>
      </div>

      {/* Flash Messages */}
      {flashMessage.success && (
        <div className="alert alert-success alert-dismissible fade show">
          {flashMessage.success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setFlashMessage({ ...flashMessage, success: "" })}
          ></button>
        </div>
      )}
      {flashMessage.error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {flashMessage.error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setFlashMessage({ ...flashMessage, error: "" })}
          ></button>
        </div>
      )}

      {/* Filters */}
      <div className="card mb-3">
        <div className="card-header">
          <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-3">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => {
                  setSearch("");
                  setStatus("");
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length > 0 ? (
                    customers.map((c) => (
                      <tr key={c.id}>
                        <td>{c.customer_code}</td>
                        <td>
                          <Link href={`/customers/${c.id}`}>{c.name}</Link>
                        </td>
                        <td>{c.email}</td>
                        <td>{c.phone || "-"}</td>
                        <td>{c.city || "-"}</td>
                        <td>
                          <span
                            className={`badge bg-${c.is_active ? "success" : "danger"}`}
                          >
                            {c.is_active ? "active" : "inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="btn-group btn-group-sm">
                            <Link
                              href={`/customers/${c.id}`}
                              className="btn btn-info"
                            >
                              <i className="bi bi-eye"></i>
                            </Link>
                            <Link
                              href={`/customers/${c.id}/edit`}
                              className="btn btn-warning"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(c.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No customers found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
