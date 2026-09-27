import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  QrCode, 
  CreditCard, 
  Lock, 
  Sparkles, 
  Check,
  Building2,
  Home,
  Zap,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId: 'residential' | 'commercial' | 'combo';
  billingCycle: 'monthly' | 'yearly';
  onGoToDashboard: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId,
  billingCycle,
  onGoToDashboard
}) => {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [fullName, setFullName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [preferredCity, setPreferredCity] = useState('Florianópolis');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const getPlanDetails = () => {
    switch (selectedPlanId) {
      case 'commercial':
        return {
          title: 'Endereço Comercial & Domicílio Fiscal',
          price: billingCycle === 'monthly' ? 99 : 89,
          badge: 'PESSOA JURÍDICA (CNPJ)',
          icon: Building2,
          color: '#38bdf8'
        };
      case 'combo':
        return {
          title: 'Combo Nômade Pro (Residencial + Comercial)',
          price: billingCycle === 'monthly' ? 139 : 119,
          badge: 'COMBO COMPLETO',
          icon: Zap,
          color: '#e5985a'
        };
      default:
        return {
          title: 'Endereço Residencial Fixo',
          price: billingCycle === 'monthly' ? 59 : 49,
          badge: 'PESSOA FÍSICA (CPF)',
          icon: Home,
          color: '#d18242'
        };
    }
  };

  const plan = getPlanDetails();
  const PlanIcon = plan.icon;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !documentId.trim() || !whatsapp.trim() || !email.trim()) {
      return;
    }
    setStep('payment');
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.4 } });
      } catch {
        // optional
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#12151e] border-2 border-[#3d3428] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* MODAL TOP BAR */}
        <div className="flex items-center justify-between pb-4 border-b border-[#3d3428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center border border-[#c27839]/30">
              <PlanIcon className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#e5985a] uppercase tracking-wider block">
                {plan.badge}
              </span>
              <h3 className="font-display text-lg font-bold text-[#f5efe6]">
                {step === 'success' ? 'Endereço Ativado com Sucesso!' : `Contratação • ${plan.title}`}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a1f30] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: FORM */}
        {step === 'form' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            
            {/* PLAN SUMMARY BAR */}
            <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#9e8e78] block">Plano Selecionado</span>
                <span className="text-sm font-bold text-[#f5efe6]">{plan.title}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#9e8e78] block">Valor</span>
                <span className="text-base font-black text-[#e5985a]">R$ {plan.price}/mês</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                  Nome Completo / Razão Social *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Silva ou Minha Empresa LTDA"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-sm focus:outline-none focus:border-[#c27839]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    CPF ou CNPJ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-sm focus:outline-none focus:border-[#c27839] font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                    WhatsApp (para avisos das cartas) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-sm focus:outline-none focus:border-[#c27839] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                  E-mail para Acesso ao Painel *
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-sm focus:outline-none focus:border-[#c27839]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#d4c5b0] block mb-1">
                  Hub Principal para o seu Endereço *
                </label>
                <select
                  value={preferredCity}
                  onChange={(e) => setPreferredCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[#f5efe6] text-sm focus:outline-none focus:border-[#c27839]"
                >
                  <option value="Florianópolis">Florianópolis / SC (Campeche - Hub Matriz)</option>
                  <option value="São Paulo">São Paulo / SP (Vila Madalena - Hub SP)</option>
                  <option value="Curitiba">Curitiba / PR (Batel - Hub Sul)</option>
                  <option value="Belo Horizonte">Belo Horizonte / MG (Savassi)</option>
                  <option value="Ubatuba">Ubatuba / SP (Estação Litoral & Vanlife)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#3d3428]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold transition-all border border-[#3d3428] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-sm shadow-lg shadow-[#c27839]/20 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Avançar para Pagamento</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: PAYMENT */}
        {step === 'payment' && (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-xs text-[#9e8e78] pb-2 border-b border-[#3d3428]">
              <span>Titular: <strong className="text-[#f5efe6]">{fullName}</strong></span>
              <span>•</span>
              <span>Hub: <strong className="text-[#f5efe6]">{preferredCity}</strong></span>
            </div>

            {/* PAYMENT METHOD SELECTOR */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-[#c27839]/15 border-[#c27839] ring-2 ring-[#c27839]/30'
                    : 'bg-[#0c0d12] border-[#3d3428] text-[#9e8e78]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#f5efe6] flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-[#e5985a]" />
                    PIX Instantâneo
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#c27839]/20 text-[#e5985a] font-bold">
                    Imediato
                  </span>
                </div>
                <span className="text-[11px] text-[#d4c5b0] block">Ativação em segundos via QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-[#0284c7]/15 border-[#0284c7] ring-2 ring-[#0284c7]/30'
                    : 'bg-[#0c0d12] border-[#3d3428] text-[#9e8e78]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#f5efe6] flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#38bdf8]" />
                    Cartão de Crédito
                  </span>
                </div>
                <span className="text-[11px] text-[#d4c5b0] block">Cobrança recorrente protegida</span>
              </button>
            </div>

            {/* PIX DISPLAY */}
            {paymentMethod === 'pix' ? (
              <div className="p-5 rounded-2xl bg-[#0c0d12] border border-[#3d3428] text-center space-y-3">
                <div className="w-36 h-36 mx-auto bg-white p-2 rounded-2xl shadow-md flex items-center justify-center">
                  <div className="w-full h-full border-4 border-slate-950 flex flex-col justify-between p-2">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-slate-950" />
                      <div className="w-6 h-6 bg-slate-950" />
                    </div>
                    <div className="text-[8px] font-mono text-slate-950 font-black">
                      PIX NÔMADEHUB
                    </div>
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-slate-950" />
                      <div className="w-4 h-4 bg-[#c27839] rounded" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#f5efe6] block">
                    Valor a Pagar: R$ {plan.price},00
                  </span>
                  <p className="text-[11px] text-[#9e8e78]">
                    Abra o app do seu banco e escaneie o código acima ou clique em Confirmar.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428]">
                <input
                  type="text"
                  placeholder="Número do Cartão (Simulação)"
                  defaultValue="•••• •••• •••• 4242"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-[#3d3428] text-[#f5efe6] text-xs font-mono"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    defaultValue="12/28"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-[#3d3428] text-[#f5efe6] text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    defaultValue="888"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141724] border border-[#3d3428] text-[#f5efe6] text-xs font-mono"
                  />
                </div>
              </div>
            )}

            <div className="pt-3 flex items-center justify-between border-t border-[#3d3428]">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="text-xs text-[#9e8e78] hover:text-[#f5efe6] cursor-pointer"
              >
                Voltar
              </button>

              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-sm shadow-lg shadow-[#c27839]/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
              >
                {isProcessing ? 'Validando Pagamento...' : 'Concluir & Ativar Endereço'}
                <Check className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === 'success' && (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center mx-auto ring-8 ring-[#c27839]/10">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-black text-[#f5efe6]">
                Parabéns! Seu Endereço está Ativo!
              </h3>
              <p className="text-sm text-[#d4c5b0] max-w-md mx-auto">
                Seu Box Virtual oficial foi gerado no Hub <strong>{preferredCity}</strong>. O comprovante sob a Lei 7.115/83 já está disponível para download.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] max-w-sm mx-auto text-left space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[#9e8e78]">Titular:</span>
                <span className="text-[#f5efe6] font-bold">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9e8e78]">Seu Box Virtual:</span>
                <span className="text-[#e5985a] font-bold">Box NH-{Math.floor(100 + Math.random() * 900)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9e8e78]">Notificações:</span>
                <span className="text-[#38bdf8]">{whatsapp}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onGoToDashboard();
                }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-sm shadow-xl shadow-[#c27839]/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Acessar Meu Painel Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
