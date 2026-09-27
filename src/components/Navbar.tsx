import React from 'react';
import { 
  Package, 
  ArrowRight,
  Sliders,
  User,
  Compass
} from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard' | 'admin';
  setCurrentView: (view: 'landing' | 'dashboard' | 'admin') => void;
  onOpenGovBr: () => void;
  darkMode?: boolean;
  setDarkMode?: (val: boolean) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onOpenGovBr
}) => {
  const scrollTo = (id: string) => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0c0d12]/95 backdrop-blur-md border-b border-[#3d3428]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Single Brand Wordmark in Egyptian Style */}
        <div 
          onClick={() => setCurrentView('landing')}
          className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c27839] via-[#d18242] to-[#e5985a] flex items-center justify-center text-[#0c0d12] shadow-md shadow-[#c27839]/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-[#0c0d12] stroke-[2.5]" />
          </div>
          <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#f5efe6]">
            Nômade<span className="text-[#d18242]">Hub</span>
          </span>
        </div>

        {/* Zone 2: Clean 4 Navigation Links in Warm Sand & Copper Hover */}
        {currentView === 'landing' && (
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#d4c5b0]">
            <button 
              onClick={() => scrollTo('como-funciona')}
              className="hover:text-[#e5985a] transition-colors"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollTo('endereco-residencial')}
              className="hover:text-[#e5985a] transition-colors"
            >
              Endereço Residencial
            </button>
            <button 
              onClick={() => scrollTo('endereco-comercial')}
              className="hover:text-[#38bdf8] transition-colors"
            >
              Comercial & CNPJ
            </button>
            <button 
              onClick={() => scrollTo('planos')}
              className="hover:text-[#e5985a] transition-colors"
            >
              Planos & Preços
            </button>
            <button 
              onClick={() => scrollTo('faq')}
              className="hover:text-[#d4c5b0] transition-colors text-[#9e8e78]"
            >
              Dúvidas
            </button>
          </nav>
        )}

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* Admin shortcut */}
          <button
            onClick={() => setCurrentView('admin')}
            title="Acessar Painel Admin de Mídia e Banners"
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'admin'
                ? 'bg-[#c27839] text-[#0c0d12] font-black border-[#c27839]'
                : 'bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] hover:text-[#f5efe6] border-[#3d3428]'
            }`}
          >
            <Sliders className="w-4 h-4 text-[#e5985a]" />
            <span className="hidden md:inline">Admin Fotos</span>
          </button>

          {/* Client Dashboard button */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border ${
              currentView === 'dashboard'
                ? 'bg-[#1a1f30] text-[#f5efe6] border-[#3d3428]'
                : 'bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] border-[#3d3428]'
            }`}
          >
            <User className="w-4 h-4 text-[#d18242]" />
            <span className="hidden sm:inline">Meu Painel</span>
          </button>

          {/* Primary CTA: Assinar Endereço in Copper */}
          <button
            onClick={() => scrollTo('planos')}
            className="px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-[#c27839] via-[#d18242] to-[#e5985a] hover:from-[#b4652a] hover:to-[#c27839] text-[#0c0d12] font-black text-xs sm:text-sm shadow-md shadow-[#c27839]/20 transition-all active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Assinar Agora</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

        </div>

      </div>
    </header>
  );
};
