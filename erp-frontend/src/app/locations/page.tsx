"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

// ✅ 1. Data ke liye TypeScript interfaces define kiye gaye hain
interface Location {
  id: number;
  location_code: string;
  location_name: string;
  warehouse_name?: string;
  description?: string;
  is_active: boolean; // 'status' ki jagah 'is_active' (boolean) use kiya gaya hai
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. UI states ke liye reusable components banaye gaye hain
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-geo-alt fs-1 text-muted"></i>
    <h4 className="mt-3 text-muted">No locations found</h4>
    <p className="text-muted">Start by adding your first location.</p>
    <Link href="/locations/create" className="btn btn-primary">
      <i className="bi bi-plus-circle me-2"></i> Add Location
    </Link>
  </div>
);

const LoadingSpinner: FC = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-2 text-muted">Loading Locations...</p>
  </div>
);

// ✅ 3. Component ko behtar state management ke saath update kiya gaya hai
const LocationsPage: FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Server-side filtering ke liye states
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // ✅ 4. Server-side filtering aur debouncing implement kiya gaya hai
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchLocations();
    }, 500); // Search input ke liye debounce

    return () => clearTimeout(handler);
  }, [status, search]); // Filter change hone par refetch karein

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const query = new URLSearchParams({ status, search }).toString();
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Server se locations fetch karne mein samasya aayi.");
      }
      // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
      const { data } = await res.json();
      setLocations(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 5. Poora delete function add kiya gaya hai
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this location?")) return;

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setFlash({ type: "success", message: "Location deleted successfully!" });
        fetchLocations(); // List ko server se refresh karein
      } else {
        const errorData = await res.json();
        setFlash({ type: "danger", message: errorData.message || "Location delete nahi ho saki." });
      }
    } catch {
      setFlash({ type: "danger", message: "Delete karte samay server error." });
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0"><i className="bi bi-geo-alt text-primary"></i> Locations</h1>
          <Link href="/locations/create" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> Add Location</Link>
        </div>
      </div>

      {/* Flash Messages */}
      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
          {flash.message}
          <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}

      {/* Filters Card */}
      <div className="card mb-4">
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
              <input type="text" id="search" className="form-control" placeholder="Search by name, code, warehouse..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-outline-secondary" onClick={() => { setStatus(""); setSearch(""); }}>
                <i className="bi bi-arrow-clockwise me-2"></i>Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Table Card */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0"><i className="bi bi-list-ul"></i> Locations List <span className="badge bg-primary ms-2">{locations.length}</span></h5>
        </div>
        <div className="card-body">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : locations.length === 0 ? (
            <NoDataDisplay />
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Code</th>
                    <th>Location Name</th>
                    <th>Warehouse</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc) => (
                    <tr key={loc.id}>
                      <td><strong>{loc.location_code}</strong></td>
                      <td>{loc.location_name}</td>
                      <td>{loc.warehouse_name || "N/A"}</td>
                      <td>
                        <span className={`badge bg-${loc.is_active ? "success" : "secondary"}`}>
                          {loc.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link href={`/locations/${loc.id}`} className="btn btn-outline-primary" title="View"><i className="bi bi-eye"></i></Link>
                          <Link href={`/locations/${loc.id}/edit`} className="btn btn-outline-secondary" title="Edit"><i className="bi bi-pencil"></i></Link>
                          <button onClick={() => handleDelete(loc.id)} className="btn btn-outline-danger" title="Delete"><i className="bi bi-trash"></i></button>
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

export default LocationsPage;