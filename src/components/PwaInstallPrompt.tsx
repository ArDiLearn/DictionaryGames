import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PwaInstallPromptProps {
  language: Language;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ language }) => {
  const t = translations[language];
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  if (!deferredPrompt || isDismissed) return null;

  const handleInstall = async () => {
    sounds.playClick();
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      sounds.playFanfare();
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-40 bg-white/95 backdrop-blur-md rounded-3xl border-4 border-indigo-300 shadow-2xl p-4 flex items-center justify-between gap-3 animate-pop">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
          <Download className="w-6 h-6 animate-bounce" />
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-800">
            WordyMind PWA
          </h4>
          <p className="text-xs font-semibold text-slate-500">
            {t.installApp}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleInstall}
          className="btn-3d px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-md"
        >
          {t.installApp}
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
