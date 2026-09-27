import React, { useEffect, useRef, useState } from 'react';
import { HubLocation, SiteMediaItem } from '../types';
import { HUBS_DATA } from '../data/mockData';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Zap, 
  Waves, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Phone, 
  Search,
  Image as ImageIcon,
  Sliders,
  Maximize2,
  X,
  Compass
} from 'lucide-react';
import L from 'leaflet';

interface InteractiveMapProps {
  onSelectHub?: (hub: HubLocation) => void;
  lockerPhotos?: SiteMediaItem[];
  onOpenAdmin?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  onSelectHub,
  lockerPhotos = [],
  onOpenAdmin
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedHub, setSelectedHub] = useState<HubLocation>(HUBS_DATA[0]);
  const [filterType, setFilterType] = useState<'all' | 'vanlife' | 'human_desk'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<SiteMediaItem | null>(null);

  const activeLockerPhotos = lockerPhotos.filter((p) => p.isActive);

  const filteredHubs = HUBS_DATA.filter((hub) => {
    const matchesSearch = 
      hub.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.state.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'vanlife') return hub.hasVanlifeSupport;
    if (filterType === 'human_desk') return hub.hasHumanDesk;
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [selectedHub.lat, selectedHub.lng],
        zoom: 12,
        zoomControl: true,
        attributionControl: false
      });

      // CartoDB Voyager map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Add Markers for each hub in Egyptian Copper and Cobalt
    filteredHubs.forEach((hub) => {
      const isSelected = hub.id === selectedHub.id;

      const customIcon = L.divIcon({
        className: 'custom-hub-marker',
        html: `
          <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            cursor: pointer;
          ">
            <div style="
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: ${isSelected ? 'rgba(194, 120, 57, 0.45)' : 'rgba(2, 132, 199, 0.25)'};
              animation: ${isSelected ? 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none'};
            "></div>
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              background: ${isSelected ? '#c27839' : '#0c2b47'};
              border: 2px solid ${isSelected ? '#f5efe6' : '#38bdf8'};
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${isSelected ? '#0c0d12' : '#f5efe6'};
              box-shadow: 0 4px 14px rgba(0,0,0,0.5);
              font-weight: 800;
              font-size: 11px;
            ">
              ${hub.availableLockers}
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const marker = L.marker([hub.lat, hub.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedHub(hub);
        if (onSelectHub) onSelectHub(hub);
        map.flyTo([hub.lat, hub.lng], 14, { duration: 1.2 });
      });

      markersRef.current[hub.id] = marker;
    });
  }, [filteredHubs, selectedHub.id]);

  const handleSelectCard = (hub: HubLocation) => {
    setSelectedHub(hub);
    if (onSelectHub) onSelectHub(hub);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([hub.lat, hub.lng], 14, { duration: 1.2 });
    }
  };

  return (
    <section id="lockers-mapa" className="py-16 lg:py-24 relative bg-[#0c0d12]/95 border-t border-b border-[#3d3428]/60">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1711] border border-[#c27839]/40 text-[#e5985a] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#e5985a]" />
            <span>INFRAESTRUTURA FÍSICA CONECTADA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5efe6] tracking-tight">
            Mapa de Lockers & Pontos de Apoio em Tempo Real
          </h2>
          <p className="mt-3 text-[#d4c5b0] text-base sm:text-lg leading-relaxed">
            Consulte a disponibilidade de armários autônomos 24/7 e pontos de apoio equipados com tomadas, Wi-Fi e água para quem vive em constante movimento.
          </p>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-gradient-to-r from-[#c27839] to-[#d18242] text-[#0c0d12] shadow-md font-black'
                  : 'bg-[#141724] border border-[#3d3428] text-[#d4c5b0] hover:bg-[#1a1f30]'
              }`}
            >
              Todos os Hubs ({HUBS_DATA.length})
            </button>
            <button
              onClick={() => setFilterType('vanlife')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                filterType === 'vanlife'
                  ? 'bg-gradient-to-r from-[#c27839] to-[#d18242] text-[#0c0d12] shadow-md font-black'
                  : 'bg-[#141724] border border-[#3d3428] text-[#d4c5b0] hover:bg-[#1a1f30]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Apoio Vanlife & Nômade</span>
            </button>
            <button
              onClick={() => setFilterType('human_desk')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                filterType === 'human_desk'
                  ? 'bg-gradient-to-r from-[#c27839] to-[#d18242] text-[#0c0d12] shadow-md font-black'
                  : 'bg-[#141724] border border-[#3d3428] text-[#d4c5b0] hover:bg-[#1a1f30]'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-[#e5985a]" />
              <span>Recepção Humana</span>
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9e8e78]" />
            <input 
              type="text"
              placeholder="Buscar por cidade ou estado..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141724] border border-[#3d3428] rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-[#f5efe6] placeholder-[#9e8e78] focus:outline-none focus:border-[#c27839] transition-colors"
            />
          </div>

        </div>

        {/* MAP & LIST GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* MAP CONTAINER */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border-2 border-[#3d3428] shadow-2xl relative bg-[#12151e]">
            <div 
              ref={mapContainerRef} 
              className="w-full h-[450px] sm:h-[520px] lg:h-[580px] z-0" 
            />

            {/* STATUS BADGE OVERLAY */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#0c0d12]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#3d3428] text-xs font-mono text-[#d4c5b0]">
              <span className="w-2 h-2 rounded-full bg-[#e5985a] animate-pulse"></span>
              <span>{filteredHubs.length} Hubs Conectados 24/7</span>
            </div>
          </div>

          {/* HUBS LIST SIDEBAR */}
          <div className="lg:col-span-4 space-y-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredHubs.map((hub) => {
              const isSelected = hub.id === selectedHub.id;
              return (
                <div
                  key={hub.id}
                  onClick={() => handleSelectCard(hub)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1e1711] border-[#c27839] shadow-lg ring-1 ring-[#c27839]/40'
                      : 'bg-[#12151e] border-[#3d3428] hover:border-[#c27839]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#e5985a] uppercase">
                        {hub.city}, {hub.state}
                      </span>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#f5efe6] mt-0.5">
                        {hub.name}
                      </h4>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#0c0d12] text-[10px] font-mono font-bold text-[#38bdf8] border border-[#0284c7]/30 shrink-0">
                      {hub.availableLockers} livres
                    </span>
                  </div>

                  <p className="text-xs text-[#d4c5b0] mt-2 line-clamp-1">
                    {hub.address}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#3d3428]/60 flex items-center justify-between text-[11px] text-[#9e8e78]">
                    <div className="flex items-center gap-1 text-[#e8e2d8]">
                      <Clock className="w-3 h-3 text-[#d18242]" />
                      <span>{hub.is24h ? 'Aberto 24 Horas' : '08:00 às 20:00'}</span>
                    </div>

                    {hub.hasVanlifeSupport && (
                      <span className="text-[#38bdf8] font-medium flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Vanlife
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* PHYSICAL LOCKER PHOTO GALLERY (REAL FIRESTORE PHOTOS) */}
        {activeLockerPhotos.length > 0 && (
          <div className="mt-14 pt-12 border-t border-[#3d3428]/60 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c27839]/20 text-[#e5985a] flex items-center justify-center border border-[#c27839]/30">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-base font-bold text-[#f5efe6]">
                    Estrutura Física dos Terminais & Estações Vanlife
                  </h4>
                  <p className="text-xs text-[#d4c5b0]">
                    Fotos reais dos armários blindados, esteiras de triagem OCR e totens autônomos 24/7
                  </p>
                </div>
              </div>

              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="px-3.5 py-1.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] text-[#d4c5b0] text-xs font-semibold flex items-center gap-1.5 transition-all border border-[#3d3428] cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#e5985a]" />
                  <span>Gerenciar Mídias no Admin</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeLockerPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group rounded-2xl bg-[#12151e] border border-[#3d3428] hover:border-[#c27839] overflow-hidden cursor-pointer shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#0c0d12]">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {photo.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0c0d12]/90 text-[10px] font-mono font-bold text-[#e5985a] border border-[#c27839]/30">
                        {photo.badge}
                      </span>
                    )}
                    {photo.unitCity && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#141724]/90 text-[10px] font-mono text-[#38bdf8] border border-[#0284c7]/30">
                        {photo.unitCity}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h5 className="font-display text-xs font-bold text-[#f5efe6] group-hover:text-[#e5985a] transition-colors line-clamp-1">
                      {photo.title}
                    </h5>
                    {photo.description && (
                      <p className="text-[11px] text-[#d4c5b0] line-clamp-2 leading-relaxed">
                        {photo.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIGHTBOX FOR LOCKER PHOTOS */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c0d12]/95 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedPhoto(null)}
          >
            <div 
              className="relative max-w-3xl w-full bg-[#12151e] border border-[#3d3428] rounded-3xl overflow-hidden shadow-2xl p-5 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#3d3428]">
                <span className="font-display text-xs font-bold text-[#e5985a] uppercase">
                  {selectedPhoto.title} {selectedPhoto.unitCity ? `(${selectedPhoto.unitCity})` : ''}
                </span>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video max-h-[55vh] rounded-xl overflow-hidden bg-[#0c0d12]">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {selectedPhoto.description && (
                <p className="text-xs text-[#d4c5b0] leading-relaxed pt-1">
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
