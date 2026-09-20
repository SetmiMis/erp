"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/apiClient";

// Matches erp-backend/src/customers/dto/create-customer.dto.ts
export default function CreateCustomer() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    billing_address: "",
    shipping_address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    gst_number: "",
    credit_limit: 0,
    payment_terms: "Due on Receipt",
    is_active: true,
  });

  const [flash, setFlash] = useState({ success: "", error: "" });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.post("/customers", {
        ...formData,
        credit_limit: Number(formData.credit_limit) || 0,
        phone: formData.phone || undefined,
        gst_number: formData.gst_number || undefined,
        // @IsPostalCode('IN') (like @IsPhoneNumber/gst's @Matches above)
        // rejects an empty string outright — @IsOptional() only skips
        // validation for undefined/null, not "".
        pincode: formData.pincode || undefined,
      });
      setFlash({ success: "Customer saved successfully!", error: "" });
      setTimeout(() => router.push("/customers"), 800);
    } catch (err) {
      setFlash({ success: "", error: err.message || "Failed to save customer" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="page-header d-flex justify-content-between align-items-center mb-3">
        <h2>Create Customer</h2>
        <Link href="/customers" className="btn btn-secondary">
          <i className="bi bi-arrow-left"></i> Back
        </Link>
      </div>

      {/* Flash Messages */}
      {flash.success && (
        <div className="alert alert-success alert-dismissible fade show">
          {flash.success}
          <button
            type="button"
            className="btn-close"
            onClick={() => setFlash({ ...flash, success: "" })}
          ></button>
        </div>
      )}
      {flash.error && (
        <div className="alert alert-danger alert-dismissible fade show">
          {flash.error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setFlash({ ...flash, error: "" })}
          ></button>
        </div>
      )}

      {/* Form */}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Name & Contact Person */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Customer Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Contact Person <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="+91XXXXXXXXXX"
                />
              </div>
            </div>

            {/* Address */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Billing Address</label>
                <textarea
                  name="billing_address"
                  value={formData.billing_address}
                  onChange={handleChange}
                  className="form-control"
                  rows="2"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Shipping Address</label>
                <textarea
                  name="shipping_address"
                  value={formData.shipping_address}
                  onChange={handleChange}
                  className="form-control"
                  rows="2"
                />
              </div>
            </div>

            {/* City, State, Pincode, Country */}
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* GST, Credit Limit, Payment Terms */}
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">GST Number</label>
                <input
                  type="text"
                  name="gst_number"
                  value={formData.gst_number}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Credit Limit</label>
                <input
                  type="number"
                  name="credit_limit"
                  value={formData.credit_limit}
                  onChange={handleChange}
                  className="form-control"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Payment Terms</label>
                <input
                  type="text"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Net 30"
                />
              </div>
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="is_active"
                value={formData.is_active ? "active" : "inactive"}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, is_active: e.target.value === "active" }))
                }
                className="form-select"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Actions */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                <i className="bi bi-save"></i> {saving ? "Saving..." : "Save Customer"}
              </button>
              <Link href="/customers" className="btn btn-light ms-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
