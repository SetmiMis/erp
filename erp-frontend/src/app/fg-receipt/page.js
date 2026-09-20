"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { apiClient } from "../../lib/apiClient";

export default function FinishedGoodsReceipt() {
  const [fgrList, setFgrList] = useState([]);

  useEffect(() => {
    fetchFGR();
  }, []);

  const fetchFGR = async () => {
    try {
      const data = await apiClient.get("/fgr");
      setFgrList(data ?? []);
    } catch (err) {
      console.error("Error fetching FGR list:", err);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-box-arrow-in-down text-primary"></i> Finished
            Goods Receipt
          </h1>
          <Link href="/fg-receipt/create" className="btn btn-primary">
            <i className="bi bi-plus-circle me-2"></i>Record Receipt
          </Link>
        </div>
      </div>

      {/* List */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {fgrList.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-box-arrow-in-down fs-1 text-muted"></i>
              <h4 className="mt-3 text-muted">
                No Finished Goods Receipts Found
              </h4>
              <p className="text-muted">
                Record your first finished goods receipt after production
              </p>
              <Link href="/fg-receipt/create" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Record Receipt
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Receipt No</th>
                    <th>Production Order</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Warehouse</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fgrList.map((fgr) => (
                    <tr key={fgr.id}>
                      <td>
                        <strong>{fgr.receipt_number}</strong>
                      </td>
                      <td>{fgr.production_order_no}</td>
                      <td>{fgr.item_name}</td>
                      <td>
                        {Number(fgr.quantity).toFixed(2)} {fgr.uom}
                      </td>
                      <td>{fgr.warehouse_name}</td>
                      <td>
                        {new Date(fgr.receipt_date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            fgr.status === "confirmed" ? "success" : "secondary"
                          }`}
                        >
                          {fgr.status.charAt(0).toUpperCase() +
                            fgr.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <Link
                            href={`/fg-receipt/${fgr.id}`}
                            className="btn btn-outline-primary"
                            title="View"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            href={`/fg-receipt/${fgr.id}/edit`}
                            className="btn btn-outline-secondary"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
