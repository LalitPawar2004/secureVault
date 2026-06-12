import React from 'react';
import { ShieldCheck } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-vaultDark px-3 sm:px-4 py-6 sm:py-0">
      <div className="w-full max-w-md bg-vaultCard border border-vaultBorder p-5 sm:p-8 rounded-xl shadow-2xl">
        {/* Branding */}
        <div className="flex flex-col items-center mb-5 sm:mb-6">
          <div className="p-2.5 sm:p-3 bg-blue-600/10 rounded-full text-blue-500 mb-2">
            <ShieldCheck size={32} className="sm:w-10 sm:h-10" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center">{title}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 text-center">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;