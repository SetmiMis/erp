"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../../lib/apiClient";

export default function EditProductionOrder() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({
    remarks: "",
    quantity: "",
    warehouse_id: "",
  });
  const [warehouses, setWarehouses] = useState([]);
  const [flash, setFlash] = useState({ type: "", message: "" });
  const [producedQty, setProducedQty] = useState("");

  const loadOrder = async () => {
    const data = await apiClient.get(`/production-orders/${id}`);
    setOrder(data);
    setForm({
      remarks: data.remarks || "",
      quantity: data.quantity,
      warehouse_id: data.warehouse_id || "",
    });
  };

  // Fetch order + warehouses
  useEffect(() => {
    if (!id) return;
    loadOrder().catch((err) => console.error(err));
    apiClient
      .get("/warehouses")
      .then((data) => setWarehouses(data ?? []))
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Only draft/planned orders can have their header edited
  // (see erp-backend/src/production/production.service.ts update()).
  const editable = order && order.status !== "in_progress" && order.status !== "completed";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.patch(`/production-orders/${id}`, {
        quantity: Number(form.quantity),
        warehouse_id: Number(form.warehouse_id),
        remarks: form.remarks || undefined,
      });
      setFlash({ type: "success", message: "✅ Order updated" });
      setTimeout(() => router.push("/production-orders"), 1000);
    } catch (err) {
      setFlash({ type: "danger", message: err.message || "Failed to update order" });
    }
  };

  const runAction = async (action, body) => {
    try {
      await apiClient.put(`/production-orders/${id}/${action}`, body);
      setFlash({ type: "success", message: `✅ Order ${action}d` });
      await loadOrder();
    } catch (err) {
      setFlash({ type: "danger", message: err.message || `Failed to ${action} order` });
    }
  };

  if (!order) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">
          <i className="bi bi-pencil"></i> Edit Production Order — {order.order_number}
        </h1>
        <Link href="/production-orders" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      {flash.message && (
        <div className={`alert alert-${flash.type}`}>{flash.message}</div>
      )}

      <div className="card p-3 shadow-sm mb-3">
        <p className="mb-2">
          <strong>Status:</strong> <span className="badge bg-info">{order.status}</span>
        </p>
        <div className="btn-group btn-group-sm">
          {(order.status === "planned" || order.status === "draft") && (
            <button className="btn btn-outline-primary" onClick={() => runAction("start")}>
              <i className="bi bi-play-circle me-1"></i>Start
            </button>
          )}
          {order.status !== "completed" && order.status !== "cancelled" && (
            <button className="btn btn-outline-danger" onClick={() => runAction("cancel")}>
              <i className="bi bi-x-circle me-1"></i>Cancel
            </button>
          )}
        </div>
        {order.status === "in_progress" && (
          <div className="mt-3 d-flex align-items-end gap-2">
            <div>
              <label className="form-label">Produced Qty</label>
              <input
                type="number"
                className="form-control"
                value={producedQty}
                onChange={(e) => setProducedQty(e.target.value)}
                min="0.001"
                step="0.01"
              />
            </div>
            <button
              className="btn btn-success"
              disabled={!producedQty}
              onClick={() => runAction("complete", { produced_qty: Number(producedQty) })}
            >
              <i className="bi bi-check-circle me-1"></i>Complete
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
        <fieldset disabled={!editable}>
          <div className="row">
            {/* Order Qty */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Order Quantity</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={form.quantity}
                onChange={handleChange}
                min="0.001"
                step="0.01"
              />
            </div>

            {/* Warehouse */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Warehouse</label>
              <select
                name="warehouse_id"
                className="form-select"
                value={form.warehouse_id}
                onChange={handleChange}
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.id}>
                    {wh.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Remarks */}
            <div className="col-12 mb-3">
              <label className="form-label">Remarks</label>
              <textarea
                name="remarks"
                className="form-control"
                value={form.remarks}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            <i className="bi bi-check-circle me-2"></i> Save Changes
          </button>
        </fieldset>
        {!editable && (
          <p className="text-muted mt-2 mb-0">
            This order is {order.status} — header details can no longer be edited.
          </p>
        )}
      </form>
    </div>
  );
}
