"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/apiClient";

export default function CreateProductionOrder() {
  const router = useRouter();
  const [boms, setBoms] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    bom_id: "",
    fg_item_id: "",
    warehouse_id: "",
    quantity: "",
    remarks: "",
  });

  // Fetch BOMs, Warehouses and Items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bomsData, whData, itemsData] = await Promise.all([
          apiClient.get("/bom"),
          apiClient.get("/warehouses"),
          apiClient.get("/items"),
        ]);
        setBoms(bomsData ?? []);
        setWarehouses(whData ?? []);
        setItems(itemsData ?? []);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, []);

  // When BOM changes, adopt its finished-good item automatically
  const handleBomChange = (e) => {
    const bomId = e.target.value;
    const selectedBom = boms.find((b) => String(b.id) === bomId);
    setForm((prev) => ({
      ...prev,
      bom_id: bomId,
      fg_item_id: selectedBom?.fg_item_id ? String(selectedBom.fg_item_id) : prev.fg_item_id,
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedBom = boms.find((b) => String(b.id) === form.bom_id);
    if (!selectedBom || !selectedBom.items?.length) {
      alert("❌ Selected BOM has no components to build raw-material requirements from.");
      return;
    }
    if (!form.fg_item_id) {
      alert("❌ This BOM has no finished-good item set — edit the BOM first.");
      return;
    }

    const quantity = Number(form.quantity);
    // Matches erp-backend/src/production/dto/create-production-order.dto.ts:
    // required_qty is the BOM's per-unit qty scaled by the order quantity.
    const requiredItems = selectedBom.items.map((bi) => ({
      item_id: bi.item_id,
      required_qty: Number(bi.qty) * quantity,
    }));

    setSaving(true);
    try {
      await apiClient.post("/production-orders", {
        fg_item_id: Number(form.fg_item_id),
        warehouse_id: Number(form.warehouse_id),
        quantity,
        remarks: form.remarks || undefined,
        items: requiredItems,
      });
      alert("✅ Production Order Created");
      router.push("/production-orders");
    } catch (err) {
      console.error(err);
      alert("❌ " + (err.message || "Failed to create order"));
    } finally {
      setSaving(false);
    }
  };

  const fgItem = items.find((it) => String(it.id) === form.fg_item_id);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-plus-circle text-primary"></i> Create Production Order
          </h1>
          <Link href="/production-orders" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back to Orders
          </Link>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Production Order Details</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {/* BOM */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Select BOM *</label>
                    <select
                      name="bom_id"
                      className="form-select"
                      value={form.bom_id}
                      onChange={handleBomChange}
                      required
                    >
                      <option value="">Select BOM</option>
                      {boms.map((bom) => (
                        <option key={bom.id} value={bom.id}>
                          {bom.name} ({bom.version})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* FG Product (auto from BOM) */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Finished Product</label>
                    <input
                      type="text"
                      className="form-control"
                      value={fgItem ? `${fgItem.name} (${fgItem.sku ?? "-"})` : ""}
                      disabled
                    />
                  </div>

                  {/* Warehouse */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Production Warehouse *</label>
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
                          {wh.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order Quantity */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Order Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      value={form.quantity}
                      onChange={handleChange}
                      min="0.001"
                      step="0.01"
                      required
                    />
                  </div>

                  {/* Remarks */}
                  <div className="col-12 mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea
                      name="remarks"
                      className="form-control"
                      rows="3"
                      value={form.remarks}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Instructions</h5>
              </div>
              <div className="card-body">
                <div className="alert alert-info small">
                  <h6>
                    <i className="bi bi-info-circle me-2"></i>Production Planning
                  </h6>
                  <ul>
                    <li>Select a BOM (finished product is auto-selected)</li>
                    <li>Choose the production warehouse</li>
                    <li>Required raw materials are computed from the BOM × quantity</li>
                    <li>Ensure raw materials are available before starting the order</li>
                  </ul>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    <i className="bi bi-check-circle me-2"></i>{saving ? "Creating..." : "Create Order"}
                  </button>
                  <Link href="/production-orders" className="btn btn-outline-secondary">
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
