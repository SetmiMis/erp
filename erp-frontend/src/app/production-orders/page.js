"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "../../lib/apiClient";

export default function ProductionOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const all = (await apiClient.get("/production-orders")) || [];
      // Backend has no server-side status/search filtering for this endpoint yet
      // (ProductionService.findAll() returns everything) — filter client-side.
      const filtered = all.filter((order) => {
        const matchesStatus = !status || order.status === status;
        const matchesSearch =
          !search || order.order_number?.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      });
      setOrders(filtered);
    } catch (err) {
      console.error("❌ Error fetching orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await apiClient.delete(`/production-orders/${id}`);
      alert("✅ Order deleted");
      fetchOrders();
    } catch (err) {
      alert("❌ " + (err.message || "Failed to delete"));
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-gear text-primary"></i> Production Orders
          </h1>
          <Link href="/production-orders/create" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Create Production Order
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchOrders();
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
                <option value="draft">Draft</option>
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
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
                  fetchOrders();
                }}
              >
                <i className="bi bi-x-circle"></i> Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-gear fs-1 text-muted"></i>
              <h4 className="mt-3 text-muted">No production orders found</h4>
              <p className="text-muted">Start by creating your first production order</p>
              <Link href="/production-orders/create" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Create Production Order
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Order No</th>
                    <th>FG Item</th>
                    <th>Warehouse</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.order_number}</strong>
                      </td>
                      {/* Backend (ProductionOrder entity) only stores fg_item_id/warehouse_id,
                          not resolved names — showing the id until a Phase 2 join is added. */}
                      <td>Item #{order.fg_item_id}</td>
                      <td>{order.warehouse_id ? `Warehouse #${order.warehouse_id}` : "-"}</td>
                      <td>
                        {order.quantity && !isNaN(order.quantity)
                          ? Number(order.quantity).toFixed(2)
                          : "-"}
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            order.status === "draft"
                              ? "secondary"
                              : order.status === "planned"
                              ? "info"
                              : order.status === "in_progress"
                              ? "warning"
                              : order.status === "completed"
                              ? "success"
                              : "danger"
                          }`}
                        >
                          {order.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link
                            href={`/production-orders/${order.id}`}
                            className="btn btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            href={`/production-orders/${order.id}/edit`}
                            className="btn btn-outline-secondary"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="btn btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
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
