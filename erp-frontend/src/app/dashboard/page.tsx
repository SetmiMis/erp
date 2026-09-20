'use client';

import { useApi } from '../../hooks/useApi';
import Link from 'next/link';
// Naya: Framer Motion ke aur hooks import karein
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

// API se aane waale data ka structure (example)
interface DashboardStats {
  suppliers: number | null;
  items: number | null;
  warehouses: number | null;
  purchase_orders: number | null;
}

interface RecentActivity {
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'ordered' | 'received' | 'cancelled';
}

// Matches erp-backend/src/purchase-orders/purchase-orders.service.ts
// getStatusCounts() — keyed dynamically by whatever PO status values exist.
type StatusCounts = Record<string, number>;

interface DashboardData {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
  // Backend field is `poStatusSummary` (see dashboard.controller.ts), not `statusCounts`.
  poStatusSummary: StatusCounts;
}

// Animation variants for Framer Motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Thoda fast kiya
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function DashboardPage() {
  const { data, loading, error } = useApi<DashboardData>('/dashboard/summary');

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid mt-4">
        <motion.div
          className="alert alert-danger"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <strong>Error:</strong> Failed to load dashboard data. {error}
        </motion.div>
      </div>
    );
  }

  const stats = {
    suppliers: data?.stats?.suppliers ?? 0,
    items: data?.stats?.items ?? 0,
    warehouses: data?.stats?.warehouses ?? 0,
    purchase_orders: data?.stats?.purchase_orders ?? 0,
  };

  const recentActivities = data?.recentActivities || [];
  const statusCounts: StatusCounts = data?.poStatusSummary || {};

  const statusColors: { [key: string]: string } = {
    pending: 'warning',
    approved: 'primary',
    ordered: 'info',
    received: 'success',
    cancelled: 'danger',
  };

  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  return (
    <motion.div
      className="container-fluid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Dashboard Header */}
      <motion.div className="row mb-4" variants={itemVariants}>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h3 mb-0">
              <i className="bi bi-speedometer2 text-primary"></i> Manufacturing ERP Dashboard
            </h1>
            <p className="text-muted mb-0">
              Welcome back! Here's what's happening in your manufacturing operations.
            </p>
          </div>
          <div className="text-end">
            <span className="badge bg-success fs-6">System Online</span>
            <br />
            {/* suppressHydrationWarning: server (Node) and browser locale can format
                this date differently, which was triggering a hydration mismatch that
                aborted the client render entirely — corrupting the counter animation
                below and leaving every stat card stuck at 0 despite correct API data. */}
            <small className="text-muted" suppressHydrationWarning>
              {new Date().toLocaleDateString()}
            </small>
          </div>
        </div>
      </motion.div>

      {/* Key Statistics Cards */}
      <div className="row mb-4">
        <DashboardCard icon="bi-people-fill" color="primary" title="Active Suppliers" value={stats.suppliers} link="/suppliers" />
        <DashboardCard icon="bi-box-seam" color="success" title="Items Catalog" value={stats.items} link="/items" />
        <DashboardCard icon="bi-building" color="warning" title="Warehouses" value={stats.warehouses} link="/warehouses" />
        <DashboardCard icon="bi-cart-check" color="info" title="Purchase Orders" value={stats.purchase_orders} link="/purchase-orders" />
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>

      {/* Recent Activities + Status Overview */}
      <div className="row">
        {/* Recent Activities */}
        <motion.div className="col-md-8" variants={itemVariants}>
          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-clock-history text-primary me-2"></i>Recent Activities
              </h5>
            </div>
            <div className="card-body">
              {recentActivities.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                  <h6 className="text-muted">No Recent Activities</h6>
                </div>
              ) : (
                // Naya: List ke liye parent animation container
                <motion.div
                  className="timeline"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {recentActivities.map((activity, index) => (
                    // Naya: Har list item ke liye animation
                    <motion.div className="timeline-item mb-3" key={index} variants={itemVariants}>
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="bg-primary rounded-circle p-2">
                            <i className="bi bi-cart text-white"></i>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">{activity.title}</h6>
                          <p className="text-muted mb-1">{activity.description}</p>
                          <small className="text-muted">
                            <i className="bi bi-clock me-1"></i>
                            {activity.date}
                            <span className={`badge bg-${statusColors[activity.status] || 'secondary'} ms-2`}>
                              {activity.status}
                            </span>
                          </small>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Order Status Overview */}
        <motion.div className="col-md-4" variants={itemVariants}>
          <div className="card border-0 shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="bi bi-pie-chart text-success me-2"></i>Order Status Overview
              </h5>
            </div>
            <div className="card-body">
              {total === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-graph-down fs-1 text-muted mb-3"></i>
                  <h6 className="text-muted">No Data Available</h6>
                </div>
              ) : (
                Object.entries(statusCounts).map(([status, count]) => (
                  <div className="mb-3" key={status}>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="text-capitalize">{status}</span>
                      <span className={`badge bg-${statusColors[status] || 'secondary'}`}>{count}</span>
                    </div>
                    <div className="progress" style={{ height: '6px' }}>
                      {/* Naya: Progress bar ke liye animation */}
                      <motion.div
                        className={`progress-bar bg-${statusColors[status] || 'secondary'}`}
                        initial={{ width: '0%' }}
                        animate={{ width: `${(count / total) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      ></motion.div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Reusable Components
function DashboardCard({ icon, color, title, value, link }: { icon: string; color: string; title: string; value?: number | null; link: string; }) {
  const finalValue = value ?? 0;
  // 🛠️ Phase 1 fix: this used framer-motion's useAnimate() to imperatively
  // set `ref.current.textContent` from an effect gated on useInView(). That
  // approach bypasses React's own render output for the counter, so any
  // hydration hiccup elsewhere on the page (unrelated to this component)
  // could leave the effect never (re)firing — every stat card stayed stuck
  // at the literal "0" in the JSX regardless of correct API data. A plain
  // React-rendered value can't get stuck like that.
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayValue(Math.round(finalValue * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [finalValue]);

  return (
    <motion.div
      className="col-md-3 mb-3"
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5, transition: { type: 'spring', stiffness: 300 } }}
    >
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body text-center">
          <div className="mb-3">
            <i className={`bi ${icon} display-4 text-${color}`}></i>
          </div>
          <h3 className="card-title">{displayValue.toLocaleString('en-US')}</h3>
          <p className="card-text text-muted">{title}</p>
          <Link href={link} className={`btn btn-outline-${color} btn-sm`}>
            <i className="bi bi-arrow-right me-1"></i>View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function QuickActions() {
  const actions = [
    { icon: 'bi-plus-circle-fill', label: 'New PO', color: 'primary', link: '/purchase-orders/create' },
    { icon: 'bi-person-plus-fill', label: 'Add Supplier', color: 'success', link: '/suppliers/create' },
    { icon: 'bi-box-seam-fill', label: 'Add Item', color: 'warning', link: '/items/create' },
    { icon: 'bi-clipboard-check-fill', label: 'Goods Receipt', color: 'info', link: '/grn' },
  ];
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-light">
            <h5 className="mb-0">
              <i className="bi bi-lightning-charge text-warning me-2"></i>Quick Actions
            </h5>
          </div>
          <div className="card-body">
            <div className="row text-center">
              {actions.map((action) => (
                <motion.div className="col mb-2" key={action.label} whileHover={{ scale: 1.1, y: -3 }}>
                  <Link href={action.link} className={`btn btn-outline-${action.color} d-block p-3`}>
                    <i className={`bi ${action.icon} fs-1 mb-2`}></i>
                    <br />
                    {action.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}