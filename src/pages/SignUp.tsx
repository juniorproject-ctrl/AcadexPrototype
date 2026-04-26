import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import BrandLogo from '../components/BrandLogo';
import { findRegisteredUser } from '../lib/auth';
import { getAllowedUniversityEmailMessage, isAllowedUniversityEmail } from '../lib/emailValidation';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Student' | 'Tutor' | 'Admin'>('Student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAllowedUniversityEmail(email)) {
      setError(getAllowedUniversityEmailMessage());
      return;
    }

    if (findRegisteredUser(email)) {
      setError('An account with this email already exists. Please sign in instead.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'We could not send the verification code right now.');
        return;
      }

      localStorage.setItem(
        'acadex_pending_signup',
        JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
        }),
      );

      navigate('/verify', {
        state: {
          email: email.trim().toLowerCase(),
        },
      });
    } catch {
      setError('We could not connect to the server. Please make sure the local app server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-12">
        <BrandLogo size="lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-container"
      >
        <h2 className="text-brand-cream text-3xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-brand-cream text-center opacity-80 mb-8">Please enter your details to sign up.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg text-xs font-bold text-center">{error}</div>}

          <div className="space-y-2">
            <label className="text-brand-cream font-medium block">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-brand-cream font-medium block">Email</label>
            <input
              type="email"
              placeholder="Enter your university email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-brand-cream font-medium block">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label className="text-brand-cream font-medium block">Role</label>
            <select
              className="input-field"
              value={role}
              onChange={(e) => setRole(e.target.value as 'Student' | 'Tutor' | 'Admin')}
              disabled={loading}
            >
              <option value="Student">Student</option>
              <option value="Tutor">Tutor</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary mt-6">
            {loading ? 'Sending Code...' : 'Sign up'}
          </button>

          <p className="text-center text-brand-cream text-sm mt-8">
            Already have an account? <Link to="/" className="font-bold underline">Log in</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
