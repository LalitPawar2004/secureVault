import React, { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('');
      return;
    }

    let generated = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    setPassword(generated);
    setCopied(false);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="w-full bg-vaultCard border border-vaultBorder rounded-xl p-4 sm:p-6 shadow-xl">
      <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Secure Password Generator</h3>

      {/* Output Display Panel */}
      <div className="relative flex items-center bg-vaultDark/60 border border-vaultBorder rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 mb-4 sm:mb-5 group">
        <span className="font-mono text-blue-400 select-all tracking-wider text-sm sm:text-base md:text-lg overflow-x-auto whitespace-nowrap scrollbar-none pr-14 sm:pr-16 w-full">
          {password || <span className="text-slate-600">Select an option below...</span>}
        </span>
        <div className="absolute right-1.5 sm:right-2 flex items-center gap-0.5 sm:gap-1 bg-vaultDark/80 p-1 rounded-md backdrop-blur-sm opacity-90">
          <button
            type="button"
            onClick={generatePassword}
            title="Regenerate"
            className="p-1 sm:p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-md transition-colors"
          >
            <RefreshCw size={14} className="sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!password}
            title="Copy Password"
            className={`p-1 sm:p-1.5 rounded-md transition-colors ${
              copied ? 'text-green-500 bg-green-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {copied ? <Check size={14} className="sm:w-4 sm:h-4" /> : <Copy size={14} className="sm:w-4 sm:h-4" />}
          </button>
        </div>
      </div>

      {/* Length Adjustment Slider Component */}
      <div className="mb-4 sm:mb-5">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Password Length
          </label>
          <span className="text-xs sm:text-sm font-bold font-mono text-blue-500 bg-blue-500/10 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md">
            {length}
          </span>
        </div>
        <input
          type="range"
          min="8"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-vaultDark rounded-lg appearance-none cursor-pointer accent-blue-500 border border-vaultBorder"
        />
      </div>

      {/* Configuration Checkboxes Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {[
          { id: 'lowercase', label: 'Lowercase (a-z)', state: includeLowercase, setter: setIncludeLowercase },
          { id: 'uppercase', label: 'Uppercase (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
          { id: 'numbers', label: 'Numbers (0-9)', state: includeNumbers, setter: setIncludeNumbers },
          { id: 'symbols', label: 'Symbols (!@#$)', state: includeSymbols, setter: setIncludeSymbols },
        ].map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-2 sm:gap-3 bg-vaultDark/30 border border-vaultBorder/60 hover:border-vaultBorder rounded-lg p-2.5 sm:p-3 cursor-pointer select-none transition-colors"
          >
            <input
              type="checkbox"
              checked={option.state}
              onChange={(e) => option.setter(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-vaultDark border-vaultBorder rounded focus:ring-blue-500 focus:ring-2 focus:ring-offset-vaultDark shrink-0"
            />
            <span className="text-xs sm:text-sm text-slate-300 font-medium">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PasswordGenerator;