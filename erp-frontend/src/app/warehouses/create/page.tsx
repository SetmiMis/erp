"use client";
import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

// Form data structure aligned with the backend API
interface WarehouseFormData {
  name: string;
  code?: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  contact_person: string;
  phone: string;
  email: string;
  is_active: boolean;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

const CreateWarehousePage: FC = () => {
  const router = useRouter();

  // State uses property names that match the backend
  const [form, setForm] = useState<Partial<WarehouseFormData>>({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "India", // Default value
    pincode: "",
    contact_person: "",
    phone: "",
    email: "",
    is_active: true, // Boolean instead of string
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

  // Generic handler for all input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;

    // Handle checkbox specifically to get boolean value
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setForm(prev => ({ ...prev, [id]: checked }));
    } else {
        setForm(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name) {
      setFlash({ type: "danger", message: "Warehouse Name is required." });
      return;
    }

    setSubmitting(true);
    setFlash({ type: "", message: "" });

    try {
      const token = Cookies.get('token');
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses`, {
        method: "POST",
        // The form state is sent directly without any conversion
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.ok) {
        // On success, redirect to the warehouses list page
        router.push("/warehouses");
      } else {
        const data = await res.json();
        const errorMessage = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        setFlash({ type: "danger", message: errorMessage || "Error creating warehouse." });
      }
    } catch (error) {
      setFlash({ type: "danger", message: "Server error. Please try again later." });
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h3 mb-0">
                <i className="bi bi-plus-circle text-primary me-2"></i>Create New Warehouse
            </h1>
        </div>

        {/* Flash Message Display */}
        {flash.message && (
            <div className={`alert alert-${flash.type} alert-dismissible fade show`} role="alert">
                {flash.message}
                <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
            </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
            <div className="row">
                {/* Main Form Section */}
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header"><h5 className="mb-0">Warehouse Details</h5></div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Warehouse Name <span className="text-danger">*</span></label>
                                    <input type="text" id="name" className="form-control" required value={form.name || ''} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="code" className="form-label">Warehouse Code</label>
                                    <input type="text" id="code" className="form-control" readOnly value="Will be auto-generated" disabled />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="contact_person" className="form-label">Contact Person</label>
                                    <input type="text" id="contact_person" className="form-control" value={form.contact_person || ''} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" id="phone" className="form-control" value={form.phone || ''} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control" value={form.email || ''} onChange={handleChange} />
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea id="description" className="form-control" rows={3} value={form.description || ''} onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><h5 className="mb-0">Address Information</h5></div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea id="address" className="form-control" rows={3} value={form.address || ''} onChange={handleChange}></textarea>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" id="city" className="form-control" value={form.city || ''} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input type="text" id="state" className="form-control" value={form.state || ''} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <input type="text" id="country" className="form-control" value={form.country || ''} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="pincode" className="form-label">Pincode</label>
                                    <input type="text" id="pincode" className="form-control" value={form.pincode || ''} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Section for Status and Actions */}
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header"><h5 className="mb-0">Status & Actions</h5></div>
                        <div className="card-body">
                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" role="switch" id="is_active" checked={form.is_active || false} onChange={handleChange} />
                                <label className="form-check-label" htmlFor="is_active">Active</label>
                            </div>
                            <hr />
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? (
                                        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving...</>
                                    ) : (
                                        <><i className="bi bi-check-circle me-2"></i>Create Warehouse</>
                                    )}
                                </button>
                                <Link href="/warehouses" className="btn btn-outline-secondary">
                                    <i className="bi bi-x-circle me-2"></i>Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
};

export default CreateWarehousePage;