// app/purchase-orders/[id]/page.tsx
"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Updated interfaces to match backend response
type POStatus = 'draft' | 'sent' | 'acknowledged' | 'partial' | 'completed' | 'cancelled';

interface PurchaseOrderItem {
  id: number;
  item_name: string;
  item_code: string;
  ordered_qty: number;
  unit_price: number;
  discount_percent: number;
  tax_percent: number;
  total_amount: number;
  uom?: string;
}

interface PurchaseOrder {
  id: number;
  po_number: string;
  supplier_name: string;
  warehouse_name: string;
  order_date: string;
  expected_date?: string;
  terms_and_conditions?: string;
  remarks?: string;
  status: POStatus;
  total_amount: number;
  items: PurchaseOrderItem[];
}

interface OrderSummary {
  subtotal: number;
  discount: number;
  tax: number;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
        <h4 className="ms-3 text-muted">Loading Purchase Order...</h4>
    </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">An Error Occurred</h4>
        <p className="text-muted">{message}</p>
        <Link href="/purchase-orders" className="btn btn-primary"><i className="bi bi-arrow-left me-2"></i>Back to List</Link>
    </div>
);

const PurchaseOrderDetailsPage: FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null);
  const [summary, setSummary] = useState<OrderSummary>({ subtotal: 0, discount: 0, tax: 0 });
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const flashMessage = Cookies.get("flashMessage");
    const flashType = Cookies.get("flashType") as FlashMessage['type'] | undefined;

    if (flashMessage && flashType) {
        setFlash({ type: flashType, message: flashMessage });
        Cookies.remove("flashMessage");
        Cookies.remove("flashType");
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchPO = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = Cookies.get("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Purchase Order not found");
            }
            // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
            const { data } = await res.json();
            setPurchaseOrder(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchPO();
  }, [id]);
  
  // Calculate summary on frontend for detailed breakdown
  useEffect(() => {
    if (purchaseOrder?.items) {
        let subtotal = 0, totalDiscount = 0, totalTax = 0;
        purchaseOrder.items.forEach(item => {
            const lineAmount = item.ordered_qty * item.unit_price;
            const discountAmount = (lineAmount * item.discount_percent) / 100;
            const taxableAmount = lineAmount - discountAmount;
            const taxAmount = (taxableAmount * item.tax_percent) / 100;

            subtotal += lineAmount;
            totalDiscount += discountAmount;
            totalTax += taxAmount;
        });
        setSummary({ subtotal, discount: totalDiscount, tax: totalTax });
    }
  }, [purchaseOrder]);

  const updateStatus = async (status: POStatus) => {
    if (!confirm(`Are you sure you want to mark this order as '${status}'?`)) return;

    try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ status }),
        });

        if (res.ok) {
            setFlash({ type: "success", message: "Status updated successfully" });
            setPurchaseOrder(prev => prev ? { ...prev, status } : null);
        } else {
            const err = await res.json();
            setFlash({ type: "danger", message: err.message || "Failed to update status" });
        }
    } catch (error) {
        setFlash({ type: "danger", message: "Server error" });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!purchaseOrder) return <ErrorDisplay message="Purchase order data could not be loaded." />;

  const statusClass: Record<POStatus, string> = {
    draft: "secondary", sent: "info", acknowledged: "primary",
    partial: "warning", completed: "success", cancelled: "danger",
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row">
          <div className="col-12 d-flex justify-content-between align-items-center mb-4">
              <h1 className="h3 mb-0"><i className="bi bi-receipt text-primary"></i> PO #{purchaseOrder.po_number}</h1>
              <div>
                  <Link href="/purchase-orders" className="btn btn-outline-secondary me-2"><i className="bi bi-arrow-left me-2"></i>Back to List</Link>
                  
                  <div className="btn-group">
                      <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="bi bi-gear me-2"></i>Actions
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                          {purchaseOrder.status === 'draft' && (
                              <li><button className="dropdown-item" onClick={() => updateStatus('sent')}><i className="bi bi-send me-2"></i>Send to Supplier</button></li>
                          )}
                          {['sent'].includes(purchaseOrder.status) && (
                              <li><button className="dropdown-item" onClick={() => updateStatus('acknowledged')}><i className="bi bi-check-circle me-2"></i>Mark as Acknowledged</button></li>
                          )}
                          {purchaseOrder.status === 'draft' && (
                              <li><Link className="dropdown-item" href={`/purchase-orders/${id}/edit`}><i className="bi bi-pencil me-2"></i>Edit Order</Link></li>
                          )}
                          {purchaseOrder.status !== 'cancelled' && purchaseOrder.status !== 'completed' && (
                              <>
                                  <li><hr className="dropdown-divider" /></li>
                                  <li><button className="dropdown-item text-danger" onClick={() => updateStatus('cancelled')}><i className="bi bi-x-circle me-2"></i>Cancel Order</button></li>
                              </>
                          )}
                      </ul>
                  </div>
              </div>
          </div>
      </div>

      {/* Flash Messages */}
      {flash.message && (
          <div className={`alert alert-${flash.type} alert-dismissible fade show`}>
              {flash.message}
              <button type="button" className="btn-close" onClick={() => setFlash({ type: "", message: "" })}></button>
          </div>
      )}

      {/* Details */}
      <div className="row">
        <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Details</h5>
                    <span className={`badge bg-${statusClass[purchaseOrder.status] || "secondary"} fs-6 text-capitalize`}>{purchaseOrder.status}</span>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6"><p className="mb-2"><strong>Supplier:</strong> {purchaseOrder.supplier_name}</p></div>
                        <div className="col-md-6"><p className="mb-2"><strong>Warehouse:</strong> {purchaseOrder.warehouse_name}</p></div>
                        <div className="col-md-6"><p className="mb-2"><strong>PO Date:</strong> {new Date(purchaseOrder.order_date).toLocaleDateString('en-GB')}</p></div>
                        <div className="col-md-6"><p className="mb-2"><strong>Expected Delivery:</strong> {purchaseOrder.expected_date ? new Date(purchaseOrder.expected_date).toLocaleDateString('en-GB') : 'N/A'}</p></div>
                    </div>
                </div>
            </div>
            
            {/* Items Table */}
            <div className="card shadow-sm">
                 <div className="card-header"><h5 className="mb-0"><i className="bi bi-list-ul"></i> Items <span className="badge bg-primary ms-2">{purchaseOrder.items?.length || 0}</span></h5></div>
                 <div className="card-body p-0">
                   {!purchaseOrder.items?.length 
                        ? <p className="text-muted text-center p-4">No items in this purchase order.</p>
                        : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Item</th>
                                        <th className="text-end">Ordered</th>
                                        <th className="text-end">Unit Price</th>
                                        <th className="text-end">Line Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {purchaseOrder.items.map((item) => (
                                    <tr key={item.id}>
                                        <td><strong>{item.item_name}</strong> <br/><small className="text-muted">{item.item_code}</small></td>
                                        <td className="text-end">{Number(item.ordered_qty).toLocaleString('en-IN')} {item.uom || ''}</td>
                                        <td className="text-end">₹{Number(item.unit_price).toLocaleString('en-IN', {minimumFractionDigits: 2})}</td>
                                        <td className="text-end"><strong>₹{Number(item.total_amount).toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                   )}
                 </div>
            </div>
        </div>
        <div className="col-lg-4">
             <div className="card shadow-sm">
                 <div className="card-header"><h5 className="mb-0">Order Summary</h5></div>
                 <div className="card-body">
                     <div className="d-flex justify-content-between mb-2"><span className="text-muted">Subtotal:</span><span>₹{summary.subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                     <div className="d-flex justify-content-between mb-2"><span className="text-muted">Discount:</span><span>- ₹{summary.discount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                     <div className="d-flex justify-content-between mb-2"><span className="text-muted">Tax:</span><span>+ ₹{summary.tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                     <hr />
                     <div className="d-flex justify-content-between h5"><strong>Total:</strong><strong>₹{Number(purchaseOrder.total_amount).toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong></div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetailsPage;