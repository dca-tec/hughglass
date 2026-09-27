import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Lock, 
  Download,
  Building,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GovBrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessVerified: () => void;
}

export const GovBrModal: React.FC<GovBrModalProps> = ({
  isOpen,
  onClose,
  onSuccessVerified
}) => {
  const [step, setStep] = useState<'login' | 'authorizing' | 'success'>('login');
  const [cpf, setCpf] = useState<string>('084.721.904-88');
  const [fullName, setFullName] = useState<string>('Lucas Mendes Ferreira');

  if (!isOpen) return null;

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('authorizing');

    setTimeout(() => {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti optional
      }
      setStep('success');
      onSuccessVerified();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Official Gov.br Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-green-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md">
            G
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-white">Identidade Gov.br</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono">
                CONTA OURO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">KYC Simplificado • Lei Federal 7.115/1983</p>
          </div>
        </div>

        {/* Step 1: Simulated Gov.br Login */}
        {step === 'login' && (
          <form onSubmit={handleAuthorize} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-blue-300">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                Sem necessidade de anexar conta de luz!
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Ao autenticar com sua conta Gov.br, o NômadeHub emite e assina sua <strong>Declaração Oficial de Residência</strong> com presunção legal de veracidade perante bancos, órgãos públicos e empresas.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome Completo do Titular
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                CPF (Cadastro de Pessoas Físicas)
              </label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p>• Dados solicitados: Nome, CPF, Selo de Confiabilidade Ouro</p>
              <p>• Destino: Registro no Hub Nômade Florianópolis (Box NH-042)</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Autorizar com Conta Gov.br</span>
            </button>
          </form>
        )}

        {/* Step 2: Authorizing animation */}
        {step === 'authorizing' && (
          <div className="py-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Consultando Base Nacional Gov.br</h4>
              <p className="text-xs text-slate-400">Validando biometria cadastral e emitindo hash de autenticidade...</p>
            </div>
          </div>
        )}

        {/* Step 3: Success and Issuance */}
        {step === 'success' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-base">Identidade e Endereço Homologados!</h4>
              <p className="text-xs text-slate-300">
                Sua declaração oficial conforme a <strong>Lei 7.115/83</strong> foi emitida com sucesso. Seu endereço virtual já está ativo no Hub Florianópolis.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
              <p><span className="text-slate-500">Titular:</span> {fullName}</p>
              <p><span className="text-slate-500">CPF:</span> {cpf}</p>
              <p><span className="text-slate-500">Box Atribuído:</span> NH-042 (Campeche)</p>
              <p><span className="text-slate-500">Hash SHA-256:</span> e3b0c44298fc1c149afbf4c8...</p>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Acessar Meu Painel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
