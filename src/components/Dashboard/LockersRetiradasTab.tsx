import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  QrCode, 
  Bluetooth, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  Camera,
  MapPin,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WithdrawalHistoryItem {
  id: string;
  lockerNumber: number;
  itemDescription: string;
  hubName: string;
  withdrawnAt: string;
  method: 'qr_code' | 'bluetooth' | 'pin';
  photoProofUrl: string;
  auditHash: string;
}

export const LockersRetiradasTab: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isBluetoothConnecting, setIsBluetoothConnecting] = useState<boolean>(false);
  const [qrCountdown, setQrCountdown] = useState<number>(54);

  // Dynamic QR countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.18); // A5
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // Audio fallback
    }
  };

  const handleBluetoothUnlock = () => {
    setIsBluetoothConnecting(true);
    setTimeout(() => {
      setIsBluetoothConnecting(false);
      setIsUnlocked(true);
      triggerChime();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // confetti fallback
      }
    }, 1100);
  };

  const withdrawalHistory: WithdrawalHistoryItem[] = [
    {
      id: 'w-101',
      lockerNumber: 14,
      itemDescription: 'Roteador 4G/5G Portátil + Cabo USB-C Reforçado (Mercado Livre)',
      hubName: 'Hub Nômade Florianópolis (Campeche)',
      withdrawnAt: 'Ontem às 18:42',
      method: 'bluetooth',
      photoProofUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&auto=format&fit=crop&q=80',
      auditHash: 'BLE-NH-FLN-8942-AUTH'
    },
    {
      id: 'w-100',
      lockerNumber: 8,
      itemDescription: 'Cartão de Débito/Crédito Banco Inter Mastercard Black',
      hubName: 'Hub Nômade Florianópolis (Campeche)',
      withdrawnAt: '18 Set 2026 às 15:10',
      method: 'qr_code',
      photoProofUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&auto=format&fit=crop&q=80',
      auditHash: 'QR-NH-FLN-7712-VERIFIED'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Active Locker Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase text-emerald-400">
                ARMÁRIO FÍSICO COM ENCOMENDA DISPONÍVEL
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">Locker Autônomo #14</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Hub Florianópolis - Rod. Francisco Magno Vieira, 1420 (Campeche)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              isUnlocked 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' 
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {isUnlocked ? 'PORTA DESTRAVADA' : 'TRANCA BLINDADA 24/7'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Dynamic QR Code with countdown */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-inner">
            <div className="relative">
              <svg className="w-44 h-44 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v20H40zM60 40h20v10H60zM40 70h10v20H40zM60 70h30v10H60zM80 80h10v20H80zM50 50h10v10H50z" />
              </svg>
            </div>
            <div className="mt-3 text-center">
              <span className="text-xs font-mono font-bold text-slate-900 block">
                PIN NUMÉRICO: 8392
              </span>
              <span className="text-[10px] text-slate-600 font-mono flex items-center justify-center gap-1 mt-0.5">
                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                Token dinâmico expira em {qrCountdown}s
              </span>
            </div>
          </div>

          {/* Right: Contactless Web-Bluetooth Action and Locker Status */}
          <div className="md:col-span-7 space-y-5">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-slate-300">
              <p className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Locker Key sem Contato (Web-Bluetooth)
              </p>
              <p className="text-slate-400 leading-relaxed">
                Se você está em frente ao armário do hub, não precisa nem digitar a senha no teclado: toque no botão abaixo para parear via Bluetooth seguro e liberar a tranca na hora.
              </p>
            </div>

            <div className="space-y-3">
              <button
                id="btn-bluetooth-unlock"
                onClick={handleBluetoothUnlock}
                disabled={isBluetoothConnecting || isUnlocked}
                className={`w-full py-3.5 px-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-xl transition-all ${
                  isUnlocked
                    ? 'bg-emerald-500 text-slate-950 cursor-default'
                    : isBluetoothConnecting
                    ? 'bg-slate-800 text-cyan-300 animate-pulse border border-cyan-500/40'
                    : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/25 hover:scale-[1.01]'
                }`}
              >
                {isBluetoothConnecting ? (
                  <>
                    <Bluetooth className="w-4 h-4 animate-spin text-cyan-400" />
                    <span>Conectando à tranca BLE do Locker #14...</span>
                  </>
                ) : isUnlocked ? (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Trava Aberta! Pode retirar o pacote.</span>
                  </>
                ) : (
                  <>
                    <Bluetooth className="w-4 h-4" />
                    <span>Abrir Locker #14 via Bluetooth</span>
                  </>
                )}
              </button>

              {isUnlocked && (
                <button
                  onClick={() => setIsUnlocked(false)}
                  className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Confirmar Retirada e Trancar Novamente
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Câmera de segurança integrada
              </span>
              <span>•</span>
              <span>Sensor de peso confirmado</span>
            </div>
          </div>

        </div>
      </div>

      {/* Historic Logs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Histórico de Retiradas com Auditoria</h3>
            <p className="text-xs text-slate-400">Registros de timestamp, método de autenticação e foto de confirmação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {withdrawalHistory.map((w) => (
            <div
              key={w.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shrink-0">
                <img 
                  src={w.photoProofUrl} 
                  alt="Foto Comprovante" 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Locker #{w.lockerNumber} • Retirado
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{w.withdrawnAt}</span>
                </div>

                <h4 className="text-xs font-bold text-white truncate">{w.itemDescription}</h4>
                <p className="text-[11px] text-slate-400">{w.hubName}</p>

                <div className="flex items-center gap-2 pt-1 text-[10px] font-mono text-slate-500">
                  <span>Método: {w.method === 'bluetooth' ? 'BLE sem contato' : 'QR Code'}</span>
                  <span>•</span>
                  <span>Hash: {w.auditHash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
