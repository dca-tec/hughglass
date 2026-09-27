import React, { useState } from 'react';
import { INITIAL_NOMAD_STOPS, PRIVACY_PROXIES } from '../../data/mockData';
import { NomadRouteStop, PrivacyProxyIdentity } from '../../types';
import { 
  Compass, 
  ShieldAlert, 
  MapPin, 
  Plus, 
  Check, 
  Copy, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  AlertTriangle,
  Lock,
  EyeOff
} from 'lucide-react';

export const NomadPassportPrivacyTab: React.FC = () => {
  const [stops, setStops] = useState<NomadRouteStop[]>(INITIAL_NOMAD_STOPS);
  const [proxies, setProxies] = useState<PrivacyProxyIdentity[]>(PRIVACY_PROXIES);
  
  // New stop form state
  const [newCity, setNewCity] = useState<string>('');
  const [newDates, setNewDates] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New generated proxy state
  const [generatedSuccess, setGeneratedSuccess] = useState<boolean>(false);

  const handleAddStop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCity.trim()) return;

    const newStopItem: NomadRouteStop = {
      id: `stop-${Date.now()}`,
      city: newCity,
      state: 'BR',
      startDate: 'Próximo Mês',
      endDate: 'Futura Parada',
      hubAssignedId: 'hub-curitiba-batel',
      hubName: `Hub Parceiro Rota (${newCity})`,
      isActive: false
    };

    setStops([...stops, newStopItem]);
    setNewCity('');
    setNewDates('');
  };

  const handleGenerateNewProxy = () => {
    const randomBox = Math.floor(1000 + Math.random() * 9000);
    const newProxy: PrivacyProxyIdentity = {
      id: `proxy-${Date.now()}`,
      label: 'Novo Remetente OLX / Vendas Rápidas',
      proxyName: 'L. M. Entregas Express',
      proxyCpfMasked: '***.721.904-** (Proxy Seguro Ativo)',
      boxIdentifier: `BOX-PROX-${randomBox}`,
      fullAddress: `Rod. Francisco Magno Vieira, 1420 - Box ${randomBox} - Florianópolis/SC - CEP 88063-700`,
      forwardToRealName: 'Lucas Mendes Ferreira',
      isShieldActive: true,
      totalDeliveriesFiltered: 0
    };

    setProxies([newProxy, ...proxies]);
    setGeneratedSuccess(true);
    setTimeout(() => setGeneratedSuccess(false), 3000);
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      
      {/* SECTION 1: PASSAPORTE DE LOCALIZAÇÃO NÔMADE (GEO-ROUTING) */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Passaporte de Localização Nômade</span>
            </div>
            <h3 className="text-xl font-bold text-white">Geo-Routing Inteligente de Encomendas</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Atualize seu itinerário de viagem e o NômadeHub reencaminha automaticamente novos pacotes para o Hub parceiro mais próximo.
            </p>
          </div>
        </div>

        {/* Stops timeline cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stops.map((stop, idx) => (
            <div
              key={stop.id}
              className={`p-5 rounded-2xl border transition-all relative ${
                stop.isActive
                  ? 'bg-slate-800/90 border-emerald-400 ring-2 ring-emerald-500/30 shadow-xl'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  PARADA {idx + 1}
                </span>
                {stop.isActive ? (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Você Está Aqui
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">Rota Futura</span>
                )}
              </div>

              <h4 className="text-lg font-bold text-white">{stop.city} - {stop.state}</h4>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">{stop.hubName}</p>
              
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>{stop.startDate} até {stop.endDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Stop Form */}
        <form onSubmit={handleAddStop} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Qual será sua próxima cidade de destino? (ex: Belo Horizonte, Alto Paraíso)"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Parada à Rota</span>
          </button>
        </form>
      </div>

      {/* SECTION 2: ESCUDO DE PRIVACIDADE (PRIVACY SHIELD) */}
      <div className="space-y-5 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Escudo de Privacidade (Privacy Shield)</span>
            </div>
            <h3 className="text-xl font-bold text-white">Gerador de Dados de Remetente Seguro</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Proteja seu CPF e endereço pessoal em vendas da OLX, Mercado Livre ou devoluções de e-commerce contra vazamentos e stalking.
            </p>
          </div>

          <button
            onClick={handleGenerateNewProxy}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gerar Novo Remetente Blindado</span>
          </button>
        </div>

        {generatedSuccess && (
          <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-300 font-mono">
            ✨ Nova identidade proxy gerada e vinculada com sucesso ao seu perfil!
          </div>
        )}

        {/* Proxies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {proxies.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{p.label}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold">
                  {p.boxIdentifier}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1.5 text-slate-300">
                <p><span className="text-slate-500 font-sans">Nome do Remetente Seguro:</span> {p.proxyName}</p>
                <p><span className="text-slate-500 font-sans">CPF Protegido:</span> {p.proxyCpfMasked}</p>
                <p className="text-slate-400 truncate"><span className="text-slate-500 font-sans">Endereço Proxy:</span> {p.fullAddress}</p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">
                  Total de envios blindados: <strong className="text-slate-300">{p.totalDeliveriesFiltered}</strong>
                </span>

                <button
                  onClick={() => copyText(`${p.proxyName}\nCPF: ${p.proxyCpfMasked}\n${p.fullAddress}`, p.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === p.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400 font-bold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copiar Dados de Envio</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
