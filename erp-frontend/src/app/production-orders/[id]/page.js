"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/apiClient";

export default function ProductionOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [itemsById, setItemsById] = useState({});
  const [warehousesById, setWarehousesById] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const [orderData, itemsData, whData] = await Promise.all([
          apiClient.get(`/production-orders/${id}`),
          apiClient.get("/items"),
          apiClient.get("/warehouses"),
        ]);
        setOrder(orderData);
        const iMap = {};
        (itemsData ?? []).forEach((it) => (iMap[it.id] = it));
        setItemsById(iMap);
        const wMap = {};
        (whData ?? []).forEach((w) => (wMap[w.id] = w));
        setWarehousesById(wMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!order) return <div className="container py-5">❌ Order not found</div>;

  const fgItem = itemsById[order.fg_item_id];
  const warehouse = warehousesById[order.warehouse_id];

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">
          <i className="bi bi-gear text-primary"></i> Production Order Detail
        </h1>
        <Link href="/production-orders" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>Back
        </Link>
      </div>

      {/* Order Info */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <p><strong>Order No:</strong> {order.order_number}</p>
          <p><strong>Finished Product:</strong> {fgItem ? `${fgItem.name} (${fgItem.sku ?? "-"})` : `Item #${order.fg_item_id}`}</p>
          <p><strong>Warehouse:</strong> {warehouse?.name ?? `#${order.warehouse_id}`}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Remarks:</strong> {order.remarks || "-"}</p>
        </div>
      </div>

      {/* Components */}
      <div className="card border-0 shadow-sm">
        <div className="card-header">Raw Material Requirements</div>
        <div className="card-body">
          {order.items?.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Item Code</th>
                  <th>Item Name</th>
                  <th>Required Qty</th>
                  <th>Issued Qty</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((c) => {
                  const item = itemsById[c.item_id];
                  return (
                    <tr key={c.id}>
                      <td>{item?.sku ?? c.item_id}</td>
                      <td>{item?.name ?? "-"}</td>
                      <td>{c.required_qty}</td>
                      <td>{c.issued_qty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No components</p>
          )}
        </div>
      </div>
    </div>
  );
}
