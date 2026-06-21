import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';

export default function Topbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const logout = useStore(s => s.logout);
  const navigate = useNavigate();

  const toggleLang = () => {
    const newLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex items-center justify-between px-4 sm:px-6 h-16">
        <div className="lg:hidden flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">T</div>
        </div>
        
        <div className="flex items-center gap-4 ms-auto">
          <button onClick={toggleLang} className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg">
            <Globe className="w-4 h-4" />
            {i18n.language === 'fr' ? 'العربية' : 'Français'}
          </button>
          
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
              U
            </button>
            {menuOpen && (
              <div className="absolute end-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 fade-in">
                <Link to="/settings" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">{t('settings.profile')}</Link>
                <button onClick={handleLogout} className="block w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-red-50">{t('settings.logout')}</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}  
