"use client";
import { useEffect, useState, FC } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { motion, Variants } from "framer-motion"; // Framer Motion import karein

// Interface for the item data
interface Item {
  id: number;
  item_code: string;
  item_name: string;
  description?: string;
  item_type: string;
  category?: string;
  unit: string | null;
  hsn_code?: string;
  gst_rate: number;
  purchase_rate: number;
  sale_rate: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_level: number;
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

// Reusable components
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-3 text-muted">Loading Item Details...</h4>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">An Error Occurred</h4>
        <p className="text-muted">{message}</p>
        <Link href="/items" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>Back to Items List
        </Link>
    </div>
);

const ItemDetailsPage: FC = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

  useEffect(() => {
    if (searchParams.get("updated") === "true") {
      setFlash({ type: "success", message: "Item details updated successfully!" });
    }
  }, [searchParams]);

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Item not found.");
        }
        const data: Item = await res.json();
        setItem(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!item) return <ErrorDisplay message="No item data available." />;

  const showOrNA = (val: string | null | undefined) => val || "N/A";
  const showNumber = (val: number | null | undefined) => (val != null ? val.toLocaleString('en-IN') : "N/A");

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
            <i className="bi bi-box text-primary"></i> {item.item_name}
          </h1>
          <div>
            <Link href="/items" className="btn btn-outline-secondary me-2"><i className="bi bi-arrow-left me-2"></i> Back</Link>
            <Link href={`/items/${id}/edit`} className="btn btn-primary"><i className="bi bi-pencil me-2"></i> Edit</Link>
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
        {/* Left Column: Main Details */}
        <motion.div className="col-lg-8" variants={itemVariants}>
          <div className="card mb-4">
            <div className="card-header"><h5 className="mb-0">Item Details</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Item Code</label><p className="form-control-plaintext">{item.item_code}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Item Name</label><p className="form-control-plaintext">{item.item_name}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Item Type</label><p className="form-control-plaintext text-capitalize">{showOrNA(item.item_type?.replace('_', ' '))}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Category</label><p className="form-control-plaintext">{showOrNA(item.category)}</p></div>
                <div className="col-md-4 mb-3">
                  <label className="form-label text-muted">Unit (UOM)</label>
                  <p className="form-control-plaintext">{showOrNA(item.unit).toUpperCase()}</p>
                </div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">HSN/SAC Code</label><p className="form-control-plaintext">{showOrNA(item.hsn_code)}</p></div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header"><h5 className="mb-0">Pricing & Tax</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Purchase Rate</label><p className="form-control-plaintext">₹{showNumber(item.purchase_rate)}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Sale Rate</label><p className="form-control-plaintext">₹{showNumber(item.sale_rate)}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">GST Rate</label><p className="form-control-plaintext">{showNumber(item.gst_rate)}%</p></div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header"><h5 className="mb-0">Stock Management</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Minimum Stock</label><p className="form-control-plaintext">{showNumber(item.minimum_stock)} {showOrNA(item.unit).toUpperCase()}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Maximum Stock</label><p className="form-control-plaintext">{showNumber(item.maximum_stock)} {showOrNA(item.unit).toUpperCase()}</p></div>
                <div className="col-md-4 mb-3"><label className="form-label text-muted">Reorder Level</label><p className="form-control-plaintext">{showNumber(item.reorder_level)} {showOrNA(item.unit).toUpperCase()}</p></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Status & Timestamps */}
        <motion.div className="col-lg-4" variants={itemVariants}>
          <div className="card">
            <div className="card-header"><h5 className="mb-0">Status & Info</h5></div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Status</label>
                <p>
                  <span className={`badge fs-6 bg-${item.is_active ? "success" : "secondary"}`}>
                    {item.is_active ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Created On</label>
                <p className="form-control-plaintext">{new Date(item.created_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="form-label text-muted">Last Updated</label>
                <p className="form-control-plaintext">{new Date(item.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ItemDetailsPage;