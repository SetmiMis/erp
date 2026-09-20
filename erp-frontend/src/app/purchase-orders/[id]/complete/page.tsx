"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

// ✅ 1. Define interfaces for your data
interface ProductionOrder {
  id: number;
  order_number: string;
  fg_name: string; // Finished Good Name
  fg_code: string; // Finished Good Code
  status: string;
  warehouse_id: number;
}

interface FlashMessage {
  type: "success" | "danger";
  message: string;
}

// ✅ 2. Reusable components for clean UI states
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading Order Details...</h4>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">An Error Occurred</h4>
        <p className="text-muted">{message}</p>
        <Link href="/production-orders" className="btn btn-primary"><i className="bi bi-arrow-left me-2"></i>Back to List</Link>
    </div>
);

// ✅ 3. Convert to a typed FC with full state management
const CompleteProductionOrderPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<ProductionOrder | null>(null);
  const [producedQty, setProducedQty] = useState<string>("");
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ 4. Securely fetch order details
  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production-orders/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to load order.");
            }
            // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
            const { data } = await res.json();
            setOrder(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchOrder();
  }, [id]);

  // ✅ 5. Typed and secure submit handler
  const handleComplete = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFlash(null);

    const qty = parseFloat(producedQty);
    if (isNaN(qty) || qty <= 0) {
      setFlash({ type: "danger", message: "Please enter a valid Produced Quantity." });
      return;
    }
    if (!order) return;

    setSaving(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/production-completion`, { // Assuming this is your completion endpoint
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          production_order_id: Number(id),
          produced_qty: qty,
          warehouse_id: order.warehouse_id,
          remarks: "Completed via UI",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Redirect with a success flag
        router.push(`/production-orders/${id}?updated=true`);
      } else {
        setFlash({ type: "danger", message: data.message || "Failed to complete order." });
      }
    } catch (err) {
      setFlash({ type: "danger", message: "A server error occurred. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!order) return <ErrorDisplay message="Production order not found." />;

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">
          <i className="bi bi-check-circle text-success"></i> Complete Production Order
        </h1>
        <Link href={`/production-orders/${id}`} className="btn btn-outline-secondary">
            <i className="bi bi-x-circle me-2"></i>Cancel
        </Link>
      </div>

      {flash && (
        <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
            {flash.message}
            <button type="button" className="btn-close" onClick={() => setFlash(null)}></button>
        </div>
      )}

      {/* Order Info */}
      <div className="card mb-4">
        <div className="card-header"><h5 className="mb-0">Order Summary</h5></div>
        <div className="card-body">
            <div className="row">
                <div className="col-md-4"><p><strong>Order No:</strong> {order.order_number}</p></div>
                <div className="col-md-5"><p><strong>Product:</strong> {order.fg_name} ({order.fg_code})</p></div>
                <div className="col-md-3"><p><strong>Status:</strong> <span className="badge bg-primary text-capitalize">{order.status}</span></p></div>
            </div>
        </div>
      </div>

      {/* Complete Form */}
      <form onSubmit={handleComplete} className="card">
        <div className="card-body">
            <div className="mb-3">
                <label htmlFor="producedQty" className="form-label">Produced Quantity *</label>
                <input
                    type="number"
                    id="producedQty"
                    className="form-control"
                    value={producedQty}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setProducedQty(e.target.value)}
                    step="0.001"
                    min="0.001"
                    required
                    placeholder="e.g., 100.5"
                />
            </div>
            <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? (
                    <><span className="spinner-border spinner-border-sm me-2"></span>Completing...</>
                ) : (
                    <><i className="bi bi-check-circle me-2"></i> Complete Production</>
                )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProductionOrderPage;