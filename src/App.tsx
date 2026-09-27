import React, { useState, useEffect } from 'react';
import { UserProfileType, SiteMediaItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroFullBanner } from './components/HeroFullBanner';
import { AddressTypesComparison } from './components/AddressTypesComparison';
import { HowItWorksSection } from './components/HowItWorksSection';
import { InteractiveMap } from './components/InteractiveMap';
import { CleanPricingSection } from './components/CleanPricingSection';
import { FaqSection } from './components/FaqSection';
import { CheckoutModal } from './components/CheckoutModal';
import { ClientDashboard } from './components/Dashboard/ClientDashboard';
import { GovBrModal } from './components/GovBrModal';
import { AdminPortal } from './components/Admin/AdminPortal';
import { subscribeSiteMedia } from './lib/mediaService';
import { DEFAULT_SITE_MEDIA } from './data/defaultMedia';
import { 
  Package, 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Mail, 
  FileText,
  Building2,
  Home,
  CheckCircle2,
  Sliders,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'admin'>('landing');
  const [isGovBrModalOpen, setIsGovBrModalOpen] = useState<boolean>(false);
  const [isGovBrVerified, setIsGovBrVerified] = useState<boolean>(false);
  const [siteMediaItems, setSiteMediaItems] = useState<SiteMediaItem[]>(DEFAULT_SITE_MEDIA);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<'residential' | 'commercial' | 'combo'>('residential');
  const [billingCycleForCheckout, setBillingCycleForCheckout] = useState<'monthly' | 'yearly'>('monthly');

  // Subscribe to real-time Firestore updates for site media
  useEffect(() => {
    const unsubscribe = subscribeSiteMedia((items) => {
      setSiteMediaItems(items);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenCheckout = (
    planId: 'residential' | 'commercial' | 'combo' = 'residential',
    billingCycle: 'monthly' | 'yearly' = 'monthly'
  ) => {
    setSelectedPlanForCheckout(planId);
    setBillingCycleForCheckout(billingCycle);
    setIsCheckoutOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f5efe6] font-sans antialiased selection:bg-[#c27839] selection:text-[#0c0d12] flex flex-col justify-between">
      
      {/* 1. CLEAN STARTUP NAVBAR (Single-row, never overlaps) */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenGovBr={() => setIsGovBrModalOpen(true)}
      />

      {/* VIEW SWITCHING: ADMIN CMS */}
      {currentView === 'admin' ? (
        <AdminPortal
          mediaItems={siteMediaItems}
          onBackToSite={() => setCurrentView('landing')}
        />
      ) : currentView === 'dashboard' ? (
        /* VIEW SWITCHING: CLIENT DASHBOARD */
        <ClientDashboard
          onBackToLanding={() => setCurrentView('landing')}
          onOpenGovBr={() => setIsGovBrModalOpen(true)}
          isGovBrVerified={isGovBrVerified}
        />
      ) : (
        /* VIEW: CLEAN, ORGANIZED STARTUP LANDING PAGE */
        <main className="flex-1">
          
          {/* 1. HERO FULLBANNER NO TOPO (Carrega fotos reais do Firestore) */}
          <HeroFullBanner
            banners={siteMediaItems.filter((i) => i.category === 'top_banner')}
            onOpenAdmin={() => setCurrentView('admin')}
            onSelectPlan={() => handleScrollTo('planos')}
          />

          {/* 2. CLAREZA DE PRODUTO: ENDEREÇO RESIDENCIAL VS. COMERCIAL (CNPJ) */}
          <AddressTypesComparison
            onSelectPlan={(planId) => handleOpenCheckout(planId, 'monthly')}
          />

          {/* 3. COMO FUNCIONA EM 3 PASSOS SIMPLES */}
          <HowItWorksSection
            onSelectPlan={() => handleScrollTo('planos')}
          />

          {/* 4. MAPA DE HUBS & LOCKERS 24/7 NAS PRINCIPAIS CAPITAIS */}
          <InteractiveMap 
            lockerPhotos={siteMediaItems.filter((i) => i.category === 'lockers_gallery')}
            onOpenAdmin={() => setCurrentView('admin')}
          />

          {/* 5. TABELA DE PLANOS & PREÇOS (DIRECIONAMENTO DIRETO PARA VENDA) */}
          <CleanPricingSection
            onSelectPlan={(planId, billingCycle) => handleOpenCheckout(planId, billingCycle)}
          />

          {/* 6. PERGUNTAS FREQUENTES (FAQ & LEI 7.115/83) */}
          <FaqSection />

        </main>
      )}

      {/* CHECKOUT / CONTRATAÇÃO MODAL */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlanId={selectedPlanForCheckout}
        billingCycle={billingCycleForCheckout}
        onGoToDashboard={() => {
          setIsCheckoutOpen(false);
          setCurrentView('dashboard');
        }}
      />

      {/* GOV.BR AUTHENTICATION MODAL */}
      <GovBrModal
        isOpen={isGovBrModalOpen}
        onClose={() => setIsGovBrModalOpen(false)}
        onSuccessVerified={() => {
          setIsGovBrVerified(true);
          setIsGovBrModalOpen(false);
        }}
      />

      {/* CLEAN STARTUP FOOTER IN NOBLE EGYPTIAN COPPER & SAND */}
      {currentView === 'landing' && (
        <footer className="bg-[#08090d] border-t border-[#3d3428]/70 py-14 text-[#d4c5b0] text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              
              <div className="space-y-3 md:col-span-1">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#c27839] via-[#d18242] to-[#e5985a] flex items-center justify-center text-[#0c0d12] shadow-md shadow-[#c27839]/20">
                    <Package className="w-5 h-5 text-[#0c0d12] stroke-[2.5]" />
                  </div>
                  <span className="font-display text-xl font-bold text-[#f5efe6]">Nômade<span className="text-[#d18242]">Hub</span></span>
                </div>
                <p className="text-[#d4c5b0] text-xs sm:text-sm leading-relaxed">
                  Rede de endereços residenciais fixos e domicílio comercial/fiscal com armários inteligentes 24/7.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-[#e5985a] font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-[#d18242]" />
                  <span>Amparo na Lei Federal 7.115/1983</span>
                </div>
              </div>

              <div>
                <h4 className="font-display text-[#f5efe6] font-bold text-xs uppercase tracking-wider mb-3">
                  Produtos
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li><button onClick={() => handleScrollTo('endereco-residencial')} className="hover:text-[#e5985a] transition-colors cursor-pointer">Endereço Residencial (CPF)</button></li>
                  <li><button onClick={() => handleScrollTo('endereco-comercial')} className="hover:text-[#38bdf8] transition-colors cursor-pointer">Endereço Comercial / MEI (CNPJ)</button></li>
                  <li><button onClick={() => handleScrollTo('comparativo')} className="hover:text-[#e5985a] transition-colors cursor-pointer">Combo Nômade Pro</button></li>
                  <li><button onClick={() => handleScrollTo('lockers-mapa')} className="hover:text-[#38bdf8] transition-colors cursor-pointer">Rede de Lockers 24h</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-[#f5efe6] font-bold text-xs uppercase tracking-wider mb-3">
                  Transparência & Legal
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li><span className="text-[#9e8e78]">Lei nº 7.115/1983 (Declaração de Residência)</span></li>
                  <li><span className="text-[#9e8e78]">Sigilo Postal (CF/88 Art. 5º XII)</span></li>
                  <li><span className="text-[#9e8e78]">Zoneamento Comercial Homologado</span></li>
                  <li><span className="text-[#9e8e78]">Termos de Uso e Privacidade LGPD</span></li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-[#f5efe6] font-bold text-xs uppercase tracking-wider mb-3">
                  Acesso Rápido
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-[#e5985a] font-medium transition-colors cursor-pointer">Acessar Meu Painel do Cliente</button></li>
                  <li><button onClick={() => setCurrentView('admin')} className="hover:text-[#38bdf8] font-medium transition-colors flex items-center gap-1 cursor-pointer"><Sliders className="w-3.5 h-3.5" /> Painel Admin (Banners & Mídias)</button></li>
                  <li><button onClick={() => setIsGovBrModalOpen(true)} className="hover:text-[#38bdf8] font-medium transition-colors cursor-pointer">Validar com Gov.br</button></li>
                </ul>
              </div>

            </div>

            <div className="pt-8 border-t border-[#3d3428]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9e8e78]">
              <p>© 2026 NômadeHub Tecnologia e Logística Urbana S.A. Inspirado no legado nômade ancestral.</p>
              <div className="flex items-center gap-4">
                <span>CNPJ: 48.910.412/0001-83</span>
                <span>•</span>
                <span>Florianópolis • São Paulo • Curitiba</span>
              </div>
            </div>
          </div>
        </footer>
      )}

    </div>
  );
}
