import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Users, 
  Award, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Download,
  Building2,
  Image as ImageIcon,
  Sliders,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiteMediaItem } from '../types';

interface SocialImpactModuleProps {
  onSuccessDonation?: () => void;
  socialImpactPhotos?: SiteMediaItem[];
  onOpenAdmin?: () => void;
}

export const SocialImpactModule: React.FC<SocialImpactModuleProps> = ({
  onSuccessDonation,
  socialImpactPhotos = [],
  onOpenAdmin
}) => {
  const [selectedTier, setSelectedTier] = useState<number>(1);
  const [donorName, setDonorName] = useState<string>('');
  const [donorType, setDonorType] = useState<'individual' | 'corporate'>('individual');
  const [certificateIssued, setCertificateIssued] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SiteMediaItem | null>(null);

  const activeSocialPhotos = socialImpactPhotos.filter((p) => p.isActive);

  const handleSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti optional
    }

    setCertificateIssued(true);
  };

  const getTierPrice = () => {
    if (selectedTier === 1) return 19;
    if (selectedTier === 3) return 49;
    return 150; // 10 people
  };

  return (
    <section id="impacto-social" className="py-16 lg:py-24 relative bg-slate-900/40 border-b border-slate-800">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-4 h-4" />
            <span>Responsabilidade Social & Cidadania ESG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Programa "Apadrinhe um Endereço"
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Sem endereço, não há cidadania. No Brasil, milhares de trabalhadores informais, catadores e pessoas em trânsito não conseguem emitir RG, carteira de trabalho ou abrir conta bancária por falta de comprovante de residência.
          </p>
        </div>

        {/* Impact Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-mono">
              487
            </span>
            <h4 className="text-sm font-bold text-white mt-2">Cidadãos Apadrinhados</h4>
            <p className="text-xs text-slate-400 mt-1">Pessoas em vulnerabilidade com endereço formal ativo.</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
              1.240+
            </span>
            <h4 className="text-sm font-bold text-white mt-2">Documentos e Cartões Entregues</h4>
            <p className="text-xs text-slate-400 mt-1">RGs, CTPS digital e cartões de benefício recebidos nos hubs.</p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-mono">
              100%
            </span>
            <h4 className="text-sm font-bold text-white mt-2">Auditoria & Amparo Legal</h4>
            <p className="text-xs text-slate-400 mt-1">Em estrita conformidade com a Lei Federal 7.115/83.</p>
          </div>
        </div>

        {/* Sponsor Form & Certificate Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Left Column: Interactive Sponsorship selection */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase font-bold tracking-wider">
                Para Empresas e Doadores Individuais
              </span>
              <h3 className="text-2xl font-bold text-white">
                Como você deseja apoiar hoje?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                Sua contribuição custeia a infraestrutura física de armários e triagem humana nos hubs para quem mais precisa.
              </p>
            </div>

            {/* Select Tier Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedTier(1)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  selectedTier === 1
                    ? 'bg-slate-800 border-cyan-400 text-white ring-1 ring-cyan-400/40 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-lg font-black block font-mono">1 Vida</span>
                <span className="text-xs text-cyan-400 font-bold">R$ 19/mês</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier(3)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  selectedTier === 3
                    ? 'bg-slate-800 border-cyan-400 text-white ring-1 ring-cyan-400/40 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-lg font-black block font-mono">3 Vidas</span>
                <span className="text-xs text-cyan-400 font-bold">R$ 49/mês</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier(10)}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  selectedTier === 10
                    ? 'bg-slate-800 border-emerald-400 text-white ring-1 ring-emerald-400/40 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-lg font-black block font-mono">10 Vidas</span>
                <span className="text-xs text-emerald-400 font-bold">R$ 150/mês</span>
                <span className="text-[9px] text-slate-400 block">Selo ESG PJ</span>
              </button>
            </div>

            {/* Donation Form */}
            {!certificateIssued ? (
              <form onSubmit={handleSponsor} className="space-y-3.5 pt-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDonorType('individual')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${donorType === 'individual' ? 'bg-slate-800 text-white' : 'bg-slate-900 text-slate-400'}`}
                  >
                    Pessoa Física
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonorType('corporate')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold ${donorType === 'corporate' ? 'bg-slate-800 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}
                  >
                    Empresa / ESG
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {donorType === 'corporate' ? 'Razão Social ou Nome Fantasia da Empresa' : 'Seu Nome ou Apelido do Doador'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={donorType === 'corporate' ? 'Ex: Tech Nômade Soluções Ltda' : 'Ex: Lucas Mendes Ferreira'}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Apadrinhar Agora ({selectedTier} {selectedTier === 1 ? 'Endereço' : 'Endereços'} - R$ {getTierPrice()}/mês)</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Apadrinhamento Registrado com Sucesso!</span>
                </div>
                <p className="text-xs text-slate-300">
                  Obrigado, <strong>{donorName}</strong>. Sua contribuição de <strong>R$ {getTierPrice()}/mês</strong> já viabilizou formalmente o endereço e o acolhimento logístico de {selectedTier} pessoa(s).
                </p>
                <button
                  onClick={() => setCertificateIssued(false)}
                  className="text-xs text-emerald-400 hover:underline font-semibold"
                >
                  Fazer outro apadrinhamento
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Visual ESG Digital Certificate Display */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl relative overflow-hidden font-sans">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Certificado de Apoio Cidadão ESG</span>
                    <span className="text-[10px] text-slate-400 font-mono">HASH: ESG-NH-2026-9921</span>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono">
                  AUTÊNTICO
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <p className="text-center text-slate-400 text-[11px] uppercase tracking-wider font-mono">
                  Certificamos que
                </p>
                <p className="text-center text-lg font-black text-white font-mono">
                  {donorName || 'Sua Empresa / Seu Nome Aqui'}
                </p>
                <p className="text-center text-slate-300 leading-relaxed text-xs">
                  contribui ativamente para a erradicação da invisibilidade documental no Brasil, patrocinando a infraestrutura postal de <strong>{selectedTier} cidadão(s) em trânsito</strong> através da rede colaborativa Hugh Glass.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Lei 7.115/83 • Domicílio Social</span>
                <span className="text-emerald-400 font-mono">Validado em 2026</span>
              </div>

            </div>
          </div>

        </div>

        {/* SOCIAL IMPACT PHOTOS GALLERY */}
        {activeSocialPhotos.length > 0 && (
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Registros do Impacto Social • Pessoas & Entregas
                  </h4>
                  <p className="text-xs text-slate-400">
                    Ações de inclusão postal, acolhimento de nômades e regularização cidadã
                  </p>
                </div>
              </div>
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all self-start sm:self-auto"
                >
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Gerenciar Fotos</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeSocialPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 overflow-hidden cursor-pointer shadow-lg transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {photo.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30">
                        {photo.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h5 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
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
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
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
