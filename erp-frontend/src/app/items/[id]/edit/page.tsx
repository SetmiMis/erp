"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion, Variants } from "framer-motion";

// ✅ 1. Interface mein 'item_category' ko 'category' kar diya gaya hai
interface Item {
  id: number;
  item_code: string;
  item_name: string;
  item_type: 'raw_material' | 'semi_finished' | 'finished_goods' | 'consumable' | 'service';
  category: string; // ✅ SUDHAR
  unit: string;
  hsn_code: string;
  gst_rate: number;
  purchase_rate: number;
  sale_rate: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_level: number;
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
    <Link href="/items" className="btn btn-primary"><i className="bi bi-arrow-left me-2"></i>Back to Items List</Link>
  </div>
);

const EditItemPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Partial<Item>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

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
        const data = await res.json();
        // Backend se 'category' aa raha hai, use form mein set kar rahe hain
        setForm(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, is_active: e.target.value === 'true' }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.item_name) {
        setFlash({ type: "danger", message: "Item Name is required." });
        return;
    }
    setSubmitting(true);

    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push(`/items/${id}?updated=true`);
      } else {
        const errorData = await res.json();
        setFlash({ type: "danger", message: errorData.message || "Failed to update item." });
      }
    } catch {
      setFlash({ type: "danger", message: "Server error while updating item." });
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!form) return <ErrorDisplay message="Item data could not be loaded."/>;

  return (
    <motion.div 
        className="container-fluid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      <motion.div className="row" variants={itemVariants}>
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0"><i className="bi bi-pencil text-primary"></i> Edit Item</h1>
          <Link href={`/items/${id}`} className="btn btn-outline-secondary"><i className="bi bi-arrow-left me-2"></i> Back to Details</Link>
        </div>
      </motion.div>

      {flash.message && (
        <motion.div variants={itemVariants} initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
            {flash.message}
            <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
            </div>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <motion.div className="col-lg-8" variants={itemVariants}>
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Item Details</h5></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="item_name" className="form-label">Item Name <span className="text-danger">*</span></label>
                    <input type="text" id="item_name" className="form-control" value={form.item_name || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="item_code" className="form-label">Item Code</label>
                    <input type="text" id="item_code" className="form-control" value={form.item_code || ''} readOnly disabled />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="item_type" className="form-label">Item Type</label>
                    <select id="item_type" className="form-select" value={form.item_type || 'raw_material'} onChange={handleChange}>
                      <option value="raw_material">Raw Material</option>
                      <option value="semi_finished">Semi Finished</option>
                      <option value="finished_goods">Finished Goods</option>
                      <option value="consumable">Consumable</option>
                      <option value="service">Service</option>
                    </select>
                  </div>
                  
                  {/* ✅ 2. Input field mein 'item_category' ko 'category' kar diya gaya hai */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" id="category" className="form-control" value={form.category || ''} onChange={handleChange} />
                  </div>

                   <div className="col-md-6 mb-3">
                    <label htmlFor="unit" className="form-label">Unit (UOM)</label>
                    <select id="unit" className="form-select" value={form.unit || 'pcs'} onChange={handleChange}>
                      <option value="pcs">Pieces (Pcs)</option>
                      <option value="kg">Kilogram (Kg)</option>
                      <option value="ltr">Liter (Ltr)</option>
                      <option value="mtr">Meter (Mtr)</option>
                      <option value="box">Box</option>
                    </select>
                  </div>
                   <div className="col-md-6 mb-3">
                    <label htmlFor="hsn_code" className="form-label">HSN/SAC Code</label>
                    <input type="text" id="hsn_code" className="form-control" value={form.hsn_code || ''} onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Pricing & Tax</h5></div>
              <div className="card-body">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="purchase_rate" className="form-label">Purchase Rate</label>
                        <input type="number" step="0.01" id="purchase_rate" className="form-control" value={form.purchase_rate || 0} onChange={handleChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="sale_rate" className="form-label">Sale Rate</label>
                        <input type="number" step="0.01" id="sale_rate" className="form-control" value={form.sale_rate || 0} onChange={handleChange} />
                    </div>
                     <div className="col-md-4 mb-3">
                        <label htmlFor="gst_rate" className="form-label">GST Rate (%)</label>
                        <input type="number" step="0.01" id="gst_rate" className="form-control" value={form.gst_rate || 0} onChange={handleChange} />
                    </div>
                </div>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-header"><h5 className="mb-0">Stock Management</h5></div>
              <div className="card-body">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="minimum_stock" className="form-label">Minimum Stock</label>
                        <input type="number" id="minimum_stock" className="form-control" value={form.minimum_stock || 0} onChange={handleChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="maximum_stock" className="form-label">Maximum Stock</label>
                        <input type="number" id="maximum_stock" className="form-control" value={form.maximum_stock || 0} onChange={handleChange} />
                    </div>
                     <div className="col-md-4 mb-3">
                        <label htmlFor="reorder_level" className="form-label">Reorder Level</label>
                        <input type="number" id="reorder_level" className="form-control" value={form.reorder_level || 0} onChange={handleChange} />
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="col-lg-4" variants={itemVariants}>
            <div className="card">
              <div className="card-header"><h5 className="mb-0">Status & Actions</h5></div>
              <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="is_active" className="form-label">Status</label>
                    <select id="is_active" className="form-select" value={String(form.is_active)} onChange={handleStatusChange}>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>
                <hr/>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? (
                        <><span className="spinner-border spinner-border-sm me-2"></span>Updating...</>
                    ) : (
                        <><i className="bi bi-check-circle me-2"></i> Update Item</>
                    )}
                  </button>
                  <Link href={`/items/${id}`} className="btn btn-outline-secondary">
                    <i className="bi bi-x-circle me-2"></i> Cancel
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

export default EditItemPage;