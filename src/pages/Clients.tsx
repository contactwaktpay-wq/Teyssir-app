import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore, Client } from '../store/useStore';
import Modal from '../components/Modal';
import { Plus, Phone, AlertCircle, CheckCircle } from 'lucide-react';

export default function Clients() {
  const { t } = useTranslation();
  const { clients, addClient } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', balance: 0, status: 'up_to_date' as 'up_to_date' | 'late', risk: 'low' as 'low' | 'medium' | 'high' });

  const handleSave = () => {
    if (!form.name || !form.phone) return;
    addClient(form);
    setForm({ name: '', phone: '', balance: 0, status: 'up_to_date', risk: 'low' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">{t('clients.title')}</h1>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 text-sm font-medium">
          <Plus className="w-4 h-4" /> {t('clients.add')}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-start">
              <tr>
                <th className="px-4 py-3 text-start font-medium">{t('clients.name')}</th>
                <th className="px-4 py-3 text-start font-medium hidden sm:table-cell">{t('clients.phone')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('clients.balance')}</th>
                <th className="px-4 py-3 text-start font-medium">{t('clients.status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-800">{c.name}</div>
                    <div className="text-xs text-slate-400 sm:hidden flex items-center gap-1 mt-1"><Phone className="w-3 h-3" />{c.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{c.phone}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{c.balance.toLocaleString()} MRU</td>
                  <td className="px-4 py-3">
                    {c.status === 'late' ? (
                      <span className="flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-lg text-xs font-medium w-fit">
                        <AlertCircle className="w-3 h-3" /> {t('clients.late')}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-medium w-fit">
                        <CheckCircle className="w-3 h-3" /> {t('clients.upToDate')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('clients.add')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('clients.name')}</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('clients.phone')}</label>
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('clients.balance')}</label>
            <input type="number" value={form.balance} onChange={e => setForm({...form, balance: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-600 mb-1 block">{t('clients.status')}</label>
              <select value={form.status} onChange={e => setForm({...form, status: e.target.value as 'up_to_date' | 'late'})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="up_to_date">{t('clients.upToDate')}</option>
                <option value="late">{t('clients.late')}</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-600 mb-1 block">{t('clients.risk')}</label>
              <select value={form.risk} onChange={e => setForm({...form, risk: e.target.value as 'low' | 'medium' | 'high'})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <button onClick={handleSave} className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700">{t('clients.save')}</button>
        </div>
      </Modal>
    </div>
  );
}  
