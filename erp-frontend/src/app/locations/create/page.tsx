"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Interfaces for data structures
interface LocationFormData {
  location_name: string;
  description: string;
  location_type: string;
  capacity: number;
  is_default: boolean;
  is_active: boolean;
  warehouse_id: number | '';
  parent_location_id: number | '';
}

interface DropdownOption {
  id: number;
  name: string;
}

interface ParentLocationOption {
  id: number;
  location_name: string;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

const CreateLocationPage: FC = () => {
  const router = useRouter();

  const initialFormState: LocationFormData = {
    location_name: "",
    description: "",
    location_type: "rack",
    capacity: 0,
    is_default: false,
    is_active: true,
    warehouse_id: '',
    parent_location_id: '',
  };

  const [form, setForm] = useState<LocationFormData>(initialFormState);
  const [warehouses, setWarehouses] = useState<DropdownOption[]>([]);
  const [parentLocations, setParentLocations] = useState<ParentLocationOption[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Fetch data for dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [whRes, locRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, { headers }),
        ]);
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        if (whRes.ok) setWarehouses((await whRes.json()).data);
        if (locRes.ok) setParentLocations((await locRes.json()).data);
      } catch (error) {
        setFlash({ type: 'danger', message: 'Could not load required data.' });
      }
    };
    fetchData();
  }, []);

  // ✅ UPDATE: handleChange ko sabhi inputs (text, number, checkbox, select) ke liye behtar banaya gaya hai
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;

    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [id]: (e.target as HTMLInputElement).checked }));
    } else if (id === 'is_active') {
      setForm(prev => ({ ...prev, is_active: value === 'true' }));
    } else {
      setForm(prev => ({ ...prev, [id]: value }));
    }
  };

  // ✅ FIX: handleSubmit ab khaali 'parent_location_id' ko theek se handle karta hai
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.location_name || !form.warehouse_id) {
      setFlash({ type: 'danger', message: 'Location Name and Warehouse are required.' });
      return;
    }
    setSubmitting(true);
    
    // Data ko backend mein bhejne se pehle aache se format karein
    const dataToSend = {
      ...form,
      warehouse_id: Number(form.warehouse_id),
      parent_location_id: form.parent_location_id === '' ? null : Number(form.parent_location_id),
      capacity: Number(form.capacity),
    };

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        router.push("/locations?created=true");
      } else {
        const err = await res.json();
        const errorMessage = Array.isArray(err.message) ? err.message.join(', ') : err.message;
        setFlash({ type: "danger", message: errorMessage || "Failed to create location" });
      }
    } catch (error) {
      setFlash({ type: "danger", message: "Server error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header & Flash Messages */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0"><i className="bi bi-plus-circle text-primary"></i> Create Location</h1>
          <Link href="/locations" className="btn btn-outline-secondary"><i className="bi bi-arrow-left me-2"></i> Back to List</Link>
        </div>
      </div>
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
                    <input type="text" id="location_name" className="form-control" required value={form.location_name} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location_code" className="form-label">Location Code</label>
                    <input type="text" id="location_code" className="form-control" value="Will be auto-generated" readOnly disabled />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="warehouse_id" className="form-label">Warehouse <span className="text-danger">*</span></label>
                    <select id="warehouse_id" className="form-select" required value={form.warehouse_id} onChange={handleChange}>
                      <option value="">Select Warehouse</option>
                      {warehouses.map((wh) => (
                        <option key={wh.id} value={wh.id}>{wh.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="location_type" className="form-label">Location Type</label>
                    <select id="location_type" className="form-select" value={form.location_type} onChange={handleChange}>
                        <option value="area">Area</option>
                        <option value="rack">Rack</option>
                        <option value="bin">Bin</option>
                        <option value="floor">Floor</option>
                        <option value="cold_storage">Cold Storage</option>
                        <option value="quarantine">Quarantine</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="parent_location_id" className="form-label">Parent Location</label>
                    <select id="parent_location_id" className="form-select" value={form.parent_location_id} onChange={handleChange}>
                      <option value="">None</option>
                      {parentLocations.map((loc) => (
                        <option key={loc.id} value={loc.id}>{loc.location_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity</label>
                    <input type="number" id="capacity" className="form-control" value={form.capacity} onChange={handleChange} />
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" className="form-control" rows={3} value={form.description} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header"><h5 className="mb-0">Settings</h5></div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="is_active" className="form-label">Status</label>
                  <select id="is_active" className="form-select" value={String(form.is_active)} onChange={handleChange}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="is_default" checked={form.is_default} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="is_default">Set as Default Location</label>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create Location'}
                  </button>
                  <Link href="/locations" className="btn btn-outline-secondary">Cancel</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateLocationPage;