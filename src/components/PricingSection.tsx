import React, { useState } from 'react';
import { UserProfileType } from '../types';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Compass, 
  HeartHandshake,
  FileCheck
} from 'lucide-react';

interface PricingSectionProps {
  selectedProfile: UserProfileType;
  onSelectPlan: (planId: string) => void;
  onOpenSocialSponsor: () => void;
}

interface PlanDetailModalData {
  title: string;
  badge: string;
  price: string;
  targetAudience: string;
  fullFeatures: string[];
  legalClauses: string[];
  sla: string;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  selectedProfile,
  onSelectPlan,
  onOpenSocialSponsor
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeModal, setActiveModal] = useState<PlanDetailModalData | null>(null);

  const plans = [
    {
      id: 'social',
      matchedProfile: 'unhoused' as UserProfileType,
      title: 'Apoio Social & Cidadania',
      subtitle: 'Sem comprovante fixo, catadores e extrema vulnerabilidade',
      monthlyPrice: 0,
      annualPrice: 0,
      badge: 'Custo Zero (Subsidiado)',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      icon: HeartHandshake,
      description: 'Endereço formal para emissão de documentos civis (RG, CTPS), abertura de conta bancária e benefícios.',
      features: [
        'Endereço válido nos termos da Lei Federal 7.115/83',
        'Recebimento de até 5 cartas/mês no Hub',
        'Aviso por SMS/WhatsApp simplificado',
        'Emissão de Declaração de Residência gratuita',
        'Isenção total de taxas pelo fundo Apadrinhe'
      ],
      ctaText: 'Solicitar via Apoio Social',
      highlightBorder: selectedProfile === 'unhoused',
      detailsModal: {
        title: 'Plano Apoio Social & Cidadania',
        badge: 'Impacto Social ESG',
        price: 'R$ 0,00 (100% Custeado por Doadores)',
        targetAudience: 'Pessoas em vulnerabilidade social, sem moradia fixa ou residentes em áreas não codificadas.',
        fullFeatures: [
          'Endereço postal com Box individual registrado no Cartório e Correios',
          'Declaração formal de residência assinada nos termos da Lei 7.115/83',
          'Guarda de cartas por até 60 dias sem cobrança de armazenagem',
          'Apoio humano na retirada de cartões de benefícios e documentos no balcão',
          'Isenção garantida de qualquer taxa de cancelamento ou fidelidade'
        ],
        legalClauses: [
          'Em conformidade com a Lei Federal nº 7.115 de 29/08/1983 que presume verdadeira a declaração de residência firmada pelo interessado.',
          'Programa supervisionado em parceria com cooperativas e ONGs de acolhimento.'
        ],
        sla: 'Triagem e aviso em até 24h úteis.'
      }
    },
    {
      id: 'nomad',
      matchedProfile: 'nomad' as UserProfileType,
      title: 'Nômade & Vanlife',
      subtitle: 'Viajantes, motoristas e nômades digitais',
      monthlyPrice: 39,
      annualPrice: 31,
      badge: 'Mais Escolhido',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      icon: Compass,
      description: 'Seu endereço fixo que acompanha seus roteiros no mapa, com lockers 24/7 e digitalização OCR.',
      features: [
        'Endereço fixo no Hub Florianópolis ou Curitiba',
        'Acesso 24/7 aos armários inteligentes (Lockers)',
        'Digitalização ilimitada de envelopes (Fotos no WhatsApp)',
        'Até 10 digitalizações de miolo PDF com OCR/mês',
        'Passaporte Nômade: Geo-Routing de pacotes em rota',
        'Desconto corporativo para reenvio via SEDEX/Jadlog'
      ],
      ctaText: 'Assinar Plano Nômade',
      highlightBorder: selectedProfile === 'nomad',
      detailsModal: {
        title: 'Plano Nômade & Vanlife 24/7',
        badge: 'Liberdade Geográfica',
        price: billingCycle === 'annual' ? 'R$ 31,20 / mês (Cobrado Anualmente)' : 'R$ 39,00 / mês',
        targetAudience: 'Nômades digitais, vanlifers, caminhoneiros e profissionais remotos em constante deslocamento.',
        fullFeatures: [
          'Box exclusivo para correspondências pessoais e compras em e-commerce',
          'Rede nacional com lockers inteligentes de acesso autônomo 24 horas',
          'Passaporte de Geo-Routing: mude sua rota no mapa e as encomendas seguem você',
          'Pontos de apoio com água potável, tomadas e Wi-Fi de alta velocidade',
          'WhatsApp First: comandos de liberação direto na conversa sem abrir app',
          'Digitalização com OCR pesquisável em tempo real'
        ],
        legalClauses: [
          'Permite recebimento de cartões bancários, correspondências pessoais e pacotes de e-commerce.',
          'Não inclui domicílio fiscal para abertura de CNPJ (consulte o plano Empresarial).'
        ],
        sla: 'Aviso no WhatsApp em até 2 horas após a entrega do carteiro no hub.'
      }
    },
    {
      id: 'privacy',
      matchedProfile: 'privacy' as UserProfileType,
      title: 'Escudo de Privacidade',
      subtitle: 'Criadores de conteúdo e vendedores de e-commerce',
      monthlyPrice: 49,
      annualPrice: 39,
      badge: 'Sigilo Total',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      icon: ShieldCheck,
      description: 'Proteção contra vazamento de dados: remetente seguro para vendas online e recebimento blindado.',
      features: [
        'Gerador de Remetente Proxy para Mercado Livre & Shopee',
        'Seu CPF e endereço real nunca aparecem nas etiquetas',
        'Recebimento seguro de devoluções de e-commerce',
        'Digitalização de miolo com OCR e descarte ecológico triturado',
        'Atendimento sigiloso com chave de segurança PGP/Token',
        'Suporte prioritário via WhatsApp'
      ],
      ctaText: 'Ativar Escudo de Dados',
      highlightBorder: selectedProfile === 'privacy',
      detailsModal: {
        title: 'Plano Escudo de Privacidade & Anti-Doxxing',
        badge: 'Blindagem de Dados Pessoais',
        price: billingCycle === 'annual' ? 'R$ 39,20 / mês (Cobrado Anualmente)' : 'R$ 49,00 / mês',
        targetAudience: 'Influenciadores digitais, vendedores da OLX/Mercado Livre, mulheres que buscam sigilo e profissionais autônomos.',
        fullFeatures: [
          'Geração de identidades proxy criptografadas para postagem nos Correios',
          'Blindagem contra vazamento de dados (anti-doxxing e stalking)',
          'Destruição segura (trituração nível DIN 66399) de correspondências indesejadas mediante aprovação',
          'Fotos de conferência com metadados e registro seguro em blockchain/hash',
          'Roteamento de pacotes para lockers de terceiros sem vínculo de nome público'
        ],
        legalClauses: [
          'Em estrita conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018).',
          'Uso vedado para fraudes ou atividades ilícitas; o titular responde civil e criminalmente por ilícitos.'
        ],
        sla: 'Notificação imediata e suporte VIP com tempo de resposta < 15 min.'
      }
    },
    {
      id: 'business',
      matchedProfile: 'business' as UserProfileType,
      title: 'Fiscal & MEI / CNPJ',
      subtitle: 'Empresas, startups, consultorias e profissionais PJ',
      monthlyPrice: 89,
      annualPrice: 71,
      badge: 'Endereço Fiscal',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      icon: Building2,
      description: 'Endereço fiscal homologado na Junta Comercial e Receita Federal para abertura ou migração de CNPJ.',
      features: [
        'Domicílio Fiscal oficial para Junta Comercial e Prefeitura',
        'Emissão imediata da Certidão de Endereço Fiscal',
        'Digitalização ilimitada de intimações da Receita Federal',
        'Apoio no processo de emissão de Alvará e Inscrição Estadual',
        'Recepção e gestão de correspondências tributárias',
        'Validação digital via Gov.br Prata/Ouro inclusa'
      ],
      ctaText: 'Contratar Endereço Fiscal',
      highlightBorder: selectedProfile === 'business',
      detailsModal: {
        title: 'Plano Fiscal & MEI / CNPJ Homologado',
        badge: 'Abertura de Empresa',
        price: billingCycle === 'annual' ? 'R$ 71,20 / mês (Cobrado Anualmente)' : 'R$ 89,00 / mês',
        targetAudience: 'Microempreendedores Individuais (MEI), Sociedades Unipessoais (SLU), prestadores de serviço e startups sem sede física.',
        fullFeatures: [
          'Autorização legal para registro no CNPJ, Junta Comercial (JUCESC, JUCESP, etc.) e Receita Federal',
          'Contrato de cessão de endereço com firma reconhecida / assinatura digital padrão ICP-Brasil',
          'Isenção de IPTU comercial caro e custos de condomínio de salas comerciais',
          'Digitalização prioritária de notificações fiscais, autos e boletos de tributos',
          'Acesso completo a todas as funcionalidades do plano Nômade & Lockers 24/7'
        ],
        legalClauses: [
          'Atividades permitidas: Serviços intelectuais, desenvolvimento de software, consultoria, intermediação e comércios sem estoque no local.',
          'Resolução CGSIM nº 61/2020 e Lei da Liberdade Econômica nº 13.874/2019.'
        ],
        sla: 'Certidão emitida em até 10 minutos após aprovação cadastral via Gov.br.'
      }
    }
  ];

  return (
    <section id="planos" className="py-16 lg:py-24 relative bg-slate-950 border-b border-slate-800">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-teal-500/10 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Tabela Dinâmica de Planos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparência Absoluta, Sem Pegadinhas
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Escolha o modelo ideal para a sua necessidade. Se você respondeu ao quiz acima, destacamos a melhor opção para você.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cobrança Mensal
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <span>Anual (Economize 20%)</span>
              <span className="text-[10px] bg-slate-950/40 text-slate-950 font-black px-1.5 py-0.5 rounded">
                -20% OFF
              </span>
            </button>
          </div>

        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            const isHighlighted = plan.highlightBorder;

            return (
              <div
                key={plan.id}
                id={`card-plan-${plan.id}`}
                className={`rounded-3xl p-6 border transition-all flex flex-col justify-between relative bg-slate-900/80 backdrop-blur-xl ${
                  isHighlighted
                    ? 'border-emerald-400 ring-2 ring-emerald-500/40 shadow-2xl shadow-emerald-950/60 scale-[1.02]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Badge for Quiz match or Plan Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Perfil Recomendado no Quiz
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{plan.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.subtitle}</p>

                  {/* Price Tag */}
                  <div className="mt-5 mb-5 pb-5 border-b border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      {plan.monthlyPrice === 0 ? (
                        <span className="text-3xl font-extrabold text-amber-400 font-mono">Gratuito</span>
                      ) : (
                        <>
                          <span className="text-xs text-slate-400 font-mono">R$</span>
                          <span className="text-3xl sm:text-4xl font-black text-white font-mono">{price}</span>
                          <span className="text-xs text-slate-400">/mês</span>
                        </>
                      )}
                    </div>
                    {billingCycle === 'annual' && plan.monthlyPrice > 0 && (
                      <span className="text-[10px] text-emerald-400 font-mono block mt-1">
                        Cobrado anualmente (R$ {price * 12}/ano)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => {
                      if (plan.id === 'social') {
                        onOpenSocialSponsor();
                      } else {
                        onSelectPlan(plan.id);
                      }
                    }}
                    className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:brightness-110'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveModal(plan.detailsModal)}
                    className="w-full py-1.5 text-slate-400 hover:text-white text-[11px] font-medium flex items-center justify-center gap-1 transition-colors"
                  >
                    <HelpCircle className="w-3 h-3 text-slate-500" />
                    <span>Ver Detalhes do Contrato & SLA</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Plan Details Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono">
                {activeModal.badge}
              </div>

              <h3 className="text-2xl font-bold text-white">{activeModal.title}</h3>
              <p className="text-sm font-mono text-emerald-400 font-bold">{activeModal.price}</p>
              
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block mb-1">Público-Alvo Recomendado:</strong>
                {activeModal.targetAudience}
              </div>

              <div>
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Especificação Completa dos Serviços Inclusos:
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {activeModal.fullFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Base Legal & Amparo Normativo:
                </h4>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  {activeModal.legalClauses.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between text-slate-400">
                <span>Garantia de Resposta (SLA):</span>
                <span className="font-bold text-emerald-400">{activeModal.sla}</span>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                Fechar Especificação
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
