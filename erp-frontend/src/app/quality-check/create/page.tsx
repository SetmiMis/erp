"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Define detailed interfaces for QC data structures
type QCResult = 'pending' | 'pass' | 'fail';
type QCStatus = 'pending' | 'approved' | 'rejected';

interface QCItem {
  item_id: number;
  item_name: string;
  item_code: string;
  received_qty: number;
  checked_qty: number | string;
  passed_qty: number | string;
  failed_qty: number | string;
  remarks: string;
}

interface QCFormData {
  qc_date: string;
  grn_id: number | "";
  inspector: string;
  remarks: string;
  status: QCStatus;
}

interface GRNForQCOption {
  id: number;
  receipt_number: string;
}

interface FullGRNForQC {
  id: number;
  items: Array<{
    id: number;
    item_id: number;
    item_name: string;
    item_code: string;
    received_qty: number;
  }>;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

const CreateQualityCheckPage: FC = () => {
  const router = useRouter();
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Data for dropdowns and tables
  const [pendingGRNs, setPendingGRNs] = useState<GRNForQCOption[]>([]);
  const [qcItems, setQcItems] = useState<QCItem[]>([]);

  const [form, setForm] = useState<QCFormData>({
    qc_date: new Date().toISOString().split("T")[0],
    grn_id: "",
    inspector: "", // Should be auto-filled from user session in a real app
    remarks: "",
    status: "pending",
  });

  // ✅ 2. Fetch GRNs that are completed but pending a QC
  useEffect(() => {
    const fetchPendingGRNs = async () => {
      try {
        const token = Cookies.get("token");
        // Assuming an endpoint to get GRNs that need a QC
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn?status=completed&qc_status=pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
          setPendingGRNs((await res.json()).data);
        }
      } catch (err) {
        setFlash({ type: 'danger', message: 'Failed to load GRNs needing quality check.' });
      }
    };
    fetchPendingGRNs();
  }, []);
  
  // ✅ 3. Automatically load items when a GRN is selected
  const handleGRNChange = async (grnId: string) => {
    const grn_id_num = Number(grnId);
    setForm({ ...form, grn_id: grn_id_num });

    if (!grn_id_num) {
      setQcItems([]);
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn/${grn_id_num}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data: grn } = await res.json();
        setQcItems(
          grn.items.map(item => ({
            item_id: item.item_id,
            item_name: item.item_name,
            item_code: item.item_code,
            received_qty: item.received_qty,
            checked_qty: item.received_qty, // Default to checking all received items
            passed_qty: item.received_qty,  // Default to all passing
            failed_qty: 0,
            remarks: "",
          }))
        );
      }
    } catch (err) {
      setFlash({ type: 'danger', message: 'Error loading items from selected GRN.' });
    }
  };

  const handleItemChange = (index: number, field: keyof QCItem, value: string | number) => {
    const updatedItems = [...qcItems];
    const item = { ...updatedItems[index] };
    // @ts-ignore
    item[field] = value;
    
    // Auto-calculate failed quantity
    if (field === 'passed_qty') {
        const checked = Number(item.checked_qty);
        const passed = Number(value);
        item.failed_qty = Math.max(0, checked - passed);
    }

    updatedItems[index] = item;
    setQcItems(updatedItems);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  
  // ✅ 4. Robust handleSubmit with validation and correct payload
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFlash({ type: "", message: "" });

    if (!form.grn_id || !form.inspector || qcItems.length === 0) {
      setFlash({ type: "danger", message: "GRN Reference, Inspector, and at least one item are required." });
      setSubmitting(false);
      return;
    }
    
    // Prepare payload for backend DTO
    const payload = {
        qc_date: form.qc_date,
        grn_id: form.grn_id,
        inspector: form.inspector,
        remarks: form.remarks,
        status: form.status,
        items: qcItems.map(item => ({
            item_id: item.item_id,
            checked_qty: Number(item.checked_qty),
            passed_qty: Number(item.passed_qty),
            failed_qty: Number(item.failed_qty),
            remarks: item.remarks,
        }))
    };

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quality-checks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope
        // (was showing "Quality Check undefined created successfully!").
        const { data } = await res.json();
        Cookies.set("flashMessage", `Quality Check ${data.qc_number} created successfully!`, { path: "/" });
        Cookies.set("flashType", "success", { path: "/" });
        router.push("/quality-check");
      } else {
        const err = await res.json();
        const errorMessages = Array.isArray(err.message) ? err.message.join(', ') : err.message;
        setFlash({ type: "danger", message: errorMessages || "Failed to create QC." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "A server error occurred." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-clipboard-plus text-primary me-2"></i> Create Quality Check</h1>
        <Link href="/quality-check" className="btn btn-secondary"><i className="bi bi-arrow-left me-2"></i>Back to List</Link>
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
              <div className="card-header bg-light"><h5 className="mb-0">QC Details</h5></div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="grn_id" className="form-label">GRN Reference *</label>
                    <select id="grn_id" className="form-select" value={form.grn_id} onChange={(e) => handleGRNChange(e.target.value)} required>
                      <option value="">Select a GRN</option>
                      {pendingGRNs.map(grn => (
                        <option key={grn.id} value={grn.id}>{grn.receipt_number}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="qc_date" className="form-label">QC Date *</label>
                    <input type="date" id="qc_date" className="form-control" value={form.qc_date} onChange={handleChange} required />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="inspector" className="form-label">Inspector *</label>
                    <input type="text" id="inspector" className="form-control" value={form.inspector} onChange={handleChange} placeholder="Inspector name" required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="remarks" className="form-label">Remarks</label>
                    <textarea id="remarks" className="form-control" rows={2} value={form.remarks} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-header bg-light"><h5 className="mb-0">Actions</h5></div>
              <div className="card-body">
                <label htmlFor="status" className="form-label">Overall Status *</label>
                <select id="status" className="form-select" value={form.status} onChange={handleChange} required>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <hr />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Saving...' : <><i className="bi bi-check-circle me-2"></i>Create QC</>}
                  </button>
                  <Link href="/quality-check" className="btn btn-outline-secondary">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mt-4">
          <div className="card-header bg-light"><h5 className="mb-0">Items to Inspect</h5></div>
          <div className="card-body">
            {!qcItems.length ? (
              <p className="text-muted text-center p-4">Select a GRN to load items for inspection.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th className="text-end">Received</th>
                      <th style={{ width: '12%' }} className="text-end">Checked</th>
                      <th style={{ width: '12%' }} className="text-end">Passed</th>
                      <th style={{ width: '12%' }} className="text-end">Failed</th>
                      <th style={{ width: '20%' }}>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {qcItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item_name}<br /><small className="text-muted">{item.item_code}</small></td>
                        <td className="text-end">{item.received_qty}</td>
                        <td><input type="number" className="form-control text-end" value={item.checked_qty} onChange={(e) => handleItemChange(index, "checked_qty", e.target.value)} required /></td>
                        <td><input type="number" className="form-control text-end" value={item.passed_qty} onChange={(e) => handleItemChange(index, "passed_qty", e.target.value)} max={item.checked_qty} required /></td>
                        <td><input type="number" className="form-control text-end" value={item.failed_qty} readOnly disabled /></td>
                        <td><input type="text" className="form-control" value={item.remarks} onChange={(e) => handleItemChange(index, "remarks", e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQualityCheckPage;