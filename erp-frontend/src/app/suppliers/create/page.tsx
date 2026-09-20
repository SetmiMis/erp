"use client";
import { useState, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion, Variants } from "framer-motion"; // Framer Motion import karein

// Interfaces for data structures
interface SupplierFormData {
  name: string;
  supplier_code: string;
  contact_person: string;
  email: string;
  phone: string;
  gst_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
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

const CreateSupplierPage: FC = () => {
  const router = useRouter();

  const initialFormState: SupplierFormData = {
    name: "",
    supplier_code: "", // This will be ignored on submission
    contact_person: "",
    email: "",
    phone: "",
    gst_number: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    is_active: true,
  };
  
  const [form, setForm] = useState<SupplierFormData>(initialFormState);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: id === 'is_active' ? (value === 'true') : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!form.name || !form.contact_person || !form.email) {
      setFlash({ type: "danger", message: "Supplier Name, Contact Person, and Email are required." });
      setSubmitting(false);
      return;
    }
    
    const { supplier_code, ...dataToSend } = form;

    try {
      const token = Cookies.get('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (res.ok) {
        // Redirect with a success query param to show flash message on the list page
        router.push("/suppliers?created=true"); 
      } else {
        const data = await res.json();
        const errorMessage = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        setFlash({ type: "danger", message: errorMessage || "Error creating supplier." });
      }
    } catch (error) {
      setFlash({ type: "danger", message: "Server error. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="container-fluid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header & Flash Messages */}
      <motion.div className="row" variants={itemVariants}>
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <i className="bi bi-plus-circle text-primary"></i> Create Supplier
          </h1>
          <Link href="/suppliers" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back to List
          </Link>
        </div>
      </motion.div>
      {flash.message && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} variants={itemVariants}>
            <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
                {flash.message}
                <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
            </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <motion.div className="col-md-8" variants={itemVariants}>
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Basic Information</h5></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Supplier Name <span className="text-danger">*</span></label>
                    <input type="text" id="name" className="form-control" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="supplier_code" className="form-label">Supplier Code</label>
                    <input type="text" id="supplier_code" className="form-control" value="Will be auto-generated" readOnly disabled />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="contact_person" className="form-label">Contact Person <span className="text-danger">*</span></label>
                    <input type="text" id="contact_person" className="form-control" required value={form.contact_person} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email <span className="text-danger">*</span></label>
                    <input type="email" id="email" className="form-control" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" id="phone" className="form-control" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="gst_number" className="form-label">GST Number</label>
                    <input type="text" id="gst_number" className="form-control" value={form.gst_number} onChange={handleChange} />
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
                    <textarea id="address" className="form-control" rows={3} value={form.address} onChange={handleChange}></textarea>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" id="city" className="form-control" value={form.city} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" id="state" className="form-control" value={form.state} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" id="country" className="form-control" value={form.country} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input type="text" id="pincode" className="form-control" value={form.pincode} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="col-md-4" variants={itemVariants}>
            <div className="card">
              <div className="card-header"><h5 className="mb-0">Status & Actions</h5></div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="is_active" className="form-label">Status</label>
                  <select id="is_active" className="form-select" value={form.is_active.toString()} onChange={handleChange}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
                <hr />
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? (
                      <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                    ) : (
                      <><i className="bi bi-check-circle me-2"></i>Create Supplier</>
                    )}
                  </button>
                  <Link href="/suppliers" className="btn btn-outline-secondary">
                    <i className="bi bi-x-circle me-2"></i>Cancel
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
};

export default CreateSupplierPage;