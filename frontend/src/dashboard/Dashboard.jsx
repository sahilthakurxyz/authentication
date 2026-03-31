import React from "react";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Authentication & Session Management Overview</p>
      </header>

      <section className="admin-section">
        <h2>🔐 Authentication System</h2>
        <ul>
          <li>JWT based authentication</li>
          <li>Short-lived Access Token (15 minutes)</li>
          <li>Long-lived Refresh Token (7 days)</li>
          <li>Tokens stored securely in HTTP-only cookies</li>
        </ul>
      </section>

      <section className="admin-section">
        <h2>🔄 Session Handling</h2>
        <ul>
          <li>Automatic access token refresh using refresh token</li>
          <li>Refresh token hashed and stored in database</li>
          <li>Session invalidation on logout</li>
          <li>401 handling with Axios interceptors</li>
        </ul>
      </section>

      <section className="admin-section">
        <h2>🛡 Route Protection</h2>
        <ul>
          <li>Admin-only protected routes</li>
          <li>Server-side authorization checks</li>
          <li>Frontend protected routing using Redux state</li>
          <li>Unauthorized users are redirected automatically</li>
        </ul>
      </section>

      <section className="admin-section">
        <h2>📌 Why this approach?</h2>
        <p>
          This authentication system is designed to be secure, scalable, and
          production-ready. It avoids storing tokens in localStorage and relies
          on server-validated sessions with secure cookies.
        </p>
      </section>

      <footer className="admin-footer">
        <p>Built by Sahil | MERN Authentication Project</p>
      </footer>
    </div>
  );
};

export default Dashboard;
