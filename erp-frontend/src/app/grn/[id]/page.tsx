"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Define detailed interfaces for GRN data structures
type GRNStatus = 'draft' | 'completed';

interface GRNItem {
  id: number;
  item_name: string;
  item_code: string;
  ordered_qty: number;
  received_qty: number;
  uom?: string;
  remarks?: string;
}

interface GRN {
  id: number;
  receipt_number: string;
  po_number: string;
  supplier_name: string;
  receipt_date: string; // Comes as ISO string from API
  remarks?: string;
  status: GRNStatus;
  items: GRNItem[];
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. Create reusable components for clean UI states
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading GRN Details...</h4>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">An Error Occurred</h4>
        <p className="text-muted">{message}</p>
        <Link href="/grn" className="btn btn-primary"><i className="bi bi-arrow-left me-2"></i>Back to List</Link>
    </div>
);

const GRNDetailsPage: FC = () => {
  const { id } = useParams();
  const [grn, setGrn] = useState<GRN | null>(null);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ 3. Implement robust, authenticated data fetching
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "GRN not found");
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await res.json();
        setGrn(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ✅ 4. Render UI based on loading, error, or success states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!grn) return <ErrorDisplay message="Goods Receipt Note not found." />;

  const statusClass: Record<GRNStatus, string> = {
    draft: "secondary",
    completed: "success",
  };

  const totalReceivedQty = grn.items.reduce((sum, item) => sum + item.received_qty, 0);

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">
          <i className="bi bi-box-arrow-in-down text-primary me-2"></i>
          GRN #{grn.receipt_number}
        </h1>
        <div>
          <Link href="/grn" className="btn btn-secondary me-2">
            <i className="bi bi-arrow-left me-2"></i> Back to List
          </Link>
          {grn.status === 'draft' && (
             <Link href={`/grn/${grn.id}/edit`} className="btn btn-warning">
               <i className="bi bi-pencil me-2"></i> Edit
             </Link>
          )}
        </div>
      </div>

      {/* Flash Messages */}
      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
          {flash.message}
          <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}
      
      {/* ✅ 5. Use a professional two-column layout */}
      <div className="row">
        <div className="col-lg-8">
            {/* GRN Details Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Details</h5>
                  <span className={`badge bg-${statusClass[grn.status] || "secondary"} fs-6 text-capitalize`}>{grn.status}</span>
              </div>
              <div className="card-body">
                  <div className="row">
                      <div className="col-md-6 mb-3"><p className="mb-0 text-muted">Purchase Order:</p><h5>{grn.po_number}</h5></div>
                      <div className="col-md-6 mb-3"><p className="mb-0 text-muted">Supplier:</p><h5>{grn.supplier_name}</h5></div>
                      <div className="col-md-6 mb-3"><p className="mb-0 text-muted">Receipt Date:</p><h5>{new Date(grn.receipt_date).toLocaleDateString('en-GB')}</h5></div>
                      {grn.remarks && <div className="col-12"><p className="mb-0 text-muted">Remarks:</p><p>{grn.remarks}</p></div>}
                  </div>
              </div>
            </div>

            {/* Items Card */}
            <div className="card shadow-sm">
                 <div className="card-header bg-light"><h5 className="mb-0"><i className="bi bi-list-ul me-2"></i> Received Items</h5></div>
                 <div className="card-body p-0">
                   {!grn.items?.length ? (
                     <p className="text-muted text-center p-4">No items found for this GRN.</p>
                   ) : (
                     <div className="table-responsive">
                       <table className="table table-hover mb-0 align-middle">
                         <thead className="table-light">
                           <tr>
                             <th>Item</th>
                             <th className="text-end">Ordered Qty</th>
                             <th className="text-end">Received Qty</th>
                             <th>Remarks</th>
                           </tr>
                         </thead>
                         <tbody>
                           {grn.items.map((item) => (
                             <tr key={item.id}>
                               <td>
                                 <strong>{item.item_name}</strong>
                                 <br/>
                                 <small className="text-muted">{item.item_code}</small>
                               </td>
                               <td className="text-end">{item.ordered_qty} {item.uom || ''}</td>
                               <td className="text-end fw-bold">{item.received_qty} {item.uom || ''}</td>
                               <td>{item.remarks || "-"}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                   )}
                 </div>
            </div>
        </div>
        <div className="col-lg-4">
             {/* Summary Card */}
             <div className="card shadow-sm">
                 <div className="card-header bg-light"><h5 className="mb-0">Summary</h5></div>
                 <div className="card-body">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Total Item Lines:
                            <span className="fw-bold">{grn.items?.length || 0}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Total Received Qty:
                            <span className="fw-bold">{totalReceivedQty}</span>
                        </li>
                    </ul>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GRNDetailsPage;