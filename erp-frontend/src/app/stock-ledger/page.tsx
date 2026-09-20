"use client";
import { useState, useEffect, FC, ChangeEvent } from "react";
import Link from "next/link";
import { apiClient } from "../../lib/apiClient";

// Matches erp-backend/src/inventory/inventory.service.ts LedgerRow. reference_type
// values come from what each module passes to InventoryService.increase/decreaseStock
// (grn.service.ts, dispatch.service.ts, fgr.service.ts, production.service.ts,
// inventory.controller.ts's manual adjustment endpoint).
type ReferenceType =
  | 'grn_receipt'
  | 'dispatch'
  | 'fgr_receipt'
  | 'production_issue'
  | 'production_fg_receipt'
  | 'manual_adjustment'
  | string;

interface StockTransaction {
  id: number;
  transaction_date: string;
  item_code: string;
  item_name: string;
  warehouse_name: string;
  in_qty: number;
  out_qty: number;
  balance_qty: number;
  reference_type?: ReferenceType;
  reference_id?: number;
  remarks?: string;
}

interface Filters {
  reference_type: string;
  search: string;
}

interface FlashMessage {
  type: "success" | "danger" | "";
  message: string;
}

// ✅ 2. Reusable components for clean UI states
const NoDataDisplay: FC = () => (
  <div className="text-center py-5">
    <i className="bi bi-journal-x fs-1 text-muted"></i>
    <h4 className="mt-3 text-muted">No Stock Transactions Found</h4>
    <p className="text-muted">Stock movements from purchases, sales, and adjustments will appear here.</p>
  </div>
);

const LoadingSpinner: FC = () => (
  <div className="text-center py-5">
    <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
    <p className="mt-2 text-muted">Loading Ledger...</p>
  </div>
);

const StockLedgerPage: FC = () => {
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [flash, setFlash] = useState<FlashMessage>({ type: "", message: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ 3. Implement debounced search for better performance
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Filters>({
    reference_type: "",
    search: "",
  });

  // This effect debounces the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm }));
    }, 500); // Wait 500ms after user stops typing
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // This effect fetches data whenever the search filter changes.
  // reference_type is filtered client-side below (backend only supports
  // search/warehouse_id — see erp-backend/src/inventory/inventory.controller.ts).
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({ search: filters.search }).toString();
        const data = await apiClient.get<StockTransaction[]>(`/inventory/ledger?${query}`);
        setTransactions(data ?? []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters.search]);

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, reference_type: e.target.value }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ reference_type: "", search: "" });
  };

  const visibleTransactions = filters.reference_type
    ? transactions.filter((t) => t.reference_type === filters.reference_type)
    : transactions;

  const referenceTypeClass: Record<string, string> = {
    grn_receipt: "success",
    fgr_receipt: "success",
    dispatch: "danger",
    production_issue: "secondary",
    production_fg_receipt: "primary",
    manual_adjustment: "info",
  };

  const referenceTypeLabel: Record<string, string> = {
    grn_receipt: "GRN Receipt",
    fgr_receipt: "FG Receipt",
    dispatch: "Dispatch",
    production_issue: "Production Issue",
    production_fg_receipt: "Production FG Receipt",
    manual_adjustment: "Manual Adjustment",
  };
  
  // ✅ 4. Function to create dynamic links for references
  // Only reference types with an actual detail page get a link — fgr_receipt
  // and manual_adjustment have no [id] detail route yet.
  const getReferenceLink = (type?: string, id?: number) => {
    if (!type || !id) return null;
    const pathMap: Record<string, string> = {
      grn_receipt: '/grn',
      dispatch: '/dispatch',
      production_issue: '/production-orders',
      production_fg_receipt: '/production-orders',
    };
    const basePath = pathMap[type];
    return basePath ? `${basePath}/${id}` : null;
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0"><i className="bi bi-journal-text text-primary me-2"></i> Stock Ledger</h1>
        <Link href="/stock-adjustment" className="btn btn-primary"><i className="bi bi-plus-circle me-2"></i> New Adjustment</Link>
      </div>

      {flash.message && <div className={`alert alert-${flash.type}`}>{flash.message}</div>}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <form className="row g-3 align-items-end">
            <div className="col-md-3">
              <label htmlFor="reference_type" className="form-label">Transaction Type</label>
              <select id="reference_type" className="form-select" value={filters.reference_type} onChange={handleTypeChange}>
                <option value="">All Types</option>
                <option value="grn_receipt">GRN Receipt</option>
                <option value="dispatch">Dispatch</option>
                <option value="fgr_receipt">FG Receipt</option>
                <option value="production_issue">Production Issue</option>
                <option value="production_fg_receipt">Production FG Receipt</option>
                <option value="manual_adjustment">Manual Adjustment</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="search" className="form-label">Search Item Code/Name</label>
              <input type="text" id="search" className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="e.g., ITEM-001 or 'Sample Item'" />
            </div>
            <div className="col-md-2">
              <button type="button" onClick={clearFilters} className="btn btn-outline-secondary w-100">
                <i className="bi bi-arrow-clockwise me-2"></i> Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-light border-0"><h5 className="mb-0">Transactions</h5></div>
        <div className="card-body">
          {loading ? <LoadingSpinner />
            : error ? <div className="alert alert-danger">{error}</div>
            : visibleTransactions.length === 0 ? <NoDataDisplay />
            : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Warehouse</th>
                    <th>Type</th>
                    <th className="text-end">In Qty</th>
                    <th className="text-end">Out Qty</th>
                    <th className="text-end">Balance</th>
                    <th>Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTransactions.map((t) => {
                    const refLink = getReferenceLink(t.reference_type, t.reference_id);
                    const typeLabel = t.reference_type
                      ? referenceTypeLabel[t.reference_type] ?? t.reference_type
                      : 'N/A';
                    return (
                    <tr key={t.id}>
                      <td>{new Date(t.transaction_date).toLocaleDateString("en-GB")}</td>
                      <td><strong>{t.item_name}</strong><br /><small className="text-muted">{t.item_code}</small></td>
                      <td>{t.warehouse_name}</td>
                      <td>
                        <span className={`badge bg-${(t.reference_type && referenceTypeClass[t.reference_type]) || 'light text-dark'}`}>
                          {typeLabel}
                        </span>
                      </td>
                      <td className="text-end text-success fw-bold">{t.in_qty > 0 ? `+${Number(t.in_qty).toLocaleString()}` : "-"}</td>
                      <td className="text-end text-danger fw-bold">{t.out_qty > 0 ? `-${Number(t.out_qty).toLocaleString()}` : "-"}</td>
                      <td className="text-end fw-bold">{Number(t.balance_qty).toLocaleString()}</td>
                      <td>
                        {refLink ? (
                           <Link href={refLink} className="text-decoration-none" title={`View ${typeLabel}`}>
                            {typeLabel} #{t.reference_id} <i className="bi bi-box-arrow-up-right small"></i>
                           </Link>
                        ) : t.reference_type ? (
                            `${typeLabel} #${t.reference_id ?? ''}`
                        ) : 'N/A'}
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockLedgerPage;