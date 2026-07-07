export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  heartRate: number;
  bloodPressure: string;
  temperature: string;
  diagnosis: string;
  notes: string[];
  lastVisit: string;
}

export interface Claim {
  id: string;
  patientName: string;
  treatment: string;
  cost: number;
  copay: number;
  insurance: string;
  status: 'Draft' | 'Processing' | 'Approved' | 'Rejected';
  date: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  time: string;
  date: string;
  status: 'Scheduled' | 'Confirmed' | 'In-Progress' | 'Completed';
  reminders: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Supplies' | 'Pharmacy' | 'Equipment';
  stock: number;
  minStock: number;
  unit: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Reordering';
}

export type SandboxType = 'EHR' | 'Billing' | 'Scheduling' | 'Inventory' | null;
