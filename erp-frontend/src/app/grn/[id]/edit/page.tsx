"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Updated interfaces to match the new API structure
type GRNStatus = 'draft' | 'completed' | 'cancelled';

interface GRNItem {
  id: number; // This is the grn_item ID
  item: {
    item_name: string;
    item_code: string;
    unit?: string;
  };
  ordered_qty: number;
  received_qty: number | string; // Use string for input field compatibility
  remarks?: string;
}

interface GRN {
  id: number;
  grn_number: string; // Changed from receipt_number
  purchaseOrder: {
    po_number: string;
  };
  received_date: string; // Changed from receipt_date
  remarks?: string;
  status: GRNStatus;
  items: GRNItem[];
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// Reusable UI components (no changes)
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading GRN for Editing...</h4>
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

const EditGRNPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [grn, setGrn] = useState<GRN | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

  // Data fetching logic
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
            throw new Error(errData.message || "GRN not found or you don't have permission to edit it.");
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await res.json();
        if (data.status === 'completed') {
             throw new Error("This GRN is already completed and cannot be edited.");
        }
        setGrn(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // State handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setGrn(prev => prev ? { ...prev, [id]: value } : null);
  };

  const handleItemChange = (index: number, field: 'received_qty' | 'remarks', value: string | number) => {
    setGrn(prevGrn => {
        if (!prevGrn) return null;
        const updatedItems = [...prevGrn.items];
        const itemToUpdate = { ...updatedItems[index], [field]: value };
        updatedItems[index] = itemToUpdate;
        return { ...prevGrn, items: updatedItems };
    });
  };

  // Form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!grn) return;

    setSubmitting(true);
    setFlash({ type: "", message: "" });

    // Client-side validation
    for (const item of grn.items) {
        if (Number(item.received_qty) < 0 || Number(item.received_qty) > item.ordered_qty) {
            setFlash({ type: 'danger', message: `Invalid received quantity for item ${item.item.item_name}.` });
            setSubmitting(false);
            return;
        }
    }

    // ✅ 2. Updated payload to use the correct field name 'received_date'
    const payload = {
        received_date: grn.received_date,
        remarks: grn.remarks,
        status: grn.status,
        items: grn.items.map(item => ({
            id: item.id, // This is the grn_item ID
            received_qty: Number(item.received_qty),
            remarks: item.remarks
        }))
    };

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Cookies.set("flashMessage", "GRN updated successfully!", { path: "/" });
        Cookies.set("flashType", "success", { path: "/" });
        router.push(`/grn/${id}`);
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to update GRN." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "A server error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!grn) return <ErrorDisplay message="GRN data could not be loaded." />;


  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">
          <i className="bi bi-pencil-square text-warning me-2"></i> 
          {/* ✅ 3. JSX updated to use new property names */}
          Edit GRN #{grn.grn_number}
        </h1>
        <Link href={`/grn/${id}`} className="btn btn-secondary">
          <i className="bi bi-x-circle me-2"></i> Cancel
        </Link>
      </div>

      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
          {flash.message}
          <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light"><h5 className="mb-0">GRN Details</h5></div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">PO Number</label>
                    <input type="text" className="form-control" value={grn.purchaseOrder?.po_number || ""} readOnly disabled />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="received_date" className="form-label">GRN Date *</label>
                    <input
                      type="date"
                      id="received_date"
                      className="form-control"
                      value={grn.received_date?.split("T")[0] || ""}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="remarks" className="form-label">Remarks</label>
                    <textarea
                      id="remarks"
                      className="form-control"
                      rows={2}
                      value={grn.remarks || ""}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card shadow-sm">
                <div className="card-header bg-light"><h5 className="mb-0">Received Items</h5></div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                      <thead className="table-light">
                      <tr>
                          <th>Item</th>
                          <th className="text-end">Ordered</th>
                          <th style={{width: '15%'}} className="text-end">Received *</th>
                          <th style={{width: '25%'}}>Remarks</th>
                      </tr>
                      </thead>
                      <tbody>
                      {grn.items.map((item, i) => (
                          <tr key={item.id}>
                          {/* ✅ 4. JSX updated for nested item object */}
                          <td>{item.item.item_name} <br/><small className="text-muted">{item.item.item_code}</small></td>
                          <td className="text-end">{item.ordered_qty} {item.item.unit}</td>
                          <td>
                              <input
                              type="number"
                              className="form-control text-end"
                              value={item.received_qty}
                              onChange={(e) => handleItemChange(i, "received_qty", e.target.value)}
                              min="0"
                              max={item.ordered_qty}
                              required
                              />
                          </td>
                          <td>
                              <input
                              type="text"
                              className="form-control"
                              value={item.remarks || ''}
                              onChange={(e) => handleItemChange(i, "remarks", e.target.value)}
                              />
                          </td>
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
              <div className="card-header bg-light"><h5 className="mb-0">Actions</h5></div>
              <div className="card-body">
                <label htmlFor="status" className="form-label">Set Status</label>
                <select id="status" className="form-select mb-3" value={grn.status} onChange={handleChange}>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-warning" disabled={submitting}>
                    {submitting ? 'Updating...' : <><i className="bi bi-check-circle me-2"></i> Update GRN</>}
                  </button>
                  <Link href={`/grn/${id}`} className="btn btn-secondary">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditGRNPage;