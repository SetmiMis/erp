"use client";
import Link from "next/link";

/**
 * Placeholder for modules that have UI but no backend yet
 * (material-requisition, invoice, most of bulk-operations — see Phase 1
 * stabilization plan). Renders a clear "not available yet" state instead of
 * silently failing against a nonexistent API route.
 */
export default function ComingSoon({ title, icon = "bi-cone-striped", description }) {
  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className={`bi ${icon} text-primary`}></i> {title}
          </h1>
          <Link href="/dashboard" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-cone-striped fs-1 text-muted"></i>
          <h4 className="mt-3 text-muted">Not available yet</h4>
          <p className="text-muted">
            {description || `${title} isn't backed by an API yet — this module is planned for a follow-up release.`}
          </p>
        </div>
      </div>
    </div>
  );
}
