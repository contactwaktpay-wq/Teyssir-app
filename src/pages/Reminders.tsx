import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { Bell, MessageCircle, Mail, Smartphone, Send } from 'lucide-react';
import Modal from '../components/Modal';

export default function Reminders() {
  const { t } = useTranslation();
  const { clients, reminders, addReminder } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ clientId: '', channel: 'WhatsApp' as 'WhatsApp' | 'SMS' | 'Email' });

  const channels = [
    { id: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500' },
    { id: 'SMS', icon: Smartphone, color: 'bg-blue-500' },
    { id: 'Email', icon: Mail, color: 'bg-purple-500' },
  ];

  const handleSend = () => {
    if (!form.clientId) return;
    addReminder(form);
    setForm({ clientId: '', channel: 'WhatsApp' });
    setIsModalOpen(false);
  };

  const templateFr = "Bonjour, nous vous rappelons que vous avez un solde dû de {balance} MRU. Merci de procéder au paiement.";
  const templateAr = "مرحباً، نذكركم بأن لديكم رصيد مستحق بقيمة {balance} أوقية. يرجى القيام بالدفع.";

  return (
    <div className="space-y-6 fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">{t('reminders.title')}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">{t('reminders.history')}</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {reminders.map(r => (
              <div key={r.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{r.clientName}</p>
                    <p className="text-xs text-slate-400">{r.date} • {r.channel}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">{r.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <h2 className="font-semibold text-slate-800 mb-3">{t('reminders.templates')}</h2>
            <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 mb-2">{templateFr}</div>
            <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 text-right" dir="rtl">{templateAr}</div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('reminders.send')}>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 mb-1 block">{t('payments.client')}</label>
            <select value={form.clientId} onChange={e => setForm({...form, clientId: e.target.value})} className="w-full px-3 py-2 bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">--</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name} ({c.balance} MRU)</option>)}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {channels.map(c => (
              <button 
                key={c.id} 
                onClick={() => setForm({...form, channel: c.id as 'WhatsApp' | 'SMS' | 'Email'})}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${form.channel === c.id ? 'border-primary-500 bg-primary-50' : 'border-slate-100'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${c.color}`}>
                  <c.icon className="w-4 h-4" />
                </div>
                <span className="text-xs">{c.id}</span>
              </button>
            ))}
          </div>
          <button onClick={handleSend} className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> {t('reminders.send')}
          </button>
        </div>
      </Modal>
    </div>
  );
}  
