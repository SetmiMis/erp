"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

// ✅ 1. Define detailed interfaces for QC data
type QCStatus = 'pending' | 'approved' | 'rejected';

interface QualityCheck {
  id: number;
  qc_number: string;
  qc_date: string;
  inspector: string;
  status: QCStatus;
  grn_number?: string; // Contextual information
  items_count: number;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. Create reusable components for clean UI states
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-clipboard-x fs-1 text-muted"></i>
    <h4 className="mt-3 text-muted">No Quality Checks Found</h4>
    <p className="text-muted">Get started by creating your first quality check for a GRN.</p>
    <Link href="/quality-check/create" className="btn btn-primary mt-2">
      <i className="bi bi-plus-circle me-2"></i>Create First QC
    </Link>
  </div>
);

const LoadingSpinner: FC = () => (
    <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <p className="mt-2 text-muted">Loading Quality Checks...</p>
    </div>
);

// ✅ 3. Convert the component to a typed FC with full state management
const QualityCheckListPage: FC = () => {
  const [qcs, setQcs] = useState<QualityCheck[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for server-side filtering
  const [status, setStatus] = useState<string>("");

  // ✅ 4. Implement server-side filtering
  useEffect(() => {
    fetchQcs();
  }, [status]); // Refetch when filter changes

  // Check for flash messages from redirects
  useEffect(() => {
    const message = Cookies.get("flashMessage");
    const type = Cookies.get("flashType") as FlashMessage['type'] | "";
    if (message && type) {
        setFlash({ type, message });
        Cookies.remove("flashMessage");
        Cookies.remove("flashType");
    }
  }, []);

  const fetchQcs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const query = new URLSearchParams({ status }).toString();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quality-checks?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch quality checks.");
      // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
      const { data } = await res.json();
      setQcs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // ✅ 5. Add a complete and robust handleDelete function
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this Quality Check?")) return;

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quality-checks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFlash({ type: "success", message: "Quality Check deleted successfully!" });
        fetchQcs(); // Refresh the list from the server
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to delete QC." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "Server error while deleting." });
    }
  };

  const statusClass: Record<QCStatus, string> = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };

  return (
    <div className="container-fluid">
      {/* Header & Flash Messages */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-clipboard-check text-primary me-2"></i> Quality Checks</h1>
        <Link href="/quality-check/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> New QC</Link>
      </div>
      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
          {flash.message}
          <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}

      {/* Filters Card */}
      <div className="card border-0 shadow-sm mb-4">
          <div className="card-body">
              <div className="row g-3">
                  <div className="col-md-4">
                      <label htmlFor="status" className="form-label">Filter by Status</label>
                      <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="">All Statuses</option>
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>

      {/* Table Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light border-0">
            <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i> QC List <span className="badge bg-primary rounded-pill ms-2">{qcs.length}</span></h5>
        </div>
        <div className="card-body">
          {loading ? <LoadingSpinner />
            : error ? <div className="alert alert-danger">{error}</div>
            : qcs.length === 0 ? <NoDataDisplay />
            : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>QC Number</th>
                    <th>Date</th>
                    <th>GRN Ref.</th>
                    <th>Inspector</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {qcs.map((qc) => (
                    <tr key={qc.id}>
                      <td><strong>{qc.qc_number}</strong></td>
                      <td>{new Date(qc.qc_date).toLocaleDateString("en-GB")}</td>
                      <td>{qc.grn_number || 'N/A'}</td>
                      <td>{qc.inspector}</td>
                      <td>{qc.items_count}</td>
                      <td>
                        <span className={`badge bg-${statusClass[qc.status] || "secondary"} text-capitalize`}>
                          {qc.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                            <Link href={`/quality-check/${qc.id}`} className="btn btn-outline-primary" title="View"><i className="bi bi-eye"></i></Link>
                            {qc.status === "pending" && (
                                <Link href={`/quality-check/${qc.id}/edit`} className="btn btn-outline-secondary" title="Edit"><i className="bi bi-pencil"></i></Link>
                            )}
                            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(qc.id)} title="Delete"><i className="bi bi-trash"></i></button>
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
};

export default QualityCheckListPage;