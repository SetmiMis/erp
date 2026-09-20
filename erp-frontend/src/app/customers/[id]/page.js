"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { apiClient } from "../../../lib/apiClient";

export default function ViewCustomerPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await apiClient.get(`/customers/${id}`);
        setCustomer(data);
      } catch (err) {
        setFlash(err.message || "Error loading customer.");
      }
    };
    fetchCustomer();
  }, [id]);

  if (!customer) {
    return (
      <div className="container-fluid py-5 text-center">
        {flash ? (
          <div className="alert alert-danger">{flash}</div>
        ) : (
          <div className="spinner-border text-primary" role="status"></div>
        )}
      </div>
    );
  }

  const creditLimit = customer.credit_limit
    ? parseFloat(customer.credit_limit).toFixed(2)
    : "0.00";

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-person-lines-fill text-primary"></i> Customer
          Details
        </h2>
        <div>
          <Link
            href={`/customers/${id}/edit`}
            className="btn btn-sm btn-primary me-2"
          >
            <i className="bi bi-pencil"></i> Edit
          </Link>
          <Link href="/customers" className="btn btn-sm btn-secondary">
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>
      </div>

      {/* Customer Info */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">
            {customer.name}{" "}
            <span className="text-muted">({customer.customer_code})</span>
          </h5>

          <div className="row">
            <div className="col-md-6">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th>Contact Person</th>
                    <td>{customer.contact_person || "-"}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{customer.email || "-"}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{customer.phone || "-"}</td>
                  </tr>
                  <tr>
                    <th>GST Number</th>
                    <td>{customer.gst_number || "-"}</td>
                  </tr>
                  <tr>
                    <th>Credit Limit</th>
                    <td>₹ {creditLimit}</td>
                  </tr>
                  <tr>
                    <th>Payment Terms</th>
                    <td>{customer.payment_terms || "-"}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span
                        className={`badge ${
                          customer.is_active ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {customer.is_active ? "active" : "inactive"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-6">
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <th>Billing Address</th>
                    <td>{customer.billing_address || "-"}</td>
                  </tr>
                  <tr>
                    <th>Shipping Address</th>
                    <td>{customer.shipping_address || "-"}</td>
                  </tr>
                  <tr>
                    <th>City / State</th>
                    <td>
                      {customer.city || "-"}, {customer.state || "-"} - {customer.pincode || "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{customer.country || "-"}</td>
                  </tr>
                  <tr>
                    <th>Created At</th>
                    <td>
                      {customer.created_at
                        ? new Date(customer.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th>Updated At</th>
                    <td>
                      {customer.updated_at
                        ? new Date(customer.updated_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
