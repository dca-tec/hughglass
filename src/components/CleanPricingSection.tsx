import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Home, 
  Building2, 
  Zap,
  HelpCircle,
  Compass
} from 'lucide-react';

interface CleanPricingSectionProps {
  onSelectPlan: (planId: 'residential' | 'commercial' | 'combo', billingCycle: 'monthly' | 'yearly') => void;
}

export const CleanPricingSection: React.FC<CleanPricingSectionProps> = ({
  onSelectPlan
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="planos" className="py-16 sm:py-24 bg-[#0c0d12] border-b border-[#3d3428]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1711] border border-[#c27839]/40 text-[#e5985a] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase">
            <Compass className="w-3.5 h-3.5 text-[#e5985a]" />
            <span>TRANSPARÊNCIA SEM TAXAS OCULTAS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5efe6] tracking-tight">
            Escolha o Plano Ideal para Você
          </h2>
          <p className="text-base sm:text-lg text-[#d4c5b0] leading-relaxed">
            Contratação 100% online, sem fiador e com ativação imediata. Cancele quando quiser diretamente pelo painel.
          </p>

          {/* BILLING CYCLE SWITCHER (MENSAL / ANUAL) IN NOBLE SAND & COPPER */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex items-center bg-[#141724] p-1.5 rounded-2xl border border-[#3d3428]">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-[#c27839] to-[#d18242] text-[#0c0d12] shadow-md shadow-[#c27839]/20 font-black'
                    : 'text-[#d4c5b0] hover:text-white'
                }`}
              >
                Cobrança Mensal
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-[#c27839] to-[#d18242] text-[#0c0d12] shadow-md shadow-[#c27839]/20 font-black'
                    : 'text-[#d4c5b0] hover:text-white'
                }`}
              >
                <span>Plano Anual</span>
                <span className="px-2 py-0.5 rounded-md bg-[#0c0d12] text-[#e5985a] text-[10px] font-black font-mono border border-[#c27839]/40">
                  -15% OFF
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 PRICING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* PLANO 1: RESIDENCIAL NÔMADE (COPPER ACCENT) */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#12151e] border-2 border-[#3d3428] hover:border-[#c27839] transition-all flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center border border-[#c27839]/30">
                  <Home className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#1e1711] border border-[#c27839]/30 text-[#e5985a]">
                  PESSOA FÍSICA
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#f5efe6]">Residencial Nômade</h3>
                <p className="text-sm text-[#d4c5b0] mt-1.5 leading-relaxed">
                  Seu comprovante oficial de moradia fixa, compras e correspondências pessoais.
                </p>
              </div>

              {/* PRICE DISPLAY */}
              <div className="py-4 border-y border-[#3d3428]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#f5efe6]">
                    {billingCycle === 'monthly' ? 'R$ 59' : 'R$ 49'}
                  </span>
                  <span className="text-sm text-[#9e8e78] font-medium">/mês</span>
                </div>
                <span className="text-xs text-[#9e8e78] mt-1 block">
                  {billingCycle === 'monthly' ? 'Cobrado mensalmente no cartão ou PIX' : 'Economia de R$ 120 cobrado anualmente'}
                </span>
              </div>

              {/* FEATURES LIST */}
              <ul className="space-y-3.5 text-sm text-[#e8e2d8]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d18242] shrink-0 mt-0.5" />
                  <span><strong>Comprovante Oficial de Residência</strong> (Lei Federal 7.115/1983)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d18242] shrink-0 mt-0.5" />
                  <span>Abertura de contas bancárias, CNH e cartões</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d18242] shrink-0 mt-0.5" />
                  <span>Acesso aos <strong>Armários Lockers 24/7</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d18242] shrink-0 mt-0.5" />
                  <span>Digitalização OCR de cartas no WhatsApp</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d18242] shrink-0 mt-0.5" />
                  <span>Guarda segura de encomendas por até 30 dias</span>
                </li>
              </ul>

            </div>

            <button
              onClick={() => onSelectPlan('residential', billingCycle)}
              className="mt-8 w-full py-3.5 rounded-2xl bg-[#1a1f30] hover:bg-[#252b3d] text-[#f5efe6] font-bold text-sm border border-[#3d3428] hover:border-[#c27839] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Contratar Residencial</span>
              <ArrowRight className="w-4 h-4 text-[#d18242]" />
            </button>
          </div>

          {/* PLANO 2: COMBO NÔMADE PRO (FEATURED LUXURY EGYPTIAN COPPER & COBALT) */}
          <div className="p-8 sm:p-9 rounded-3xl bg-gradient-to-b from-[#1c1611] to-[#12151e] border-2 border-[#c27839] transition-all flex flex-col justify-between shadow-2xl relative lg:-translate-y-2">
            
            {/* TOP BADGE */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] text-[#0c0d12] font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MAIS POPULAR • TUDO INCLUSO</span>
            </div>

            <div className="space-y-6 pt-2">
              
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center border border-[#c27839]/40">
                  <Zap className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#221811] text-[#e5985a] border border-[#c27839]/40">
                  COMBO COMPLETO (CPF + CNPJ)
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-black text-[#f5efe6]">Combo Nômade Pro</h3>
                <p className="text-sm text-[#d4c5b0] mt-1.5 leading-relaxed">
                  Seu endereço residencial fixo + endereço comercial para sua empresa juntos.
                </p>
              </div>

              {/* PRICE DISPLAY */}
              <div className="py-4 border-y border-[#3d3428]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#e5985a]">
                    {billingCycle === 'monthly' ? 'R$ 139' : 'R$ 119'}
                  </span>
                  <span className="text-sm text-[#9e8e78] font-medium">/mês</span>
                </div>
                <span className="text-xs text-[#e5985a] font-medium mt-1 block">
                  Economia de R$ 228/ano comparado a contratar separados
                </span>
              </div>

              {/* FEATURES LIST */}
              <ul className="space-y-3.5 text-sm text-[#e8e2d8]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#e5985a] shrink-0 mt-0.5" />
                  <span><strong>Tudo do Plano Residencial</strong> (comprovante legal + lockers)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#e5985a] shrink-0 mt-0.5" />
                  <span><strong>Tudo do Plano Comercial</strong> (CNPJ, alvará e notas fiscais)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#e5985a] shrink-0 mt-0.5" />
                  <span>Proteção total da sua casa e privacidade na internet</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#e5985a] shrink-0 mt-0.5" />
                  <span>Digitalização OCR prioritária no WhatsApp</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#e5985a] shrink-0 mt-0.5" />
                  <span>Suporte prioritário e reenvio postal expresso</span>
                </li>
              </ul>

            </div>

            <button
              onClick={() => onSelectPlan('combo', billingCycle)}
              className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-base shadow-xl shadow-[#c27839]/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Contratar Combo Completo</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* PLANO 3: COMERCIAL & FISCAL (AZUL COBALTO & SULFATO DE COBRE) */}
          <div className="p-8 sm:p-9 rounded-3xl bg-[#12151e] border-2 border-[#3d3428] hover:border-[#0284c7] transition-all flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center border border-[#0284c7]/30">
                  <Building2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#0d1f30] border border-[#0284c7]/30 text-[#38bdf8]">
                  PESSOA JURÍDICA
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold text-[#f5efe6]">Comercial & Fiscal</h3>
                <p className="text-sm text-[#d4c5b0] mt-1.5 leading-relaxed">
                  Endereço fiscal e comercial para abertura de MEI, ME, LTDA e emissão de notas.
                </p>
              </div>

              {/* PRICE DISPLAY */}
              <div className="py-4 border-y border-[#3d3428]">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#f5efe6]">
                    {billingCycle === 'monthly' ? 'R$ 99' : 'R$ 89'}
                  </span>
                  <span className="text-sm text-[#9e8e78] font-medium">/mês</span>
                </div>
                <span className="text-xs text-[#9e8e78] mt-1 block">
                  {billingCycle === 'monthly' ? 'Cobrado mensalmente no cartão ou PIX' : 'Economia de R$ 120 cobrado anualmente'}
                </span>
              </div>

              {/* FEATURES LIST */}
              <ul className="space-y-3.5 text-sm text-[#e8e2d8]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Abertura de Empresa & CNPJ na Junta Comercial</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Alvará municipal e emissão de notas fiscais (NF-e)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Proteção total do seu endereço pessoal</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Recepção e triagem de notificações fiscais</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Certidão negativa e regularidade tributária</span>
                </li>
              </ul>

            </div>

            <button
              onClick={() => onSelectPlan('commercial', billingCycle)}
              className="mt-8 w-full py-3.5 rounded-2xl bg-[#1a1f30] hover:bg-[#252b3d] text-[#f5efe6] font-bold text-sm border border-[#3d3428] hover:border-[#0284c7] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Contratar Comercial</span>
              <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
            </button>
          </div>

        </div>

        {/* SECURITY & MONEY BACK GUARANTEE IN COPPER & COBALT */}
        <div className="mt-12 text-center text-xs sm:text-sm text-[#d4c5b0] flex items-center justify-center gap-6 flex-wrap">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#e5985a]" />
            Garantia incondicional de 7 dias
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
            Sem carência ou multas de cancelamento
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#e5985a]" />
            Ativação imediata no WhatsApp
          </span>
        </div>

      </div>
    </section>
  );
};
