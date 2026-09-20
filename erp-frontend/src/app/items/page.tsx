"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion"; // Framer Motion import karein
import { apiClient } from "../../lib/apiClient";

// 1. Define TypeScript interfaces
interface Item {
  id: number;
  sku: string;
  name: string;
  description?: string;
  unit: string;
  category?: string;
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

// 2. Create reusable components for clean UI states
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-box fs-1 text-muted"></i>
    <h4 className="mt-3 text-muted">No items found</h4>
    <p className="text-muted">Start by adding your first item.</p>
    <Link href="/items/create" className="btn btn-primary">
      <i className="bi bi-plus-circle me-2"></i> Add Item
    </Link>
  </div>
);

const LoadingSpinner: FC = () => (
    <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading Items...</p>
    </div>
);

const ItemsPage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchItems();
    }, 500);
    return () => clearTimeout(handler);
  }, [status, search]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({ status, search }).toString();
      const data = await apiClient.get<Item[]>(`/items?${query}`);
      setItems(data ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await apiClient.delete(`/items/${id}`);
      setFlash({ type: "success", message: "Item deleted successfully!" });
      fetchItems();
    } catch (err: any) {
      setFlash({ type: "danger", message: err.message || "Failed to delete item." });
    }
  };

  return (
    <motion.div 
        className="container-fluid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      {/* Header */}
      <motion.div className="row" variants={itemVariants}>
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0"><i className="bi bi-box text-primary"></i> Items</h1>
          <Link href="/items/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Add Item</Link>
        </div>
      </motion.div>

      {/* Flash Messages */}
      {flash.message && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
                {flash.message}
                <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
            </div>
        </motion.div>
      )}

      {/* Filter and search card */}
      <motion.div className="card mb-4" variants={itemVariants}>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="search" className="form-label">Search</label>
              <input type="text" id="search" className="form-control" placeholder="Search by code, name, category..." value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="col-md-3 d-flex align-items-end">
                <button className="btn btn-outline-secondary" onClick={() => { setStatus(""); setSearch(""); }}>
                    <i className="bi bi-arrow-clockwise me-2"></i>Reset
                </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Items Table */}
      <motion.div className="card" variants={itemVariants}>
        <div className="card-header">
            <h5 className="mb-0"><i className="bi bi-list-ul"></i> Items List <span className="badge bg-primary ms-2">{items.length}</span></h5>
        </div>
        <div className="card-body">
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : items.length === 0 ? (
                <NoDataDisplay />
            ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Code</th>
                    <th>Item Name</th>
                    <th>Unit</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <motion.tbody variants={containerVariants} initial="hidden" animate="visible">
                  {items.map((item) => (
                    <motion.tr key={item.id} variants={itemVariants}>
                      <td><strong>{item.sku}</strong></td>
                      <td>{item.name}</td>
                      <td>{item.unit}</td>
                      <td>{item.category || "N/A"}</td>
                      <td>
                        <span className={`badge bg-${item.is_active ? "success" : "secondary"}`}>
                          {item.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link href={`/items/${item.id}`} className="btn btn-outline-primary" title="View"><i className="bi bi-eye"></i></Link>
                          <Link href={`/items/${item.id}/edit`} className="btn btn-outline-secondary" title="Edit"><i className="bi bi-pencil"></i></Link>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-outline-danger" title="Delete"><i className="bi bi-trash"></i></button>
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

export default ItemsPage;