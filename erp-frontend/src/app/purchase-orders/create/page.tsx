// app/purchase-orders/create/page.tsx
"use client";
import { useState, useEffect, FC, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Interfaces
interface PurchaseOrderItem {
  item_id: number | '';
  ordered_qty: number;
  unit_price: number;
  discount_percent: number;
  tax_percent: number;
  uom: string;
}
interface PurchaseOrderData {
  supplier_id: number | '';
  warehouse_id: number | '';
  order_date: string;
  expected_date: string;
  terms_and_conditions: string;
  remarks: string;
  items: PurchaseOrderItem[];
}
interface Summary {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}
interface DropdownOption {
  id: number;
  name?: string; // For supplier/warehouse
  item_name?: string; // For item
  item_code?: string;
  purchase_rate?: number;
  unit?: string;
}
interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

const CreatePurchaseOrderPage: FC = () => {
  const router = useRouter();
  
  const [poData, setPoData] = useState<PurchaseOrderData>({
    supplier_id: "",
    warehouse_id: "",
    order_date: new Date().toISOString().split("T")[0],
    expected_date: "",
    terms_and_conditions: "",
    remarks: "",
    items: [],
  });

  const [summary, setSummary] = useState<Summary>({ subtotal: 0, discount: 0, tax: 0, total: 0 });
  const [suppliers, setSuppliers] = useState<DropdownOption[]>([]);
  const [warehouses, setWarehouses] = useState<DropdownOption[]>([]);
  const [items, setItems] = useState<DropdownOption[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        const headers = { Authorization: `Bearer ${token}` };
        const [supRes, whRes, itemRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, { headers }),
        ]);
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope
        // — dropdowns were rendering empty because state was set to the whole
        // envelope instead of its `data` array.
        if (supRes.ok) setSuppliers((await supRes.json()).data);
        if (whRes.ok) setWarehouses((await whRes.json()).data);
        if (itemRes.ok) setItems((await itemRes.json()).data);
      } catch (err) {
        setFlash({ type: 'danger', message: 'Failed to load required data.' });
      }
    };
    fetchData();
  }, []);

  const handleHeaderChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPoData(prev => ({ ...prev, [id]: value }));
  };

  const handleItemChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newItems = [...poData.items];
    const itemRow = newItems[index];
    
    // @ts-ignore
    itemRow[name] = e.target.type === 'number' ? parseFloat(value) || 0 : value;

    if (name === "item_id") {
      const selectedItem = items.find((i) => i.id === parseInt(value));
      itemRow.unit_price = selectedItem?.purchase_rate || 0;
      itemRow.uom = selectedItem?.unit || '';
    }
    setPoData(prev => ({ ...prev, items: newItems }));
  };

  const addItemRow = () => {
    setPoData(prev => ({
      ...prev,
      items: [ ...prev.items, { item_id: "", ordered_qty: 1, unit_price: 0, discount_percent: 0, tax_percent: 0, uom: "" }],
    }));
  };

  const removeItemRow = (index: number) => {
    setPoData(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };
  
  useEffect(() => {
    let subtotal = 0, totalDiscount = 0, totalTax = 0;
    poData.items.forEach(row => {
      const lineAmount = row.ordered_qty * row.unit_price;
      const discountAmount = (lineAmount * row.discount_percent) / 100;
      const taxableAmount = lineAmount - discountAmount;
      const taxAmount = (taxableAmount * row.tax_percent) / 100;
      subtotal += lineAmount;
      totalDiscount += discountAmount;
      totalTax += taxAmount;
    });
    setSummary({ subtotal, discount: totalDiscount, tax: totalTax, total: subtotal - totalDiscount + totalTax });
  }, [poData.items]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!poData.supplier_id || !poData.warehouse_id || poData.items.length === 0 || poData.items.some(i => !i.item_id)) {
      setFlash({ type: "danger", message: "Supplier, Warehouse and all selected items are required." });
      return;
    }
    setSubmitting(true);
    
    const payload = {
      ...poData,
      supplier_id: Number(poData.supplier_id),
      warehouse_id: Number(poData.warehouse_id),
      expected_date: poData.expected_date || undefined,
      items: poData.items.map(item => ({
        ...item,
        item_id: Number(item.item_id),
        ordered_qty: Number(item.ordered_qty),
        unit_price: Number(item.unit_price),
        discount_percent: Number(item.discount_percent) || 0,
        tax_percent: Number(item.tax_percent) || 0,
      })),
    };
  
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        Cookies.set("flashMessage", "Purchase Order created successfully!", { path: "/purchase-orders" });
        Cookies.set("flashType", "success", { path: "/purchase-orders" });
        router.push("/purchase-orders");
      } else {
        const err = await res.json();
        const messages = Array.isArray(err.message) ? err.message.join(', ') : err.message;
        setFlash({ type: "danger", message: messages || "Failed to create PO." });
      }
    } catch (error) {
      setFlash({ type: "danger", message: "Server error. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };
  
  const calculateLineTotal = (row: PurchaseOrderItem) => {
    const lineAmount = row.ordered_qty * row.unit_price;
    const discountAmount = (lineAmount * row.discount_percent) / 100;
    const taxableAmount = lineAmount - discountAmount;
    const taxAmount = (taxableAmount * row.tax_percent) / 100;
    return (taxableAmount + taxAmount);
  };

  return (
    <div className="container-fluid">
      {flash.message && (
          <div className={`alert alert-${flash.type} alert-dismissible fade show`} role="alert">
              {flash.message}
              <button type="button" className="btn-close" onClick={() => setFlash({type: '', message: ''})}></button>
          </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Create Purchase Order</h1>
          <Link href="/purchase-orders" className="btn btn-secondary">
              <i className="bi bi-arrow-left me-2"></i>Back to List
          </Link>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="card shadow-sm mb-4">
          <div className="card-header"><h5 className="mb-0">Purchase Order Details</h5></div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="supplier_id" className="form-label">Supplier *</label>
                <select id="supplier_id" className="form-select" required value={poData.supplier_id} onChange={handleHeaderChange}>
                  <option value="">Select Supplier</option>
                  {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="warehouse_id" className="form-label">Warehouse *</label>
                <select id="warehouse_id" className="form-select" required value={poData.warehouse_id} onChange={handleHeaderChange}>
                  <option value="">Select Warehouse</option>
                  {warehouses.map((w) => <option key={w.id} value={w.id}>{w.name}</option>)}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="order_date" className="form-label">PO Date *</label>
                <input type="date" id="order_date" className="form-control" required value={poData.order_date} onChange={handleHeaderChange} />
              </div>
              <div className="col-md-2 mb-3">
                <label htmlFor="expected_date" className="form-label">Expected Delivery</label>
                <input type="date" id="expected_date" className="form-control" value={poData.expected_date} onChange={handleHeaderChange} />
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow-sm mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Items</h5>
                <button type="button" className="btn btn-sm btn-success" onClick={addItemRow}>
                    <i className="bi bi-plus-circle me-2"></i>Add Item
                </button>
            </div>
            <div className="card-body p-0">
                {poData.items.length === 0 ? (
                    <p className="text-center text-muted py-3">No items added yet.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th style={{width: "25%"}}>Item</th>
                                    <th style={{width: "10%"}}>UOM</th>
                                    <th style={{width: "10%"}}>Qty</th>
                                    <th style={{width: "15%"}}>Unit Price</th>
                                    <th style={{width: "10%"}}>Discount %</th>
                                    <th style={{width: "10%"}}>Tax %</th>
                                    <th style={{width: "15%"}} className="text-end">Line Total</th>
                                    <th style={{width: "5%"}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {poData.items.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select name="item_id" className="form-select" value={row.item_id} onChange={(e) => handleItemChange(index, e)} required>
                                                <option value="">Select Item</option>
                                                {items.map(it => <option key={it.id} value={it.id}>{it.item_name} ({it.item_code})</option>)}
                                            </select>
                                        </td>
                                        <td className="align-middle text-center"><span className="badge bg-secondary">{row.uom || 'N/A'}</span></td>
                                        <td><input type="number" name="ordered_qty" className="form-control" value={row.ordered_qty} onChange={(e) => handleItemChange(index, e)} min="0.001" step="0.001" required/></td>
                                        <td><input type="number" name="unit_price" className="form-control" value={row.unit_price} onChange={(e) => handleItemChange(index, e)} min="0" step="0.01" required/></td>
                                        <td><input type="number" name="discount_percent" className="form-control" value={row.discount_percent} onChange={(e) => handleItemChange(index, e)} min="0" max="100" step="0.01"/></td>
                                        <td><input type="number" name="tax_percent" className="form-control" value={row.tax_percent} onChange={(e) => handleItemChange(index, e)} min="0" step="0.01"/></td>
                                        <td className="text-end align-middle"><strong>₹{calculateLineTotal(row).toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong></td>
                                        <td><button type="button" className="btn btn-danger btn-sm" onClick={() => removeItemRow(index)}><i className="bi bi-trash"></i></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
        <div className="row">
            <div className="col-lg-8 mb-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="terms_and_conditions" className="form-label">Terms & Conditions</label>
                            <textarea id="terms_and_conditions" className="form-control" rows={2} value={poData.terms_and_conditions} onChange={handleHeaderChange}></textarea>
                        </div>
                        <div>
                            <label htmlFor="remarks" className="form-label">Remarks</label>
                            <textarea id="remarks" className="form-control" rows={2} value={poData.remarks} onChange={handleHeaderChange}></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 mb-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>₹{summary.subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                        <div className="d-flex justify-content-between mb-2"><span>Discount:</span><span>- ₹{summary.discount.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                        <div className="d-flex justify-content-between mb-2"><span>Tax:</span><span>+ ₹{summary.tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span></div>
                        <hr/>
                        <div className="d-flex justify-content-between h5"><strong>Total:</strong><strong>₹{summary.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</strong></div>
                        <hr/>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary" disabled={submitting}>
                                {submitting ? 'Creating...' : <><i className="bi bi-check-circle me-2"></i>Create Purchase Order</>}
                            </button>
                            <Link href="/purchase-orders" className="btn btn-outline-secondary">Cancel</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePurchaseOrderPage;