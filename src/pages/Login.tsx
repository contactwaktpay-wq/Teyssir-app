import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { Globe, LogIn } from 'lucide-react';

export default function Login() {
  const { t, i18n } = useTranslation();
  const login = useStore(s => s.login);
  const navigate = useNavigate();
  const [phone, setPhone] = useState('22100000');
  const [password, setPassword] = useState('1234');

  const toggleLang = () => {
    const newLang = i18n.language === 'fr' ? 'ar' : 'fr';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated Firebase Auth
    login(phone);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <div className="flex justify-end p-4">
        <button onClick={toggleLang} className="flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg">
          <Globe className="w-4 h-4" />
          {i18n.language === 'fr' ? 'العربية' : 'Français'}
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4 shadow-lg shadow-primary-600/30">T</div>
            <h1 className="text-3xl font-bold text-slate-800">{t('app.name')}</h1>
            <p className="text-slate-500 mt-1">{t('app.tagline')}</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">{t('login.phone')}</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">{t('login.password')}</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-transparent focus:border-primary-500 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-medium hover:bg-primary-700 flex items-center justify-center gap-2 transition-colors">
              <LogIn className="w-4 h-4" />
              {t('login.btn')}
            </button>
            <p className="text-xs text-center text-slate-400">{t('login.hint')}</p>
          </form>
        </div>
      </div>
    </div>
  );
}  
