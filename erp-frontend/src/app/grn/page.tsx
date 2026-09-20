"use client";

import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
// ✅ Animation ke liye import karein
import { motion, AnimatePresence } from "framer-motion";

// ✅ Sahi data structure define karein
interface PurchaseOrderInfo {
  id: number;
  po_number: string;
  supplier: {
    id: number;
    name: string;
  };
}

type GRNStatus = 'draft' | 'completed' | 'cancelled';

interface GRN {
  id: number;
  grn_number: string; // <- Sahi naam
  received_date: string; // <- Sahi naam
  purchaseOrder: PurchaseOrderInfo; // <- Sahi nested structure
  items: any[];
  status: GRNStatus;
}

interface SupplierOption {
  id: number;
  name: string;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// Reusable Components
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-file-earmark-text display-4 text-muted"></i>
    <h5 className="mt-3">No GRNs Found</h5>
    <p className="text-muted">Get started by creating your first Goods Receipt Note.</p>
    <Link href="/grn/create" className="btn btn-primary mt-2">
      <i className="bi bi-plus-circle me-2"></i>Create First GRN
    </Link>
  </div>
);

const LoadingSpinner: FC = () => (
    <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <p className="mt-2 text-muted">Loading GRNs...</p>
    </div>
);

// ✅ Animation ke liye variants
const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Har row thodi der baad aayegi
    },
  }),
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

const GRNListPage: FC = () => {
  const [grns, setGrns] = useState<GRN[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [status, setStatus] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");

  useEffect(() => {
    fetchGrns();
  }, [status, supplier]);

  useEffect(() => {
    fetchSuppliers();
    
    const message = Cookies.get("flashMessage");
    const type = Cookies.get("flashType") as FlashMessage['type'] | undefined;
    if (message && type) {
        setFlash({ type, message });
        Cookies.remove("flashMessage");
        Cookies.remove("flashType");
    }
  }, []);

  const fetchGrns = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const query = new URLSearchParams({ status, supplier }).toString();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch GRNs.");
      // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
      const { data } = await res.json();
      setGrns(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchSuppliers = async () => {
    try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) setSuppliers((await res.json()).data);
    } catch (error) {
        console.error("Failed to fetch suppliers for filter dropdown.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this GRN? This action cannot be undone.")) return;

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/grn/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFlash({ type: "success", message: "GRN deleted successfully!" });
        // Optimistic UI update: remove item from state before refetching
        setGrns(prevGrns => prevGrns.filter(grn => grn.id !== id));
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to delete GRN." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "Server error while deleting." });
    }
  };

  const statusClass: Record<GRNStatus, string> = {
    draft: "secondary",
    completed: "success",
    cancelled: "danger",
  };

  return (
    // ✅ Page-level animation
    <motion.div 
      className="container-fluid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-box-arrow-in-down text-primary me-2"></i> Goods Receipt Notes (GRN)</h1>
        <Link href="/grn/create" className="btn btn-primary shadow-sm"><i className="bi bi-plus-circle me-2"></i> Create GRN</Link>
      </div>
      
      {/* ✅ Animated Flash Message */}
      <AnimatePresence>
        {flash.message && (
          <motion.div
            className={`alert alert-${flash.type} alert-dismissible fade show`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {flash.message}
            <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Animated Filters Card */}
      <motion.div 
        className="card border-0 shadow-sm mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="card-body">
              <form className="row g-3">
                  <div className="col-md-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="">All Status</option>
                          <option value="draft">Draft</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                      </select>
                  </div>
                  <div className="col-md-4">
                      <label htmlFor="supplier" className="form-label">Supplier</label>
                      <select id="supplier" className="form-select" value={supplier} onChange={(e) => setSupplier(e.target.value)}>
                          <option value="">All Suppliers</option>
                          {suppliers.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                      </select>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                      <button type="button" className="btn btn-outline-secondary" onClick={() => { setStatus(""); setSupplier(""); }}>
                          <i className="bi bi-arrow-clockwise me-2"></i> Reset
                      </button>
                  </div>
              </form>
          </div>
      </motion.div>

      {/* ✅ Animated Table Card */}
      <motion.div 
        className="card border-0 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="card-header bg-light border-0">
            <h5 className="mb-0"><i className="bi bi-list-ul me-2"></i> GRN List <span className="badge bg-primary rounded-pill ms-2">{grns.length}</span></h5>
        </div>
        <div className="card-body">
          {loading ? <LoadingSpinner />
            : error ? <div className="alert alert-danger">{error}</div>
            : grns.length === 0 ? <NoDataDisplay />
            : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>GRN No</th>
                    <th>PO Reference</th>
                    <th>Supplier</th>
                    <th>Received Date</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* ✅ Wrap list with AnimatePresence for exit animations */}
                  <AnimatePresence>
                  {grns.map((grn, i) => (
                    <motion.tr 
                      key={grn.id}
                      variants={tableRowVariants}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout // `layout` prop animates re-ordering on delete
                      whileHover={{ scale: 1.015, backgroundColor: "rgba(0, 123, 255, 0.05)" }}
                    >
                      {/* ✅ Sahi data access karein */}
                      <td><strong>{grn.grn_number}</strong></td>
                      <td>{grn.purchaseOrder?.po_number}</td>
                      <td>{grn.purchaseOrder?.supplier?.name}</td>
                      <td>{new Date(grn.received_date).toLocaleDateString("en-GB")}</td>
                      <td>{grn.items?.length || 0}</td>
                      <td>
                        <span className={`badge bg-${statusClass[grn.status] || "secondary"} text-capitalize`}>
                          {grn.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="btn-group btn-group-sm">
                            <Link href={`/grn/${grn.id}`} className="btn btn-outline-primary" title="View"><i className="bi bi-eye"></i></Link>
                            {grn.status === "draft" && (
                                <Link href={`/grn/${grn.id}/edit`} className="btn btn-outline-secondary" title="Edit"><i className="bi bi-pencil"></i></Link>
                            )}
                            <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(grn.id)} title="Delete"><i className="bi bi-trash"></i></button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GRNListPage;