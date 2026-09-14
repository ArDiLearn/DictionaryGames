import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';
import { trackUserLogin, trackUserSignup } from '../utils/analytics';
import {
  getCurrentUser,
  getCurrentUserLogin,
  signInUser,
  signUpUser,
  signOutUser,
} from '../services/supabase';
import { mergeWithCloud, triggerCloudSync } from '../services/storage';
import { X, Cloud, CheckCircle, AlertCircle, RefreshCw, LogOut, User as UserIcon } from 'lucide-react';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      checkUser();
      setMessage(null);
    }
  }, [isOpen]);

  const checkUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      sounds.playWrong();
      setMessage({ type: 'error', text: t.sync.emptyFieldsError });
      return;
    }

    if (password.length < 6) {
      sounds.playWrong();
      setMessage({ type: 'error', text: t.sync.shortPasswordError });
      return;
    }

    setLoading(true);
    setMessage(null);
    sounds.playClick();

    if (mode === 'login') {
      const { user, error } = await signInUser(username, password);
      setLoading(false);

      if (error) {
        sounds.playWrong();
        setMessage({ type: 'error', text: error });
      } else {
        sounds.playCorrect();
        setCurrentUser(user);
        trackUserLogin('username');
        setMessage({
          type: 'success',
          text: t.sync.loginSuccess,
        });
        await mergeWithCloud();
        triggerCloudSync();
        onSyncCompleted();
      }
    } else {
      const { user, error } = await signUpUser(username, password);
      setLoading(false);

      if (error) {
        sounds.playWrong();
        setMessage({ type: 'error', text: error });
      } else {
        sounds.playCorrect();
        setCurrentUser(user);
        trackUserSignup('username');
        setMessage({
          type: 'success',
          text: t.sync.signupSuccess,
        });
        triggerCloudSync();
        onSyncCompleted();
      }
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
      setMessage({ type: 'success', text: t.sync.syncSuccess });
      onSyncCompleted();
    } else {
      sounds.playWrong();
      setMessage({ type: 'error', text: t.sync.syncError });
    }
  };

  const userDisplayName = getCurrentUserLogin(currentUser);

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
        <div className="flex items-center gap-3 mb-5">
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

        {/* Already Logged In View */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 shadow-inner">
                <UserIcon className="w-7 h-7" />
              </div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                {t.sync.loggedInAs}
              </p>
              <p className="text-xl font-black text-indigo-600 font-comic">
                {userDisplayName}
              </p>
              <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>{t.sync.synced}</span>
              </p>
            </div>

            <button
              onClick={handleManualSync}
              disabled={loading}
              className="btn-3d w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
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
          /* Not Logged In: Login / Register Form */
          <div>
            {/* Mode Switch Pills */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-4 border border-slate-200">
              <button
                onClick={() => {
                  setMode('login');
                  setMessage(null);
                  sounds.playClick();
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-white text-indigo-700 shadow-sm scale-102'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.sync.accountLogin}
              </button>
              <button
                onClick={() => {
                  setMode('signup');
                  setMessage(null);
                  sounds.playClick();
                }}
                className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-indigo-700 shadow-sm scale-102'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.sync.accountCreate}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  {t.sync.loginLabel}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.sync.loginPlaceholder}
                  autoComplete="username"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none"
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
                  placeholder={t.sync.passwordPlaceholder}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-3d w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm sm:text-base shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : mode === 'login' ? (
                    t.sync.loginBtn
                  ) : (
                    t.sync.signupBtn
                  )}
                </button>
              </div>

              {/* Helper toggle text */}
              <div className="text-center pt-1">
                {mode === 'login' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setMessage(null);
                      sounds.playClick();
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {t.sync.needNewAccount} <span className="underline">{t.sync.accountCreate}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setMessage(null);
                      sounds.playClick();
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    {t.sync.alreadyHaveAccount} <span className="underline">{t.sync.accountLogin}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
