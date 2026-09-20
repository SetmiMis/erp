"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { motion, Variants } from "framer-motion"; // Framer Motion import karein

// Interface for data structures
interface Supplier {
  id: number;
  name: string;
  supplier_code: string;
  contact_person?: string;
  email?: string;
  phone?: string;
  gst_number?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
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

// Reusable components for loading and error states
const LoadingSpinner: FC = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <h4 className="ms-3 text-muted">Loading Supplier Details...</h4>
  </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-5">
    <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
    <h4 className="mt-3 text-danger">An Error Occurred</h4>
    <p className="text-muted">{message}</p>
    <Link href="/suppliers" className="btn btn-primary">
      <i className="bi bi-arrow-left me-2"></i>Back to Suppliers
    </Link>
  </div>
);

const SupplierDetailsPage: FC = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  
  useEffect(() => {
    if (searchParams.get("updated") === "true") {
      setFlash({ type: "success", message: "Supplier details updated successfully!" });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!id) return;
    const fetchSupplier = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Supplier not found.");
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await res.json();
        setSupplier(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplier();
  }, [id]);

  const showOrNA = (val: string | null | undefined): string => val && val.trim() !== "" ? val : "N/A";

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!supplier) return <ErrorDisplay message="No supplier data available." />;

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
          <h1 className="h3 mb-0">
            <i className="bi bi-person-badge text-primary"></i> {supplier.name}
          </h1>
          <div>
            <Link href="/suppliers" className="btn btn-outline-secondary me-2">
              <i className="bi bi-arrow-left me-2"></i> Back
            </Link>
            <Link href={`/suppliers/${id}/edit`} className="btn btn-primary">
              <i className="bi bi-pencil me-2"></i> Edit
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Flash Messages */}
      {flash.message && (
        <motion.div variants={itemVariants} initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
                {flash.message}
                <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
            </div>
        </motion.div>
      )}

      <div className="row">
        {/* Left Column: Details */}
        <motion.div className="col-md-8" variants={itemVariants}>
          <div className="card mb-4">
            <div className="card-header"><h5 className="mb-0">Basic Information</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Supplier Code</label><p className="form-control-plaintext">{showOrNA(supplier.supplier_code)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Supplier Name</label><p className="form-control-plaintext">{showOrNA(supplier.name)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Contact Person</label><p className="form-control-plaintext">{showOrNA(supplier.contact_person)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Email</label><p className="form-control-plaintext">{showOrNA(supplier.email)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Phone</label><p className="form-control-plaintext">{showOrNA(supplier.phone)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">GST Number</label><p className="form-control-plaintext">{showOrNA(supplier.gst_number)}</p></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h5 className="mb-0">Address Information</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 mb-3"><label className="form-label text-muted">Address</label><p className="form-control-plaintext">{showOrNA(supplier.address)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">City</label><p className="form-control-plaintext">{showOrNA(supplier.city)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">State</label><p className="form-control-plaintext">{showOrNA(supplier.state)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Country</label><p className="form-control-plaintext">{showOrNA(supplier.country)}</p></div>
                <div className="col-md-6 mb-3"><label className="form-label text-muted">Pincode</label><p className="form-control-plaintext">{showOrNA(supplier.pincode)}</p></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Status & Info */}
        <motion.div className="col-md-4" variants={itemVariants}>
          <div className="card">
            <div className="card-header"><h5 className="mb-0">Status & Info</h5></div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Status</label>
                <p>
                  {/* 🛠️ Bug fix: backend field is `is_active: boolean`, not a
                      `status` string — this always rendered "Inactive". */}
                  <span className={`badge bg-${supplier.is_active ? "success" : "secondary"}`}>
                    {supplier.is_active ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Created On</label>
                <p className="form-control-plaintext">{new Date(supplier.created_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="form-label text-muted">Last Updated</label>
                <p className="form-control-plaintext">{new Date(supplier.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SupplierDetailsPage;