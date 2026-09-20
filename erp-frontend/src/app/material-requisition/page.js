"use client";
// Phase 2: no backend module exists for material requisitions yet
// (see Phase 1 stabilization plan — this page previously called a nonexistent
// /api/material-requisition route with no backend behind it).
import ComingSoon from "../../components/ComingSoon";

export default function MaterialRequisitionList() {
  return (
    <ComingSoon
      title="Material Requisition"
      icon="bi-clipboard-data"
      description="Material requisitions aren't backed by an API yet — planned for a follow-up release."
    />
  );
}
