import { useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/useStore';

export default function AIChat() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const { clients, payments } = useStore();

  const quickQuestions = [t('ai.q1'), t('ai.q2'), t('ai.q3'), t('ai.q4')];

  const processQuery = (query: string) => {
    const q = query.toLowerCase();
    
    if (q.includes(t('ai.q1').toLowerCase()) || q.includes('doit')) {
      const sorted = [...clients].sort((a,b) => b.balance - a.balance);
      return `${t('ai.q1')} -> ${sorted[0].name} avec ${sorted[0].balance.toLocaleString()} MRU.`;
    }
    if (q.includes(t('ai.q2').toLowerCase()) || q.includes('retard')) {
      const late = clients.filter(c => c.status === 'late');
      return `${late.length} ${t('ai.q2')} -> ${late.map(c => c.name).join(', ')}.`;
    }
    if (q.includes(t('ai.q3').toLowerCase()) || q.includes('risque')) {
      const risky = clients.filter(c => c.risk === 'high');
      return `Clients à haut risque: ${risky.length} -> ${risky.map(c => c.name).join(', ')}.`;
    }
    if (q.includes(t('ai.q4').toLowerCase()) || q.includes('mois')) {
      const total = clients.reduce((sum, c) => sum + c.balance, 0);
      return `Vous pouvez récupérer approximativement ${total.toLocaleString()} MRU ce mois-ci.`;
    }
    return "Je suis l'assistant Teyssir. Analysez vos données avec les questions suggérées.";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user' as const, text };
    const aiResponse = processQuery(text);
    setMessages([...messages, userMsg, { role: 'ai', text: aiResponse }]);
    setInput('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 lg:bottom-8 end-4 z-40 bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-transform hover:scale-105 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-end sm:items-center justify-center sm:p-4">
          <div className="bg-white w-full sm:max-w-md h-[80vh] sm:h-[600px] sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col fade-in">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-primary-600 text-white sm:rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold">{t('ai.title')}</h3>
              </div>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-500 text-center">{t('ai.title')}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickQuestions.map(q => (
                      <button key={q} onClick={() => handleSend(q)} className="text-start text-xs bg-white border border-slate-200 p-2 rounded-lg hover:border-primary-300">
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                placeholder={t('ai.placeholder')}
                className="flex-1 px-4 py-2 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button onClick={() => handleSend(input)} className="bg-primary-600 text-white p-2 rounded-xl hover:bg-primary-700">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}  
