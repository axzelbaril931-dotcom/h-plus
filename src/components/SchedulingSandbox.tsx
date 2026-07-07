import { useState, FormEvent } from 'react';
import { Appointment } from '../types';
import { Calendar, User, Clock, Bell, Plus, Check, MessageSquare, RefreshCw } from 'lucide-react';

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-4401',
    patientName: 'Eleanor Vance',
    doctorName: 'Dr. Sarah Chen',
    department: 'Cardiology',
    time: '09:00 AM',
    date: '2026-07-06',
    status: 'Confirmed',
    reminders: true
  },
  {
    id: 'APT-4402',
    patientName: 'Marcus Sterling',
    doctorName: 'Dr. Evelyn Ross',
    department: 'Neurology',
    time: '10:30 AM',
    date: '2026-07-06',
    status: 'Scheduled',
    reminders: true
  },
  {
    id: 'APT-4403',
    patientName: 'Aisha Rahman',
    doctorName: 'Dr. Alan Mercer',
    department: 'Pediatrics',
    time: '01:30 PM',
    date: '2026-07-06',
    status: 'In-Progress',
    reminders: false
  }
];

const DOCTORS = [
  { name: 'Dr. Sarah Chen', dept: 'Cardiology' },
  { name: 'Dr. Evelyn Ross', dept: 'Neurology' },
  { name: 'Dr. Alan Mercer', dept: 'Pediatrics' },
  { name: 'Dr. Julia Kim', dept: 'General Medicine' }
];

const TIMES = ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '01:30 PM', '02:15 PM', '03:00 PM', '03:45 PM'];

export default function SchedulingSandbox() {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [patientName, setPatientName] = useState('');
  const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(0);
  const [time, setTime] = useState('09:45 AM');
  const [reminders, setReminders] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSchedule = (e: FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      alert('Please fill in patient name.');
      return;
    }

    const doc = DOCTORS[selectedDoctorIndex];

    const newApt: Appointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName.trim(),
      doctorName: doc.name,
      department: doc.dept,
      time,
      date: '2026-07-06',
      status: 'Scheduled',
      reminders
    };

    setAppointments(prev => [...prev, newApt]);
    setPatientName('');
    showToast(`Appointment scheduled for ${newApt.patientName} at ${newApt.time}!`);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusCycle = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => {
        if (apt.id === id) {
          let nextStatus: Appointment['status'] = 'Scheduled';
          if (apt.status === 'Scheduled') nextStatus = 'Confirmed';
          else if (apt.status === 'Confirmed') nextStatus = 'In-Progress';
          else if (apt.status === 'In-Progress') nextStatus = 'Completed';
          else if (apt.status === 'Completed') nextStatus = 'Scheduled';

          showToast(`Updated ${apt.patientName}'s status to ${nextStatus}.`);
          return { ...apt, status: nextStatus };
        }
        return apt;
      })
    );
  };

  const handleSendReminder = (patient: string) => {
    showToast(`Automated SMS & Email reminders sent to ${patient}!`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[530px] overflow-y-auto lg:overflow-hidden relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#111C2D] text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-lg z-50 flex items-center gap-2 border border-slate-700/50 animate-bounce">
          <Bell className="w-3.5 h-3.5 text-secondary-fixed" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Appointment Scheduler Form */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between border border-slate-200 rounded-xl bg-slate-50/50 p-4 sm:p-5 h-auto lg:h-full shrink-0">
        <form onSubmit={handleSchedule} className="space-y-4">
          <h4 className="text-sm font-semibold text-primary font-headline-md flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" /> H Plus Scheduling Desk
          </h4>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Patient Full Name..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Assign Physician</label>
            <select
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
              value={selectedDoctorIndex}
              onChange={e => setSelectedDoctorIndex(Number(e.target.value))}
            >
              {DOCTORS.map((d, index) => (
                <option key={index} value={index}>
                  {d.name} ({d.dept})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Select Time Slot</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={time}
                onChange={e => setTime(e.target.value)}
              >
                {TIMES.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Reminder Rules</label>
              <div className="flex items-center gap-2 h-9 border border-slate-200 rounded-lg bg-white px-3">
                <input
                  type="checkbox"
                  id="sms_notif"
                  className="rounded text-primary border-slate-300 focus:ring-primary"
                  checked={reminders}
                  onChange={e => setReminders(e.target.checked)}
                />
                <label htmlFor="sms_notif" className="text-xs text-slate-600 font-medium cursor-pointer">
                  Auto SMS Alert
                </label>
              </div>
            </div>
          </div>
        </form>

        <div className="border-t border-slate-100 pt-4 mt-4">
          <button
            onClick={handleSchedule}
            className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow active:scale-95"
          >
            <Plus className="w-4 h-4" /> Book Consultation Slot
          </button>
        </div>
      </div>

      {/* Appointment Queue Panel */}
      <div className="flex-1 flex flex-col border border-slate-200 rounded-xl bg-white p-4 sm:p-5 h-auto lg:h-full overflow-y-auto lg:overflow-hidden">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Consultation Queue</h4>
          <p className="text-xs text-slate-500 mb-4">Click badges to cycle clinician status or send reminders.</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {appointments.map(apt => {
            let badgeColor = 'bg-slate-100 text-slate-700';
            if (apt.status === 'Confirmed') badgeColor = 'bg-sky-50 text-sky-700 border border-sky-100';
            else if (apt.status === 'In-Progress') badgeColor = 'bg-amber-50 text-amber-700 border border-amber-100';
            else if (apt.status === 'Completed') badgeColor = 'bg-emerald-50 text-emerald-700 border border-emerald-100';

            return (
              <div
                key={apt.id}
                className="border border-slate-100 hover:border-slate-200 bg-white p-3.5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">{apt.patientName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({apt.id})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{apt.time} • <strong>{apt.doctorName}</strong> ({apt.department})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                  {apt.reminders && (
                    <button
                      onClick={() => handleSendReminder(apt.patientName)}
                      className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all cursor-pointer"
                      title="Send Instant SMS Reminder"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleStatusCycle(apt.id)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-[10px] uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer ${badgeColor}`}
                  >
                    <RefreshCw className="w-3 h-3 text-slate-500" />
                    {apt.status}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
