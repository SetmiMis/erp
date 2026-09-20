"use client";
import { useEffect, useState, FC } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

// ✅ 1. Define complete interfaces for the data models
interface Warehouse {
  id: number;
  name: string;
}

interface Location {
  id: number;
  location_code: string;
  location_name: string;
  description?: string;
  is_active: boolean;
  warehouse: Warehouse; // The backend will send the nested warehouse object
  created_at: string;
  updated_at: string;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. Create reusable components for clean UI states
const LoadingSpinner: FC = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <h4 className="ms-3 text-muted">Loading Location Details...</h4>
  </div>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
  <div className="text-center py-5">
    <i className="bi bi-exclamation-triangle-fill text-danger fs-1"></i>
    <h4 className="mt-3 text-danger">An Error Occurred</h4>
    <p className="text-muted">{message}</p>
    <Link href="/locations" className="btn btn-primary">
      <i className="bi bi-arrow-left me-2"></i>Back to Locations
    </Link>
  </div>
);

// ✅ 3. Convert the component to a typed FC with full state management
const LocationDetailsPage: FC = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });

  // Check for success messages from other pages
  useEffect(() => {
    if (searchParams.get("updated") === "true") {
      setFlash({ type: "success", message: "Location updated successfully!" });
    }
  }, [searchParams]);

  // Fetch location details from the server
  useEffect(() => {
    if (!id) return;

    const fetchLocation = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = Cookies.get("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Location not found.");
        }
        // 🛠️ Bug fix: unwrap the { success, message, data } response envelope.
        const { data } = await res.json();
        setLocation(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!location) return <ErrorDisplay message="No location data available." />;

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-0">
            <i className="bi bi-geo-alt text-primary"></i> {location.location_name}
          </h1>
          <div>
            <Link href="/locations" className="btn btn-outline-secondary me-2"><i className="bi bi-arrow-left me-2"></i> Back</Link>
            <Link href={`/locations/${id}/edit`} className="btn btn-primary"><i className="bi bi-pencil me-2"></i> Edit</Link>
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

      <div className="row">
        {/* Left Column: Details */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header"><h5 className="mb-0">Location Information</h5></div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label text-muted">Location Code</label>
                  <p className="form-control-plaintext">{location.location_code}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-muted">Location Name</label>
                  <p className="form-control-plaintext">{location.location_name}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label text-muted">Warehouse</label>
                  {/* ✅ 4. Display Warehouse Name instead of ID */}
                  <p className="form-control-plaintext">{location.warehouse?.name || "N/A"}</p>
                </div>
                <div className="col-12 mb-3">
                  <label className="form-label text-muted">Description</label>
                  <p className="form-control-plaintext">{location.description || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Info */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header"><h5 className="mb-0">Status & Info</h5></div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label text-muted">Status</label>
                <p>
                  <span className={`badge fs-6 bg-${location.is_active ? "success" : "secondary"}`}>
                    {location.is_active ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <div className="mb-3">
                <label className="form-label text-muted">Created On</label>
                <p className="form-control-plaintext">{new Date(location.created_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="form-label text-muted">Last Updated</label>
                <p className="form-control-plaintext">{new Date(location.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsPage;