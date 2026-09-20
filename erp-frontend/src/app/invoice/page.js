"use client";
// Phase 2: no backend module exists for invoices yet (see Phase 1
// stabilization plan — this page previously called a nonexistent
// /api/invoices route with no backend behind it).
import ComingSoon from "../../components/ComingSoon";

export default function InvoicePage() {
  return (
    <ComingSoon
      title="Invoices"
      icon="bi-receipt"
      description="Invoicing isn't backed by an API yet — planned for a follow-up release."
    />
  );
}
