import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { Wallet, TrendingDown, AlertCircle, Calendar, Bell, UserPlus, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { t } = useTranslation();
  const { clients, payments } = useStore();
  const navigate = useNavigate();

  const totalToCollect = clients.reduce((s, c) => s + c.balance, 0);
  const totalReceived = payments.reduce((s, p) => s + p.amount, 0);
  const totalLate = clients.filter(c => c.status === 'late').reduce((s, c) => s + c.balance, 0);
  const upcoming = 3; // Simulé

  const kpis = [
    { title: t('dash.toCollect'), value: `${totalToCollect.toLocaleString()} MRU`, icon: Wallet, color: 'text-blue-600 bg-blue-50' },
    { title: t('dash.received'), value: `${totalReceived.toLocaleString()} MRU`, icon: TrendingDown, color: 'text-green-600 bg-green-50' },
    { title: t('dash.late'), value: `${totalLate.toLocaleString()} MRU`, icon: AlertCircle, color: 'text-red-600 bg-red-50' },
    { title: t('dash.upcoming'), value: upcoming, icon: Calendar, color: 'text-purple-600 bg-purple-50' },
  ];

  const actions = [
    { label: t('dash.remindNow'), icon: Bell, path: '/reminders', color: 'bg-orange-500' },
    { label: t('dash.addClient'), icon: UserPlus, path: '/clients', color: 'bg-primary-600' },
    { label: t('dash.addPayment'), icon: CreditCard, path: '/payments', color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{t('nav.dashboard')}</h1>
        <p className="text-slate-500">Bienvenue sur votre espace de gestion</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.title} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${kpi.color}`}>
              <kpi.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
            <p className="text-sm text-slate-500 mt-1">{kpi.title}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-3">{t('dash.quickActions')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {actions.map(action => (
            <button 
              key={action.label} 
              onClick={() => navigate(action.path)}
              className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-start"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${action.color}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Activité récente</h2>
        <div className="space-y-3">
          {payments.slice(0,3).map(p => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold">
                  {p.clientName.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-slate-800 text-sm">{p.clientName}</p>
                  <p className="text-xs text-slate-400">{p.date} • {p.method}</p>
                </div>
              </div>
              <span className="font-semibold text-green-600">+{p.amount.toLocaleString()} MRU</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  
