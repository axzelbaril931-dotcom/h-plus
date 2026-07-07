import { useState } from 'react';
import { Claim } from '../types';
import { DollarSign, ShieldAlert, CheckCircle, RefreshCw, Layers, Plus, ArrowUpRight, TrendingUp } from 'lucide-react';

const INITIAL_CLAIMS: Claim[] = [
  {
    id: 'CLM-7801',
    patientName: 'Jane Smith',
    treatment: 'Contrast Enhanced MRI Scan',
    cost: 1450,
    copay: 290,
    insurance: 'Blue Cross Blue Shield',
    status: 'Approved',
    date: '2026-07-04'
  },
  {
    id: 'CLM-7802',
    patientName: 'John Doe',
    treatment: 'Complete Blood Panel',
    cost: 180,
    copay: 36,
    insurance: 'Medicare',
    status: 'Approved',
    date: '2026-07-05'
  },
  {
    id: 'CLM-7803',
    patientName: 'Michael Johnson',
    treatment: 'General Practitioner Consultation',
    cost: 120,
    copay: 20,
    insurance: 'Aetna',
    status: 'Processing',
    date: '2026-07-05'
  }
];

const TREATMENTS_COSTS: Record<string, number> = {
  'General Practitioner Consultation': 120,
  'Diagnostic X-Ray': 350,
  'Contrast Enhanced MRI Scan': 1450,
  'Complete Blood Panel': 180,
  'Outpatient Cardiac Ultrasound': 820,
  'Physical Therapy Evaluation': 150
};

export default function BillingSandbox() {
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [patientName, setPatientName] = useState('');
  const [treatment, setTreatment] = useState('Diagnostic X-Ray');
  const [insurance, setInsurance] = useState('Blue Cross Blue Shield');
  const [customCost, setCustomCost] = useState<number | ''>('');
  
  // Claims processing simulation
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingClaim, setProcessingClaim] = useState<Claim | null>(null);

  const selectedCost = customCost !== '' ? Number(customCost) : (TREATMENTS_COSTS[treatment] || 150);
  const estimatedCopay = Math.round(selectedCost * 0.2); // 20% typical copay

  const handleProcessClaim = () => {
    if (!patientName.trim()) {
      alert('Please enter patient name.');
      return;
    }

    const newClaim: Claim = {
      id: `CLM-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: patientName.trim(),
      treatment,
      cost: selectedCost,
      copay: estimatedCopay,
      insurance,
      status: 'Processing',
      date: new Date().toISOString().split('T')[0]
    };

    setProcessingClaim(newClaim);
    setIsProcessing(true);
    setProcessingStep(1);

    // Step-by-step claims check animation
    setTimeout(() => {
      setProcessingStep(2);
      setTimeout(() => {
        setProcessingStep(3);
        setTimeout(() => {
          setProcessingStep(4);
          setTimeout(() => {
            // Finalize
            const finalizedClaim: Claim = { ...newClaim, status: 'Approved' };
            setClaims(prev => [finalizedClaim, ...prev]);
            setIsProcessing(false);
            setProcessingClaim(null);
            setProcessingStep(0);
            setPatientName('');
            setCustomCost('');
          }, 1000);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const totalRevenue = claims
    .filter(c => c.status === 'Approved')
    .reduce((sum, c) => sum + c.cost, 0);

  const pendingClaimsCount = claims.filter(c => c.status === 'Processing').length + (isProcessing ? 1 : 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[530px] overflow-y-auto lg:overflow-hidden">
      {/* Simulation Form Panel */}
      <div className="w-full lg:w-5/12 flex flex-col justify-between border border-slate-200 rounded-xl bg-slate-50/50 p-4 sm:p-5 h-auto lg:h-full shrink-0">
        <div>
          <h4 className="text-sm font-semibold text-primary font-headline-md mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" /> AI-Assisted Claims Processor
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Patient Name</label>
              <input
                type="text"
                placeholder="Enter patient full name..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                disabled={isProcessing}
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Clinical Procedure / Treatment</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                value={treatment}
                onChange={e => {
                  setTreatment(e.target.value);
                  setCustomCost('');
                }}
                disabled={isProcessing}
              >
                {Object.keys(TREATMENTS_COSTS).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Insurance Carrier</label>
                <select
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                  value={insurance}
                  onChange={e => setInsurance(e.target.value)}
                  disabled={isProcessing}
                >
                  <option value="Blue Cross Blue Shield">Blue Cross</option>
                  <option value="Medicare">Medicare</option>
                  <option value="Aetna">Aetna</option>
                  <option value="Cigna">Cigna</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Treatment Cost ($)</label>
                <input
                  type="number"
                  placeholder={`${TREATMENTS_COSTS[treatment] || 150}`}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-[#111C2D]"
                  value={customCost}
                  onChange={e => setCustomCost(e.target.value !== '' ? Number(e.target.value) : '')}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          {/* Dynamic Estimation Card */}
          <div className="mt-4 bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 text-xs">
            <p className="font-semibold text-emerald-800 mb-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Dynamic Coverage Calculator
            </p>
            <div className="flex justify-between text-slate-600 mt-1">
              <span>Total Billable Procedure Cost:</span>
              <span className="font-semibold text-slate-800">${selectedCost}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Primary Insurance Cover (80%):</span>
              <span className="font-semibold text-slate-800">${Math.round(selectedCost * 0.8)}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-medium border-t border-dashed border-emerald-100 pt-1 mt-1.5">
              <span>Estimated Patient Copay Responsibility:</span>
              <span>${estimatedCopay}</span>
            </div>
          </div>
        </div>

        {/* Submit & Status Indicator */}
        <div className="border-t border-slate-100 pt-4 mt-4">
          {isProcessing ? (
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 text-xs">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-3.5 h-3.5 text-primary animate-spin" />
                <span className="font-bold text-primary">Executing AI Pre-Audit Verification...</span>
              </div>
              <div className="space-y-1 bg-white p-2 rounded border border-slate-100 font-mono text-[10px]">
                <div className="flex items-center justify-between text-slate-500">
                  <span>1. Check Insurance Policy ID</span>
                  <span className={processingStep >= 1 ? "text-emerald-600 font-bold" : ""}>
                    {processingStep === 1 ? "RUNNING..." : processingStep > 1 ? "[PASSED]" : "WAITING"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>2. Validate Diagnosis ICD-10 Match</span>
                  <span className={processingStep >= 2 ? "text-emerald-600 font-bold" : ""}>
                    {processingStep === 2 ? "RUNNING..." : processingStep > 2 ? "[COMPLIANT]" : "WAITING"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>3. Calculate Copay Deductibles</span>
                  <span className={processingStep >= 3 ? "text-emerald-600 font-bold" : ""}>
                    {processingStep === 3 ? "RUNNING..." : processingStep > 3 ? "[COMPUTED]" : "WAITING"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>4. Issue Digital Claims Release</span>
                  <span className={processingStep >= 4 ? "text-emerald-600 font-bold animate-pulse" : ""}>
                    {processingStep === 4 ? "FINALIZING..." : "WAITING"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleProcessClaim}
              className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow active:scale-95"
            >
              <Layers className="w-4 h-4" /> Validate & Auto-Submit Claim
            </button>
          )}
        </div>
      </div>

      {/* Analytics & History Panel */}
      <div className="flex-1 flex flex-col justify-between border border-slate-200 rounded-xl bg-white p-4 sm:p-5 h-auto lg:h-full overflow-y-auto lg:overflow-hidden">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Active Billing Operations</h4>
              <p className="text-xs text-slate-500">Live transaction auditing & reimbursement tracker.</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="border border-slate-100 bg-slate-50 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Audited</p>
              <p className="text-base font-bold text-slate-800 mt-0.5">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="border border-slate-100 bg-slate-50 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approved Rate</p>
              <p className="text-base font-bold text-emerald-600 mt-0.5">99.1%</p>
            </div>
            <div className="border border-slate-100 bg-slate-50 p-3 rounded-lg">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Checks</p>
              <p className="text-base font-bold text-amber-500 mt-0.5">{pendingClaimsCount}</p>
            </div>
          </div>

          {/* History List */}
          <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Claim Processing Log</h5>
          <div className="space-y-2 overflow-y-auto max-h-56 pr-1">
            {claims.map(claim => (
              <div key={claim.id} className="border border-slate-100 bg-white hover:bg-slate-50/50 p-3 rounded-lg flex justify-between items-center transition-all text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{claim.patientName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({claim.id})</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">{claim.treatment} • <span className="font-medium">{claim.insurance}</span></p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">${claim.cost}</p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${claim.status === 'Approved' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                    <span className={`text-[10px] font-medium uppercase tracking-wider ${claim.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {claim.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informative Help Alert */}
        <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-lg flex items-start gap-2 text-xs mt-4">
          <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="text-slate-600 leading-normal">
            H Plus leverages AI processing models to pre-screen billing codes against local health carrier policies, achieving a <strong className="text-primary">30% reduction</strong> in claim rejections.
          </p>
        </div>
      </div>
    </div>
  );
}
