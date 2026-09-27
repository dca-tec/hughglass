import React, { useState } from 'react';
import { MODULAR_COMPLEX_PRESETS } from '../data/mockData';
import { ModularComplexSpec, SiteMediaItem } from '../types';
import { 
  Layers, 
  Ruler, 
  Users, 
  Flame, 
  DollarSign, 
  CheckCircle2, 
  Building, 
  Calculator, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Download,
  Image as ImageIcon,
  Sliders,
  Maximize2,
  X
} from 'lucide-react';

interface ModularEngineeringSimulatorProps {
  infrastructurePhotos?: SiteMediaItem[];
  onOpenAdmin?: () => void;
}

export const ModularEngineeringSimulator: React.FC<ModularEngineeringSimulatorProps> = ({
  infrastructurePhotos = [],
  onOpenAdmin
}) => {
  const [selectedSpecId, setSelectedSpecId] = useState<string>('spec-6000');
  const [customMonthlyRent, setCustomMonthlyRent] = useState<number>(750);
  const [bunksPerRoom, setBunksPerRoom] = useState<number>(8); // 8 beliches = 16 moradores em 40 m²
  const [selectedPhoto, setSelectedPhoto] = useState<SiteMediaItem | null>(null);

  const activeInfraPhotos = infrastructurePhotos.filter((p) => p.isActive);

  const currentSpec = MODULAR_COMPLEX_PRESETS.find((s) => s.id === selectedSpecId) || MODULAR_COMPLEX_PRESETS[3];

  const totalMonthlyGross = currentSpec.maxResidents * customMonthlyRent;
  const totalAnnualGross = totalMonthlyGross * 12;
  const estimatedOpexPercent = 0.35; // 35% opex (limpeza, energia, água, internet, manutenção, folha)
  const netAnnualIncome = totalAnnualGross * (1 - estimatedOpexPercent);
  const estimatedPaybackYears = (currentSpec.estimatedIndustrialCapex / netAnnualIncome).toFixed(1);

  return (
    <section id="simulador-engenharia" className="py-20 lg:py-28 relative bg-slate-900/50 border-b border-slate-800">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Ruler className="w-4 h-4" />
            <span>Engenharia & Dimensionamento Modular</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Complexos Pré-Fabricados para 1.000 Moradores
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            Em vez de forçar 1.000 pessoas em um imóvel comum de 1.000 m² (o que geraria 1 m²/pessoa e reprovação imediata nos Bombeiros), dimensionamos módulos industriais pré-moldados de concreto e aço com alto padrão técnico e legal.
          </p>
        </div>

        {/* Scale Preset Selector Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {MODULAR_COMPLEX_PRESETS.map((spec) => {
            const isSelected = selectedSpecId === spec.id;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecId(spec.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400 ring-2 ring-cyan-400/40 shadow-xl'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-400">{spec.totalAreaM2} m²</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                    {spec.modulesCount} {spec.modulesCount === 1 ? 'Módulo' : 'Módulos'}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm leading-tight">{spec.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">
                  Capacidade: <strong className="text-emerald-400">{spec.maxResidents} leitos</strong> ({spec.areaPerPersonM2.toFixed(1)} m²/pessoa)
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Engineering Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Technical Blueprint Breakdown */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                  PLANTA CONCEITUAL & ZONEAMENTO INTERNO
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentSpec.title}</h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                {currentSpec.recommendedStructure}
              </span>
            </div>

            {/* Proportional Area Bars */}
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-300 block">
                Distribuição Espacial por Módulos ({currentSpec.totalAreaM2} m² Construídos):
              </span>

              <div className="space-y-3 font-mono text-xs">
                
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      Dormitórios Coletivos & Suítes Modulares
                    </span>
                    <span className="text-emerald-400 font-bold">{currentSpec.dormitoryM2} m² ({Math.round((currentSpec.dormitoryM2/currentSpec.totalAreaM2)*100)}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900">
                    <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(currentSpec.dormitoryM2/currentSpec.totalAreaM2)*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      Sanitários, Chuveiros & Vestiários (Norma Municipal)
                    </span>
                    <span className="text-cyan-400 font-bold">{currentSpec.bathroomsM2} m² ({Math.round((currentSpec.bathroomsM2/currentSpec.totalAreaM2)*100)}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(currentSpec.bathroomsM2/currentSpec.totalAreaM2)*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      Cozinhas Comunitárias & Refeitório Industrial
                    </span>
                    <span className="text-amber-400 font-bold">{currentSpec.kitchenRefectoryM2} m² ({Math.round((currentSpec.kitchenRefectoryM2/currentSpec.totalAreaM2)*100)}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(currentSpec.kitchenRefectoryM2/currentSpec.totalAreaM2)*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                      Coworking, Convivência & Lockers 24/7
                    </span>
                    <span className="text-teal-400 font-bold">{currentSpec.coworkingLeisureM2} m² ({Math.round((currentSpec.coworkingLeisureM2/currentSpec.totalAreaM2)*100)}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: `${(currentSpec.coworkingLeisureM2/currentSpec.totalAreaM2)*100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      Lavanderia OMO, Circulação & Áreas Técnicas
                    </span>
                    <span className="text-purple-400 font-bold">{currentSpec.laundryTechnicalM2} m² ({Math.round((currentSpec.laundryTechnicalM2/currentSpec.totalAreaM2)*100)}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(currentSpec.laundryTechnicalM2/currentSpec.totalAreaM2)*100}%` }} />
                  </div>
                </div>

              </div>
            </div>

            {/* Fire Safety (AVCB) Checklist Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <Flame className="w-4 h-4" />
                <span>Requisitos Críticos do Corpo de Bombeiros (AVCB) para {currentSpec.maxResidents} Pessoas:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                {currentSpec.fireSafetyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Financial Feasibility & Capex/Opex Calculator */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                ESTUDO DE VIABILIDADE & RETORNO
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">Calculadora de ROI do Complexo</h3>
              <p className="text-xs text-slate-400 mt-1">
                Ajuste os parâmetros econômicos para visualizar a geração de caixa operacional.
              </p>
            </div>

            {/* Rent Slider */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Mensalidade Média por Leito:</span>
                <span className="text-base font-black text-emerald-400">R$ {customMonthlyRent}/mês</span>
              </div>
              <input
                type="range"
                min="500"
                max="1200"
                step="25"
                value={customMonthlyRent}
                onChange={(e) => setCustomMonthlyRent(Number(e.target.value))}
                className="w-full accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>R$ 500 (Econômico)</span>
                <span>R$ 850 (Médio)</span>
                <span>R$ 1.200 (Premium Coworking)</span>
              </div>
            </div>

            {/* Financial Output Cards */}
            <div className="space-y-3 font-mono text-xs">
              
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 text-[10px] block">Capex Estimado (Construção Industrial)</span>
                  <span className="text-white font-bold text-base">R$ {(currentSpec.estimatedIndustrialCapex / 1000000).toFixed(1)} Milhões</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  ~R$ {Math.round(currentSpec.estimatedIndustrialCapex / currentSpec.totalAreaM2)}/m²
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 text-[10px] block">Receita Bruta Recorrente (MRR)</span>
                  <span className="text-emerald-400 font-bold text-base">
                    R$ {totalMonthlyGross.toLocaleString('pt-BR')}/mês
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                  {currentSpec.maxResidents} leitos
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-slate-500 text-[10px] block">Lucro Líquido Anual Projetado (EBITDA)</span>
                  <span className="text-cyan-400 font-bold text-base">
                    R$ {netAnnualIncome.toLocaleString('pt-BR')}/ano
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Margem 65%</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-tr from-emerald-950/60 to-cyan-950/40 border border-emerald-500/40 text-center space-y-1">
                <span className="text-slate-400 text-xs block font-sans">
                  Tempo Estimado de Payback do Investimento:
                </span>
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {estimatedPaybackYears} Anos
                </span>
                <p className="text-[10px] text-slate-400">
                  Considerando 90% de ocupação média com a rede de intercâmbio ativa.
                </p>
              </div>

            </div>

            <button
              onClick={() => {
                const text = `ESTUDO TÉCNICO MODULAR - NÔMADEHUB
Complexo: ${currentSpec.title}
Área Construída: ${currentSpec.totalAreaM2} m² | Moradores: ${currentSpec.maxResidents}
Densidade: ${currentSpec.areaPerPersonM2.toFixed(1)} m²/morador
Dormitórios: ${currentSpec.dormitoryM2} m² | Sanitários: ${currentSpec.bathroomsM2} m²
Refeitório: ${currentSpec.kitchenRefectoryM2} m² | Coworking/Lazer: ${currentSpec.coworkingLeisureM2} m²
Capex Estimado: R$ ${currentSpec.estimatedIndustrialCapex.toLocaleString('pt-BR')}
Receita Projetada: R$ ${totalMonthlyGross.toLocaleString('pt-BR')}/mês
Payback: ${estimatedPaybackYears} anos`;

                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `estudo-modular-${currentSpec.totalAreaM2}m2.txt`;
                a.click();
              }}
              className="w-full py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Exportar Memorial Descritivo & Estudo em TXT</span>
            </button>

          </div>

        </div>

        {/* INFRASTRUCTURE & FIRE SAFETY PHOTO GALLERY */}
        {activeInfraPhotos.length > 0 && (
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Acervo Visual: Segurança Contra Incêndio & Engenharia
                  </h4>
                  <p className="text-xs text-slate-400">
                    Fotos e diagramas das redes de hidrantes, portas corta-fogo e estrutura fabril
                  </p>
                </div>
              </div>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gerenciar Fotos</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeInfraPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 overflow-hidden cursor-pointer shadow-lg transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {photo.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30">
                        {photo.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h5 className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                      {photo.title}
                    </h5>
                    {photo.description && (
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-5 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                  {selectedPhoto.title}
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video max-h-[55vh] rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {selectedPhoto.description && (
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {selectedPhoto.description}
                </p>
              )}
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
