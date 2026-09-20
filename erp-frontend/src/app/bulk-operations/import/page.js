"use client";

import Link from "next/link";
import { useState } from "react";

export default function DataImport() {
  const [table, setTable] = useState("");
  const [file, setFile] = useState(null);
  const [skipFirstRow, setSkipFirstRow] = useState(true);
  const [updateExisting, setUpdateExisting] = useState(false);

  // Handle CSV Template Download
  const downloadTemplate = (type) => {
    let csvContent = "";
    switch (type) {
      case "suppliers":
        csvContent =
          "supplier_name,supplier_code,contact_person,email,phone,address,city,state,status\n";
        csvContent +=
          "ABC Suppliers,SUP001,John Doe,john@abc.com,1234567890,123 Main St,City,State,active\n";
        break;
      case "items":
        csvContent =
          "item_name,item_code,category,unit_of_measure,reorder_level,status\n";
        csvContent += "Sample Item,ITM001,Electronics,PCS,10,active\n";
        break;
      case "warehouses":
        csvContent =
          "warehouse_name,warehouse_code,location,manager_name,capacity,status\n";
        csvContent += "Main Warehouse,WH001,Industrial Area,Jane Smith,1000,active\n";
        break;
    }
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // File Preview
  const previewFile = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      let preview = "File Preview (first 5 lines):\n\n";
      for (let i = 0; i < Math.min(5, lines.length); i++) {
        preview += `${i + 1}: ${lines[i]}\n`;
      }
      alert(preview);
    };
    reader.readAsText(file);
  };

  // Phase 2: there is no backend endpoint for this yet (see Phase 1
  // stabilization plan) — the template download and preview above are real
  // (pure client-side); the actual import submit is not wired to anything yet.
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Data import isn't backed by an API yet — planned for a follow-up release.");
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">
            <i className="bi bi-upload text-success"></i> Data Import
          </h1>
          <Link href="/bulk-operations" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>Back to Bulk Operations
          </Link>
        </div>
      </div>

      <div className="row">
        {/* Left Form */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-spreadsheet me-2"></i> Upload CSV File
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Select Table */}
                <div className="mb-4">
                  <label className="form-label">Select Target Table *</label>
                  <select
                    className="form-select"
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                    required
                  >
                    <option value="">Choose destination table...</option>
                    <option value="suppliers">Suppliers</option>
                    <option value="items">Items</option>
                    <option value="warehouses">Warehouses</option>
                  </select>
                </div>

                {/* File Upload */}
                <div className="mb-4">
                  <label className="form-label">CSV File *</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                  <div className="form-text">
                    Select a CSV file to import. Maximum file size: 10MB
                  </div>
                </div>

                {/* Options */}
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={skipFirstRow}
                      onChange={() => setSkipFirstRow(!skipFirstRow)}
                    />
                    <label className="form-check-label">Skip first row (headers)</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={updateExisting}
                      onChange={() => setUpdateExisting(!updateExisting)}
                    />
                    <label className="form-check-label">
                      Update existing records if found
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-upload me-2"></i>Import Data
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={previewFile}
                  >
                    <i className="bi bi-eye me-2"></i>Preview
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Guidelines */}
        <div className="col-lg-4">
          {/* Import Guidelines */}
          <div className="card border-0 shadow-sm mb-4 rounded-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-info-circle me-2"></i> Import Guidelines
              </h6>
            </div>
            <div className="card-body small">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i> Use CSV format with comma
                  separators
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i> First row should contain
                  column headers
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i> Match column names exactly
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle text-success me-2"></i> Remove ID columns
                  (auto-generated)
                </li>
                <li>
                  <i className="bi bi-check-circle text-success me-2"></i> Validate data before
                  importing
                </li>
              </ul>
            </div>
          </div>

          {/* CSV Templates */}
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="bi bi-download me-2"></i> CSV Templates
              </h6>
            </div>
            <div className="card-body">
              <p className="small">Download sample CSV templates to ensure proper format:</p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => downloadTemplate("suppliers")}
                >
                  <i className="bi bi-file-earmark-text me-1"></i> Suppliers Template
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => downloadTemplate("items")}
                >
                  <i className="bi bi-file-earmark-text me-1"></i> Items Template
                </button>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => downloadTemplate("warehouses")}
                >
                  <i className="bi bi-file-earmark-text me-1"></i> Warehouses Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
