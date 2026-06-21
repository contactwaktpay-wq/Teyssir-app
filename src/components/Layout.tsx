import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Bell, BarChart2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AIChat from './AIChat';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: t('nav.dashboard') },
    { to: '/clients', icon: Users, label: t('nav.clients') },
    { to: '/payments', icon: CreditCard, label: t('nav.payments') },
    { to: '/reminders', icon: Bell, label: t('nav.reminders') },
    { to: '/reports', icon: BarChart2, label: t('nav.reports') },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
        
        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around py-2 z-30">
          {navItems.map(item => (
            <NavLink 
              key={item.to} 
              to={item.to} 
              end={item.to === '/'}
              className={({isActive}) => `flex flex-col items-center gap-1 p-2 rounded-lg ${isActive ? 'text-primary-600' : 'text-slate-400'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label.split(' ')[0]}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <AIChat />
    </div>
  );
}  
