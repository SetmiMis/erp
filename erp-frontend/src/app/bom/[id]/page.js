"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/apiClient";

export default function BOMDetailPage() {
  const { id } = useParams();
  const [bom, setBom] = useState(null);
  const [itemsById, setItemsById] = useState({});
  const [loading, setLoading] = useState(true);

  // Load BOM detail + items (to resolve item_id -> name/sku for display)
  useEffect(() => {
    const fetchBom = async () => {
      try {
        const [bomData, itemsData] = await Promise.all([
          apiClient.get(`/bom/${id}`),
          apiClient.get("/items"),
        ]);
        setBom(bomData);
        const map = {};
        (itemsData ?? []).forEach((it) => {
          map[it.id] = it;
        });
        setItemsById(map);
      } catch (err) {
        console.error("Error loading BOM:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBom();
  }, [id]);

  if (loading) return <div className="container py-5">Loading...</div>;
  if (!bom) return <div className="container py-5">❌ BOM not found</div>;

  const fgItem = itemsById[bom.fg_item_id];

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-diagram-3 text-primary"></i> BOM Detail
          </h1>
          <Link href="/bom" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i> Back to BOMs
          </Link>
        </div>
      </div>

      {/* BOM Info */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header">
          <h5 className="mb-0">BOM Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <strong>Finished Product:</strong>
              <p>{fgItem ? `${fgItem.name} (${fgItem.sku ?? "-"})` : bom.name}</p>
            </div>
            <div className="col-md-2 mb-3">
              <strong>Version:</strong>
              <p>{bom.version}</p>
            </div>
            <div className="col-md-2 mb-3">
              <strong>Status:</strong>
              <p>
                <span className={`badge bg-${bom.status === "active" ? "success" : "secondary"}`}>
                  {bom.status}
                </span>
              </p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>Created At:</strong>
              <p>{new Date(bom.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Components Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header">
          <h5 className="mb-0">Components</h5>
        </div>
        <div className="card-body">
          {bom.items && bom.items.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Item Code</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {bom.items.map((comp) => {
                    const item = itemsById[comp.item_id];
                    return (
                      <tr key={comp.id}>
                        <td>{item?.sku ?? comp.item_id}</td>
                        <td>{item?.name ?? "-"}</td>
                        <td>{comp.qty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No components found for this BOM</p>
          )}
        </div>
      </div>
    </div>
  );
}
