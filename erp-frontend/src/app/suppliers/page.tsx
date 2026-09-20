"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { motion, Variants } from "framer-motion"; // Framer Motion import karein

// Interface jo backend se match karti hai
interface Supplier {
  id: number;
  supplier_code: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email: string;
  is_active: boolean;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Component jab koi data na ho
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-people fs-1 text-muted"></i>
    <h4 className="mt-3 text-muted">No suppliers found</h4>
    <p className="text-muted">Start by adding your first supplier.</p>
    <Link href="/suppliers/create" className="btn btn-primary">
      <i className="bi bi-plus-circle me-2"></i> Add Supplier
    </Link>
  </div>
);

const SuppliersPage: FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchSuppliers();
    }, 500);
    return () => clearTimeout(handler);
  }, [status, search]);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const query = new URLSearchParams({ status, search }).toString();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/suppliers?${query}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch suppliers");
      // 🛠️ Bug fix: backend wraps all responses in { success, message, data }
      // (see erp-backend TransformInterceptor) — we were setting state to the
      // whole envelope instead of its `data` field, so `suppliers.map` crashed.
      const { data } = await response.json();
      setSuppliers(data);
      setTotalCount(data.length);
    } catch (err: any) {
      setFlash({ type: "danger", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this supplier?")) return;
    try {
      const token = Cookies.get("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/suppliers/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        setFlash({ type: "success", message: "Supplier deleted successfully!" });
        fetchSuppliers();
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Delete failed" });
      }
    } catch (error) {
      setFlash({ type: "danger", message: "An error occurred." });
    }
  };

  return (
    <motion.div
      className="container-fluid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Page Header */}
      <motion.div className="row" variants={itemVariants}>
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <i className="bi bi-people text-primary"></i> Suppliers
          </h1>
          <Link href="/suppliers/create" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i> Add Supplier
          </Link>
        </div>
      </motion.div>

      {/* Flash Messages */}
      {flash.message && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
            {flash.message}
            <button
              type="button"
              className="btn-close"
              onClick={() => setFlash({ type: "", message: "" })}
            ></button>
          </div>
        </motion.div>
      )}

      {/* Filters Card */}
      <motion.div className="card mb-4" variants={itemVariants}>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="search" className="form-label">Search</label>
              <input type="text" id="search" className="form-control" placeholder="Search by name, code, contact..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="button" className="btn btn-outline-secondary" onClick={() => { setStatus(""); setSearch(""); }}>
                <i className="bi bi-arrow-clockwise me-2"></i> Reset
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Suppliers Table Card */}
      <motion.div className="card" variants={itemVariants}>
        <div className="card-header">
          <h5 className="mb-0">
            <i className="bi bi-list-ul"></i> Suppliers List{" "}
            <span className="badge bg-primary ms-2">{totalCount}</span>
          </h5>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
          ) : suppliers.length === 0 ? (
            <NoDataDisplay />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Code</th>
                    <th>Supplier Name</th>
                    <th>Contact Person</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                  {suppliers.map((s) => (
                    <motion.tr key={s.id} variants={itemVariants}>
                      <td><strong>{s.supplier_code}</strong></td>
                      <td>{s.name}</td>
                      <td>{s.contact_person || "-"}</td>
                      <td>{s.phone || "-"}</td>
                      <td>{s.email}</td>
                      <td>
                        <span className={`badge bg-${s.is_active ? "success" : "secondary"}`}>
                          {s.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link href={`/suppliers/${s.id}/edit`} className="btn btn-outline-secondary" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </Link>
                          <button onClick={() => handleDelete(s.id)} className="btn btn-outline-danger" title="Delete">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuppliersPage;