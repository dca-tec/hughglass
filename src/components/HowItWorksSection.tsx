import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  FileCheck, 
  Package, 
  QrCode, 
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';

interface HowItWorksSectionProps {
  onSelectPlan: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onSelectPlan
}) => {
  return (
    <section id="como-funciona" className="py-16 sm:py-24 bg-[#0c0d12]/90 border-b border-[#3d3428]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1711] border border-[#c27839]/40 text-[#e5985a] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase">
            <Compass className="w-3.5 h-3.5 text-[#e5985a]" />
            <span>PROCESSO 100% DIGITAL & DESCOMPLICADO</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5efe6] tracking-tight">
            Como Funciona em 3 Passos Simples
          </h2>
          <p className="text-base sm:text-lg text-[#d4c5b0] leading-relaxed">
            Sem burocracia de fiador, sem depósito caução e sem esperar contas de consumo chegarem pelo correio.
          </p>
        </div>

        {/* 3 STEP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          
          {/* STEP 1: ESCOLHA DO PLANO (COPPER) */}
          <div className="p-8 rounded-3xl bg-[#12151e] border-2 border-[#3d3428] hover:border-[#c27839] transition-all flex flex-col justify-between space-y-6 shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center font-display font-bold text-xl border border-[#c27839]/30">
                  01
                </div>
                <span className="text-xs font-mono font-bold text-[#e5985a] uppercase">Passo 1</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f5efe6]">
                Escolha o Tipo de Endereço
              </h3>
              <p className="text-sm sm:text-base text-[#d4c5b0] leading-relaxed">
                Selecione o plano ideal: <strong>Residencial</strong> para documentos e bancos, <strong>Comercial</strong> para seu MEI ou CNPJ, ou o <strong>Combo Completo</strong> para ter ambos com desconto.
              </p>
            </div>
            <div className="pt-4 border-t border-[#3d3428] text-xs font-mono text-[#e5985a] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#d18242]" />
              <span>Contratação online em 2 minutos</span>
            </div>
          </div>

          {/* STEP 2: COMPROVANTE OFICIAL (SAND GOLD) */}
          <div className="p-8 rounded-3xl bg-[#12151e] border-2 border-[#3d3428] hover:border-[#d4c5b0] transition-all flex flex-col justify-between space-y-6 shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#d4c5b0]/20 text-[#f5efe6] flex items-center justify-center font-display font-bold text-xl border border-[#d4c5b0]/30">
                  02
                </div>
                <span className="text-xs font-mono font-bold text-[#d4c5b0] uppercase">Passo 2</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f5efe6]">
                Receba seu Comprovante Oficial
              </h3>
              <p className="text-sm sm:text-base text-[#d4c5b0] leading-relaxed">
                A emissão do contrato de domicílio e da declaração amparada na <strong>Lei Federal 7.115/1983</strong> é instantânea. Use para abrir contas, renovar CNH ou protocolar seu CNPJ.
              </p>
            </div>
            <div className="pt-4 border-t border-[#3d3428] text-xs font-mono text-[#f5efe6] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#d4c5b0]" />
              <span>Validade jurídica em todo o território nacional</span>
            </div>
          </div>

          {/* STEP 3: CONTROLE NO WHATSAPP & LOCKERS (COBALT BLUE) */}
          <div className="p-8 rounded-3xl bg-[#12151e] border-2 border-[#3d3428] hover:border-[#0284c7] transition-all flex flex-col justify-between space-y-6 shadow-xl group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center font-display font-bold text-xl border border-[#0284c7]/30">
                  03
                </div>
                <span className="text-xs font-mono font-bold text-[#38bdf8] uppercase">Passo 3</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#f5efe6]">
                Controle no WhatsApp & Lockers 24/7
              </h3>
              <p className="text-sm sm:text-base text-[#d4c5b0] leading-relaxed">
                Quando uma carta chega, digitalizamos o conteúdo com leitura OCR e notificamos no seu celular. Encomendas são guardadas em <strong>lockers inteligentes 24h</strong> com QR Code criptografado.
              </p>
            </div>
            <div className="pt-4 border-t border-[#3d3428] text-xs font-mono text-[#38bdf8] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#0284c7]" />
              <span>Retirada sem contato e sem filas</span>
            </div>
          </div>

        </div>

        {/* CENTRALIZED ACTION BUTTON */}
        <div className="text-center">
          <button
            onClick={onSelectPlan}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-base shadow-xl shadow-[#c27839]/25 transition-all active:scale-95 inline-flex items-center gap-2.5 cursor-pointer"
          >
            <span>Ver Planos & Preços</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
