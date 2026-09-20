"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Define detailed interfaces for QC data
type QCStatus = 'pending' | 'approved' | 'rejected';

interface QCItem {
  id: number;
  item_name: string;
  item_code: string;
  received_qty: number;
  checked_qty: number;
  passed_qty: number;
  failed_qty: number;
  remarks?: string;
}

interface QualityCheck {
  id: number;
  qc_number: string;
  qc_date: string;
  inspector: string;
  grn_number: string;
  remarks?: string;
  status: QCStatus;
  items: QCItem[];
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. Reusable components for loading and error states
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading Quality Check...</h4>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">An Error Occurred</h4>
        <p className="text-muted">{message}</p>
        <Link href="/quality-check" className="btn btn-primary"><i className="bi bi-arrow-left me-2"></i>Back to List</Link>
    </div>
);

const QualityCheckDetailsPage: FC = () => {
  const { id } = useParams();
  const [qc, setQc] = useState<QualityCheck | null>(null);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for flash messages from redirects (e.g., after an update)
    const message = Cookies.get("flashMessage");
    const type = Cookies.get("flashType") as FlashMessage['type'] | undefined;
    if (message && type) {
        setFlash({ type, message });
        Cookies.remove("flashMessage");
        Cookies.remove("flashType");
    }

    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quality-checks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Quality Check not found.");
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        setQc((await res.json()).data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!qc) return <ErrorDisplay message="Quality Check data could not be loaded." />;

  const statusClass: Record<QCStatus, string> = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };
  
  const totalChecked = qc.items.reduce((sum, item) => sum + item.checked_qty, 0);
  const totalPassed = qc.items.reduce((sum, item) => sum + item.passed_qty, 0);
  const totalFailed = qc.items.reduce((sum, item) => sum + item.failed_qty, 0);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-clipboard-check text-primary me-2"></i> QC #{qc.qc_number}</h1>
        <div>
          <Link href="/quality-check" className="btn btn-secondary me-2"><i className="bi bi-arrow-left me-2"></i> Back to List</Link>
          {qc.status === 'pending' && (
             <Link href={`/quality-check/${qc.id}/edit`} className="btn btn-warning"><i className="bi bi-pencil me-2"></i> Edit</Link>
          )}
        </div>
      </div>

      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
          {flash.message}
          <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}
      
      <div className="row">
        <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Inspection Details</h5>
                  <span className={`badge bg-${statusClass[qc.status] || "secondary"} fs-6 text-capitalize`}>{qc.status}</span>
              </div>
              <div className="card-body">
                  <div className="row">
                      <div className="col-md-4 mb-3"><p className="mb-0 text-muted">GRN Reference:</p><h5>{qc.grn_number}</h5></div>
                      <div className="col-md-4 mb-3"><p className="mb-0 text-muted">QC Date:</p><h5>{new Date(qc.qc_date).toLocaleDateString('en-GB')}</h5></div>
                      <div className="col-md-4 mb-3"><p className="mb-0 text-muted">Inspector:</p><h5>{qc.inspector}</h5></div>
                      {qc.remarks && <div className="col-12"><p className="mb-0 text-muted">Remarks:</p><p>{qc.remarks}</p></div>}
                  </div>
              </div>
            </div>

            <div className="card shadow-sm">
                 <div className="card-header bg-light"><h5 className="mb-0"><i className="bi bi-list-ul me-2"></i> Inspected Items</h5></div>
                 <div className="card-body p-0">
                   <div className="table-responsive">
                       <table className="table table-hover mb-0 align-middle">
                         <thead className="table-light">
                           <tr>
                             <th>Item</th>
                             <th className="text-end">Checked</th>
                             <th className="text-end">Passed</th>
                             <th className="text-end">Failed</th>
                             <th>Remarks</th>
                           </tr>
                         </thead>
                         <tbody>
                           {qc.items.map((item) => (
                             <tr key={item.id}>
                               <td><strong>{item.item_name}</strong><br/><small className="text-muted">{item.item_code}</small></td>
                               <td className="text-end">{item.checked_qty}</td>
                               <td className="text-end text-success">{item.passed_qty}</td>
                               <td className="text-end text-danger fw-bold">{item.failed_qty}</td>
                               <td>{item.remarks || "-"}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                   </div>
                 </div>
            </div>
        </div>
        <div className="col-lg-4">
             <div className="card shadow-sm">
                 <div className="card-header bg-light"><h5 className="mb-0">Summary</h5></div>
                 <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">Total Items:<span className="fw-bold">{qc.items?.length || 0}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">Total Qty Checked:<span className="fw-bold">{totalChecked}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 text-success">Total Qty Passed:<span className="fw-bold text-success">{totalPassed}</span></li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0 text-danger">Total Qty Failed:<span className="fw-bold text-danger">{totalFailed}</span></li>
                    </ul>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QualityCheckDetailsPage;