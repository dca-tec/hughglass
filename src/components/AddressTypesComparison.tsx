import React from 'react';
import { 
  Home, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass,
  FileText,
  CreditCard,
  Briefcase
} from 'lucide-react';

interface AddressTypesComparisonProps {
  onSelectPlan: (planId: 'residential' | 'commercial' | 'combo') => void;
}

export const AddressTypesComparison: React.FC<AddressTypesComparisonProps> = ({
  onSelectPlan
}) => {
  return (
    <section id="comparativo" className="py-16 sm:py-24 bg-[#0c0d12] border-b border-[#3d3428]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: NOBLE EGYPTIAN NOMAD CONTEXT */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1711] border border-[#c27839]/40 text-[#e5985a] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase">
            <Compass className="w-3.5 h-3.5 text-[#e5985a]" />
            <span>ESTRUTURA JURÍDICA CLARA & OBJETIVA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5efe6] tracking-tight">
            Qual Endereço Você Precisa?
          </h2>
          <p className="text-base sm:text-lg text-[#d4c5b0] leading-relaxed">
            Assim como as antigas caravanas egípcias separavam as tendas de repouso dos postos de troca mercantil, nós oferecemos duas modalidades jurídicas complementares para sua total tranquilidade.
          </p>
        </div>

        {/* 2 MAIN CARDS: RESIDENCIAL VS COMERCIAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          
          {/* CARD 1: ENDEREÇO RESIDENCIAL FIXO (WARM COPPER & DESERT SAND) */}
          <div 
            id="endereco-residencial"
            className="p-8 sm:p-10 rounded-3xl bg-[#12151e] border-2 border-[#c27839]/45 hover:border-[#c27839] transition-all flex flex-col justify-between shadow-2xl relative group"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center border border-[#c27839]/30">
                  <Home className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#221811] text-[#e5985a] text-xs font-bold font-mono border border-[#c27839]/40">
                  PESSOA FÍSICA (CPF)
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5efe6]">
                  Endereço Residencial Fixo
                </h3>
                <p className="text-sm sm:text-base text-[#d4c5b0] mt-2.5 leading-relaxed">
                  Para quem viaja, mora em motorhome, van ou aluga por temporada e precisa de um <strong>comprovante oficial permanente de domicílio</strong> no próprio nome.
                </p>
              </div>

              {/* TARGET AUDIENCE BOX */}
              <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-[#3d3428] text-xs sm:text-sm text-[#d4c5b0] space-y-1.5">
                <strong className="text-[#f5efe6] block font-bold text-xs uppercase tracking-wider text-[#e5985a]">Público indicado:</strong>
                <p className="leading-relaxed">Nômades digitais, vanlifers, viajantes frequentes, motoristas de aplicativo, profissionais remotos e quem não possui contas de consumo no próprio nome.</p>
              </div>

              {/* WHAT IS INCLUDED */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-[#e5985a] uppercase tracking-wider block">
                  Benefícios Inclusos:
                </span>
                <ul className="space-y-3.5 text-sm sm:text-base text-[#e8e2d8]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d18242] shrink-0 mt-0.5" />
                    <span><strong>Comprovante Oficial de Residência:</strong> Amparado integralmente pela Lei Federal nº 7.115/1983.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d18242] shrink-0 mt-0.5" />
                    <span><strong>Abertura de Bancos & Documentos:</strong> Válido em Itaú, Nubank, Inter, Bradesco, CNH, passaporte e cartões.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d18242] shrink-0 mt-0.5" />
                    <span><strong>Lockers Autônomos 24/7:</strong> Receba encomendas de Mercado Livre e Amazon e retire via QR Code dinâmico.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#d18242] shrink-0 mt-0.5" />
                    <span><strong>Digitalização OCR no WhatsApp:</strong> Notificação instantânea com escaneamento sigiloso de suas cartas.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* PRICE & ACTION */}
            <div className="pt-8 mt-8 border-t border-[#3d3428] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#9e8e78] block">A partir de</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#f5efe6]">R$ 59</span>
                  <span className="text-sm text-[#9e8e78] font-medium">/mês</span>
                </div>
              </div>

              <button
                onClick={() => onSelectPlan('residential')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-sm sm:text-base shadow-lg shadow-[#c27839]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Contratar Residencial</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* CARD 2: ENDEREÇO COMERCIAL / FISCAL (AZUL COBALTO & SULFATO DE COBRE) */}
          <div 
            id="endereco-comercial"
            className="p-8 sm:p-10 rounded-3xl bg-[#12151e] border-2 border-[#0284c7]/45 hover:border-[#38bdf8] transition-all flex flex-col justify-between shadow-2xl relative group"
          >
            <div className="space-y-6">
              
              <div className="flex items-center justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center border border-[#0284c7]/30">
                  <Building2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[#0d1f30] text-[#38bdf8] text-xs font-bold font-mono border border-[#0284c7]/40">
                  PESSOA JURÍDICA (CNPJ)
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5efe6]">
                  Endereço Comercial & Domicílio Fiscal
                </h3>
                <p className="text-sm sm:text-base text-[#d4c5b0] mt-2.5 leading-relaxed">
                  Para quem já tem ou deseja <strong>abrir empresa, MEI ou sociedade</strong> e necessita de endereço com alvará e inscrição municipal desimpedida.
                </p>
              </div>

              {/* TARGET AUDIENCE BOX */}
              <div className="p-4 rounded-2xl bg-[#0c0d12]/90 border border-[#3d3428] text-xs sm:text-sm text-[#d4c5b0] space-y-1.5">
                <strong className="text-[#f5efe6] block font-bold text-xs uppercase tracking-wider text-[#38bdf8]">Público indicado:</strong>
                <p className="leading-relaxed">Empreendedores, freelancers que faturam via PJ, prestadores de serviços, consultores remotos e donos de MEI, ME ou LTDA.</p>
              </div>

              {/* WHAT IS INCLUDED */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-[#38bdf8] uppercase tracking-wider block">
                  Benefícios Inclusos:
                </span>
                <ul className="space-y-3.5 text-sm sm:text-base text-[#e8e2d8]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span><strong>Abertura de Empresa & CNPJ:</strong> Registro aceito na Junta Comercial (JUCESC, JUCESP, JUCEPAR).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span><strong>Alvará & Emissão de NF-e:</strong> Domicílio fiscal homologado na Prefeitura para emissão de notas de serviço.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span><strong>Privacidade Total do seu Lar:</strong> Evite exibir seu endereço de moradia pessoal na consulta pública do CNPJ.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span><strong>Gestão Tributária Oficial:</strong> Recepção e triagem qualificada de notificações da Receita Federal e Prefeitura.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* PRICE & ACTION */}
            <div className="pt-8 mt-8 border-t border-[#3d3428] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#9e8e78] block">A partir de</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-[#f5efe6]">R$ 99</span>
                  <span className="text-sm text-[#9e8e78] font-medium">/mês</span>
                </div>
              </div>

              <button
                onClick={() => onSelectPlan('commercial')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-[#0c0d12] font-black text-sm sm:text-base shadow-lg shadow-[#0284c7]/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Contratar Comercial</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

          </div>

        </div>

        {/* NOBLE FEATURED COMBO BANNER (COBRE & COBALTO SULTANATE) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1e1610] via-[#12151e] to-[#0d1e30] border-2 border-[#c27839]/70 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
          
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#0284c7]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-60 h-60 bg-[#c27839]/15 blur-[80px] rounded-full pointer-events-none" />

          <div className="space-y-2.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c27839]/20 text-[#e5985a] font-bold text-xs font-mono border border-[#c27839]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#e5985a]" />
              <span>O PLANO MAIS CONTRATADO • COMBO TUDO EM UM</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#f5efe6]">
              Combo Nômade Pro: Residencial + Comercial Juntos
            </h3>
            <p className="text-sm sm:text-base text-[#d4c5b0] leading-relaxed">
              Tudo resolvido em uma única mensalidade unificada: viva livremente com endereço pessoal fixo no CPF e opere sua empresa no CNPJ oficial com desconto permanente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 relative z-10">
            <div>
              <span className="text-xs text-[#9e8e78] block line-through">De R$ 158/mês</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#e5985a]">R$ 139</span>
                <span className="text-sm text-[#d4c5b0]">/mês</span>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('combo')}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-sm sm:text-base shadow-xl shadow-[#c27839]/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Quero o Combo Completo</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
