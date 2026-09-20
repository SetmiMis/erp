"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Cookies from 'js-cookie';

// Interface को backend के अनुसार अपडेट किया गया है
interface Warehouse {
  id: number;
  code: string;
  name: string;
  city: string;
  state: string;
  contact_person: string;
  is_active: boolean;
}

// Flash message के लिए type
interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// जब कोई डेटा न हो तो दिखाने के लिए एक कंपोनेंट
const NoDataDisplay: FC = () => (
    <div className="text-center py-5">
        <i className="bi bi-building fs-1 text-muted"></i>
        <h4 className="mt-3 text-muted">No warehouses found</h4>
        <p className="text-muted">Start by adding your first warehouse.</p>
        <Link href="/warehouses/create" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i> Add Warehouse
        </Link>
    </div>
);

const WarehousesPage: FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

  useEffect(() => {
    const handler = setTimeout(() => {
        fetchWarehouses();
    }, 500);

    return () => clearTimeout(handler);
  }, [status, search]);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
        const token = Cookies.get('token');
        const query = new URLSearchParams({ status, search }).toString();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses?${query}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch data');
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await response.json();
        setWarehouses(data);
    } catch (err: any) {
        setFlash({ type: "danger", message: err.message });
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this warehouse?")) return;
    try {
      const token = Cookies.get('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (res.ok) {
        setFlash({ type: "success", message: "Warehouse deleted successfully!" });
        fetchWarehouses();
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to delete warehouse." });
      }
    } catch (e: any) { // ✅ FIX: Added curly braces here
      setFlash({ type: "danger", message: "An error occurred: " + e.message });
    }
  };

  return (
    <div className="container-fluid">
        {/* Page Header */}
        <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0"><i className="bi bi-building text-primary"></i> Warehouses</h1>
                <Link href="/warehouses/create" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-2"></i> Add Warehouse
                </Link>
            </div>
        </div>

        {/* Flash Message Display Area */}
        {flash.message && (
            <div className={`alert alert-${flash.type} alert-dismissible fade show`} role="alert">
                {flash.message}
                <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
            </div>
        )}

        {/* Filter and Search Form */}
        <div className="row mb-4">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <form className="row g-3">
                            <div className="col-md-3">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="search" className="form-label">Search</label>
                                <input type="text" id="search" className="form-control" placeholder="Search by name, code, city..." value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Warehouses List Table */}
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">
                            <i className="bi bi-list-ul"></i> Warehouses List{" "}
                            <span className="badge bg-primary ms-2">{warehouses.length}</span>
                        </h5>
                    </div>
                    <div className="card-body">
                        {loading ? (
                            <div className="text-center py-5">Loading...</div>
                        ) : warehouses.length === 0 ? (
                            <NoDataDisplay />
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Code</th>
                                            <th>Warehouse Name</th>
                                            <th>Location</th>
                                            <th>Contact Person</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouses.map((w) => (
                                        <tr key={w.id}>
                                            <td><strong>{w.code}</strong></td>
                                            <td>{w.name}</td>
                                            <td>{w.city}, {w.state}</td>
                                            <td>{w.contact_person || "-"}</td>
                                            <td>
                                                <span className={`badge bg-${w.is_active ? "success" : "secondary"}`}>
                                                    {w.is_active ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <Link href={`/warehouses/${w.id}`} className="btn btn-outline-primary" title="View"><i className="bi bi-eye"></i></Link>
                                                    <Link href={`/warehouses/${w.id}/edit`} className="btn btn-outline-secondary" title="Edit"><i className="bi bi-pencil"></i></Link>
                                                    <button onClick={() => handleDelete(w.id)} className="btn btn-outline-danger" title="Delete"><i className="bi bi-trash"></i></button>
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
        </div>
    </div>
  );
};

export default WarehousesPage;