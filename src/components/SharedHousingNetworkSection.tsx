import React, { useState } from 'react';
import { SHARED_HOUSING_UNITS } from '../data/mockData';
import { SharedHousingUnit, SiteMediaItem } from '../types';
import { 
  Building2, 
  Users, 
  Repeat, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Scale, 
  Layers, 
  Home, 
  CalendarCheck,
  TrendingUp,
  Award,
  Image as ImageIcon,
  Sliders,
  X,
  Maximize2,
  MapPin
} from 'lucide-react';

interface SharedHousingNetworkSectionProps {
  onGoToDashboard: () => void;
  onOpenSimulator: () => void;
  housingPhotos?: SiteMediaItem[];
  onOpenAdmin?: () => void;
}

export const SharedHousingNetworkSection: React.FC<SharedHousingNetworkSectionProps> = ({
  onGoToDashboard,
  onOpenSimulator,
  housingPhotos = [],
  onOpenAdmin
}) => {
  const [selectedUnit, setSelectedUnit] = useState<SharedHousingUnit>(SHARED_HOUSING_UNITS[0]);
  const [activeTab, setActiveTab] = useState<'network' | 'pillars' | 'gallery'>('network');
  const [selectedPhoto, setSelectedPhoto] = useState<SiteMediaItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');

  const totalNetworkBeds = SHARED_HOUSING_UNITS.reduce((acc, u) => acc + u.totalBeds, 0);
  const totalOccupied = SHARED_HOUSING_UNITS.reduce((acc, u) => acc + u.occupiedBeds, 0);
  const totalAvailable = SHARED_HOUSING_UNITS.reduce((acc, u) => acc + u.availableBeds, 0);

  const activePhotos = housingPhotos.filter((p) => p.isActive);
  const filteredPhotos = galleryFilter === 'all' 
    ? activePhotos 
    : activePhotos.filter(p => p.tags?.some(t => t.toLowerCase().includes(galleryFilter.toLowerCase())) || p.unitCity?.toLowerCase() === galleryFilter.toLowerCase());

  return (
    <section id="rede-moradia" className="py-20 lg:py-28 relative bg-slate-950 border-b border-slate-800">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Repeat className="w-4 h-4" />
            <span>Rede Nacional de Moradia & Intercâmbio de Leitos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Moradia Flexível, Cotas & Mobilidade
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            Não vendemos hospedagem por diária. Criamos uma rede de acomodações de uso compartilhado e longo prazo: você tem seu endereço-base permanente, mas pode usar qualquer leito disponível da rede pelo Brasil sem custos de hotel.
          </p>
        </div>

        {/* 3 Pillars Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Pillar 1 */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                PRODUTO 1 • CONTRATO RESIDENCIAL
              </span>
              <h3 className="text-xl font-bold text-white">Locação com Mobilidade</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contratos de 12, 24 ou 36 meses. Você mantém seu domicílio e correspondência na sua unidade de origem, mas quando viajar a trabalho ou estudo, reserva leitos livres em outras capitais pelo aplicativo.
              </p>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Endereço fixo comprovado por lei</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Intercâmbio interno entre moradores</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sem multas de diária de hotel</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                PRODUTO 2 • AQUISIÇÃO PATRIMONIAL
              </span>
              <h3 className="text-xl font-bold text-white">Cotas & Multipropriedade</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adquira cotas imobiliárias estruturadas com fração ideal em São Paulo, Floripa, BH ou Curitiba. Tenha o patrimônio valorizado enquanto usufrui dos benefícios de moradia e intercâmbio de toda a rede.
              </p>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Fração ideal com registro cartorial</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Direito de uso em todas as unidades</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Proteção contra inflação imobiliária</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="p-7 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-4 shadow-xl">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                PRODUTO 3 • POOL DE GESTÃO DO INVESTIDOR
              </span>
              <h3 className="text-xl font-bold text-white">Pool & Renda Passiva</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprou uma cota e não vai morar no local? Coloque o espaço sob a Pool de Gestão da Hugh Glass. Nós cuidamos de contratos, ocupação, manutenção e repassamos o aluguel líquido todo mês.
              </p>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-4 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Gestão 100% automatizada por app</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Taxa de ocupação balanceada (&gt;88%)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Rendimento mensal com extrato em tempo real</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive Network Units Grid */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-16">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800 mb-8">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider">
                DISPONIBILIDADE EM TEMPO REAL DA REDE
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Capacidade & Ocupação Dinâmica dos Hubs
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                O algoritmo de balanceamento distribui o fluxo de moradores e viajantes, garantindo leitos para intercâmbio sem ociosidade.
              </p>
            </div>

            {/* Network Total Stats Pills */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[10px]">Capacidade Total</span>
                <span className="text-white font-bold text-base">{totalNetworkBeds} leitos</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[10px]">Ocupação Atual</span>
                <span className="text-emerald-400 font-bold text-base">{totalOccupied} ({Math.round((totalOccupied/totalNetworkBeds)*100)}%)</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <span className="text-slate-500 block text-[10px]">Vagas para Intercâmbio</span>
                <span className="text-cyan-400 font-bold text-base">{totalAvailable} leitos</span>
              </div>
            </div>
          </div>

          {/* Units List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SHARED_HOUSING_UNITS.map((unit) => {
              const occupancyPct = Math.round((unit.occupiedBeds / unit.totalBeds) * 100);
              const isSelected = selectedUnit.id === unit.id;

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-4 ${
                    isSelected
                      ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/30 shadow-xl'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">{unit.state} • Hub Oficial</span>
                      <h4 className="text-base font-bold text-white">{unit.city}</h4>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold font-mono">
                      {unit.availableBeds} Vagas Livres
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-1">{unit.name}</p>

                  {/* Occupancy progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-slate-500">Ocupação: {unit.occupiedBeds}/{unit.totalBeds}</span>
                      <span className="text-emerald-400 font-bold">{occupancyPct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full"
                        style={{ width: `${occupancyPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Aluguel Base</span>
                      <span className="text-white font-bold">R$ {unit.baseMonthlyRent}/mês</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Cota Perpétua</span>
                      <span className="text-cyan-400 font-bold">R$ {unit.quotaPrice.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Unit Card */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white">{selectedUnit.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  AVCB BOMBEIROS HOMOLOGADO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Endereço: {selectedUnit.address} • CEP: {selectedUnit.cep} • Zoneamento: {selectedUnit.complianceLegal.zoningClassification}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedUnit.amenities.map((amenity, idx) => (
                  <span key={idx} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    ✓ {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenSimulator}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Simular Módulos & Engenharia</span>
              </button>

              <button
                onClick={onGoToDashboard}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <span>Ver Leitos no App</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* PHOTO GALLERY OF HOUSING STRUCTURE & INTERIOR (CONNECTED TO FIRESTORE) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-16 space-y-8" id="galeria-estrutura">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold uppercase mb-2">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Galeria Oficial da Estrutura & Ambientes Reais</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Espaços Planejados para Convivência & Produtividade
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Fotos reais das suítes acústicas, áreas de coworking 24/7, cozinhas compartilhadas em aço inox e rooftops dos nossos complexos modulares.
              </p>
            </div>

            {/* Admin trigger button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all self-start md:self-center"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gerenciar Fotos (Painel Admin)</span>
              </button>
            )}
          </div>

          {/* Gallery Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setGalleryFilter('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'all'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Todos os Ambientes ({activePhotos.length})
            </button>
            <button
              onClick={() => setGalleryFilter('Quarto')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'Quarto'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Suítes Privativas
            </button>
            <button
              onClick={() => setGalleryFilter('Coworking')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'Coworking'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Coworking & Estações
            </button>
            <button
              onClick={() => setGalleryFilter('Cozinha')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'Cozinha'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Cozinhas Inox
            </button>
            <button
              onClick={() => setGalleryFilter('Rooftop')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'Rooftop'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Rooftops & Lazer
            </button>
            <button
              onClick={() => setGalleryFilter('Florianópolis')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'Florianópolis'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Florianópolis
            </button>
            <button
              onClick={() => setGalleryFilter('São Paulo')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                galleryFilter === 'São Paulo'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              São Paulo
            </button>
          </div>

          {/* Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 overflow-hidden cursor-pointer shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {photo.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/40">
                      {photo.badge}
                    </span>
                  )}

                  {photo.unitCity && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-900/90 text-[10px] font-mono text-slate-300 flex items-center gap-1 border border-slate-700">
                      <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                      <span>{photo.unitCity}</span>
                    </span>
                  )}

                  <div className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <div className="p-4 space-y-1.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {photo.title}
                  </h4>
                  {photo.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {photo.description}
                    </p>
                  )}
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {photo.tags.map((tag, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* LIGHTBOX MODAL */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    {selectedPhoto.badge || 'Hugh Glass Estrutura Oficial'}
                  </span>
                  {selectedPhoto.unitCity && (
                    <span className="text-xs font-mono text-slate-400">
                      • {selectedPhoto.unitCity}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video max-h-[60vh] w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{selectedPhoto.title}</h3>
                {selectedPhoto.description && (
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                )}
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedPhoto.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* LEGAL & COMPLIANCE ARCHITECTURE SECTION */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase font-mono">
              <Scale className="w-3.5 h-3.5" />
              <span>Matriz Jurídica, Societária & Tributária</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Por que esta estrutura é 100% segura para proprietários e investidores?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Diferenciamos de forma transparente a locação residencial e o intercâmbio entre moradores da mera exploração hoteleira, blindando o patrimônio e respeitando todas as exigências legais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-emerald-400 font-bold font-mono text-sm block">
                1. Pessoa Física / Holding Patrimonial
              </span>
              <p className="text-slate-300 leading-relaxed">
                O proprietário do imóvel mantém a posse direta ou indireta através de locação tradicional sob a <strong>Lei do Inquilinato (Lei 8.245/91)</strong>, que reconhece expressamente as habitações coletivas multifamiliares. A contratação de empresa gestora não transforma o proprietário em pessoa jurídica hoteleira.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-cyan-400 font-bold font-mono text-sm block">
                2. Empresa Gestora & Plataforma
              </span>
              <p className="text-slate-300 leading-relaxed">
                A administradora presta serviços de cobrança, manutenção, atendimento, controle de acessos por QR Code/BLE e gestão documental. O morador assina <strong>contrato de longa duração</strong> com direito a transferência temporária de utilização na rede, sem cobrança de diárias abertas ao público.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
              <span className="text-teal-400 font-bold font-mono text-sm block">
                3. Código de Obras & Bombeiros
              </span>
              <p className="text-slate-300 leading-relaxed">
                Para 500 ou 1.000 pessoas, o projeto é dimensionado conforme a legislação municipal de uso do solo, saídas de emergência, prevenção contra incêndio (AVCB), sanitários por habitante e acessibilidade (NBR 9050), garantindo alvará e regularidade plena.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
