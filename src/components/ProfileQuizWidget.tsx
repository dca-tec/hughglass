import React from 'react';
import { UserProfileType } from '../types';
import { Compass, ShieldAlert, Building2, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProfileQuizWidgetProps {
  selectedProfile: UserProfileType;
  onSelectProfile: (profile: UserProfileType) => void;
  onSimulateClick?: () => void;
}

export const ProfileQuizWidget: React.FC<ProfileQuizWidgetProps> = ({
  selectedProfile,
  onSelectProfile,
  onSimulateClick
}) => {
  const profiles = [
    {
      id: 'nomad' as UserProfileType,
      title: 'Nômade / Viajante',
      subtitle: 'Vanlifers, viajantes e motoristas em rota',
      icon: Compass,
      tag: 'Mais Escolhido',
      accentColor: 'from-emerald-500 to-teal-400',
      borderColor: 'border-emerald-500/50',
      pitch: 'Seu endereço fixo que segue sua rota: reencaminhamento inteligente para o hub mais próximo de onde você estiver.',
      keyBenefit: 'Acesso a lockers 24/7 com água e tomada para vanlife',
      recommendedPlan: 'Plano Nômade Digital (R$ 39/mês)'
    },
    {
      id: 'privacy' as UserProfileType,
      title: 'Busco Privacidade',
      subtitle: 'Criadores, vendedores online e figuras públicas',
      icon: ShieldAlert,
      tag: 'Proteção Total',
      accentColor: 'from-cyan-500 to-blue-500',
      borderColor: 'border-cyan-500/50',
      pitch: 'Escudo de privacidade total: nunca mais revele seu endereço residencial nem seu CPF em pacotes, devoluções ou vendas na web.',
      keyBenefit: 'Remetente proxy verificado para Mercado Livre e Correios',
      recommendedPlan: 'Plano Escudo de Privacidade (R$ 49/mês)'
    },
    {
      id: 'business' as UserProfileType,
      title: 'Quero Abrir MEI / CNPJ',
      subtitle: 'Empreendedores e prestadores de serviços PJ',
      icon: Building2,
      tag: 'Endereço Fiscal',
      accentColor: 'from-teal-500 to-emerald-400',
      borderColor: 'border-teal-500/50',
      pitch: 'Endereço fiscal 100% legalizado para Junta Comercial e Receita Federal. Abra seu CNPJ sem precisar de sala comercial cara.',
      keyBenefit: 'Certidão emitida e digitalização de intimações da Receita',
      recommendedPlan: 'Plano Fiscal & MEI Oficial (R$ 89/mês)'
    },
    {
      id: 'unhoused' as UserProfileType,
      title: 'Sem Comprovante Fixo',
      subtitle: 'Moradia flexível, república ou situação de rua',
      icon: UserCheck,
      tag: 'Apoio Social',
      accentColor: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-400/50',
      pitch: 'Direito à cidadania e endereço formal pela Lei 7.115/83. Emita RG, abra conta em banco e receba encomendas sem conta de luz.',
      keyBenefit: 'Validação gratuita ou subsidiada via Gov.br e Apadrinhamento',
      recommendedPlan: 'Plano Apoio Social (Custo Zero via Subsídio)'
    }
  ];

  const currentProfileData = profiles.find(p => p.id === selectedProfile) || profiles[0];

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            Quiz de Personalização Interativo
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Qual é o seu perfil hoje?
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Selecione seu momento para adaptarmos os recursos, rotas e benefícios ideais para você:
          </p>
        </div>
      </div>

      {/* 4 Profile Grid Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {profiles.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedProfile === p.id;
          return (
            <button
              key={p.id}
              id={`quiz-profile-${p.id}`}
              onClick={() => onSelectProfile(p.id)}
              className={`text-left p-4 rounded-2xl border transition-all relative flex flex-col justify-between group ${
                isSelected
                  ? `bg-slate-800/90 ${p.borderColor} ring-2 ring-emerald-400/40 shadow-xl shadow-emerald-950/40`
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-gradient-to-tr ' + p.accentColor + ' text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 group-hover:text-white'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' : 'bg-slate-900 text-slate-500'
                  }`}>
                    {p.tag}
                  </span>
                </div>
                <h4 className={`font-bold text-base mb-1 ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                  {p.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {p.subtitle}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isSelected ? 'Selecionado' : 'Configurar'}
                </span>
                <CheckCircle2 className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 scale-110' : 'text-slate-700'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tailored Value Proposition Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Solução Personalizada para {currentProfileData.title}
            </span>
          </div>
          <p className="text-slate-200 text-sm sm:text-base font-medium">
            {currentProfileData.pitch}
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Destaque principal: <strong className="text-slate-200">{currentProfileData.keyBenefit}</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-slate-400 block">Recomendação</span>
            <span className="text-xs font-bold text-emerald-400">{currentProfileData.recommendedPlan}</span>
          </div>
          <a
            href="#planos"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <span>Ver Tabela Deste Perfil</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </div>
  );
};
