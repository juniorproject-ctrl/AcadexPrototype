import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import BrandLogo from '../components/BrandLogo';
import { findRegisteredUser, setCurrentUser } from '../lib/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = findRegisteredUser(email);

    if (!user || user.password !== password) {
      setError('Invalid email or password. Please use an account you verified through signup.');
      return;
    }

    setCurrentUser(user.email);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <BrandLogo size="lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-container"
      >
        <h2 className="text-brand-cream text-3xl font-bold text-center mb-2">Welcome Back!</h2>
        <p className="text-brand-cream text-center opacity-80 mb-8">Please enter your details to sign in.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg text-xs font-bold text-center">{error}</div>}

          <div className="space-y-2">
            <label className="text-brand-cream font-medium block">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-brand-cream text-sm cursor-pointer">
              <input type="checkbox" className="mr-2 rounded border-none bg-background-soft" />
              Remember me
            </label>
            <button type="button" className="text-brand-cream text-sm font-medium underline">Forgot your password?</button>
          </div>

          <button type="submit" className="w-full btn-primary mt-4">
            Sign In
          </button>

          <p className="text-center text-brand-cream text-sm mt-8">
            Don&apos;t have an account yet? <Link to="/signup" className="font-bold underline">Create Account</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
