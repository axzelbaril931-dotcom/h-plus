import { useState, FormEvent } from 'react';
import { X, Calendar, Clock, Sparkles, Building, User, Mail, Phone, Briefcase, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_DAYS = [
  { name: 'Mon', day: 6, dateStr: 'July 6, 2026' },
  { name: 'Tue', day: 7, dateStr: 'July 7, 2026' },
  { name: 'Wed', day: 8, dateStr: 'July 8, 2026' },
  { name: 'Thu', day: 9, dateStr: 'July 9, 2026' },
  { name: 'Fri', day: 10, dateStr: 'July 10, 2026' }
];

const AVAILABLE_SLOTS = [
  '09:30 AM (EST)',
  '11:00 AM (EST)',
  '01:30 PM (EST)',
  '03:00 PM (EST)',
  '04:30 PM (EST)'
];

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hospital, setHospital] = useState('');
  const [role, setRole] = useState('Administrator');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !hospital) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1200);
  };

  const selectedDay = AVAILABLE_DAYS[selectedDayIndex];
  const selectedSlot = AVAILABLE_SLOTS[selectedSlotIndex];

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden w-full max-w-3xl shadow-2xl flex flex-col md:flex-row h-[95vh] md:h-[560px] max-h-[850px]"
      >
        {/* Visual Brand Left Side */}
        <div className="w-full md:w-72 shrink-0 bg-primary p-5 md:p-6 text-white flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          {/* Ambient shapes */}
          <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-sky-500/10 blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl" />

          <div className="space-y-3 md:space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-secondary-container" /> Customized Briefing
            </span>
            <h3 className="text-xl md:text-2xl font-headline-xl font-bold">Personal H Plus Systems Tour</h3>
            <p className="text-[11px] md:text-xs text-slate-200 leading-relaxed max-w-md md:max-w-none">
              Experience clinical-grade automation tailored to your healthcare network. Learn how our EHR, inventory workflows, and billing engines sync effortlessly to support your staff.
            </p>
          </div>

          <div className="space-y-2 md:space-y-3 relative z-10 border-t border-white/10 pt-3 md:pt-4 text-xs text-slate-300 mt-4 md:mt-0 flex flex-row md:flex-col justify-between md:justify-start gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary-container shrink-0" />
              <span>{selectedDay.dateStr}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary-container shrink-0" />
              <span>{selectedSlot}</span>
            </div>
          </div>
        </div>

        {/* Action Form Right Side */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between overflow-y-auto min-h-0 bg-slate-50/20">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm font-headline-md">Configure Your Briefing</h4>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 bg-slate-50 border border-slate-200/50 rounded-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {!isConfirmed ? (
              <motion.form
                key="booking-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3 mt-4"
              >
                {/* 1. Pick a day */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">1. Select Briefing Date</span>
                  <div className="grid grid-cols-5 gap-2">
                    {AVAILABLE_DAYS.map((day, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDayIndex(i)}
                        className={`py-2 rounded-lg border text-center transition-all cursor-pointer ${
                          selectedDayIndex === i
                            ? 'bg-primary border-primary text-white font-bold shadow-sm'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600 text-xs'
                        }`}
                      >
                        <p className="text-[10px] uppercase font-bold">{day.name}</p>
                        <p className="text-sm">{day.day}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Pick a slot */}
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">2. Choose Available Time (EST)</span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_SLOTS.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSlotIndex(i)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                          selectedSlotIndex === i
                            ? 'bg-primary border-primary text-white shadow-sm'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Personal details */}
                <div className="space-y-2 border-t border-slate-100 pt-3 mt-3">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">3. Provide Contact Context</span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <User className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Full Name *"
                        className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-primary text-[#111C2D]"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Work Email Address *"
                        className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-primary text-[#111C2D]"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Building className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Hospital / Clinic Name *"
                        className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-primary text-[#111C2D]"
                        value={hospital}
                        onChange={e => setHospital(e.target.value)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <Briefcase className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                      <select
                        className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-primary text-[#111C2D]"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Clinician / MD">Clinician / MD</option>
                        <option value="Clinical Director">Clinical Director</option>
                        <option value="IT Operations Specialist">IT Operations Specialist</option>
                        <option value="Purchasing Coordinator">Purchasing Coordinator</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      className="w-full pl-8 pr-2 py-1.5 border border-slate-200 rounded-lg text-xs bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-primary text-[#111C2D]"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 mt-3">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-container text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Confirming with Calendar Server...' : 'Confirm Demonstration Slot'}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-center items-center text-center p-6 space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm animate-pulse">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-slate-800">Briefing Slot Reserved!</h4>
                  <p className="text-xs text-slate-500 max-w-sm">
                    A secure H Plus walkthrough calendar invite has been dispatched to <strong className="text-slate-700">{email}</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs space-y-1.5 text-left w-full max-w-xs font-mono text-slate-600">
                  <div className="flex justify-between">
                    <span>Expert host:</span>
                    <strong className="text-slate-800">Sarah Jenkins (Clin. Systems)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <strong className="text-slate-800">{selectedDay.dateStr}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <strong className="text-slate-800">{selectedSlot}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <strong className="text-slate-800">30 minutes</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Secure Room Link:</span>
                    <strong className="text-emerald-700 font-bold underline">hplus.zoom.us/briefing</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsConfirmed(false);
                    onClose();
                  }}
                  className="bg-primary hover:bg-primary-container text-white px-6 py-2 rounded-xl text-xs font-bold transition-all shadow cursor-pointer"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
