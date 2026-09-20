"use client";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  // Example user data (replace with API fetch from Supabase or DB)
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastLogin: new Date().toLocaleTimeString(),
    createdAt: new Date().toLocaleDateString(),
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [show, setShow] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  // Profile update handler
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        body: JSON.stringify({ name: user.name, email: user.email }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) alert("Profile updated successfully!");
      else alert("Error updating profile.");
    } catch (err) {
      alert("Server error");
    }
  };

  // Password change handler
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        body: JSON.stringify(passwords),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) alert("Password changed successfully!");
      else alert("Error changing password.");
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12 d-flex justify-content-between align-items-center mb-4">
          <h2>
            <i className="bi bi-person-circle me-2"></i>User Profile
          </h2>
        </div>

        <div className="row">
          {/* Profile Information */}
          <div className="col-md-8">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Profile Information</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleProfileUpdate} noValidate>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        value={user.role}
                        disabled
                      >
                        <option value="admin">Administrator</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status</label>
                      <span className="form-control-plaintext text-success">
                        <i className="bi bi-check-circle-fill me-1"></i> Active
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button type="submit" className="btn btn-primary">
                      <i className="bi bi-check-lg me-1"></i> Update Profile
                    </button>
                    <Link
                      href="/dashboard"
                      className="btn btn-secondary ms-2"
                    >
                      <i className="bi bi-arrow-left me-1"></i>Back to Dashboard
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Change Password + Account Info */}
          <div className="col-md-4">
            {/* Change Password */}
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Change Password</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handlePasswordChange} noValidate>
                  {["current", "newPass", "confirm"].map((field, i) => (
                    <div className="mb-3" key={i}>
                      <label
                        htmlFor={field}
                        className="form-label text-capitalize"
                      >
                        {field === "newPass"
                          ? "New Password"
                          : field === "confirm"
                          ? "Confirm Password"
                          : "Current Password"}
                      </label>
                      <div className="input-group">
                        <input
                          type={show[field] ? "text" : "password"}
                          className="form-control"
                          id={field}
                          required
                          value={passwords[field]}
                          onChange={(e) =>
                            setPasswords({ ...passwords, [field]: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShow({ ...show, [field]: !show[field] })
                          }
                        >
                          <i
                            className={`bi ${
                              show[field] ? "bi-eye-slash" : "bi-eye"
                            }`}
                          ></i>
                        </button>
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="btn btn-warning w-100">
                    <i className="bi bi-key-fill me-1"></i>Change Password
                  </button>
                </form>
              </div>
            </div>

            {/* Account Information */}
            <div className="card shadow-sm border-0 rounded-3 mt-4">
              <div className="card-header bg-light">
                <h5 className="card-title mb-0">Account Information</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-2">
                  <i className="bi bi-calendar-check me-2"></i>
                  <strong>Last Login:</strong>
                  <br />
                  Today at {user.lastLogin}
                </p>
                <p className="text-muted mb-2">
                  <i className="bi bi-shield-check me-2"></i>
                  <strong>Account Created:</strong>
                  <br />
                  {user.createdAt}
                </p>
                <hr />
                <Link
                  href="/logout"
                  className="btn btn-outline-danger w-100"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
