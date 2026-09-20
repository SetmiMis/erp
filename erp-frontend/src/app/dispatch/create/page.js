"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

export default function CreateDispatchOrder() {
  const [warehouses, setWarehouses] = useState([]);
  const [form, setForm] = useState({
    dispatch_order_no: "",
    dispatch_date: "",
    customer_name: "",
    warehouse_id: "",
    customer_address: "",
    remarks: "",
  });

  // Generate default values on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const randomNo = `DO${today.replace(/-/g, "")}${String(
      Math.floor(Math.random() * 9999 + 1)
    ).padStart(4, "0")}`;

    setForm((prev) => ({
      ...prev,
      dispatch_order_no: randomNo,
      dispatch_date: today,
    }));

    // Fetch warehouses from API
    // 🛠️ Bug fix: this was fetching a relative "/api/warehouses" path, which
    // hits the Next.js server (no such route exists there) instead of the
    // NestJS backend on port 3001, and sent no auth token — so the dropdown
    // could never actually load. Also unwrap the { success, message, data }
    // response envelope.
    const fetchWarehouses = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch warehouses");
        const { data } = await res.json();
        setWarehouses(data);
      } catch (err) {
        console.error("Error loading warehouses:", err);
      }
    };
    fetchWarehouses();
  }, []);

  // Handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🛠️ Bug fix: same relative-URL/no-auth issue as the warehouses fetch
      // above. Note: the backend's CreateDispatchDto (see
      // erp-backend/src/dispatch/dto/create-dispatch.dto.ts) additionally
      // expects `dispatch_number` / `warehouse_name` / a non-empty `items`
      // array, none of which this form collects yet — that's a separate,
      // larger gap (this form needs an item-line UI) left for a follow-up.
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dispatch`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("✅ Dispatch Order Created");
      } else {
        const err = await res.json();
        alert(`❌ ${err.message || "Error creating dispatch order"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Failed to create dispatch order");
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-plus-circle text-primary"></i> Create Dispatch
            Order
          </h1>
          <Link href="/dispatch" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back to Dispatch
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Section */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Dispatch Order Details</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* Dispatch No */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Dispatch Order No <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="dispatch_order_no"
                      className="form-control"
                      value={form.dispatch_order_no}
                      onChange={handleChange}
                      required
                      readOnly
                    />
                  </div>

                  {/* Dispatch Date */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Dispatch Date <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      name="dispatch_date"
                      className="form-control"
                      value={form.dispatch_date}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Customer Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Customer Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customer_name"
                      className="form-control"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Warehouse */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">
                      Warehouse <span className="text-danger">*</span>
                    </label>
                    <select
                      name="warehouse_id"
                      className="form-select"
                      value={form.warehouse_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Warehouse</option>
                      {warehouses.map((wh) => (
                        <option key={wh.id} value={wh.id}>
                          {wh.warehouse_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Customer Address */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Customer Address</label>
                    <textarea
                      name="customer_address"
                      className="form-control"
                      rows="3"
                      placeholder="Customer delivery address..."
                      value={form.customer_address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Remarks */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea
                      name="remarks"
                      className="form-control"
                      rows="3"
                      placeholder="Additional notes..."
                      value={form.remarks}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Instructions</h5>
              </div>
              <div className="card-body">
                <div className="alert alert-info small">
                  <h6>
                    <i className="bi bi-info-circle me-2"></i> Dispatch Process
                  </h6>
                  <ul>
                    <li>Unique dispatch order number is auto-generated</li>
                    <li>Provide accurate customer details</li>
                    <li>Select correct warehouse for dispatch</li>
                    <li>Items will be added in the next step</li>
                  </ul>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-check-circle me-2"></i>Create Dispatch
                    Order
                  </button>
                  <Link href="/dispatch" className="btn btn-outline-secondary">
                    <i className="bi bi-x-circle me-2"></i>Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
