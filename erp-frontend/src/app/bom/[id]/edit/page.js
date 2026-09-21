"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../../lib/apiClient";

export default function EditBOMPage() {
  const { id } = useParams();
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    fg_item_id: "",
    version: "V1",
    remarks: "",
  });
  const [components, setComponents] = useState([]);
  const [flash, setFlash] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [bomStatus, setBomStatus] = useState(null);

  // Load items + existing BOM
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, bom] = await Promise.all([
          apiClient.get("/items"),
          apiClient.get(`/bom/${id}`),
        ]);
        setItems(itemsData ?? []);
        setBomStatus(bom.status);
        setForm({
          fg_item_id: bom.fg_item_id ?? "",
          version: bom.version || "V1",
          remarks: bom.remarks || "",
        });
        setComponents(
          (bom.items || []).map((it) => ({ item_id: it.item_id, qty: it.qty })),
        );
      } catch (err) {
        console.error("Error loading data", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  // Handle changes
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleComponentChange = (index, field, value) => {
    const updated = [...components];
    updated[index][field] = value;
    setComponents(updated);
  };
  const addComponent = () => setComponents([...components, { item_id: "", qty: "" }]);
  const removeComponent = (i) => setComponents(components.filter((_, idx) => idx !== i));

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fgItem = items.find((it) => String(it.id) === String(form.fg_item_id));
      await apiClient.patch(`/bom/${id}`, {
        name: fgItem?.name,
        fg_item_id: form.fg_item_id ? Number(form.fg_item_id) : undefined,
        version: form.version,
        items: components
          .filter((c) => c.item_id && c.qty)
          .map((c) => ({ item_id: Number(c.item_id), qty: Number(c.qty) })),
      });
      setFlash({ type: "success", message: "✅ BOM updated!" });
      setTimeout(() => router.push("/bom"), 1000);
    } catch (err) {
      setFlash({ type: "danger", message: err.message || "Update failed" });
    }
  };

  if (loading) return <div className="container py-5">Loading...</div>;

  // PLAN.md step 1.5: only a draft BOM can be edited directly (backend
  // enforces this too — see BomService.updateInTransaction) — once it's
  // submitted or active, revise by creating a new version instead.
  const isEditable = bomStatus === "draft";

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3"><i className="bi bi-pencil text-primary"></i> Edit BOM</h1>
        <Link href="/bom" className="btn btn-outline-secondary">Back</Link>
      </div>

      {flash.message && (
        <div className={`alert alert-${flash.type}`}>{flash.message}</div>
      )}

      {!isEditable && (
        <div className="alert alert-warning">
          This BOM is <strong>{bomStatus}</strong>, not a draft, so it can&apos;t
          be edited directly. Create a new version instead.
        </div>
      )}

      <fieldset disabled={!isEditable}>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Finished Product */}
          <div className="col-md-6 mb-3">
            <label>Finished Product</label>
            <select className="form-select" name="fg_item_id" value={form.fg_item_id} onChange={handleChange} required>
              <option value="">Select Product</option>
              {items.map((it) => (
                <option key={it.id} value={it.id}>{it.name} ({it.sku ?? "-"})</option>
              ))}
            </select>
          </div>

          {/* Version */}
          <div className="col-md-6 mb-3">
            <label>Version</label>
            <input type="text" name="version" value={form.version} onChange={handleChange} className="form-control" />
          </div>
        </div>

        {/* Remarks */}
        <div className="mb-3">
          <label>Remarks</label>
          <textarea name="remarks" value={form.remarks} onChange={handleChange} className="form-control"></textarea>
        </div>

        {/* Components */}
        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between">
            <span>Components</span>
            <button type="button" className="btn btn-sm btn-success" onClick={addComponent}>
              <i className="bi bi-plus-circle"></i> Add
            </button>
          </div>
          <div className="card-body">
            {components.length === 0 && <p>No components</p>}
            {components.map((c, i) => (
              <div className="row mb-2" key={i}>
                <div className="col-md-6">
                  <select className="form-select" value={c.item_id} onChange={(e) => handleComponentChange(i, "item_id", e.target.value)} required>
                    <option value="">Select Item</option>
                    {items.map((it) => (
                      <option key={it.id} value={it.id}>{it.name} ({it.sku ?? "-"})</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <input type="number" className="form-control" value={c.qty} onChange={(e) => handleComponentChange(i, "qty", e.target.value)} step="0.001" />
                </div>
                <div className="col-md-2">
                  <button type="button" className="btn btn-danger" onClick={() => removeComponent(i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Update BOM</button>
      </form>
      </fieldset>
    </div>
  );
}
