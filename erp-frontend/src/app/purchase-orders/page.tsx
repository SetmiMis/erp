// app/purchase-orders/page.tsx
"use client";

import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

// Interfaces to match backend response
type POStatus = 'draft' | 'sent' | 'acknowledged' | 'partial' | 'completed' | 'cancelled';

interface PurchaseOrder {
  id: number;
  po_number: string;
  order_date: string;
  supplier_name: string;
  warehouse_name: string;
  total_amount: number;
  status: POStatus;
}

interface SupplierOption {
  id: number;
  name: string;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// Reusable components for UI states
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-cart-x fs-1 text-muted"></i>
    <h4 className="mt-3 text-muted">No Purchase Orders Found</h4>
    <p className="text-muted">Create your first purchase order to get started.</p>
    <Link href="/purchase-orders/create" className="btn btn-primary">
      <i className="bi bi-plus-circle me-2"></i>Create Purchase Order
    </Link>
  </div>
);

const LoadingSpinner: FC = () => (
    <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <p className="mt-2 text-muted">Loading Purchase Orders...</p>
    </div>
);

const PurchaseOrdersPage: FC = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");

  // Refetch when filters change
  useEffect(() => {
    fetchPurchaseOrders();
  }, [status, supplier]);

  // Fetch initial data and check for flash messages
  useEffect(() => {
    fetchSuppliers();
    
    const message = Cookies.get("flashMessage");
    const type = Cookies.get("flashType") as "success" | "danger" | "";
    if (message && type) {
        setFlash({ type, message });
        Cookies.remove("flashMessage");
        Cookies.remove("flashType");
    }
  }, []);

  const fetchPurchaseOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const query = new URLSearchParams({ status, supplier }).toString();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch purchase orders.");
      // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
      const { data } = await res.json();
      setPurchaseOrders(data);
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
    if (!confirm("Are you sure you want to delete this Purchase Order? This action cannot be undone.")) return;

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFlash({ type: "success", message: "Purchase Order deleted successfully!" });
        fetchPurchaseOrders(); // Refresh the list
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to delete PO." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "Server error while deleting." });
    }
  };

  const statusClass: Record<POStatus, string> = {
    draft: "secondary", sent: "info", acknowledged: "primary",
    partial: "warning", completed: "success", cancelled: "danger",
  };

  return (
    <div className="container-fluid">
      {/* Header & Flash Messages */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0"><i className="bi bi-cart text-primary"></i> Purchase Orders</h1>
          <Link href="/purchase-orders/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Create PO</Link>
        </div>
      </div>
      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
          {flash.message}
          <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}

      {/* Filters Card */}
      <div className="card shadow-sm mb-4">
          <div className="card-body">
              <form className="row g-3">
                  <div className="col-md-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                          <option value="">All Status</option>
                          <option value="draft">Draft</option>
                          <option value="sent">Sent</option>
                          <option value="acknowledged">Acknowledged</option>
                          <option value="partial">Partially Received</option>
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
      </div>

      {/* Table Card */}
      <div className="card shadow-sm">
        <div className="card-header"><h5 className="mb-0"><i className="bi bi-list-ul"></i> PO List <span className="badge bg-primary ms-2">{purchaseOrders.length}</span></h5></div>
        <div className="card-body">
          {loading ? <LoadingSpinner />
            : error ? <div className="alert alert-danger">{error}</div>
            : purchaseOrders.length === 0 ? <NoDataDisplay />
            : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Date</th>
                    <th>Supplier</th>
                    <th>Warehouse</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseOrders.map((po) => (
                    <tr key={po.id}>
                      <td><strong>{po.po_number}</strong></td>
                      <td>{new Date(po.order_date).toLocaleDateString("en-GB")}</td>
                      <td>{po.supplier_name}</td>
                      <td>{po.warehouse_name}</td>
                      <td>₹{Number(po.total_amount).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                      <td>
                        <span className={`badge bg-${statusClass[po.status] || "secondary"}`}>
                          {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                            <Link href={`/purchase-orders/${po.id}`} className="btn btn-outline-primary" title="View"><i className="bi bi-eye"></i></Link>
                            {po.status === "draft" && (
                                <>
                                  <Link href={`/purchase-orders/${po.id}/edit`} className="btn btn-outline-secondary" title="Edit"><i className="bi bi-pencil"></i></Link>
                                  <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(po.id)} title="Delete"><i className="bi bi-trash"></i></button>
                                </>
                            )}
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

export default PurchaseOrdersPage;