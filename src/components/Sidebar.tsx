import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Bell, BarChart2, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation();
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/clients', icon: Users, label: t('nav.clients') },
    { to: '/payments', icon: CreditCard, label: t('nav.payments') },
    { to: '/reminders', icon: Bell, label: t('nav.reminders') },
    { to: '/reports', icon: BarChart2, label: t('nav.reports') },
    { to: '/settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-e border-slate-100 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-lg">T</div>
        <div>
          <h1 className="font-bold text-slate-800 leading-none">{t('app.name')}</h1>
          <span className="text-xs text-slate-400">{t('app.tagline')}</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => (
          <NavLink 
            key={item.to} 
            to={item.to} 
            end={item.to === '/'}
            className={({isActive}) => `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors ${isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}  
