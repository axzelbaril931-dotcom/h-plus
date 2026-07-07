import { useState } from 'react';
import { Patient } from '../types';
import { Search, User, Activity, FileText, Plus, Heart, Thermometer, Droplet, Calendar, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'P-101',
    name: 'Eleanor Vance',
    age: 34,
    gender: 'Female',
    bloodType: 'A+',
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: '98.6°F',
    diagnosis: 'Mild Hypertension & Migraine Surveillance',
    notes: [
      'Patient reports occasional headaches on waking.',
      'Advised low sodium diet and 8 hours of sleep.',
      'Check blood pressure daily for 2 weeks.'
    ],
    lastVisit: '2026-06-15'
  },
  {
    id: 'P-102',
    name: 'Marcus Sterling',
    age: 48,
    gender: 'Male',
    bloodType: 'O-',
    heartRate: 85,
    bloodPressure: '135/88',
    temperature: '99.1°F',
    diagnosis: 'Type 2 Diabetes Routine Monitoring',
    notes: [
      'HbA1c level is stable at 6.4%.',
      'Metformin dosage remains at 500mg twice daily.',
      'Patient engaged in regular moderate aerobic exercise.'
    ],
    lastVisit: '2026-06-28'
  },
  {
    id: 'P-103',
    name: 'Aisha Rahman',
    age: 27,
    gender: 'Female',
    bloodType: 'B+',
    heartRate: 64,
    bloodPressure: '110/72',
    temperature: '98.2°F',
    diagnosis: 'Acute Seasonal Allergic Rhinitis',
    notes: [
      'Experiencing continuous sneezing and watery eyes.',
      'Prescribed Cetirizine 10mg once daily.',
      'Avoid pollen exposure during early morning hours.'
    ],
    lastVisit: '2026-07-02'
  }
];

export default function EHRSandbox() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [selectedId, setSelectedId] = useState<string>(patients[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [tempHeart, setTempHeart] = useState<number | ''>('');
  const [tempBp, setTempBp] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPatient = patients.find(p => p.id === selectedId) || patients[0];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setPatients(prev =>
      prev.map(p => {
        if (p.id === selectedPatient.id) {
          return {
            ...p,
            notes: [...p.notes, newNote.trim()]
          };
        }
        return p;
      })
    );
    setNewNote('');
  };

  const handleUpdateVitals = () => {
    setPatients(prev =>
      prev.map(p => {
        if (p.id === selectedPatient.id) {
          return {
            ...p,
            heartRate: tempHeart !== '' ? Number(tempHeart) : p.heartRate,
            bloodPressure: tempBp !== '' ? tempBp : p.bloodPressure
          };
        }
        return p;
      })
    );
    setTempHeart('');
    setTempBp('');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[530px] overflow-y-auto lg:overflow-hidden">
      {/* Patients List Column */}
      <div className="w-full lg:w-1/3 flex flex-col border border-slate-200 rounded-xl bg-slate-50/50 p-4 h-[250px] lg:h-full shrink-0">
        <h4 className="text-sm font-semibold text-primary font-headline-md mb-3 flex items-center gap-2">
          <User className="w-4 h-4" /> Patient Registry
        </h4>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or ID..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredPatients.length > 0 ? (
            filteredPatients.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  selectedId === p.id
                    ? 'bg-primary border-primary text-white shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className={`text-xs ${selectedId === p.id ? 'text-slate-200' : 'text-slate-500'}`}>
                    ID: {p.id} • {p.gender}, {p.age}y
                  </p>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${selectedId === p.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  Type {p.bloodType}
                </div>
              </button>
            ))
          ) : (
            <p className="text-center text-xs text-slate-400 py-8">No patients found.</p>
          )}
        </div>
      </div>

      {/* Patient EHR Detail Column */}
      <div className="flex-1 border border-slate-200 rounded-xl bg-white p-4 sm:p-6 h-auto lg:h-full flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
            <div>
              <span className="text-xs text-primary font-bold uppercase tracking-wider bg-primary-fixed/30 px-2 py-0.5 rounded">
                Active EHR File
              </span>
              <h3 className="text-xl font-bold text-primary mt-1 font-headline-lg">{selectedPatient.name}</h3>
              <p className="text-xs text-slate-500">
                Patient ID: {selectedPatient.id} • {selectedPatient.gender} • Age: {selectedPatient.age} • Blood: {selectedPatient.bloodType} • Last Visit: {selectedPatient.lastVisit}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full font-medium inline-block">
                Secure Connection (HIPAA)
              </span>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-lg flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Heart className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-rose-600 font-medium">Pulse Rate</p>
                <p className="text-sm font-bold text-slate-800">{selectedPatient.heartRate} <span className="text-[10px] font-normal">BPM</span></p>
              </div>
            </div>

            <div className="bg-sky-50/50 border border-sky-100 p-3 rounded-lg flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-sky-600 font-medium">Blood Pressure</p>
                <p className="text-sm font-bold text-slate-800">{selectedPatient.bloodPressure} <span className="text-[10px] font-normal">mmHg</span></p>
              </div>
            </div>

            <div className="bg-amber-50/50 border border-amber-100 p-3 rounded-lg flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Thermometer className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-amber-600 font-medium">Temperature</p>
                <p className="text-sm font-bold text-slate-800">{selectedPatient.temperature}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis Section */}
          <div className="mb-4 bg-slate-50 border border-slate-100 p-3 rounded-lg">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-primary" /> Active Clinical Diagnosis
            </h5>
            <p className="text-sm text-slate-800 font-medium">{selectedPatient.diagnosis}</p>
          </div>

          {/* Notes Section */}
          <div className="mb-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" /> Physician Consultation Notes
            </h5>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {selectedPatient.notes.map((note, index) => (
                <div key={index} className="bg-slate-50 p-2.5 rounded border-l-4 border-slate-300 text-xs text-slate-700">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Input Controls */}
        <div className="border-t border-slate-100 pt-4 mt-auto">
          {/* Add Note row */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Type new clinical consultation note here..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddNote()}
            />
            <button
              onClick={handleAddNote}
              className="bg-primary hover:bg-primary-container text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Note
            </button>
          </div>

          {/* Vitals update row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">Update Vitals:</span>
            <input
              type="number"
              placeholder="Pulse (BPM)"
              className="w-24 px-2 py-1.5 border border-slate-200 rounded text-xs bg-slate-50 text-[#111C2D]"
              value={tempHeart}
              onChange={e => setTempHeart(e.target.value !== '' ? Number(e.target.value) : '')}
            />
            <input
              type="text"
              placeholder="BP (e.g. 120/80)"
              className="w-32 px-2 py-1.5 border border-slate-200 rounded text-xs bg-slate-50 text-[#111C2D]"
              value={tempBp}
              onChange={e => setTempBp(e.target.value)}
            />
            <button
              onClick={handleUpdateVitals}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition-all"
            >
              <Check className="w-3 h-3 text-emerald-600 font-bold" /> Apply Vitals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
