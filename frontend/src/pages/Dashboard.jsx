import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LogOut,
  Key,
  Plus,
  Search,
  Globe,
  User,
  Lock,
  FileText,
  Copy,
  Check,
  Eye,
  EyeOff,
  ClipboardList,
  AlertCircle,
  X,
} from "lucide-react";
import PasswordGenerator from "../components/PasswordGenerator";
import AddVaultItemModal from "../components/AddVaultItemModal";
import API from "../utils/api";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("vault");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetailsPassword, setShowDetailsPassword] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchVaultData = async () => {
      try {
        const response = await API.get("/vault");
        setItems(response.data);
        if (response.data.length > 0) {
          setSelectedItem(response.data[0]);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("userInfo");
          navigate("/login");
          return;
        }
        setError("Failed to load secure vault data.");
      } finally {
        setLoading(false);
      }
    };
    fetchVaultData();
  }, [navigate]);

  const handleSaveItem = async (newItemData) => {
    try {
      const response = await API.post("/vault", newItemData);
      const savedItem = response.data;
      setItems([savedItem, ...items]);
      setSelectedItem(savedItem);
      setMobileDetailOpen(false);
    } catch (err) {
      setError("Failed to save new credentials securely.");
    }
  };

  const handleDeleteItem = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete this credential?",
      )
    )
      return;
    try {
      await API.delete(`/vault/${id}`);
      const updatedItems = items.filter((item) => item._id !== id);
      setItems(updatedItems);
      setSelectedItem(updatedItems.length > 0 ? updatedItems[0] : null);
    } catch (err) {
      setError("Failed to remove item securely.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const copyToClipboard = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(""), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.domain.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setShowDetailsPassword(false);
    setMobileDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-vaultDark text-white flex flex-col h-screen overflow-hidden">
      {/* GLOBAL TOP NAVIGATION BAR */}
      <header className="h-14 sm:h-16 border-b border-vaultBorder bg-vaultCard flex items-center justify-between px-3 sm:px-6 shrink-0">
        <div className="flex items-center gap-2 text-blue-500 font-bold text-base sm:text-lg tracking-tight">
          <ShieldCheck size={22} className="sm:w-[26px] sm:h-[26px]" />
          <span>SecureVault</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 transition-all"
        >
          <LogOut size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Lock Vault</span>
        </button>
      </header>

      {/* CORE CONTAINER */}
      <div className="flex flex-1 overflow-hidden">
        {/* COLUMN 1: SIDEBAR NAVIGATION */}
        <aside className="w-14 sm:w-16 md:w-64 border-r border-vaultBorder bg-vaultCard/50 p-2 sm:p-3 flex flex-col gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 sm:p-2.5 md:py-2.5 md:px-4 flex items-center justify-center gap-2 text-sm font-semibold transition-colors shadow-lg shadow-blue-600/10"
          >
            <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden md:inline">Add New Item</span>
          </button>

          <hr className="border-vaultBorder my-1 sm:my-2" />

          <button
            onClick={() => { setActiveTab("vault"); setMobileDetailOpen(false); }}
            className={`w-full rounded-lg p-2 sm:p-2.5 md:py-2.5 md:px-4 flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-sm font-medium transition-colors ${activeTab === "vault" ? "bg-blue-600/10 text-blue-500 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
          >
            <Key size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden md:inline">My Credentials</span>
          </button>

          <button
            onClick={() => { setActiveTab("generator"); setMobileDetailOpen(false); }}
            className={`w-full rounded-lg p-2 sm:p-2.5 md:py-2.5 md:px-4 flex items-center justify-center md:justify-start gap-2 sm:gap-3 text-sm font-medium transition-colors ${activeTab === "generator" ? "bg-blue-600/10 text-blue-500 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-slate-800/50"}`}
          >
            <ClipboardList size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden md:inline">Password Generator</span>
          </button>
        </aside>

        {/* DYNAMIC WORKSPACE DISPLAY INTERACTION LAYER */}
        {activeTab === "generator" ? (
          <main className="flex-1 p-3 sm:p-6 overflow-y-auto w-full">
            <PasswordGenerator />
          </main>
        ) : (
          <div className="flex flex-1 overflow-hidden relative">
            {/* COLUMN 2: SEARCH FILTER LIST PANEL */}
            <section className={`w-full md:w-80 border-r border-vaultBorder flex flex-col bg-vaultDark/30 shrink-0 ${mobileDetailOpen ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-3 sm:p-4 border-b border-vaultBorder">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={14}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vault items..."
                    className="w-full bg-vaultDark/60 border border-vaultBorder rounded-lg pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="m-2 sm:m-3 flex items-center gap-2 bg-red-500/10 text-red-400 p-2 sm:p-2.5 rounded-lg text-[11px] sm:text-xs">
                  <AlertCircle size={14} className="shrink-0" /> <span className="leading-tight">{error}</span>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-1.5 sm:p-2 space-y-0.5 sm:space-y-1">
                {loading ? (
                  <p className="text-center text-xs text-slate-500 mt-6 animate-pulse">
                    Decrypting vault keys...
                  </p>
                ) : filteredItems.length === 0 ? (
                  <p className="text-center text-xs text-slate-500 mt-6">
                    No matching items found
                  </p>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => handleSelectItem(item)}
                      className={`p-2.5 sm:p-3 rounded-lg cursor-pointer transition-all border ${selectedItem?._id === item._id ? "bg-blue-600/10 border-blue-500/30 text-white" : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-vaultCard/40"}`}
                    >
                      <h4 className="text-xs sm:text-sm font-semibold truncate text-white">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs truncate text-slate-400 mt-0.5">
                        {item.username}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* COLUMN 3: READOUT DETAILS DISPLAY PANEL */}
            {/* Desktop: always visible | Mobile: slide-over */}
            <main className={`hidden md:flex flex-1 flex-col bg-vaultDark/10 overflow-y-auto p-4 sm:p-6 ${!selectedItem ? 'md:flex' : ''}`}>
              {selectedItem ? (
                <div className="max-w-xl w-full bg-vaultCard border border-vaultBorder rounded-xl p-4 sm:p-6 shadow-xl space-y-4 sm:space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                        {selectedItem.title}
                      </h2>
                      {selectedItem.domain && (
                        <span className="text-[11px] sm:text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 mt-1">
                          <Globe size={11} className="sm:w-3 sm:h-3" /> {selectedItem.domain}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(selectedItem._id)}
                      className="text-[11px] sm:text-xs font-medium text-slate-500 hover:text-red-400 px-2 py-1 rounded hover:bg-red-500/10 transition-colors shrink-0"
                    >
                      Delete Entry
                    </button>
                  </div>

                  <hr className="border-vaultBorder" />

                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User size={12} className="sm:w-[13px] sm:h-[13px]" /> Username
                    </label>
                    <div className="flex bg-vaultDark/50 border border-vaultBorder rounded-lg overflow-hidden">
                      <input
                        type="text"
                        readOnly
                        value={selectedItem.username}
                        className="bg-transparent flex-1 px-2 sm:px-3 py-2 text-sm text-slate-200 outline-none select-all min-w-0"
                      />
                      <button
                        onClick={() =>
                          copyToClipboard(selectedItem.username, "user")
                        }
                        className={`px-2 sm:px-3 border-l border-vaultBorder text-slate-400 hover:text-white transition-colors shrink-0 ${copiedField === "user" ? "text-green-500 bg-green-500/5" : ""}`}
                      >
                        {copiedField === "user" ? (
                          <Check size={14} className="sm:w-[15px] sm:h-[15px]" />
                        ) : (
                          <Copy size={14} className="sm:w-[15px] sm:h-[15px]" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Lock size={12} className="sm:w-[13px] sm:h-[13px]" /> Password
                    </label>
                    <div className="flex bg-vaultDark/50 border border-vaultBorder rounded-lg overflow-hidden">
                      <input
                        type={showDetailsPassword ? "text" : "password"}
                        readOnly
                        value={selectedItem.password}
                        className="bg-transparent font-mono flex-1 px-2 sm:px-3 py-2 text-sm text-slate-200 outline-none tracking-wider min-w-0"
                      />
                      <button
                        onClick={() =>
                          setShowDetailsPassword(!showDetailsPassword)
                        }
                        className="px-2 sm:px-3 border-l border-vaultBorder text-slate-400 hover:text-white transition-colors shrink-0"
                      >
                        {showDetailsPassword ? (
                          <EyeOff size={14} className="sm:w-[15px] sm:h-[15px]" />
                        ) : (
                          <Eye size={14} className="sm:w-[15px] sm:h-[15px]" />
                        )}
                      </button>
                      <button
                        onClick={() =>
                          copyToClipboard(selectedItem.password, "pass")
                        }
                        className={`px-2 sm:px-3 border-l border-vaultBorder text-slate-400 hover:text-white transition-colors shrink-0 ${copiedField === "pass" ? "text-green-500 bg-green-500/5" : ""}`}
                      >
                        {copiedField === "pass" ? (
                          <Check size={14} className="sm:w-[15px] sm:h-[15px]" />
                        ) : (
                          <Copy size={14} className="sm:w-[15px] sm:h-[15px]" />
                        )}
                      </button>
                    </div>
                  </div>

                  {selectedItem.notes && (
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={12} className="sm:w-[13px] sm:h-[13px]" /> Notes
                      </label>
                      <div className="bg-vaultDark/50 border border-vaultBorder rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {selectedItem.notes}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-slate-500 gap-2">
                  <Key size={32} className="sm:w-9 sm:h-9 text-slate-600 animate-pulse" />
                  <p className="text-xs sm:text-sm text-center px-4">
                    Your secure locker is empty. Click "+ Add New Item" to store
                    your records.
                  </p>
                </div>
              )}
            </main>

            {/* MOBILE DETAIL OVERLAY */}
            {mobileDetailOpen && selectedItem && (
              <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-vaultDark">
                <div className="flex items-center justify-between px-4 py-3 border-b border-vaultBorder bg-vaultCard shrink-0">
                  <h3 className="text-sm font-bold text-white truncate pr-2">{selectedItem.title}</h3>
                  <button
                    onClick={() => setMobileDetailOpen(false)}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {selectedItem && (
                    <div className="w-full bg-vaultCard border border-vaultBorder rounded-xl p-4 shadow-xl space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h2 className="text-lg font-bold text-white tracking-tight truncate">
                            {selectedItem.title}
                          </h2>
                          {selectedItem.domain && (
                            <span className="text-[11px] font-mono text-blue-400 flex items-center gap-1 mt-1">
                              <Globe size={11} /> {selectedItem.domain}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteItem(selectedItem._id);
                            setMobileDetailOpen(false);
                          }}
                          className="text-[11px] font-medium text-red-400 px-2 py-1 rounded hover:bg-red-500/10 transition-colors shrink-0"
                        >
                          Delete
                        </button>
                      </div>

                      <hr className="border-vaultBorder" />

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <User size={12} /> Username
                        </label>
                        <div className="flex bg-vaultDark/50 border border-vaultBorder rounded-lg overflow-hidden">
                          <input
                            type="text"
                            readOnly
                            value={selectedItem.username}
                            className="bg-transparent flex-1 px-2 py-2 text-sm text-slate-200 outline-none select-all min-w-0"
                          />
                          <button
                            onClick={() => copyToClipboard(selectedItem.username, "user")}
                            className={`px-3 border-l border-vaultBorder text-slate-400 hover:text-white transition-colors shrink-0 ${copiedField === "user" ? "text-green-500 bg-green-500/5" : ""}`}
                          >
                            {copiedField === "user" ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Lock size={12} /> Password
                        </label>
                        <div className="flex bg-vaultDark/50 border border-vaultBorder rounded-lg overflow-hidden">
                          <input
                            type={showDetailsPassword ? "text" : "password"}
                            readOnly
                            value={selectedItem.password}
                            className="bg-transparent font-mono flex-1 px-2 py-2 text-sm text-slate-200 outline-none tracking-wider min-w-0"
                          />
                          <button
                            onClick={() => setShowDetailsPassword(!showDetailsPassword)}
                            className="px-2 border-l border-vaultBorder text-slate-400 hover:text-white transition-colors shrink-0"
                          >
                            {showDetailsPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button
                            onClick={() => copyToClipboard(selectedItem.password, "pass")}
                            className={`px-2 border-l border-vaultBorder text-slate-400 hover:text-white transition-colors shrink-0 ${copiedField === "pass" ? "text-green-500 bg-green-500/5" : ""}`}
                          >
                            {copiedField === "pass" ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      {selectedItem.notes && (
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText size={12} /> Notes
                          </label>
                          <div className="bg-vaultDark/50 border border-vaultBorder rounded-lg p-2 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {selectedItem.notes}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <AddVaultItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
      />
    </div>
  );
};

export default Dashboard;