"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Define complete interfaces for the data models
interface Location {
  id: number;
  location_code: string;
  location_name: string;
  description?: string;
  is_active: boolean;
  warehouse: { id: number; name: string; };
}

interface LocationFormData {
  location_name: string;
  warehouse_id: number | '';
  description: string;
  is_active: boolean;
}

interface Warehouse {
  id: number;
  name: string;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. Create reusable components for clean UI states
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading Form...</h4>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">Could Not Load Data</h4>
        <p className="text-muted">{message}</p>
        <Link href="/locations" className="btn btn-primary"><i className="bi bi-arrow-left me-2"></i>Back to Locations</Link>
    </div>
);


// ✅ 3. Convert the component to a typed FC with full state management
const EditLocationPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Partial<LocationFormData>>({});
  const [locationCode, setLocationCode] = useState<string>('');
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  
  // ✅ 4. Fetch both location and warehouse data securely
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [locRes, whRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses`, { headers }),
        ]);

        if (!locRes.ok) throw new Error("Location not found.");
        if (!whRes.ok) throw new Error("Could not load warehouses.");

        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data: locData } = await locRes.json();
        const { data: whData } = await whRes.json();
        
        setForm({
            location_name: locData.location_name,
            description: locData.description || '',
            warehouse_id: locData.warehouse.id,
            is_active: locData.is_active,
        });
        setLocationCode(locData.location_code);
        setWarehouses(whData);

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
    const parsedValue = id === 'warehouse_id' ? parseInt(value) || '' : value;
    setForm(prev => ({ ...prev, [id]: parsedValue }));
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, is_active: e.target.value === 'true' }));
  };

  // ✅ 5. Implement a typed submit handler with improved UX
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.location_name || !form.warehouse_id) {
      setFlash({ type: "danger", message: "Location Name and Warehouse are required." });
      return;
    }
    setSubmitting(true);
    
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`, {
        method: "PATCH", // PATCH is better for updates
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push(`/locations/${id}?updated=true`);
      } else {
        const err = await res.json();
        setFlash({ type: "danger", message: err.message || "Failed to update location" });
      }
    } catch (error) {
      setFlash({ type: "danger", message: "Server error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0"><i className="bi bi-pencil text-primary"></i> Edit Location</h1>
          <Link href={`/locations/${id}`} className="btn btn-outline-secondary"><i className="bi bi-arrow-left me-2"></i> Back to Details</Link>
        </div>
      </div>

      {/* Flash Messages */}
      {flash.message && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
            {flash.message}
            <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header"><h5 className="mb-0">Location Details</h5></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location_name" className="form-label">Location Name <span className="text-danger">*</span></label>
                    <input type="text" id="location_name" className="form-control" required value={form.location_name || ''} onChange={handleChange}/>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location_code" className="form-label">Location Code</label>
                    <input type="text" id="location_code" className="form-control" value={locationCode} readOnly disabled />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="warehouse_id" className="form-label">Warehouse <span className="text-danger">*</span></label>
                    <select id="warehouse_id" className="form-select" required value={form.warehouse_id || ''} onChange={handleChange}>
                      <option value="">Select Warehouse</option>
                      {warehouses.map((wh) => (
                        <option key={wh.id} value={wh.id}>{wh.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" rows={3} value={form.description || ''} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header"><h5 className="mb-0">Status</h5></div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="is_active" className="form-label">Status</label>
                  <select id="is_active" className="form-select" value={String(form.is_active)} onChange={handleStatusChange}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Updating...' : 'Update Location'}
                  </button>
                  <Link href={`/locations/${id}`} className="btn btn-outline-secondary">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLocationPage;