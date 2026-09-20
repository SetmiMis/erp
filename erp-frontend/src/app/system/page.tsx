"use client";
import { useApi } from "../../hooks/useApi";

// API से आने वाले data का type define करो
interface DashboardStats {
  suppliers: number;
  items: number;
  warehouses: number;
  locations: number;
}

interface DashboardResponse {
  dbStatus: boolean;
  stats: DashboardStats;
}

export default function Dashboard() {
  // ✅ useApi से API call (endpoint बदला गया)
  const { data, loading, error } = useApi<DashboardResponse>("/system/status");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Loading state
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-danger d-flex align-items-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          <span><strong>Error:</strong> Failed to fetch dashboard data. {error}</span>
        </div>
      </div>
    );
  }

  // Safe default values
  const stats = {
    suppliers: data?.stats?.suppliers ?? 0,
    items: data?.stats?.items ?? 0,
    warehouses: data?.stats?.warehouses ?? 0,
    locations: data?.stats?.locations ?? 0,
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-speedometer2 text-primary"></i> Dashboard
          </h1>
          <div className="text-muted">
            <i className="bi bi-calendar-event"></i> {today}
          </div>
        </div>
      </div>

      {/* Database Status */}
      {data?.dbStatus ? (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-success" role="alert">
              <i className="bi bi-check-circle"></i>{" "}
              <strong>System Status:</strong> All systems operational. Database connected successfully.
            </div>
          </div>
        </div>
      ) : (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle"></i>{" "}
              <strong>Database Connection Issue:</strong> Please ensure MySQL is running and database exists.
              <button onClick={() => location.reload()} className="btn btn-sm btn-outline-warning ms-2">
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="row mb-4">
        <StatCard title="Suppliers" value={stats.suppliers} icon="bi-people" color="primary" />
        <StatCard title="Items" value={stats.items} icon="bi-box" color="success" />
        <StatCard title="Warehouses" value={stats.warehouses} icon="bi-building" color="warning" />
        <StatCard title="Locations" value={stats.locations} icon="bi-geo-alt" color="danger" />
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-lightning"></i> Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                <QuickAction label="New Supplier" icon="bi-person-plus" color="primary" link="/suppliers/create" />
                <QuickAction label="New Item" icon="bi-plus-square" color="success" link="/items/create" />
                <QuickAction label="New Purchase Order" icon="bi-cart-plus" color="warning" link="/purchase-orders/create" />
                <QuickAction label="Quality Check" icon="bi-clipboard-check" color="info" link="/quality-check" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & System Info */}
      <div className="row">
        {/* Recent Activity */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-clock-history"></i> Recent Activity
              </h5>
            </div>
            <div className="card-body">
              {data?.dbStatus ? (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-list-ul display-4"></i>
                  <p className="mt-3">No recent activity to display.</p>
                </div>
              ) : (
                <div className="alert alert-info">
                  <i className="bi bi-info-circle"></i> Recent activity will be available once DB is connected.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-info-circle"></i> System Information
              </h5>
            </div>
            <div className="card-body small">
              <div className="d-flex justify-content-between mb-2">
                <span>Application:</span>
                <span className="text-primary">Manufacturing ERP</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Version:</span>
                <span>1.0.0</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Database:</span>
                <span className={data?.dbStatus ? "text-success" : "text-danger"}>
                  {data?.dbStatus ? "Connected" : "Not Connected"}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Server Time:</span>
                <span>{today}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable Stat Card
function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  return (
    <div className="col-md-3 mb-3">
      <div className="card dashboard-card shadow-sm">
        <div className="card-body d-flex align-items-center">
          <div className={`dashboard-icon bg-light-${color} text-${color} me-3`}>
            <i className={`bi ${icon}`}></i>
          </div>
          <div>
            <h5 className="card-title mb-1">{value}</h5>
            <p className="card-text text-muted mb-0">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Reusable Quick Action Button
function QuickAction({ label, icon, color, link }: { label: string; icon: string; color: string; link: string }) {
  return (
    <div className="col-md-3 mb-2">
      <a href={link} className={`btn btn-outline-${color} w-100`}>
        <i className={`bi ${icon} me-2`}></i> {label}
      </a>
    </div>
  );
}
