import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Link from '@docusaurus/Link';

const LoginPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const redirectAfterAuth = () => {
    const redirectUrl =
      new URLSearchParams(window.location.search).get('redirect') || '/';
    window.location.href = redirectUrl;
  };

  return (
    <Layout title={isLoginView ? 'Login' : 'Sign Up'}>
      {/* 🎨 Multi-Color UI */}
      <style>
        {`
          .auth-page {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(
              120deg,
              #0f172a,
              #1e1b4b,
              #312e81
            );
          }

          .auth-card {
            width: 100%;
            max-width: 440px;
            background: rgba(255,255,255,0.08);
            backdrop-filter: blur(16px);
            border-radius: 22px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.35);
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.15);
          }

          .auth-header {
            padding: 36px 28px;
            text-align: center;
            background: linear-gradient(
              135deg,
              #d946ef,
              #6366f1,
              #22d3ee
            );
            color: #fff;
          }

          .auth-header h1 {
            margin-bottom: 8px;
            font-weight: 800;
            letter-spacing: 0.3px;
          }

          .auth-header p {
            font-size: 14px;
            opacity: 0.95;
          }

          .auth-toggle {
            display: flex;
            margin: 22px;
            background: rgba(255,255,255,0.12);
            border-radius: 999px;
            padding: 5px;
          }

          .auth-toggle button {
            flex: 1;
            border: none;
            background: transparent;
            padding: 12px 0;
            border-radius: 999px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #e5e7eb;
          }

          .auth-toggle button.active {
            background: linear-gradient(
              135deg,
              #facc15,
              #fb7185,
              #a855f7
            );
            color: #111;
            box-shadow: 0 8px 20px rgba(250,204,21,0.45);
          }

          .auth-body {
            padding: 8px 30px 30px;
            color: #e5e7eb;
          }

          .auth-footer {
            text-align: center;
            padding: 18px;
            border-top: 1px solid rgba(255,255,255,0.15);
            font-size: 14px;
          }

          .auth-footer a {
            color: #93c5fd;
            text-decoration: none;
            font-weight: 500;
          }

          .auth-footer a:hover {
            text-decoration: underline;
          }

          @media (max-width: 480px) {
            .auth-card {
              margin: 0 14px;
            }
          }
        `}
      </style>

      <div className="auth-page">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <h1>{isLoginView ? 'Welcome Back 👋' : 'Create Account 🚀'}</h1>
            <p>
              {isLoginView
                ? 'Login to continue your journey'
                : 'Join us and explore more'}
            </p>
          </div>

          {/* Toggle */}
          <div className="auth-toggle">
            <button
              className={isLoginView ? 'active' : ''}
              onClick={() => setIsLoginView(true)}
            >
              Login
            </button>
            <button
              className={!isLoginView ? 'active' : ''}
              onClick={() => setIsLoginView(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Body */}
          <div className="auth-body">
            {isLoginView ? (
              <Login onSuccess={redirectAfterAuth} />
            ) : (
              <Signup onSuccess={redirectAfterAuth} />
            )}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <Link to="/">← Back to Home</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
