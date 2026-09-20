"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditRequisition() {
  const { id } = useParams();
  const router = useRouter();
  const [itemsList, setItemsList] = useState([]);
  const [requisition, setRequisition] = useState(null);
  const [rows, setRows] = useState([]);
  const [flash, setFlash] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, reqRes] = await Promise.all([fetch("/api/items"), fetch(`/api/material-requisition/${id}`)]);
        if (itemsRes.ok) setItemsList(await itemsRes.json());
        if (reqRes.ok) {
          const data = await reqRes.json();
          setRequisition(data);
          setRows(data.items?.map(it=>({ item_id: String(it.item_id), qty: String(it.qty), uom: it.uom })) || []);
        }
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, [id]);

  function addRow() { setRows(prev=>[...prev, { item_id: "", qty: "", uom: "" }]); }
  function removeRow(i) { setRows(prev=>prev.filter((_,idx)=>idx!==i)); }
  function handleRowChange(i, field, val) { setRows(prev=> { const c = [...prev]; c[i][field]=val; return c; }); }

  async function submit(e) {
    e.preventDefault();
    setFlash(null);
    setSaving(true);
    try {
      const payload = { status: requisition.status, remarks: requisition.remarks, items: rows };
      const res = await fetch(`/api/material-requisition/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setFlash({type:"success", msg:"Updated"});
        setTimeout(()=>router.push("/material-requisition"), 800);
      } else {
        setFlash({type:"danger", msg: data.error || "Failed to update"});
      }
    } catch (err) {
      console.error(err);
      setFlash({type:"danger", msg:"Server error"});
    } finally {
      setSaving(false);
    }
  }

  if (!requisition) return <div className="container py-5">Loading...</div>;
  if (requisition.status === "approved") {
    return (
      <div className="container py-5">
        <div className="alert alert-info">
          <i className="bi bi-lock"></i> This requisition is already <strong>approved</strong> and cannot be edited.
        </div>
        <Link href={`/material-requisition/${id}`} className="btn btn-primary">Back to Detail</Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Edit Requisition {requisition.requisition_no}</h1>
        <Link href="/material-requisition" className="btn btn-outline-secondary">Back</Link>
      </div>

      {flash && <div className={`alert alert-${flash.type}`}>{flash.msg}</div>}

      <form onSubmit={submit}>
        <div className="card mb-3 p-3">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Requested By</label>
              <input className="form-control" value={requisition.requested_by} onChange={e=>setRequisition({...requisition, requested_by: e.target.value})} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" value={requisition.requisition_date?.slice(0,10)} onChange={e=>setRequisition({...requisition, requisition_date: e.target.value})}/>
            </div>
            <div className="col-md-4">
              <label className="form-label">Status</label>
              <select className="form-select" value={requisition.status} onChange={e=>setRequisition({...requisition, status: e.target.value})}>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header d-flex justify-content-between">
            <strong>Items</strong>
            <button type="button" className="btn btn-sm btn-success" onClick={addRow}>Add</button>
          </div>
          <div className="card-body">
            {rows.length === 0 && <p>No items</p>}
            {rows.map((r, i) => (
              <div className="row g-2 mb-2 align-items-end" key={i}>
                <div className="col-md-6">
                  <select className="form-select" value={r.item_id} onChange={e=>handleRowChange(i,'item_id', e.target.value)}>
                    <option value="">Select item</option>
                    {itemsList.map(it=> <option key={it.id} value={String(it.id)}>{it.item_code} - {it.item_name}</option>)}
                  </select>
                </div>
                <div className="col-md-3">
                  <input type="number" className="form-control" value={r.qty} onChange={e=>handleRowChange(i,'qty', e.target.value)} step="0.001" />
                </div>
                <div className="col-md-2">
                  <input className="form-control" value={r.uom} onChange={e=>handleRowChange(i,'uom', e.target.value)} />
                </div>
                <div className="col-md-1">
                  <button type="button" className="btn btn-danger" onClick={()=>removeRow(i)}>Del</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? (<><span className="spinner-border spinner-border-sm me-2" />Saving...</>) : "Save"}
          </button>
          <Link href={`/material-requisition/${id}`} className="btn btn-outline-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
