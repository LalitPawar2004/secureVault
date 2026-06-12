import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Key, Lock, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-vaultDark text-white flex flex-col">
      {/* Nav */}
      <header className="h-14 sm:h-16 border-b border-vaultBorder bg-vaultCard flex items-center justify-between px-3 sm:px-6 shrink-0">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-base sm:text-lg tracking-tight">
          <ShieldCheck size={22} className="sm:w-[26px] sm:h-[26px]" />
          <span>SecureVault</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/10"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16 text-center">
        <div className="p-3 sm:p-4 bg-blue-600/10 rounded-full text-blue-500 mb-5 sm:mb-6">
          <ShieldCheck size={44} className="sm:w-[52px] sm:h-[52px]" />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-md sm:max-w-xl leading-tight">
          Your Passwords,{' '}
          <span className="text-blue-500">Encrypted & Secure</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-3 sm:mt-4 max-w-md sm:max-w-lg leading-relaxed">
          SecureVault is a zero-knowledge password manager built with AES-grade encryption. 
          Store, generate, and manage your credentials — only you hold the keys.
        </p>

        <div className="flex items-center gap-3 mt-6 sm:mt-8">
          <Link
            to="/register"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
          >
            Create Free Account
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </Link>
          <Link
            to="/login"
            className="text-sm sm:text-base font-medium text-slate-400 hover:text-white px-4 py-2.5 sm:py-3 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            Unlock Vault
          </Link>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 sm:mt-10">
          {[
            { icon: Lock, label: 'AES Encrypted' },
            { icon: Key, label: 'Password Generator' },
            { icon: Zap, label: 'One-Click Copy' },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 bg-vaultCard border border-vaultBorder rounded-full px-3 py-1.5"
            >
              <Icon size={12} className="sm:w-3.5 sm:h-3.5 text-blue-500" />
              {label}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 sm:py-5 border-t border-vaultBorder text-center">
        <p className="text-[10px] sm:text-xs text-slate-600">
          🔐 Zero-knowledge architecture • Your data stays yours
        </p>
      </footer>
    </div>
  );
};

export default Home;