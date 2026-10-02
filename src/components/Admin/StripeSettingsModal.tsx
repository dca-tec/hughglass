import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  CreditCard, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { STRIPE_PLANS } from '../../lib/stripe';

interface StripeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StripeSettingsModal: React.FC<StripeSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Allow storing custom Stripe Payment Links locally or in cloud
  const [residentialLink, setResidentialLink] = useState(() => {
    return localStorage.getItem('nomadehub_stripe_link_res') || '';
  });
  const [commercialLink, setCommercialLink] = useState(() => {
    return localStorage.getItem('nomadehub_stripe_link_comm') || '';
  });
  const [comboLink, setComboLink] = useState(() => {
    return localStorage.getItem('nomadehub_stripe_link_combo') || '';
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveLinks = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('nomadehub_stripe_link_res', residentialLink.trim());
    localStorage.setItem('nomadehub_stripe_link_comm', commercialLink.trim());
    localStorage.setItem('nomadehub_stripe_link_combo', comboLink.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/92 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#12151e] border-2 border-[#3d3428] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-[#3d3428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#635bff]/20 text-[#a594fd] flex items-center justify-center border border-[#635bff]/40">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#38bdf8] uppercase tracking-wider block">
                INTEGRAÇÃO DE PAGAMENTOS
              </span>
              <h3 className="font-display text-lg font-bold text-[#f5efe6]">
                Como Configurar os Produtos no Stripe
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

        {/* STEP-BY-STEP EXPLANATION */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] space-y-3">
            <h4 className="text-sm font-bold text-[#f5efe6] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#e5985a]" />
              <span>Passo a Passo Rápido (Leva ~3 minutos no Stripe)</span>
            </h4>
            <ol className="text-xs text-[#d4c5b0] space-y-2 list-decimal list-inside leading-relaxed">
              <li>
                Acesse seu painel no <strong>Stripe</strong> em{' '}
                <a 
                  href="https://dashboard.stripe.com/products" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[#38bdf8] hover:underline inline-flex items-center gap-0.5"
                >
                  dashboard.stripe.com/products <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>Clique no botão roxo <strong>"+ Adicionar produto"</strong> (+ Add product).</li>
              <li>Cadastre os 3 produtos abaixo com cobrança recorrente (Recurring - Monthly):</li>
            </ol>
          </div>

          {/* 3 PRODUCTS TO COPY-PASTE */}
          <div className="space-y-3">
            
            {/* PRODUCT 1 */}
            <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d18242]" />
                  <strong className="text-xs text-[#f5efe6]">
                    1. Endereço Residencial Fixo (CPF / Visto Nômade)
                  </strong>
                </div>
                <div className="text-[11px] text-[#9e8e78]">
                  Nome em inglês: <span className="text-[#d4c5b0]">Residential Proof of Address (Brazil)</span>
                </div>
                <div className="text-xs font-mono text-[#e5985a]">
                  R$ 59,00 BRL/mês • $12,00 USD/mês
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('Residential Proof of Address (Brazil) - Hugh Glass', 'prod1')}
                className="px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-xs font-semibold text-[#d4c5b0] border border-[#3d3428] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedId === 'prod1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'prod1' ? 'Copiado!' : 'Copiar Nome'}</span>
              </button>
            </div>

            {/* PRODUCT 2 */}
            <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                  <strong className="text-xs text-[#f5efe6]">
                    2. Endereço Comercial & Domicílio Fiscal (CNPJ / Foreign Founder)
                  </strong>
                </div>
                <div className="text-[11px] text-[#9e8e78]">
                  Nome em inglês: <span className="text-[#d4c5b0]">Registered Commercial & Tax Domicile (Brazil CNPJ)</span>
                </div>
                <div className="text-xs font-mono text-[#38bdf8]">
                  R$ 99,00 BRL/mês • $20,00 USD/mês
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('Registered Commercial & Tax Domicile (Brazil CNPJ) - Hugh Glass', 'prod2')}
                className="px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-xs font-semibold text-[#d4c5b0] border border-[#3d3428] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedId === 'prod2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'prod2' ? 'Copiado!' : 'Copiar Nome'}</span>
              </button>
            </div>

            {/* PRODUCT 3 */}
            <div className="p-4 rounded-2xl bg-[#0c0d12] border border-[#3d3428] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e5985a]" />
                  <strong className="text-xs text-[#f5efe6]">
                    3. Combo Nômade Pro (Residencial + Comercial Completo)
                  </strong>
                </div>
                <div className="text-[11px] text-[#9e8e78]">
                  Nome em inglês: <span className="text-[#d4c5b0]">Nomad Pro All-In-One Global Bundle</span>
                </div>
                <div className="text-xs font-mono text-[#e5985a]">
                  R$ 139,00 BRL/mês • $28,00 USD/mês
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('Nomad Pro All-In-One Global Bundle - Hugh Glass', 'prod3')}
                className="px-3 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-xs font-semibold text-[#d4c5b0] border border-[#3d3428] flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {copiedId === 'prod3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'prod3' ? 'Copiado!' : 'Copiar Nome'}</span>
              </button>
            </div>

          </div>

          {/* EMBEDDED CHECKOUT HIGHLIGHT */}
          <div className="p-4 rounded-2xl bg-[#141724] border border-[#0284c7]/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Checkout 100% Integrado na Tela do Site (Embedded)</span>
            </div>
            <p className="text-xs text-[#d4c5b0] leading-relaxed">
              O seu site foi configurado para que o cliente realize todo o checkout (preenchimento de dados, validação de passaporte/CPF, digitação do cartão com criptografia Stripe SSL ou geração de QR Code PIX) <strong>diretamente na tela do site</strong>, sem redirecionar para links externos. Isso garante a melhor experiência de conversão e mantém o usuário no ambiente da sua marca.
            </p>
          </div>

          {/* GUIA DE PARCELAMENTO NO STRIPE BRASIL (PLANOS ANUAIS) */}
          <div className="p-4 rounded-2xl bg-[#18130e] border border-[#c27839]/60 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#e5985a]">
              <CreditCard className="w-4 h-4 text-[#d18242]" />
              <span>Como Funciona o Parcelamento (Installments) no Stripe Brasil</span>
            </div>
            <p className="text-xs text-[#f5efe6] leading-relaxed">
              Para oferecer parcelamento no cartão de crédito em contas Stripe brasileiras:
            </p>
            <ol className="text-xs text-[#d4c5b0] space-y-1.5 list-decimal list-inside leading-relaxed">
              <li>
                No Dashboard da Stripe, vá em <strong>Configurações (Settings) &gt; Formas de pagamento (Payment methods)</strong>.
              </li>
              <li>
                Clique em <strong>Cartão (Cards)</strong> e habilite a opção <strong>"Parcelamento" (Installments)</strong>.
              </li>
              <li>
                Defina o número máximo de parcelas (ex: 12x) e se você absorve os juros ou repassa.
              </li>
            </ol>
            <div className="p-2.5 rounded-xl bg-[#0c0d12] border border-[#3d3428] text-[11px] text-[#e5985a]">
              💡 <strong>Regra Bancária Brasileira:</strong> No parcelamento, a Stripe debita o <strong>valor total anual</strong> de uma só vez do limite do cartão do cliente. As parcelas são lançadas mensalmente na fatura emitida pelo banco dele. O site da Hugh Glass já exibe esse aviso de transparência automaticamente no checkout e nos cards de preço.
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="pt-2 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold border border-[#3d3428] cursor-pointer"
          >
            Entendi / Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
