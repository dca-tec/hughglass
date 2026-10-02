import React, { useState, useEffect } from 'react';
import { SiteMediaItem } from '../types';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sliders, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  X,
  Sparkles,
  Building2,
  Home,
  Package,
  MapPin
} from 'lucide-react';

interface HeroFullBannerProps {
  banners: SiteMediaItem[];
  onOpenAdmin: () => void;
  onSelectPlan: () => void;
}

export const HeroFullBanner: React.FC<HeroFullBannerProps> = ({
  banners,
  onOpenAdmin,
  onSelectPlan
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeBanners = banners.filter((b) => b.isActive);

  // Auto-rotate with smooth progress indicator
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused || isLightboxOpen) return;

    const intervalTime = 7000;
    const stepTime = 100;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += stepTime;
      setProgress((elapsed / intervalTime) * 100);

      if (elapsed >= intervalTime) {
        elapsed = 0;
        setProgress(0);
        setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [activeBanners.length, isPaused, isLightboxOpen, currentIndex]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex % activeBanners.length];

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="topo-banner"
      className="relative w-full min-h-[640px] sm:min-h-[700px] lg:min-h-[780px] bg-[#0c0d12] overflow-hidden border-b border-[#3d3428]/70 flex items-center justify-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 100% DO BANNER: IMAGEM ATRÁS DE TODOS OS TEXTOS (SEM PEQUENA GALERIA LATERAL OU BARRA DE ROLAGEM) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {activeBanners.map((banner, idx) => (
          <div
            key={banner.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-full object-cover object-center filter contrast-110 brightness-90 transition-transform duration-1000"
            />
          </div>
        ))}

        {/* ATMOSFERA SOFISTICADA EGÍPCIA: BASE AREIA, OBSIDIANA & SULFATO DE COBRE */}
        {/* Gradiente vertical principal: garante legibilidade perfeita de cima a baixo */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-[#0c0d12]/80 to-[#0c0d12]/75" />
        
        {/* Gradiente radial centralizado com reforço lateral */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12]/95 via-[#0c0d12]/70 to-[#0c0d12]/90" />

        {/* Luzes cênicas suaves: Cobre e Azul Cobalto */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-[#0284c7]/12 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-[#c27839]/15 blur-[160px] rounded-full pointer-events-none" />
      </div>

      {/* BOTÕES DE NAVEGAÇÃO LATERAL (SUTIS, TIPO VIDRO EGÍPCIO, SEM NENHUMA BARRA DE ROLAGEM) */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Imagem anterior"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#12151e]/70 hover:bg-[#1e1711] text-[#d4c5b0] hover:text-[#e5985a] border border-[#3d3428] hover:border-[#c27839] backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Próxima imagem"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-[#12151e]/70 hover:bg-[#1e1711] text-[#d4c5b0] hover:text-[#e5985a] border border-[#3d3428] hover:border-[#c27839] backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </>
      )}

      {/* CHIP DE LOCALIZAÇÃO REAL & AMPLIAR FOTO (NO CANTO SUPERIOR DIREITO) */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-20 flex items-center gap-2">
        {currentBanner.unitCity && (
          <span className="px-3 py-1.5 rounded-full bg-[#12151e]/85 text-xs font-mono text-[#38bdf8] border border-[#0284c7]/40 backdrop-blur-md shadow-sm flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>{currentBanner.unitCity}</span>
          </span>
        )}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="px-3 py-1.5 rounded-full bg-[#12151e]/85 hover:bg-[#c27839] text-[#d4c5b0] hover:text-[#0c0d12] text-xs font-semibold border border-[#3d3428] hover:border-[#c27839] backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          title="Ver foto do banner em tamanho real"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Ampliar Foto</span>
        </button>
      </div>

      {/* CONTEÚDO PRINCIPAL SOBREPOSTO AO BANNER 100% */}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-10 text-center flex flex-col items-center">
        
        {/* KICKER OFICIAL HUGH GLASS */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e1711]/90 border border-[#c27839]/50 text-[#e5985a] text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-md mb-6">
          <Compass className="w-4 h-4 text-[#e5985a] shrink-0" />
          <span>{currentBanner.badge || 'HUGH GLASS • CONEXÃO • VISÃO • TERRITÓRIO • LEI FEDERAL 7.115/1983'}</span>
        </div>

        {/* HEADLINE MONUMENTAL */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-[#f5efe6] tracking-tight leading-[1.12] max-w-4xl drop-shadow-sm">
          {currentBanner.title || 'Seu Endereço Residencial Fixo & Comercial com Lockers 24/7'}
        </h1>

        {/* SUBHEADLINE CLARO & EXPLICATIVO */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#d4c5b0] font-normal leading-relaxed max-w-3xl">
          {currentBanner.description || (
            'Assim como as antigas caravanas egípcias que cruzavam continentes com pontos seguros de apoio, tenha seu endereço residencial fixo para documentos e encomendas, com a flexibilidade de contratar também o endereço comercial e fiscal para sua empresa.'
          )}
        </p>

        {/* 4 PILARES DE PRODUTO EM DESTAQUE (DIRECIONAMENTO CLARO: RESIDENCIAL vs COMERCIAL) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mt-8 sm:mt-10 max-w-5xl text-left">
          
          {/* PILAR 1: ENDEREÇO RESIDENCIAL */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141724]/75 border border-[#3d3428]/80 hover:border-[#c27839] backdrop-blur-md transition-all shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center mb-2.5">
              <Home className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-[#f5efe6] leading-tight">
              Endereço Residencial Fixo
            </div>
            <p className="text-xs text-[#9e8e78] mt-1 leading-normal">
              Comprovante oficial para CPF, contas bancárias, CNH e encomendas pessoais.
            </p>
          </div>

          {/* PILAR 2: ENDEREÇO COMERCIAL */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141724]/75 border border-[#0284c7]/40 hover:border-[#38bdf8] backdrop-blur-md transition-all shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center mb-2.5">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-[#f5efe6] leading-tight">
              Endereço Comercial & Fiscal
            </div>
            <p className="text-xs text-[#38bdf8]/85 mt-1 leading-normal">
              Para registro de CNPJ, MEI e emissão de notas fiscais sem expor seu lar.
            </p>
          </div>

          {/* PILAR 3: LOCKERS 24/7 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141724]/75 border border-[#3d3428]/80 hover:border-[#c27839] backdrop-blur-md transition-all shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center mb-2.5">
              <Package className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-[#f5efe6] leading-tight">
              Armários Lockers 24/7
            </div>
            <p className="text-xs text-[#9e8e78] mt-1 leading-normal">
              Retirada autônoma de compras e encomendas a qualquer hora via QR Code.
            </p>
          </div>

          {/* PILAR 4: DIGITALIZAÇÃO OCR */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#141724]/75 border border-[#0284c7]/40 hover:border-[#38bdf8] backdrop-blur-md transition-all shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#0284c7]/20 text-[#38bdf8] flex items-center justify-center mb-2.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="font-bold text-sm text-[#f5efe6] leading-tight">
              Digitalização OCR Sigilosa
            </div>
            <p className="text-xs text-[#38bdf8]/85 mt-1 leading-normal">
              Cartas digitalizadas com aviso imediato no WhatsApp e painel do cliente.
            </p>
          </div>

        </div>

        {/* BOTÕES DE AÇÃO PRINCIPAIS COM CONTRASTE COBRE & COBALTO */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
          <button
            onClick={() => scrollTo('planos')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-base shadow-xl shadow-[#c27839]/30 transition-all active:scale-95 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Contratar Meu Endereço</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('comparativo')}
            className="px-7 py-4 rounded-2xl bg-[#141724]/90 hover:bg-[#1a1f30] text-[#d4c5b0] hover:text-white font-bold text-base border border-[#3d3428] hover:border-[#0284c7]/70 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <span>Comparar Residencial vs. Comercial</span>
          </button>

          <button
            onClick={() => scrollTo('mapa')}
            className="px-6 py-4 rounded-2xl bg-[#12151e]/80 hover:bg-[#1a1f30] text-[#9e8e78] hover:text-[#d4c5b0] font-semibold text-sm border border-[#3d3428]/60 hover:border-[#3d3428] backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#c27839]" />
            <span>Ver Mapa de Lockers</span>
          </button>
        </div>

        {/* NAVEGAÇÃO DE SLIDES TOTALMENTE LIMPA (SEM BARRA DE ROLAGEM) */}
        {activeBanners.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8 pt-2">
            
            {/* Botão anterior para mobile */}
            <button
              onClick={handlePrev}
              aria-label="Banner anterior"
              className="sm:hidden p-1.5 rounded-lg bg-[#141724]/80 text-[#d4c5b0] border border-[#3d3428] cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Indicadores de pílulas limpas */}
            <div className="flex items-center gap-2">
              {activeBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  aria-label={`Ir para foto ${idx + 1}`}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-gradient-to-r from-[#c27839] to-[#38bdf8] shadow-sm'
                      : 'w-2 bg-[#3d3428] hover:bg-[#5a4e3d]'
                  }`}
                />
              ))}
            </div>

            {/* Botão próximo para mobile */}
            <button
              onClick={handleNext}
              aria-label="Próximo banner"
              className="sm:hidden p-1.5 rounded-lg bg-[#141724]/80 text-[#d4c5b0] border border-[#3d3428] cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Contador sutil */}
            <span className="text-xs font-mono text-[#9e8e78] ml-2">
              0{currentIndex + 1} / 0{activeBanners.length}
            </span>
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL QUANDO O USUÁRIO QUISER VER A FOTO COMPLETA EM DETALHES */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/95 backdrop-blur-md animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#12151e] border border-[#3d3428] rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#3d3428]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c27839]" />
                <h3 className="font-display text-base sm:text-lg font-bold text-[#f5efe6]">
                  {currentBanner.title}
                </h3>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#1a1f30] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video max-h-[65vh] w-full rounded-2xl overflow-hidden bg-[#0c0d12] border border-[#3d3428]">
              <img
                src={currentBanner.imageUrl}
                alt={currentBanner.title}
                className="w-full h-full object-contain"
              />
            </div>

            {currentBanner.description && (
              <p className="text-sm text-[#d4c5b0] leading-relaxed bg-[#0c0d12] p-4 rounded-2xl border border-[#3d3428]">
                {currentBanner.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
