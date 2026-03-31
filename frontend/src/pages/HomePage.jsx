import React from "react";
import "./Css.css";
const HomePage = () => {
  return (
    <main className="body">
      <section className="hero">
        <h1>Secure Authentication System</h1>
        <p>
          A production-ready JWT authentication system using short-lived access
          tokens and long-lived refresh tokens for maximum security and user
          experience.
        </p>
      </section>

      <section className="info-cards">
        <div className="card">
          <h3>Short Session</h3>
          <p>
            Access tokens expire quickly to reduce security risk and prevent
            misuse.
          </p>
        </div>

        <div className="card">
          <h3>Long Session</h3>
          <p>
            Refresh tokens are securely stored in HTTP-only cookies and rotated
            automatically.
          </p>
        </div>

        <div className="card">
          <h3>Auto Refresh</h3>
          <p>Seamless user experience without repeated login prompts.</p>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
