import React, { useState } from 'react';
import { X, RefreshCw, Eye, EyeOff } from 'lucide-react';

const AddVaultItemModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [domain, setDomain] = useState('');
  const [notes, setNotes] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleQuickGenerate = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let generated = '';
    const length = 14;
    for (let i = 0; i < length; i++) {
      generated += charset[Math.floor(Math.random() * charset.length)];
    }
    setPassword(generated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !username || !password) return;

    onSave({ title, username, password, domain, notes });
    
    setTitle('');
    setUsername('');
    setPassword('');
    setDomain('');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-vaultDark/80 backdrop-blur-sm">
      
      {/* Modal Container Card */}
      <div className="w-full max-w-lg bg-vaultCard border border-vaultBorder rounded-xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-vaultBorder shrink-0">
          <h3 className="text-base sm:text-lg font-bold text-white">Add New Vault Credentials</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form Content - scrollable on small screens */}
        <div className="overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            
            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5">
                Account Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., GitHub, Google, AWS Console"
                className="w-full bg-vaultDark/60 border border-vaultBorder rounded-lg px-3 sm:px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5">
                Username or Email <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., user@example.com or admin_root"
                className="w-full bg-vaultDark/60 border border-vaultBorder rounded-lg px-3 sm:px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-vaultDark/60 border border-vaultBorder rounded-lg pl-3 sm:pl-3.5 pr-20 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-colors font-mono tracking-wider"
                />
                <div className="absolute right-2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickGenerate}
                    className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                    title="Quick Generate Password"
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5">
                Website Domain <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., github.com"
                className="w-full bg-vaultDark/60 border border-vaultBorder rounded-lg px-3 sm:px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 sm:mb-1.5">
                Secure Notes <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add recovery keys, pin entries, or account descriptions..."
                rows={3}
                className="w-full bg-vaultDark/60 border border-vaultBorder rounded-lg px-3 sm:px-3.5 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-colors resize-none leading-relaxed"
              />
            </div>

            {/* Action Footer Buttons */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 pt-2 border-t border-vaultBorder/50 mt-3 sm:mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-white bg-slate-800/30 hover:bg-slate-800 border border-vaultBorder rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-lg shadow-blue-600/10"
              >
                Save Credentials
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVaultItemModal;