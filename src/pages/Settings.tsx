import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Globe, User, LogOut } from 'lucide-react';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const { auth, logout } = useStore();
  const navigate = useNavigate();

  const toggleLang = () => {
    const newLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-6 fade-in max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800">{t('settings.title')}</h1>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-2xl font-bold">
            U
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t('settings.profile')}</h2>
            <p className="text-slate-500 text-sm">{auth.phone}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-slate-400" />
            <div>
              <p className="font-medium text-slate-800">{t('settings.language')}</p>
              <p className="text-sm text-slate-500">{i18n.language === 'fr' ? 'Français' : 'العربية'}</p>
            </div>
          </div>
          <button onClick={toggleLang} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200">
            Changer
          </button>
        </div>
      </div>

      <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100">
        <LogOut className="w-5 h-5" />
        {t('settings.logout')}
      </button>
    </div>
  );
}  
