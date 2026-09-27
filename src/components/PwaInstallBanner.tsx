import React, { useState } from 'react';
import { Smartphone, Bell, CheckCircle2, Download, Sparkles, X } from 'lucide-react';

interface PwaInstallBannerProps {
  onTriggerSimulatedPush: () => void;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({ onTriggerSimulatedPush }) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [pushEnabled, setPushEnabled] = useState<boolean>(true);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-y border-emerald-500/20 py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>App PWA NômadeHub</span>
              <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                Pronto para Instalar
              </span>
            </span>
            <p className="text-slate-400 text-[11px]">
              Instale na tela inicial do seu celular e receba push notifications instantâneas de lockers e cartas.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onTriggerSimulatedPush}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Bell className="w-3 h-3 text-cyan-400" />
            <span>Testar Push Notification</span>
          </button>

          {!isInstalled ? (
            <button
              onClick={() => setIsInstalled(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3 h-3" />
              <span>Adicionar à Tela Inicial</span>
            </button>
          ) : (
            <span className="text-emerald-400 font-bold flex items-center gap-1 font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> Instalado
            </span>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 rounded-lg text-slate-500 hover:text-white"
            title="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
