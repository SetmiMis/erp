"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function DispatchOrders() {
  const [dispatches, setDispatches] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDispatches();
  }, [status, search]);

  const fetchDispatches = async () => {
    try {
      // 🛠️ Bug fix: this was fetching a relative "/api/dispatch" path, which
      // hits the Next.js server (no such route exists there) instead of the
      // NestJS backend on port 3001, and sent no auth token — so the page
      // could never actually load any dispatch orders. Also unwrap the
      // { success, message, data } response envelope.
      const token = Cookies.get("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dispatch?status=${status}&search=${search}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch dispatch orders");
      const { data } = await res.json();
      setDispatches(data);
    } catch (err) {
      console.error("Error fetching dispatches:", err);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-truck text-primary"></i> Dispatch Orders
          </h1>
          <Link href="/dispatch/create" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Create Dispatch
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchDispatches();
            }}
            className="row g-3"
          >
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="ready_to_dispatch">Ready to Dispatch</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-outline-primary w-100">
                <i className="bi bi-funnel"></i> Filter
              </button>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setStatus("");
                  setSearch("");
                  fetchDispatches();
                }}
              >
                <i className="bi bi-x-circle"></i> Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Dispatch Orders Table */}
      <div className="card">
        <div className="card-body">
          {dispatches.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-truck fs-1 text-muted"></i>
              <h4 className="mt-3 text-muted">No dispatch orders found</h4>
              <p className="text-muted">
                Start by creating your first dispatch order
              </p>
              <Link href="/dispatch/create" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Create Dispatch Order
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Order No</th>
                    <th>Customer</th>
                    <th>Warehouse</th>
                    <th>Dispatch Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dispatches.map((dispatch) => (
                    <tr key={dispatch.id}>
                      <td>
                        <strong>{dispatch.dispatch_order_no}</strong>
                      </td>
                      <td>
                        <strong>{dispatch.customer_name}</strong>
                        <br />
                        <small className="text-muted">
                          {dispatch.customer_address}
                        </small>
                      </td>
                      <td>{dispatch.warehouse_name}</td>
                      <td>
                        {new Date(dispatch.dispatch_date).toLocaleDateString()}
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            dispatch.status === "delivered"
                              ? "success"
                              : dispatch.status === "dispatched"
                              ? "info"
                              : dispatch.status === "ready_to_dispatch"
                              ? "warning"
                              : "secondary"
                          }`}
                        >
                          {dispatch.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link
                            href={`/dispatch/${dispatch.id}`}
                            className="btn btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            href={`/dispatch/${dispatch.id}/edit`}
                            className="btn btn-outline-secondary"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
