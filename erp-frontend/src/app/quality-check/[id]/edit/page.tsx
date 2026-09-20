"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Reusing the same interfaces for consistency
type QCStatus = 'pending' | 'approved' | 'rejected';

interface QCItem {
  id: number;
  item_name: string;
  item_code: string;
  received_qty: number;
  checked_qty: number | string;
  passed_qty: number | string;
  failed_qty: number | string;
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

// Reusable UI components
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading QC for Editing...</h4>
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

const EditQualityCheckPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [qc, setQc] = useState<QualityCheck | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

  // ✅ 2. Fetch data and prevent editing of non-pending QCs
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quality-checks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Quality Check not found.");
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await res.json();
        if (data.status !== 'pending') {
             throw new Error(`This QC is already ${data.status} and cannot be edited.`);
        }
        setQc(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setQc(prev => prev ? { ...prev, [id]: value } : null);
  };

  const handleItemChange = (index: number, field: keyof QCItem, value: string | number) => {
    setQc(prevQc => {
        if (!prevQc) return null;
        const updatedItems = [...prevQc.items];
        const item = { ...updatedItems[index] };
        // @ts-ignore
        item[field] = value;
        if (field === 'passed_qty' || field === 'checked_qty') {
            item.failed_qty = Math.max(0, Number(item.checked_qty) - Number(item.passed_qty));
        }
        updatedItems[index] = item;
        return { ...prevQc, items: updatedItems };
    });
  };

  // ✅ 3. Handle form submission with validation and a clean payload
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!qc) return;
    setSubmitting(true);
    setFlash({ type: "", message: "" });

    // Validation
    if (!qc.inspector) {
        setFlash({ type: 'danger', message: 'Inspector name is required.' });
        setSubmitting(false);
        return;
    }

    const payload = {
        qc_date: qc.qc_date,
        inspector: qc.inspector,
        remarks: qc.remarks,
        status: qc.status,
        items: qc.items.map(item => ({
            id: item.id,
            checked_qty: Number(item.checked_qty),
            passed_qty: Number(item.passed_qty),
            failed_qty: Number(item.failed_qty),
            remarks: item.remarks
        }))
    };

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quality-checks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Cookies.set("flashMessage", "Quality Check updated successfully!", { path: "/" });
        Cookies.set("flashType", "success", { path: "/" });
        router.push(`/quality-check/${id}`);
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to update QC." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "A server error occurred." });
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!qc) return <ErrorDisplay message="QC data could not be loaded." />;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-pencil-square text-warning me-2"></i> Edit QC #{qc.qc_number}</h1>
        <Link href={`/quality-check/${id}`} className="btn btn-secondary"><i className="bi bi-x-circle me-2"></i> Cancel</Link>
      </div>

      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>{flash.message}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-light"><h5 className="mb-0">QC Details</h5></div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4"><label className="form-label">GRN Ref.</label><input type="text" className="form-control" value={qc.grn_number} readOnly disabled /></div>
                  <div className="col-md-4"><label htmlFor="qc_date" className="form-label">QC Date *</label><input type="date" id="qc_date" className="form-control" value={qc.qc_date?.split("T")[0]} onChange={handleChange} required /></div>
                  <div className="col-md-4"><label htmlFor="inspector" className="form-label">Inspector *</label><input type="text" id="inspector" className="form-control" value={qc.inspector} onChange={handleChange} required /></div>
                  <div className="col-12"><label htmlFor="remarks" className="form-label">Remarks</label><textarea id="remarks" className="form-control" rows={2} value={qc.remarks || ''} onChange={handleChange}></textarea></div>
                </div>
              </div>
            </div>
            
            <div className="card shadow-sm">
                <div className="card-header bg-light"><h5 className="mb-0">Inspected Items</h5></div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0 align-middle">
                            <thead className="table-light">
                            <tr>
                                <th>Item</th>
                                <th className="text-end">Received</th>
                                <th className="text-end">Checked *</th>
                                <th className="text-end">Passed *</th>
                                <th className="text-end">Failed</th>
                                <th>Remarks</th>
                            </tr>
                            </thead>
                            <tbody>
                            {qc.items.map((item, i) => (
                                <tr key={item.id}>
                                <td>{item.item_name}<br/><small className="text-muted">{item.item_code}</small></td>
                                <td className="text-end">{item.received_qty}</td>
                                <td><input type="number" className="form-control text-end" value={item.checked_qty} onChange={(e) => handleItemChange(i, "checked_qty", e.target.value)} required /></td>
                                <td><input type="number" className="form-control text-end" value={item.passed_qty} onChange={(e) => handleItemChange(i, "passed_qty", e.target.value)} max={Number(item.checked_qty)} required /></td>
                                <td><input type="number" className="form-control text-end" value={item.failed_qty} readOnly disabled /></td>
                                <td><input type="text" className="form-control" value={item.remarks || ''} onChange={(e) => handleItemChange(i, "remarks", e.target.value)} /></td>
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
                <label htmlFor="status" className="form-label">Set Final Status</label>
                <select id="status" className="form-select mb-3" value={qc.status} onChange={handleChange}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-warning" disabled={submitting}>
                        {submitting ? 'Updating...' : <><i className="bi bi-check-circle me-2"></i> Update QC</>}
                    </button>
                    <Link href={`/quality-check/${id}`} className="btn btn-secondary">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditQualityCheckPage;