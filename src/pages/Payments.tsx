import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import Modal from '../components/Modal';
import { Plus, CreditCard } from 'lucide-react';

export default function Payments() {
  const { t } = useTranslation();
  const { payments, clients, addPayment } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ clientId: '', amount: 0, method: 'Cash' as 'Cash' | 'Bank' | 'Mobile' });

  const handleSave = () => {
    if (!form.clientId || form.amount <= 0) return;
    addPayment(form);
    setForm({ clientId: '', amount: 0, method: 'Cash' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">{t('payments.title')}</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 text-sm font-medium">
          <Plus className="w-4 h-4" /> {t('payments.add')}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {payments.map(p => (
            <div key={p.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">{p.clientName}</p>
                  <p className="text-xs text-slate-400">{p.date} • {p.method}</p>
                </div>
              </div>
              <span className="font-bold text-green-600">+{p.amount.toLocaleString()} MRU</span>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('payments.add')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('payments.client')}</label>
            <select value={form.clientId} onChange={e => setForm({...form, clientId: e.target.value})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">--</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('payments.amount')}</label>
            <input type="number" value={form.amount} onChange={e => setForm({...form, amount: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('payments.method')}</label>
            <select value={form.method} onChange={e => setForm({...form, method: e.target.value as 'Cash' | 'Bank' | 'Mobile'})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="Cash">Cash</option>
              <option value="Bank">Bank</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
          <button onClick={handleSave} className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700">{t('payments.save')}</button>
        </div>
      </Modal>
    </div>
  );
}  
