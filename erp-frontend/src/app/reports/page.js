"use client";

import Link from "next/link";
import { apiClient } from "../../lib/apiClient";

// Trigger a browser download for one of the real ReportsController export
// endpoints (erp-backend/src/reports/reports.controller.ts) — these need the
// auth header attached, so a plain <a href> link won't work; we fetch via
// apiClient (which returns the raw Response for non-JSON payloads) and save
// the blob ourselves.
async function downloadReport(endpoint, fallbackFilename) {
  try {
    const res = await apiClient.get(endpoint);
    const blob = await res.blob();
    const disposition = res.headers.get("content-disposition") || "";
    const match = disposition.match(/filename=([^;]+)/);
    const filename = match ? match[1].trim() : fallbackFilename;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    alert("❌ Failed to generate report: " + (err.message || "unknown error"));
  }
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

export default function ReportsDashboard() {
  const downloadStock = (format) =>
    downloadReport(`/reports/stock?export=${format}`, `Stock_Report.${format === "excel" ? "xlsx" : "pdf"}`);
  const downloadPurchase = (format) =>
    downloadReport(
      `/reports/purchase-orders?export=${format}`,
      `Purchase_Orders.${format === "excel" ? "xlsx" : "pdf"}`,
    );
  const downloadGrn = (format) =>
    downloadReport(`/reports/grn?export=${format}`, `GRN_Report.${format === "excel" ? "xlsx" : "pdf"}`);
  const downloadDispatch = (format) =>
    downloadReport(
      `/reports/dispatch?export=${format}`,
      `Dispatch_Report.${format === "excel" ? "xlsx" : "pdf"}`,
    );

  const generatePeriodReport = (days) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    downloadReport(
      `/reports/purchase-orders?from=${isoDate(from)}&to=${isoDate(to)}&export=excel`,
      `Purchase_Orders_${isoDate(from)}_to_${isoDate(to)}.xlsx`,
    );
  };

  const showAlerts = async () => {
    try {
      const summary = await apiClient.get("/dashboard/summary");
      const lowStock = summary?.stockSummary?.lowStockItems ?? [];
      if (lowStock.length === 0) {
        alert("✅ No items are currently below their reorder level.");
        return;
      }
      const lines = lowStock
        .map((s) => `• ${s.item_name} (${s.item_code ?? "-"}) @ ${s.warehouse_name}: ${s.quantity}`)
        .join("\n");
      alert(`⚠️ Low stock items:\n\n${lines}`);
    } catch (err) {
      alert("❌ Failed to load alerts: " + (err.message || "unknown error"));
    }
  };

  const notYetAvailable = (feature) =>
    alert(`${feature} isn't backed by an API yet — planned for a follow-up release.`);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <i className="bi bi-graph-up text-primary"></i> Reports & Analytics
          </h1>
          <button className="btn btn-outline-primary" onClick={() => downloadStock("excel")}>
            <i className="bi bi-download me-2"></i>Export Stock Report
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="row">
        {/* Inventory */}
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-boxes display-1 text-primary mb-3"></i>
              <h5 className="card-title">Inventory Reports</h5>
              <p className="text-muted">
                Stock levels, movements, and warehouse analytics
              </p>
              <div className="d-grid gap-2">
                <div className="btn-group">
                  <button className="btn btn-primary" onClick={() => downloadStock("excel")}>
                    <i className="bi bi-file-earmark-excel me-2"></i>Excel
                  </button>
                  <button className="btn btn-primary" onClick={() => downloadStock("pdf")}>
                    <i className="bi bi-file-earmark-pdf me-2"></i>PDF
                  </button>
                </div>
                <Link href="/current-stock" className="btn btn-outline-primary">
                  <i className="bi bi-list me-2"></i>Current Stock
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase */}
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-cart-check display-1 text-success mb-3"></i>
              <h5 className="card-title">Purchase Reports</h5>
              <p className="text-muted">
                Purchase orders, GRN and spend analysis
              </p>
              <div className="d-grid gap-2">
                <div className="btn-group">
                  <button className="btn btn-success" onClick={() => downloadPurchase("excel")}>
                    <i className="bi bi-file-earmark-excel me-2"></i>Excel
                  </button>
                  <button className="btn btn-success" onClick={() => downloadPurchase("pdf")}>
                    <i className="bi bi-file-earmark-pdf me-2"></i>PDF
                  </button>
                </div>
                <Link href="/purchase-orders" className="btn btn-outline-success">
                  <i className="bi bi-list me-2"></i>All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Production */}
        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body text-center">
              <i className="bi bi-gear-wide-connected display-1 text-warning mb-3"></i>
              <h5 className="card-title">Production Reports</h5>
              <p className="text-muted">
                Production efficiency, order status, and utilization
              </p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-warning"
                  onClick={() => notYetAvailable("A dedicated production report")}
                >
                  <i className="bi bi-graph-up me-2"></i>Coming Soon
                </button>
                <Link href="/production-orders" className="btn btn-outline-warning">
                  <i className="bi bi-list me-2"></i>All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Analytics */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-speedometer2 text-info me-2"></i>
                Quick Analytics
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <h4 className="text-primary">
                    <i className="bi bi-trend-up"></i> Daily Operations
                  </h4>
                  <p className="text-muted">Track today's activities</p>
                  <Link
                    href="/dashboard"
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Dashboard
                  </Link>
                </div>
                <div className="col-md-3 mb-3">
                  <h4 className="text-success">
                    <i className="bi bi-calendar-check"></i> Weekly Summary
                  </h4>
                  <p className="text-muted">Purchase orders, last 7 days</p>
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => generatePeriodReport(7)}
                  >
                    Generate Report
                  </button>
                </div>
                <div className="col-md-3 mb-3">
                  <h4 className="text-warning">
                    <i className="bi bi-calendar-month"></i> Monthly Analysis
                  </h4>
                  <p className="text-muted">Purchase orders, last 30 days</p>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => generatePeriodReport(30)}
                  >
                    Generate Report
                  </button>
                </div>
                <div className="col-md-3 mb-3">
                  <h4 className="text-danger">
                    <i className="bi bi-exclamation-triangle"></i> Critical
                    Alerts
                  </h4>
                  <p className="text-muted">Items below reorder level</p>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={showAlerts}
                  >
                    View Alerts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Export & Import */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-download text-primary me-2"></i> Data Export
                & Import Tools
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Import */}
                <div className="col-md-6">
                  <h6>
                    <i className="bi bi-upload me-2"></i>Import Data{" "}
                    <span className="badge bg-secondary">Coming soon</span>
                  </h6>
                  <p className="text-muted small">
                    Bulk import isn't backed by an API yet.
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => notYetAvailable("Supplier import")}
                    >
                      <i className="bi bi-people me-1"></i>Suppliers
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => notYetAvailable("Item import")}
                    >
                      <i className="bi bi-box me-1"></i>Items
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => notYetAvailable("Stock import")}
                    >
                      <i className="bi bi-boxes me-1"></i>Stock
                    </button>
                  </div>
                </div>
                {/* Export */}
                <div className="col-md-6">
                  <h6>
                    <i className="bi bi-download me-2"></i>Export GRN / Dispatch
                  </h6>
                  <p className="text-muted small">
                    Export to Excel or PDF
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => downloadGrn("excel")}
                    >
                      <i className="bi bi-filetype-xlsx me-1"></i>GRN (Excel)
                    </button>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => downloadDispatch("excel")}
                    >
                      <i className="bi bi-filetype-xlsx me-1"></i>Dispatch (Excel)
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => downloadDispatch("pdf")}
                    >
                      <i className="bi bi-filetype-pdf me-1"></i>Dispatch (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
