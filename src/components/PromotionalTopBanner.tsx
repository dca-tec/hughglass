import React, { useState, useEffect } from 'react';
import { SiteMediaItem } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2,
  Settings,
  Eye,
  Camera,
  Layers
} from 'lucide-react';

interface PromotionalTopBannerProps {
  banners: SiteMediaItem[];
  onOpenAdmin?: () => void;
  onCtaClick?: (targetUrl?: string) => void;
}

export const PromotionalTopBanner: React.FC<PromotionalTopBannerProps> = ({
  banners,
  onOpenAdmin,
  onCtaClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Filter only active banners and sort by displayOrder
  const activeBanners = banners.filter((b) => b.isActive);

  // Auto-rotate every 6 seconds if not hovered or in lightbox
  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused || isDismissed || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeBanners.length, isPaused, isDismissed, isLightboxOpen]);

  if (activeBanners.length === 0 || isDismissed) {
    return null;
  }

  // Safe index bounds
  const currentBanner = activeBanners[currentIndex % activeBanners.length];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleCta = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCtaClick) {
      onCtaClick(currentBanner.targetUrl);
    } else if (currentBanner.targetUrl?.startsWith('#')) {
      const el = document.querySelector(currentBanner.targetUrl);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getAccentGradient = (color?: string) => {
    switch (color) {
      case 'cyan':
        return 'from-cyan-950/80 via-slate-900/90 to-blue-950/80 border-cyan-500/40 text-cyan-400';
      case 'teal':
        return 'from-teal-950/80 via-slate-900/90 to-emerald-950/80 border-teal-500/40 text-teal-400';
      case 'purple':
        return 'from-purple-950/80 via-slate-900/90 to-indigo-950/80 border-purple-500/40 text-purple-400';
      default:
        return 'from-emerald-950/80 via-slate-900/90 to-cyan-950/80 border-emerald-500/40 text-emerald-400';
    }
  };

  return (
    <>
      <div 
        className="relative w-full overflow-hidden border-b border-slate-800 bg-slate-950 transition-all duration-500 select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        id="top-promotional-fullbanner"
      >
        {/* Subtle Ambient Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-20 filter blur-[2px] scale-105 pointer-events-none"
          style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${getAccentGradient(currentBanner.accentColor)} pointer-events-none`} />

        <div className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            
            {/* Left Column: Vivid Picture Thumbnail + Banner Texts */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
              
              {/* VIVID IMAGE THUMBNAIL (Allows user to see the photo clearly with 100% opacity) */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                title="Clique para ver a foto em alta resolução"
                className="relative w-24 sm:w-36 h-16 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-700/80 shadow-lg cursor-pointer group/img hover:border-emerald-400 transition-all"
              >
                <img
                  src={currentBanner.imageUrl}
                  alt={currentBanner.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                </div>
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-[8px] sm:text-[9px] font-mono text-emerald-400 font-bold backdrop-blur-sm">
                  Foto Real
                </span>
              </div>

              {/* Title, Badge and Description */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {currentBanner.badge && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-black tracking-wider uppercase shadow-sm">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                      <span>{currentBanner.badge}</span>
                    </span>
                  )}
                  {currentBanner.unitCity && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                      {currentBanner.unitCity}
                    </span>
                  )}
                </div>

                <h4 className="text-xs sm:text-sm font-extrabold text-white tracking-tight line-clamp-1 flex items-center gap-1.5">
                  <span>{currentBanner.title}</span>
                </h4>

                {currentBanner.description && (
                  <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 leading-relaxed font-normal">
                    {currentBanner.description}
                  </p>
                )}
              </div>

            </div>

            {/* Right Column: CTA + Carousel Controls + Admin Button */}
            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
              
              {/* Carousel Indicators / Thumbnails for all active banners */}
              {activeBanners.length > 1 && (
                <div className="flex items-center gap-1 sm:gap-1.5 mr-1">
                  {activeBanners.map((b, idx) => (
                    <button
                      key={b.id || idx}
                      onClick={() => setCurrentIndex(idx)}
                      title={`Ver banner: ${b.title}`}
                      className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg overflow-hidden border transition-all ${
                        idx === currentIndex
                          ? 'border-emerald-400 ring-2 ring-emerald-500/40 scale-105'
                          : 'border-slate-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={b.imageUrl} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Prev / Next Arrows */}
              {activeBanners.length > 1 && (
                <div className="flex items-center bg-slate-900/90 rounded-xl border border-slate-800 p-0.5">
                  <button 
                    onClick={handlePrev}
                    title="Banner anterior"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={handleNext}
                    title="Próximo banner"
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Action Button */}
              {currentBanner.ctaText && (
                <button
                  onClick={handleCta}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black tracking-tight shadow-md hover:shadow-emerald-500/30 transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
                >
                  <span>{currentBanner.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Shortcut to Admin */}
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  title="Gerenciar fotos e banners no Painel Admin"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800/80 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Dismiss Button */}
              <button
                onClick={() => setIsDismissed(true)}
                title="Ocultar banner temporariamente"
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>

        </div>

        {/* Dynamic Rotation Progress Bar */}
        {activeBanners.length > 1 && !isPaused && (
          <div className="w-full h-0.5 bg-slate-800/60 overflow-hidden">
            <div 
              key={currentIndex}
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"
              style={{ width: '100%' }}
            />
          </div>
        )}
      </div>

      {/* FULL RESOLUTION LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {currentBanner.title}
                </h3>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video max-h-[65vh] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={currentBanner.imageUrl}
                alt={currentBanner.title}
                className="w-full h-full object-contain"
              />
            </div>

            {currentBanner.description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {currentBanner.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-mono text-slate-400">
                {currentIndex + 1} de {activeBanners.length} banners ativos
              </span>
              <div className="flex items-center gap-2">
                {currentBanner.ctaText && (
                  <button
                    onClick={(e) => {
                      setIsLightboxOpen(false);
                      handleCta(e);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all"
                  >
                    {currentBanner.ctaText}
                  </button>
                )}
                {onOpenAdmin && (
                  <button
                    onClick={() => {
                      setIsLightboxOpen(false);
                      onOpenAdmin();
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
                  >
                    Editar no Admin
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
