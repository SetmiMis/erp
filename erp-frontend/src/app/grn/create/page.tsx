"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
// ✅ Animation ke liye import karein
import { motion, AnimatePresence } from "framer-motion";

// ✅ Sahi data structure Interfaces
interface SupplierOption {
  id: number;
  name: string;
}

interface PurchaseOrderOption {
  id: number;
  po_number: string;
  supplier: {
      id: number;
      name: string;
  };
}

interface GRNItem {
  item_id: number;
  item_name: string;
  item_code: string;
  uom: string;
  ordered_qty: number;
  received_qty: number | string;
  remarks: string;
}

interface GRNFormData {
  grn_number: string; // ✅ GRN Number add kiya gaya
  supplier_id: number | "";
  purchase_order_id: number | "";
  grn_date: string;
  invoice_number: string;
  remarks: string;
  warehouse_name: string;
}

interface FullPurchaseOrder {
  supplier_id: number;
  warehouse_name: string;
  items: Array<{
    item_id: number;
    item_name: string;
    item_code: string;
    uom: string;
    ordered_qty: number;
  }>;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
  tap: { scale: 0.95 },
};

const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
};


const CreateGRNPage: FC = () => {
  const router = useRouter();
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderOption[]>([]);
  const [grnItems, setGrnItems] = useState<GRNItem[]>([]);

  const [form, setForm] = useState<GRNFormData>({
    grn_number: "", // ✅ Initial state me add kiya gaya
    supplier_id: "",
    purchase_order_id: "",
    grn_date: new Date().toISOString().split("T")[0],
    invoice_number: "",
    remarks: "",
    warehouse_name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [supRes, poRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders?status=acknowledged`, { headers }),
        ]);
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        if (supRes.ok) setSuppliers((await supRes.json()).data);
        if (poRes.ok) setPurchaseOrders((await poRes.json()).data);
      } catch (err) {
        setFlash({ type: 'danger', message: 'Failed to load initial data.' });
      }
    };
    fetchData();
  }, []);

  const handlePOChange = async (poId: string) => {
    const po_id_num = Number(poId);

    if (!po_id_num) {
      setGrnItems([]);
      setForm(prev => ({ ...prev, purchase_order_id: "", supplier_id: "", warehouse_name: "" }));
      return;
    }

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders/${po_id_num}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data: po } = await res.json();
        setForm(prev => ({ ...prev, purchase_order_id: po_id_num, supplier_id: po.supplier_id, warehouse_name: po.warehouse_name }));
        setGrnItems(po.items.map(item => ({ ...item, received_qty: item.ordered_qty, remarks: "" })));
      } else {
         setFlash({ type: 'danger', message: 'Failed to load details for the selected PO.' });
         setGrnItems([]);
      }
    } catch (err) {
      setFlash({ type: 'danger', message: 'Error loading PO items.' });
    }
  };

  const handleItemChange = (index: number, field: keyof GRNItem, value: string | number) => {
    const updatedItems = [...grnItems];
    const itemToUpdate = { ...updatedItems[index] };
    // @ts-ignore
    itemToUpdate[field] = value;
    updatedItems[index] = itemToUpdate;
    setGrnItems(updatedItems);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFlash({ type: "", message: "" });

    if (!form.purchase_order_id || !form.grn_date || !form.grn_number) {
      setFlash({ type: "danger", message: "GRN Number, Purchase Order, and GRN Date are required." });
      setSubmitting(false);
      return;
    }
    
    // Create the payload
    const payload = {
      grn_number: form.grn_number, // ✅ Payload me add kiya gaya
      purchaseOrderId: Number(form.purchase_order_id),
      received_date: form.grn_date,
      warehouse_name: form.warehouse_name,
      remarks: form.remarks,
      items: grnItems
        .filter(item => Number(item.received_qty) > 0) // ✅ Sirf wahi items bhejein jinki quantity 0 se zyada ho
        .map(item => ({
            item_code: item.item_code,
            item_name: item.item_name,
            received_qty: Number(item.received_qty),
            uom: item.uom,
        }))
    };
    
    if (payload.items.length === 0) {
        setFlash({ type: "danger", message: "You must receive at least one item." });
        setSubmitting(false);
        return;
    }

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      // 🛠️ Bug fix: unwrap the { success, message, data } response envelope
      // (was showing "GRN undefined created successfully!"); the error branch
      // still needs the top-level `message`, so keep both in scope.
      const { data, message } = await res.json();
      if (res.ok) {
        Cookies.set("flashMessage", `GRN ${data.grn_number} created successfully!`, { path: "/" });
        Cookies.set("flashType", "success", { path: "/" });
        router.push("/grn");
      } else {
        const errorMessages = Array.isArray(message) ? message.join(', ') : message;
        setFlash({ type: "danger", message: errorMessages || "Failed to create GRN." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "Server error while creating GRN." });
    } finally {
      setSubmitting(false);
    }
  };

  const totalItems = grnItems.length;
  const totalOrdered = grnItems.reduce((sum, row) => sum + Number(row.ordered_qty || 0), 0);
  const totalReceived = grnItems.reduce((sum, row) => sum + Number(row.received_qty || 0), 0);

  return (
    <motion.div className="container-fluid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-box-arrow-in-down text-primary me-2"></i> Create GRN</h1>
        <Link href="/grn" className="btn btn-secondary"><i className="bi bi-arrow-left me-2"></i> Back to List</Link>
      </div>

      <AnimatePresence>
        {flash.message && (
          <motion.div className={`alert alert-${flash.type}`} initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {flash.message}
            <button type="button" className="btn-close float-end" onClick={() => setFlash({ type: "", message: "" })}></button>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-lg-8">
            <motion.div className="card shadow-sm mb-4" custom={0} variants={cardVariants} initial="hidden" animate="visible">
              <div className="card-header bg-light"><h5 className="mb-0">GRN Details</h5></div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Purchase Order *</label>
                    <select id="purchase_order_id" className="form-select" value={form.purchase_order_id} onChange={(e) => handlePOChange(e.target.value)} required>
                      <option value="">Select Purchase Order</option>
                      {purchaseOrders.map((po) => (<option key={po.id} value={po.id}>{po.po_number} ({po.supplier?.name})</option>))}
                    </select>
                  </div>
                  {/* ✅ GRN Number ka naya field */}
                  <div className="col-md-6">
                    <label htmlFor="grn_number" className="form-label">GRN Number *</label>
                    <input type="text" id="grn_number" className="form-control" value={form.grn_number} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Supplier *</label>
                    <select id="supplier_id" className="form-select" value={form.supplier_id} onChange={handleChange} disabled>
                      <option value="">Select a PO to auto-fill</option>
                      {suppliers.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">GRN Date *</label>
                    <input type="date" id="grn_date" className="form-control" value={form.grn_date} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Warehouse</label>
                    <input type="text" id="warehouse_name" className="form-control" value={form.warehouse_name} disabled readOnly />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Remarks</label>
                    <textarea id="remarks" className="form-control" rows={1} value={form.remarks} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="col-lg-4">
            <motion.div className="card shadow-sm" custom={0.2} variants={cardVariants} initial="hidden" animate="visible">
              <div className="card-header bg-light"><h5 className="mb-0">Summary</h5></div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Items: <strong>{totalItems}</strong></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Ordered Qty: <strong>{totalOrdered.toFixed(2)}</strong></li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">Total Received Qty: <strong>{totalReceived.toFixed(2)}</strong></li>
                </ul>
                <hr />
                <div className="d-grid gap-2">
                  <motion.button type="submit" className="btn btn-primary" disabled={submitting} variants={buttonVariants} whileHover="hover" whileTap="tap">
                    {submitting ? 'Saving...' : <><i className="bi bi-check-circle me-2"></i> Save GRN</>}
                  </motion.button>
                  <Link href="/grn" className="btn btn-outline-secondary">Cancel</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div className="card shadow-sm mt-4" custom={0.4} variants={cardVariants} initial="hidden" animate="visible">
          <div className="card-header bg-light"><h5 className="mb-0">Received Items</h5></div>
          <div className="card-body p-0">
            {!grnItems.length ? (
              <p className="text-muted text-center p-4">Select a Purchase Order to load items.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light"><tr><th>Item</th><th style={{ width: '15%' }}>Ordered Qty</th><th style={{ width: '15%' }}>Received Qty</th><th style={{ width: '10%' }}>UOM</th><th style={{ width: '25%' }}>Remarks</th></tr></thead>
                  <tbody>
                    <AnimatePresence>
                      {grnItems.map((row, i) => (
                        <motion.tr key={row.item_id} custom={i} variants={tableRowVariants} initial="hidden" animate="visible" layout>
                          <td>{row.item_name} <br/><small className="text-muted">{row.item_code}</small></td>
                          <td>{row.ordered_qty}</td>
                          <td><input type="number" step="0.01" min="0" max={row.ordered_qty} className="form-control" value={row.received_qty} onChange={(e) => handleItemChange(i, "received_qty", e.target.value)} required /></td>
                          <td>{row.uom}</td>
                          <td><input type="text" className="form-control" value={row.remarks} onChange={(e) => handleItemChange(i, "remarks", e.target.value)} /></td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CreateGRNPage;