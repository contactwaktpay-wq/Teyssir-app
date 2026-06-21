import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Client {
  id: string;
  name: string;
  phone: string;
  balance: number;
  status: 'up_to_date' | 'late';
  risk: 'low' | 'medium' | 'high';
}

export interface Payment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  date: string;
  method: 'Cash' | 'Bank' | 'Mobile';
}

export interface Reminder {
  id: string;
  clientId: string;
  clientName: string;
  channel: 'WhatsApp' | 'SMS' | 'Email';
  date: string;
  status: 'Sent' | 'Failed';
}

interface AppState {
  auth: { isLoggedIn: boolean; phone: string };
  login: (phone: string) => void;
  logout: () => void;
  
  clients: Client[];
  addClient: (c: Omit<Client, 'id'>) => void;
  
  payments: Payment[];
  addPayment: (p: Omit<Payment, 'id' | 'date' | 'clientName'>) => void;
  
  reminders: Reminder[];
  addReminder: (r: Omit<Reminder, 'id' | 'date' | 'clientName' | 'status'>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      auth: { isLoggedIn: false, phone: '' },
      login: (phone) => set({ auth: { isLoggedIn: true, phone } }),
      logout: () => set({ auth: { isLoggedIn: false, phone: '' } }),

      clients: [
        { id: 'c1', name: 'Mohamed Ould Ahmed', phone: '22100000', balance: 150000, status: 'late', risk: 'high' },
        { id: 'c2', name: 'École Al-Noor', phone: '22111111', balance: 450000, status: 'late', risk: 'high' },
        { id: 'c3', name: 'Aminata Diallo', phone: '76222222', balance: 25000, status: 'up_to_date', risk: 'low' },
        { id: 'c4', name: 'Boutique Sahel', phone: '33333333', balance: 80000, status: 'up_to_date', risk: 'medium' },
      ],
      addClient: (c) => set((state) => ({ clients: [...state.clients, { ...c, id: `c${Date.now()}` }] })),

      payments: [
        { id: 'p1', clientId: 'c3', clientName: 'Aminata Diallo', amount: 25000, date: '2024-02-10', method: 'Cash' },
        { id: 'p2', clientId: 'c4', clientName: 'Boutique Sahel', amount: 50000, date: '2024-02-12', method: 'Mobile' },
      ],
      addPayment: (p) => {
        const state = get();
        const client = state.clients.find(c => c.id === p.clientId);
        const newPayment: Payment = { ...p, id: `p${Date.now()}`, date: new Date().toISOString().split('T')[0], clientName: client?.name || 'Inconnu' };
        
        set({
          payments: [newPayment, ...state.payments],
          clients: state.clients.map(c => 
            c.id === p.clientId ? { ...c, balance: Math.max(0, c.balance - p.amount), status: c.balance - p.amount <= 0 ? 'up_to_date' : c.status } : c
          )
        });
      },

      reminders: [
        { id: 'r1', clientId: 'c1', clientName: 'Mohamed Ould Ahmed', channel: 'SMS', date: '2024-02-15', status: 'Sent' },
      ],
      addReminder: (r) => {
        const state = get();
        const client = state.clients.find(c => c.id === r.clientId);
        const newReminder: Reminder = { ...r, id: `r${Date.now()}`, date: new Date().toISOString().split('T')[0], clientName: client?.name || 'Inconnu', status: 'Sent' };
        set({ reminders: [newReminder, ...state.reminders] });
      }
    }),
    { name: 'teyssir-store' }
  )
); 
