import { SandboxType } from '../types';
import EHRSandbox from './EHRSandbox';
import BillingSandbox from './BillingSandbox';
import SchedulingSandbox from './SchedulingSandbox';
import InventorySandbox from './InventorySandbox';
import { X, UserCheck, ShieldAlert, CreditCard, CalendarRange, PackageSearch } from 'lucide-react';
import { motion } from 'motion/react';

interface SandboxModalProps {
  activeSandbox: SandboxType;
  onClose: () => void;
  setActiveSandbox: (type: SandboxType) => void;
}

export default function SandboxModal({ activeSandbox, onClose, setActiveSandbox }: SandboxModalProps) {
  if (!activeSandbox) return null;

  return (
    <div className="fixed inset-0 bg-[#111C2D]/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden w-full max-w-5xl shadow-2xl flex flex-col h-[95vh] md:h-[680px] max-h-[850px]"
      >
        {/* Header Cockpit Panel */}
        <div className="bg-primary text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/10 shrink-0">
          <div>
            <span className="flex items-center gap-1.5 text-[10px] text-sky-300 bg-white/10 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider w-fit">
              <UserCheck className="w-3.5 h-3.5" /> Interactive H Plus Sandbox
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-headline-md mt-1">Live Clinician Workspace Preview</h3>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-semibold text-slate-200">Simulated Environment</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-200 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-slate-100 bg-slate-50/50 p-2 overflow-x-auto gap-1 shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveSandbox('EHR')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSandbox === 'EHR'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>Electronic Health Records (EHR)</span>
          </button>

          <button
            onClick={() => setActiveSandbox('Billing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSandbox === 'Billing'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4 shrink-0" />
            <span>Billing & Claim Processing</span>
          </button>

          <button
            onClick={() => setActiveSandbox('Scheduling')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSandbox === 'Scheduling'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <CalendarRange className="w-4 h-4 shrink-0" />
            <span>Intelligent Scheduler</span>
          </button>

          <button
            onClick={() => setActiveSandbox('Inventory')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeSandbox === 'Inventory'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <PackageSearch className="w-4 h-4 shrink-0" />
            <span>Pharmacy & Medical Inventory</span>
          </button>
        </div>

        {/* Core Sandbox Content Panel */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30">
          {activeSandbox === 'EHR' && <EHRSandbox />}
          {activeSandbox === 'Billing' && <BillingSandbox />}
          {activeSandbox === 'Scheduling' && <SchedulingSandbox />}
          {activeSandbox === 'Inventory' && <InventorySandbox />}
        </div>
      </motion.div>
    </div>
  );
}
