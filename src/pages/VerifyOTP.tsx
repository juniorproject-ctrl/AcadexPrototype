import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import BrandLogo from '../components/BrandLogo';
import { saveRegisteredUser, setCurrentUser } from '../lib/auth';

type PendingSignup = {
  name: string;
  email: string;
  password: string;
  role?: 'Student' | 'Tutor' | 'Admin';
};

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const storedSignup = localStorage.getItem('acadex_pending_signup');
  const pendingSignup = storedSignup ? JSON.parse(storedSignup) as PendingSignup : null;
  const email = location.state?.email || pendingSignup?.email || 'name@email.com';

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');

    if (fullOtp.length < 4) {
      setError('Please enter the full 4-digit code.');
      return;
    }

    if (!pendingSignup) {
      setError('Your signup session expired. Please sign up again.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: fullOtp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'That code did not work. Please try again.');
        return;
      }

      saveRegisteredUser({
        name: pendingSignup.name,
        email: pendingSignup.email,
        password: pendingSignup.password,
        role: pendingSignup.role || 'Student',
        verifiedAt: new Date().toISOString(),
      });
      setCurrentUser(pendingSignup.email);
      localStorage.removeItem('acadex_pending_signup');
      setSuccess('Email verified successfully. Redirecting...');
      setTimeout(() => navigate('/home'), 900);
    } catch {
      setError('We could not verify the code right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!pendingSignup) {
      setError('Your signup session expired. Please sign up again.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const response = await fetch('/api/auth/request-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pendingSignup),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'We could not resend the code.');
        return;
      }

      setSuccess('A new code has been sent to your email.');
    } catch {
      setError('We could not resend the code right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pendingSignup) {
      navigate('/signup', { replace: true });
    }
  }, [navigate, pendingSignup]);

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-12">
        <BrandLogo size="lg" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-container"
      >
        <h2 className="text-brand-cream text-2xl font-bold text-center mb-2">Enter your code</h2>
        <p className="text-brand-cream text-center opacity-80 mb-8 font-medium">We sent your code to {email}</p>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg text-xs font-bold text-center mb-6">{error}</div>}
        {success && <div className="bg-green-100 text-green-600 p-3 rounded-lg text-xs font-bold text-center mb-6">{success}</div>}

        <div className="flex justify-center space-x-4 mb-8">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={loading}
              className="w-16 h-20 text-3xl font-bold text-center bg-background-soft rounded-lg text-brand-navy outline-none focus:ring-2 focus:ring-brand-gold disabled:opacity-50"
            />
          ))}
        </div>

        <p className="text-center text-brand-cream text-sm mb-10">
          Didn&apos;t get the code? <button onClick={handleResend} disabled={loading} className="font-bold underline disabled:opacity-50">Resend Code</button>
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/signup')}
            disabled={loading}
            className="flex-1 border border-brand-cream text-brand-cream font-bold py-3 px-6 rounded-lg hover:bg-brand-cream hover:text-brand-navy transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={loading}
            className="flex-1 btn-primary"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
