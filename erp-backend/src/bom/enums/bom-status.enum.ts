// erp-backend/src/bom/enums/bom-status.enum.ts
//
// PLAN.md step 1.5: a BOM's lifecycle now has three states, enforced in
// BomService (state-machine transitions) and the DB (CHECK constraint --
// see migration AddBomApprovalWorkflow). No workflow engine: this is
// deliberately just a status field + a role guard on the approve/reject
// transitions (BomController), not a generic reusable engine (that's
// PLAN.md step 2.3, once more than one module needs approval gating).
export enum BomStatus {
  DRAFT = 'draft',
  PENDING_APPROVAL = 'pending_approval',
  ACTIVE = 'active',
}
