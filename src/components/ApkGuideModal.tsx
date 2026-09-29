import React from 'react';
import { Smartphone, Download, CheckCircle2, ShieldCheck, Globe, HelpCircle, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface ApkGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Android APK & Mobile Installation Center
              </h2>
              <p className="text-xs text-slate-400">
                Install PolitiBot as a native standalone application on your mobile device
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Instant 1-Click Install Button */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-950 border border-emerald-500/40 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50">
              Direct WebAPK Engine Active
            </span>
            <h3 className="text-base font-bold text-white mt-1">
              {isInstalled ? 'PolitiBot is Installed on this device!' : 'Install PolitiBot as Android WebAPK'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Runs in full-screen standalone mode with offline curriculum caching.
            </p>
          </div>

          {!isInstalled && (
            <button
              onClick={() => {
                if (isInstallable) {
                  install();
                } else {
                  alert("To install on your Android device: open Chrome menu (⋮) and tap 'Install app' or 'Add to Home screen'.");
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-700/30 flex items-center gap-2 transition shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isInstallable ? 'Install APK Now' : 'Install on Android'}</span>
            </button>
          )}

          {isInstalled && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-600/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Installed Successfully</span>
            </div>
          )}
        </div>

        {/* Two Installation Pathways */}
        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-sm font-bold text-cyan-300 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700/60 flex items-center justify-center text-xs">
                1
              </span>
              Method 1: Direct Android WebAPK (Recommended)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Modern Android devices automatically compile Progressive Web Apps into signed native <strong>WebAPKs</strong> directly via the Google Play service engine:
            </p>
            <ol className="text-xs text-slate-400 space-y-1 pl-4 list-decimal">
              <li>Open this PolitiBot URL in <strong>Google Chrome</strong> or <strong>Edge</strong> on your Android phone.</li>
              <li>Tap the three vertical dots <strong>(⋮)</strong> in the top-right corner.</li>
              <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
              <li>Android will package the verified PolitiBot icon into your app drawer with native full-screen launching!</li>
            </ol>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-sm font-bold text-amber-300 mb-1.5 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-950 text-amber-400 border border-amber-700/60 flex items-center justify-center text-xs">
                2
              </span>
              Method 2: Standalone .APK File Generation (via PWABuilder)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              If you require a standalone <code className="text-amber-300">.apk</code> binary file to distribute via WhatsApp, pen drive, or sideloading:
            </p>
            <ol className="text-xs text-slate-400 space-y-1 pl-4 list-decimal">
              <li>Copy this app's URL.</li>
              <li>Visit <strong>PWABuilder.com</strong> (by Microsoft) in any browser.</li>
              <li>Paste the URL and click <strong>"Build APK"</strong>.</li>
              <li>Download the signed Android package <code className="text-emerald-400">politibot.apk</code> directly to your device!</li>
            </ol>
          </div>

          {isIOS && (
            <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-700/40">
              <h4 className="text-sm font-bold text-indigo-300 mb-1">Apple iOS Installation (iPhone / iPad)</h4>
              <p className="text-xs text-slate-300">
                Tap the <strong>Share</strong> button in Safari, scroll down, and tap <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
