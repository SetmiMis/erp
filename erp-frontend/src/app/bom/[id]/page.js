"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/apiClient";

export default function BOMDetailPage() {
  const { id } = useParams();
  const [bom, setBom] = useState(null);
  const [itemsById, setItemsById] = useState({});
  // Cost rollup (PLAN.md step 1.4): fetched separately from /bom/:id/cost
  // rather than folded into the BOM's own payload, so a BOM detail view
  // still renders (components, version, status) even if the cost lookup
  // fails for some reason -- a display page shouldn't 500 just because the
  // cost sidebar can't compute.
  const [costData, setCostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionBusy, setActionBusy] = useState(false);
  const [actionFlash, setActionFlash] = useState({ type: "", message: "" });

  const fetchBom = async () => {
    try {
      const [bomData, itemsData] = await Promise.all([
        apiClient.get(`/bom/${id}`),
        apiClient.get("/items"),
      ]);
      setBom(bomData);
      const map = {};
      (itemsData ?? []).forEach((it) => {
        map[it.id] = it;
      });
      setItemsById(map);
    } catch (err) {
      console.error("Error loading BOM:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load BOM detail + items (to resolve item_id -> name/sku for display)
  useEffect(() => {
    if (id) fetchBom();
  }, [id]);

  // PLAN.md step 1.5: draft -> pending_approval -> active. Approve/reject
  // are role-gated server-side (BomController restricts them to
  // COMPANY_ADMIN/SUPERADMIN) -- a non-admin still sees the buttons here,
  // but the backend's 403 message surfaces in actionFlash if they try.
  const runAction = async (action, successMessage) => {
    setActionBusy(true);
    setActionFlash({ type: "", message: "" });
    try {
      await apiClient.patch(`/bom/${id}/${action}`);
      setActionFlash({ type: "success", message: successMessage });
      await fetchBom();
    } catch (err) {
      setActionFlash({ type: "danger", message: err.message || `Failed to ${action} BOM` });
    } finally {
      setActionBusy(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    apiClient
      .get(`/bom/${id}/cost`)
      .then(setCostData)
      .catch((err) => console.error("Error loading BOM cost:", err));
  }, [id]);

  const costByItemId = {};
  (costData?.components ?? []).forEach((c) => {
    costByItemId[c.item_id] = c;
  });

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!bom) return <div className="container py-5">❌ BOM not found</div>;

  const fgItem = itemsById[bom.fg_item_id];

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-diagram-3 text-primary"></i> BOM Detail
          </h1>
          <div className="d-flex gap-2">
            {/* PLAN.md step 1.5: draft -> pending_approval -> active */}
            {bom.status === "draft" && (
              <button
                type="button"
                className="btn btn-primary"
                disabled={actionBusy}
                onClick={() => runAction("submit", "✅ Submitted for approval.")}
              >
                <i className="bi bi-send me-2"></i>Submit for Approval
              </button>
            )}
            {bom.status === "pending_approval" && (
              <>
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={actionBusy}
                  onClick={() => runAction("approve", "✅ BOM approved and activated.")}
                >
                  <i className="bi bi-check-circle me-2"></i>Approve
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  disabled={actionBusy}
                  onClick={() => runAction("reject", "↩️ Sent back to draft.")}
                >
                  <i className="bi bi-x-circle me-2"></i>Reject
                </button>
              </>
            )}
            <Link href="/bom" className="btn btn-outline-secondary">
              <i className="bi bi-arrow-left me-2"></i> Back to BOMs
            </Link>
          </div>
        </div>
      </div>

      {actionFlash.message && (
        <div className={`alert alert-${actionFlash.type} alert-dismissible fade show`} role="alert">
          {actionFlash.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setActionFlash({ type: "", message: "" })}
          ></button>
        </div>
      )}

      {/* BOM Info */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">BOM Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <strong>Finished Product:</strong>
              <p>{fgItem ? `${fgItem.name} (${fgItem.sku ?? "-"})` : bom.name}</p>
            </div>
            <div className="col-md-2 mb-3">
              <strong>Version:</strong>
              <p>{bom.version}</p>
            </div>
            <div className="col-md-2 mb-3">
              <strong>Status:</strong>
              <p>
                <span
                  className={`badge bg-${
                    bom.status === "active"
                      ? "success"
                      : bom.status === "pending_approval"
                        ? "warning text-dark"
                        : "secondary"
                  }`}
                >
                  {bom.status === "pending_approval" ? "Pending Approval" : bom.status}
                </span>
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Created At:</strong>
              <p>{new Date(bom.created_at).toLocaleDateString()}</p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Rolled-up Cost:</strong>
              <p className="fs-5 fw-bold text-success mb-0">
                {costData ? `₹${Number(costData.total_cost).toFixed(2)}` : "—"}
              </p>
              <small className="text-muted">
                Sum of each component&apos;s qty × current purchase rate
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Components Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Components</h5>
        </div>
        <div className="card-body">
          {bom.items && bom.items.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th className="text-end">Unit Cost</th>
                    <th className="text-end">Line Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {bom.items.map((comp) => {
                    const item = itemsById[comp.item_id];
                    const cost = costByItemId[comp.item_id];
                    return (
                      <tr key={comp.id}>
                        <td>{item?.sku ?? comp.item_id}</td>
                        <td>{item?.name ?? "-"}</td>
                        <td>{comp.qty}</td>
                        <td className="text-end">
                          {cost ? `₹${Number(cost.unit_cost).toFixed(2)}` : "—"}
                        </td>
                        <td className="text-end">
                          {cost ? `₹${Number(cost.line_cost).toFixed(2)}` : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {costData && (
                  <tfoot>
                    <tr className="table-light fw-bold">
                      <td colSpan={4} className="text-end">
                        Total Cost
                      </td>
                      <td className="text-end">
                        ₹{Number(costData.total_cost).toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          ) : (
            <p className="text-muted">No components found for this BOM</p>
          )}
        </div>
      </div>
    </div>
  );
}
