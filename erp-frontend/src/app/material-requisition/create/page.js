"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CreateRequisition() {
  const [items, setItems] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);
  const [form, setForm] = useState({
    production_order_id: "",
    requested_by: "",
    requisition_date: new Date().toISOString().slice(0, 10),
    status: "draft",
    remarks: "",
  });
  const [rows, setRows] = useState([]); // item rows: { item_id, qty, uom }
  const [flash, setFlash] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadingPOItems, setLoadingPOItems] = useState(false);

  // 🔹 Load items + production orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, poRes] = await Promise.all([
          fetch("/api/items"),
          fetch("/api/production-orders"),
        ]);
        if (itemsRes.ok) setItems(await itemsRes.json());
        if (poRes.ok) setProductionOrders(await poRes.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Auto-fetch PO items
  useEffect(() => {
    const poId = form.production_order_id;
    if (!poId) return;

    const confirmReplace = () => {
      if (rows.length === 0) return true;
      return window.confirm(
        "This will replace current item rows with items from the selected Production Order. Continue?"
      );
    };

    (async () => {
      if (!confirmReplace()) return;
      setLoadingPOItems(true);
      try {
        const res = await fetch(`/api/production-orders/${poId}/items`);
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Failed" }));
          setFlash({ type: "danger", msg: err?.error || "Failed to fetch PO items" });
          return;
        }
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setFlash({ type: "info", msg: "No items found for selected production order." });
          setRows([]);
          return;
        }

        // ✅ FIXED: use pending_qty instead of required_qty
        const mapped = data.map((it) => ({
          item_id: String(it.item_id),
          qty: String(it.pending_qty ?? it.planned_qty ?? "0"),
          uom: it.uom ?? "",
        }));
        setRows(mapped);
        setFlash({ type: "success", msg: "Items loaded from Production Order." });
      } catch (err) {
        console.error(err);
        setFlash({ type: "danger", msg: "Failed to fetch production order items." });
      } finally {
        setLoadingPOItems(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.production_order_id]);

  // 🔹 Row management
  function addRow() {
    setRows((prev) => [...prev, { item_id: "", qty: "", uom: "" }]);
  }
  function removeRow(i) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }
  function handleRowChange(i, field, value) {
    setRows((prev) => {
      const clone = [...prev];
      clone[i] = { ...clone[i], [field]: value };
      return clone;
    });
  }

  // 🔹 Validation
  function validate() {
    if (!form.requested_by || !form.requested_by.trim()) {
      setFlash({ type: "danger", msg: "Requested by is required" });
      return false;
    }
    if (new Date(form.requisition_date) > new Date()) {
      setFlash({ type: "danger", msg: "Requisition date cannot be in the future" });
      return false;
    }
    if (rows.length === 0) {
      setFlash({ type: "danger", msg: "Add at least one item" });
      return false;
    }
    const itemIds = rows.map((r) => r.item_id);
    if (itemIds.some((id) => !id)) {
      setFlash({ type: "danger", msg: "All item rows must have an item selected" });
      return false;
    }
    if (new Set(itemIds).size !== itemIds.length) {
      setFlash({ type: "danger", msg: "Duplicate items not allowed" });
      return false;
    }
    for (const r of rows) {
      if (isNaN(Number(r.qty)) || Number(r.qty) <= 0) {
        setFlash({ type: "danger", msg: "Each item must have qty > 0" });
        return false;
      }
    }
    return true;
  }

  // 🔹 Submit
  async function submit(e) {
    e.preventDefault();
    setFlash(null);
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        items: rows.map((r) => ({ item_id: r.item_id, qty: r.qty, uom: r.uom })),
      };
      const res = await fetch("/api/material-requisition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setFlash({
          type: "success",
          msg: "Requisition created: " + (data.requisition_no || ""),
        });
        setForm({
          ...form,
          production_order_id: "",
          requested_by: "",
          remarks: "",
        });
        setRows([]);
      } else {
        setFlash({ type: "danger", msg: data.error || "Failed to create requisition" });
      }
    } catch (err) {
      console.error(err);
      setFlash({ type: "danger", msg: "Server error" });
    } finally {
      setSaving(false);
    }
  }

  // 🔹 Render
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">
          <i className="bi bi-plus-circle text-primary"></i> Create Requisition
        </h1>
        <Link href="/material-requisition" className="btn btn-outline-secondary">
          Back
        </Link>
      </div>

      {flash && <div className={`alert alert-${flash.type}`}>{flash.msg}</div>}

      <form onSubmit={submit}>
        {/* Header */}
        <div className="card mb-3 p-3">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Production Order (optional)</label>
              <select
                className="form-select"
                value={form.production_order_id}
                onChange={(e) =>
                  setForm({ ...form, production_order_id: e.target.value })
                }
              >
                <option value="">None</option>
                {productionOrders.map((po) => (
                  <option key={po.id} value={String(po.id)}>
                    {po.order_number} — {po.item_name}
                  </option>
                ))}
              </select>
              {loadingPOItems && (
                <div className="form-text">Loading items from production order...</div>
              )}
            </div>
            <div className="col-md-4">
              <label className="form-label">Requested By *</label>
              <input
                className="form-control"
                value={form.requested_by}
                onChange={(e) =>
                  setForm({ ...form, requested_by: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Requisition Date *</label>
              <input
                type="date"
                className="form-control"
                value={form.requisition_date}
                onChange={(e) =>
                  setForm({ ...form, requisition_date: e.target.value })
                }
                required
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Items</strong>
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={addRow}
            >
              <i className="bi bi-plus-circle"></i> Add Item
            </button>
          </div>
          <div className="card-body">
            {rows.length === 0 && <p className="text-muted">No items added</p>}
            {rows.map((r, i) => (
              <div className="row g-2 align-items-end mb-2" key={i}>
                <div className="col-md-6">
                  <label className="form-label">Item</label>
                  <select
                    className="form-select"
                    value={r.item_id}
                    onChange={(e) => handleRowChange(i, "item_id", e.target.value)}
                    required
                  >
                    <option value="">Select item</option>
                    {items.map((it) => (
                      <option key={it.id} value={String(it.id)}>
                        {it.item_code} - {it.item_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    className="form-control"
                    value={r.qty}
                    onChange={(e) => handleRowChange(i, "qty", e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-2">
                  <label className="form-label">UOM</label>
                  <input
                    className="form-control"
                    value={r.uom}
                    onChange={(e) => handleRowChange(i, "uom", e.target.value)}
                  />
                </div>
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeRow(i)}
                  >
                    Del
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Saving...
              </>
            ) : (
              "Create"
            )}
          </button>
          <Link href="/material-requisition" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
