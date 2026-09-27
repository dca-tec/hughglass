import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  FileText, 
  Unlock, 
  Lock, 
  CheckCircle, 
  Smartphone, 
  Bell, 
  RotateCcw,
  Zap,
  Wifi,
  Eye
} from 'lucide-react';
import { UserProfileType } from '../types';

interface HeroSectionProps {
  selectedProfile: UserProfileType;
  onOpenSimulator: () => void;
  onGoToDashboard: () => void;
  onOpenGovBr: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedProfile,
  onOpenSimulator,
  onGoToDashboard,
  onOpenGovBr
}) => {
  // Interactive locker state
  const [isLockerOpen, setIsLockerOpen] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<'notification' | 'ocr_scan' | 'locker_qr'>('notification');
  const [qrProgress, setQrProgress] = useState<number>(58);

  // Countdown timer for QR code dynamic security simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setQrProgress((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web Audio click/unlock feedback sound synthesis
  const triggerUnlockSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // AudioContext unavailable or restricted in environment
    }
  };

  const handleToggleLocker = () => {
    triggerUnlockSound();
    setIsLockerOpen(!isLockerOpen);
  };

  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      
      {/* Background ambient lighting effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-600/15 via-teal-500/15 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Rede Nacional de Lockers 24/7 & Endereço Fiscal</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300 font-normal">Sem Conta de Luz (Lei 7.115/83)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Seu endereço fixo, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                onde quer que você esteja.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Privacidade, gestão de encomendas em lockers 24/7, digitalização de cartas e endereço fiscal para abrir sua empresa sem precisar de uma casa fixa.
            </p>

            {/* Bullet Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Lockers autônomos acessíveis 24h</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>OCR instantâneo com busca de texto</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Endereço fiscal para MEI / CNPJ</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Validação rápida via Gov.br</span>
              </div>
            </div>

            {/* CTAs Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#planos"
                id="cta-garantir-endereco"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Garantir Meu Endereço Virtual</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                id="cta-simular-plano"
                onClick={onOpenSimulator}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:border-emerald-500/50 transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Simular Meu Fluxo Postal</span>
              </button>

              <button
                id="cta-acessar-dashboard-demo"
                onClick={onGoToDashboard}
                className="px-4 py-3.5 rounded-2xl bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white font-medium text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Ver App Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Trust and compliance footnote */}
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">Lei Federal 7.115/83</span>
              </div>
              <span>•</span>
              <span>Criptografia ponta a ponta</span>
              <span>•</span>
              <span>Hubs em 6 capitais e polos turísticos</span>
            </div>

          </div>

          {/* Right Column: Interactive 3D Mockup Smartphone + Smart Locker Device */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Background Glow under device */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-cyan-500/10 rounded-3xl blur-2xl transform scale-95" />

            <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl">
              
              {/* Device Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono font-semibold text-slate-200">Terminal Locker #14</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 border border-emerald-500/20 font-mono">
                    HUB FLORIANÓPOLIS
                  </span>
                </div>
              </div>

              {/* Step Selector Tabs within mockup */}
              <div className="grid grid-cols-3 gap-1.5 mb-4 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setActiveStep('notification')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeStep === 'notification'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Bell className="w-3 h-3" />
                  <span>1. Notificação</span>
                </button>
                <button
                  onClick={() => setActiveStep('ocr_scan')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeStep === 'ocr_scan'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3 h-3" />
                  <span>2. OCR Scan</span>
                </button>
                <button
                  onClick={() => setActiveStep('locker_qr')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all flex items-center justify-center gap-1 ${
                    activeStep === 'locker_qr'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <QrCode className="w-3 h-3" />
                  <span>3. Retirada</span>
                </button>
              </div>

              {/* Smartphone Frame Simulation */}
              <div className="relative rounded-2xl bg-slate-950 border-2 border-slate-800 p-4 overflow-hidden shadow-inner">
                
                {/* Dynamic Screen Content Based on Active Step */}
                {activeStep === 'notification' && (
                  <div className="space-y-3">
                    {/* Simulated WhatsApp notification bubble */}
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs space-y-2">
                      <div className="flex items-center justify-between text-emerald-400 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          NômadeHub Bot (WhatsApp Oficial)
                        </span>
                        <span className="text-[10px] text-slate-400">Agora</span>
                      </div>
                      <p className="text-slate-200">
                        📬 <strong>Correspondência Urgente Recebida!</strong> Um envelope oficial da <em>Receita Federal</em> acabou de ser protocolado em seu Box NH-042.
                      </p>
                      
                      {/* Photo preview of envelope */}
                      <div className="relative rounded-lg overflow-hidden border border-slate-700/60 group cursor-pointer" onClick={() => setActiveStep('ocr_scan')}>
                        <img 
                          src="https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80" 
                          alt="Foto do Envelope Recebido"
                          className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-2 justify-between">
                          <span className="text-[10px] text-emerald-300 font-mono">Scan HD da Etiqueta</span>
                          <span className="text-[10px] bg-slate-900/80 px-2 py-0.5 rounded text-white flex items-center gap-1">
                            <Eye className="w-3 h-3 text-cyan-400" /> Ver OCR
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => setActiveStep('ocr_scan')}
                        className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Abrir Carta PDF</span>
                      </button>
                      <button 
                        onClick={() => setActiveStep('locker_qr')}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Guardar no Locker</span>
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 'ocr_scan' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-cyan-400" />
                        PDF Digitalizado com OCR
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                        CONFIDENCIAL
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1.5 leading-relaxed max-h-36 overflow-y-auto">
                      <p className="text-emerald-400 font-bold">MINISTÉRIO DA FAZENDA - RECEITA FEDERAL</p>
                      <p className="text-slate-200">CERTIDÃO POSITIVA COM EFEITOS DE NEGATIVA</p>
                      <p className="text-slate-400">CNPJ: 49.812.304/0001-92 - MEI NÔMADE DIGITAL</p>
                      <p className="text-slate-300 bg-emerald-500/10 p-1 rounded border border-emerald-500/20">
                        "Certificamos que não constam pendências relativas a tributos federais ou certidões de dívida."
                      </p>
                      <p className="text-[10px] text-slate-500">Hash de Validação: RFB-8831-9920-AA71</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button 
                        onClick={() => setActiveStep('locker_qr')}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <span>Gerar Chave de Locker para o Pacote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {activeStep === 'locker_qr' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                        Chave Dinâmica sem Contato
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        Expira em {qrProgress}s
                      </span>
                    </div>

                    {/* QR Code Container */}
                    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl">
                      <div className="relative">
                        {/* Crisp SVG QR code representation */}
                        <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 10h10v20H40zM60 40h20v10H60zM40 70h10v20H40zM60 70h30v10H60zM80 80h10v20H80zM50 50h10v10H50z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-slate-800 font-bold mt-1">
                        PIN: 8392 • ARMÁRIO #14
                      </span>
                    </div>

                    <p className="text-[11px] text-center text-slate-400">
                      Aproxime este QR Code do leitor óptico do Hub ou clique abaixo para destravar:
                    </p>
                  </div>
                )}

              </div>

              {/* Physical Smart Locker Simulation Module */}
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className={`p-3.5 rounded-2xl border transition-all ${
                  isLockerOpen 
                    ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-950 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isLockerOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
                      <span className="text-xs font-bold text-white">
                        Armário Físico: Compartimento #14
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${
                      isLockerOpen 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {isLockerOpen ? 'TRAVA LIBERADA' : 'TRANCADO (24/7)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-400">
                      {isLockerOpen ? '✨ Porta aberta! Retire seus pacotes.' : 'Sensor óptico ativo aguardando aproximação.'}
                    </span>

                    <button
                      id="btn-simular-abrir-locker"
                      onClick={handleToggleLocker}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                        isLockerOpen
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/25'
                      }`}
                    >
                      {isLockerOpen ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Fechar Trava</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Simular Abertura</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
