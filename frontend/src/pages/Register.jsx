import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Check } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import API from '../utils/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Password validation checks
  const passwordChecks = {
    minLength: password.length >= 12,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password),
  };

  const allPasswordChecksPassed = Object.values(passwordChecks).every(Boolean);
  const isFormValid = email && password && allPasswordChecksPassed;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side password validation
    if (password.length < 12) {
      setError('Password must be at least 12 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/register', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Master Account" subtitle="Secure your identity and vault files">
      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        
        {/* Error Alert Display Box */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 sm:p-3 rounded-lg text-[11px] sm:text-xs font-medium">
            <AlertCircle size={14} className="shrink-0 sm:w-4 sm:h-4" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full bg-vaultDark/50 border border-vaultBorder rounded-lg pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 sm:mb-2">
            Master Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 12 characters"
              className="w-full bg-vaultDark/50 border border-vaultBorder rounded-lg pl-9 sm:pl-10 pr-9 sm:pr-10 py-2 sm:py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Password Strength Checklist */}
        {password.length > 0 && (
          <div className="bg-vaultDark/30 border border-vaultBorder/60 rounded-lg p-2.5 sm:p-3 space-y-1">
            <p className="text-[10px] sm:text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Password Requirements
            </p>
            {[
              { check: passwordChecks.minLength, label: 'At least 12 characters' },
              { check: passwordChecks.hasUpper, label: 'One uppercase letter (A-Z)' },
              { check: passwordChecks.hasLower, label: 'One lowercase letter (a-z)' },
              { check: passwordChecks.hasNumber, label: 'One number (0-9)' },
              { check: passwordChecks.hasSymbol, label: 'One special character (!@#$%^&*)' },
            ].map(({ check, label }) => (
              <div
                key={label}
                className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] transition-colors ${
                  check ? 'text-green-400' : 'text-slate-500'
                }`}
              >
                <Check size={11} className={check ? 'text-green-400' : 'text-slate-600'} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isFormValid}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-medium text-sm rounded-lg py-2.5 mt-1.5 sm:mt-2 transition-colors shadow-lg shadow-blue-600/10"
        >
          {loading ? 'Creating Secure Account...' : 'Create Account'}
        </button>

        <p className="text-center text-xs sm:text-sm text-slate-400 mt-3 sm:mt-4">
          Already have a vault?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;