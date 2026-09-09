import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import {
  getCurrentUser,
  signInUser,
  signUpUser,
  signOutUser,
  getStoredSupabaseConfig,
  saveStoredSupabaseConfig,
  getSupabase,
} from '../services/supabase';
import { mergeWithCloud, triggerCloudSync } from '../services/storage';
import { X, Cloud, Key, CheckCircle, AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface AuthModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  onSyncCompleted: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  language,
  isOpen,
  onClose,
  onSyncCompleted,
}) => {
  const t = translations[language];
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'auth' | 'config'>('auth');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Config tab state
  const [sbUrl, setSbUrl] = useState('');
  const [sbKey, setSbKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      checkUser();
      const cfg = getStoredSupabaseConfig();
      setSbUrl(cfg.url);
      setSbKey(cfg.key);
      setMessage(null);
    }
  }, [isOpen]);

  const checkUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  if (!isOpen) return null;

  const isConfigured = !!getSupabase();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setMessage(null);
    sounds.playClick();

    const { user, error } = await signInUser(email, password);
    setLoading(false);

    if (error) {
      sounds.playWrong();
      setMessage({ type: 'error', text: error });
    } else {
      sounds.playCorrect();
      setCurrentUser(user);
      setMessage({
        type: 'success',
        text: 'Успешный вход! Синхронизируем данные...',
      });
      await mergeWithCloud();
      triggerCloudSync();
      onSyncCompleted();
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setMessage(null);
    sounds.playClick();

    const { user, error } = await signUpUser(email, password);
    setLoading(false);

    if (error) {
      sounds.playWrong();
      setMessage({ type: 'error', text: error });
    } else {
      sounds.playCorrect();
      setCurrentUser(user);
      setMessage({
        type: 'success',
        text: 'Профиль создан! Синхронизируем прогресс...',
      });
      triggerCloudSync();
      onSyncCompleted();
    }
  };

  const handleLogout = async () => {
    sounds.playClick();
    await signOutUser();
    setCurrentUser(null);
    setMessage(null);
    onSyncCompleted();
  };

  const handleManualSync = async () => {
    setLoading(true);
    sounds.playClick();
    const success = await mergeWithCloud();
    triggerCloudSync();
    setLoading(false);
    if (success) {
      sounds.playCorrect();
      setMessage({ type: 'success', text: 'Данные успешно обновлены!' });
      onSyncCompleted();
    } else {
      sounds.playWrong();
      setMessage({ type: 'error', text: 'Ошибка синхронизации' });
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSupabaseConfig(sbUrl, sbKey);
    sounds.playCorrect();
    setMessage({
      type: 'success',
      text: 'Настройки сохранены! Попробуйте войти.',
    });
    setActiveTab('auth');
    checkUser();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-pop">
      <div className="bg-white rounded-3xl border-4 border-indigo-200 shadow-2xl max-w-md w-full p-6 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center text-indigo-600">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">
              {t.sync.title}
            </h2>
            <p className="text-xs font-semibold text-slate-400">
              {t.sync.description}
            </p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 border border-slate-200">
          <button
            onClick={() => {
              setActiveTab('auth');
              sounds.playClick();
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'auth'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {currentUser ? 'Мой профиль' : 'Вход в аккаунт'}
          </button>
          <button
            onClick={() => {
              setActiveTab('config');
              sounds.playClick();
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
              activeTab === 'config'
                ? 'bg-white text-indigo-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Настройки Supabase
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div
            className={`p-3 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* Tab Content: Auth / Profile */}
        {activeTab === 'auth' && (
          <div>
            {!isConfigured && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-xs font-semibold mb-4">
                💡 Supabase ещё не настроен. Вы можете использовать приложение локально (прогресс сохраняется в браузере), либо ввести URL и ключ во вкладке «Настройки Supabase».
              </div>
            )}

            {currentUser ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                    Вы вошли как
                  </p>
                  <p className="text-base font-black text-indigo-600">
                    {currentUser.email}
                  </p>
                  <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center justify-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {t.sync.synced}
                  </p>
                </div>

                <button
                  onClick={handleManualSync}
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span>{t.sync.syncNow}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs border border-slate-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.sync.logout}</span>
                </button>
              </div>
            ) : (
              <form className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {t.sync.emailLabel}
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ivan / ivan@mail.com"
                    disabled={!isConfigured}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none disabled:bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {t.sync.passwordLabel}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    disabled={!isConfigured}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none disabled:bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading || !isConfigured}
                    className="btn-3d py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md disabled:opacity-50"
                  >
                    {loading ? '...' : t.sync.loginBtn}
                  </button>
                  <button
                    type="button"
                    onClick={handleSignUp}
                    disabled={loading || !isConfigured}
                    className="btn-3d py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-700 font-black text-sm shadow-sm disabled:opacity-50"
                  >
                    {loading ? '...' : t.sync.signupBtn}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab Content: Config */}
        {activeTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="space-y-3">
            <div className="p-2.5 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-indigo-900 text-xs font-medium">
              🔑 Чтобы включить облачную синхронизацию между ПК и телефоном, укажите URL проекта и Anon Key вашего проекта Supabase.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {t.sync.supabaseUrl}
              </label>
              <input
                type="text"
                value={sbUrl}
                onChange={(e) => setSbUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-xs font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                {t.sync.supabaseAnonKey}
              </label>
              <input
                type="password"
                value={sbKey}
                onChange={(e) => setSbKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 text-xs font-mono focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md mt-3 flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" />
              <span>{t.sync.saveConfig}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
