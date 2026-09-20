"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';

// Interface is complete and matches the backend's warehouse.entity.ts
interface Warehouse {
  id: number;
  code: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  contact_person: string;
  phone: string;
  email: string;
  is_active: boolean;
}

// Reusable Component for Loading State
const LoadingSpinner: FC = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="ms-3 text-muted">Loading Warehouse Details...</h4>
    </div>
);

// Reusable Component for Error State
const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-5">
        <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
        <h4 className="mt-3 text-danger">An Error Occurred</h4>
        <p className="text-muted">{message}</p>
        <Link href="/warehouses" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>Back to Warehouses
        </Link>
    </div>
);


const WarehouseDetailsPage: FC = () => {
  const { id } = useParams();

  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWarehouse = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get('token');
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouses/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Warehouse not found.");
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await res.json();
        setWarehouse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWarehouse();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!warehouse) return <ErrorDisplay message="No warehouse data is available for this ID." />;

  // Array containing all details to be displayed, ensuring a consistent order
  const details = [
      { label: "Warehouse Code", value: warehouse.code },
      { label: "Warehouse Name", value: warehouse.name },
      { label: "Description", value: warehouse.description || "N/A", full: true },
      { label: "Address", value: warehouse.address || "N/A", full: true },
      { label: "City", value: warehouse.city || "N/A" },
      { label: "State", value: warehouse.state || "N/A" },
      { label: "Pincode", value: warehouse.pincode || "N/A" },
      { label: "Country", value: warehouse.country || "N/A" },
      { label: "Contact Person", value: warehouse.contact_person || "N/A" },
      { label: "Phone", value: warehouse.phone || "N/A" },
      { label: "Email", value: warehouse.email || "N/A" },
  ];

  return (
    <div className="container-fluid">
        {/* Page Header with Warehouse Name and Action Buttons */}
        <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0">
                    <i className="bi bi-building text-primary me-2"></i>Warehouse: {warehouse.name}
                </h1>
                <div>
                    <Link href="/warehouses" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left me-2"></i>Back
                    </Link>
                    <Link href={`/warehouses/${id}/edit`} className="btn btn-primary">
                        <i className="bi bi-pencil me-2"></i>Edit
                    </Link>
                </div>
            </div>
        </div>

        <div className="row">
            {/* Main Details Section */}
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Warehouse Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            {details.map((field, i) => (
                                <div className={`${field.full ? "col-12" : "col-md-6"} mb-3`} key={i}>
                                    <label className="form-label fw-bold text-muted">{field.label}</label>
                                    <p className="form-control-plaintext bg-light p-2 rounded">{field.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar for Status */}
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="mb-0">Status & Info</h5>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label fw-bold text-muted">Status</label>
                            <div className="form-control-plaintext">
                                <span className={`badge fs-6 bg-${warehouse.is_active ? "success" : "secondary"}`}>
                                    {warehouse.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WarehouseDetailsPage;