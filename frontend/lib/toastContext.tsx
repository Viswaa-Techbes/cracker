'use client';

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const lastToastTimeRef = useRef<Map<string, number>>(new Map());

  const removeToast = useCallback((id: string) => {
    // Clear timer if active
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const trimmedMsg = message.trim();
    const now = Date.now();
    const lastTime = lastToastTimeRef.current.get(trimmedMsg) || 0;

    // Deduplication rule: If the identical message was triggered within the last 1200ms, ignore duplicate
    if (now - lastTime < 1200) {
      return;
    }
    lastToastTimeRef.current.set(trimmedMsg, now);

    setToasts((prev) => {
      // If the message is already active in visible toasts, do not duplicate it
      const existing = prev.find((t) => t.message === trimmedMsg);
      if (existing) {
        // Reset timer for existing toast
        const oldTimer = timersRef.current.get(existing.id);
        if (oldTimer) clearTimeout(oldTimer);
        const newTimer = setTimeout(() => {
          removeToast(existing.id);
        }, 2800);
        timersRef.current.set(existing.id, newTimer);
        return prev;
      }

      const id = `${now}-${Math.random().toString(36).slice(2, 7)}`;

      // Schedule auto-dismiss in 2.8s
      const timer = setTimeout(() => {
        removeToast(id);
      }, 2800);
      timersRef.current.set(id, timer);

      // Newest toast at the top, max 3 visible toasts
      const updated = [{ id, message: trimmedMsg, type }, ...prev].slice(0, 3);
      return updated;
    });
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container:
          Desktop: Top-right (top: 88px, right: 20px, max-w: 380px)
          Mobile: Top (top: 76px, left: 10px, right: 10px, width: auto)
          Below header navigation, z-index 45 so it doesn't block critical modals
      */}
      <aside
        aria-label="Notifications"
        aria-live="polite"
        className="fixed top-[76px] sm:top-[88px] right-2.5 sm:right-5 left-2.5 sm:left-auto sm:w-[380px] z-[45] flex flex-col gap-2.5 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xl shadow-slate-900/10 flex items-center justify-between gap-3 transition-all duration-200 animate-slide-in"
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              {toast.type === 'success' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
              )}
              <span className="text-xs sm:text-sm font-bold text-slate-800 leading-snug break-words">
                {toast.message}
              </span>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg shrink-0 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </aside>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
