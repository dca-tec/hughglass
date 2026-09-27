import React, { useState } from 'react';
import { FreightOption } from '../../types';
import { 
  Truck, 
  Send, 
  Search, 
  CheckCircle2, 
  Calculator, 
  Package, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LogisticsFreightTab: React.FC = () => {
  const [recipientName, setRecipientName] = useState<string>('Lucas Mendes Ferreira');
  const [destCep, setDestCep] = useState<string>('80420-090');
  const [destAddress, setDestAddress] = useState<string>('Av. do Batel, 1750 (Hotel Nomad Batel) - Curitiba/PR');
  const [selectedPackage, setSelectedPackage] = useState<string>('NL-410882104BR - Roteador 4G/5G (0.85 kg)');
  const [weightKg, setWeightKg] = useState<number>(0.85);
  const [selectedCarrier, setSelectedCarrier] = useState<string>('jadlog');
  const [isDispatched, setIsDispatched] = useState<boolean>(false);

  const freightOptions: FreightOption[] = [
    {
      carrier: 'Jadlog',
      service: '.Package Express',
      price: 19.90,
      deliveryDays: 3,
      trackingAvailable: true,
      badge: 'Melhor Custo'
    },
    {
      carrier: 'Correios',
      service: 'SEDEX 10 / Expresso',
      price: 28.40,
      deliveryDays: 1,
      trackingAvailable: true,
      badge: 'Mais Rápido'
    },
    {
      carrier: 'Correios',
      service: 'PAC Convencional',
      price: 21.50,
      deliveryDays: 4,
      trackingAvailable: true
    },
    {
      carrier: 'Loggi',
      service: 'Loggi Coleta Direta',
      price: 32.00,
      deliveryDays: 2,
      trackingAvailable: true
    }
  ];

  const handleApplyPreset = (city: string, cep: string, address: string) => {
    setDestCep(cep);
    setDestAddress(address);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // confetti optional
    }
    setIsDispatched(true);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Cotação de Frete & Logística Reversa</span>
          </div>
          <h3 className="text-xl font-bold text-white">Reencaminhamento de Encomendas</h3>
          <p className="text-xs text-slate-400">
            Reenvie qualquer pacote do seu Hub para hotéis, campings, sedes ou residências em qualquer CEP do Brasil.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          
          <form onSubmit={handleDispatch} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Pacote a Ser Reencaminhado do Hub
              </label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="NL-410882104BR - Roteador 4G/5G (0.85 kg)">
                  NL-410882104BR - Roteador 4G/5G (0.85 kg) - Locker #14
                </option>
                <option value="NH-98421-BR - Envelope Receita Federal (0.05 kg)">
                  NH-98421-BR - Envelope Receita Federal (0.05 kg) - Caixa Postal
                </option>
                <option value="NB-2026-CARD - Cartão Banco Inter (0.04 kg)">
                  NB-2026-CARD - Cartão Banco Inter (0.04 kg) - Caixa Postal
                </option>
              </select>
            </div>

            {/* Quick CEP presets */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Destino da Viagem / CEP de Entrega
                </label>
                <span className="text-[11px] text-slate-500">Atalhos de rota:</span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2.5">
                <button
                  type="button"
                  onClick={() => handleApplyPreset('Curitiba', '80420-090', 'Av. do Batel, 1750 (Hotel Nomad Batel) - Curitiba/PR')}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  📍 Curitiba (Batel)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('São Paulo', '05435-001', 'Rua Harmonia, 842 - Vila Madalena - São Paulo/SP')}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  📍 SP (Vila Madalena)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('Ubatuba', '11680-000', 'Camping Praia das Palmeiras - Ubatuba/SP')}
                  className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800"
                >
                  📍 Ubatuba (Vanlife)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="CEP (00000-000)"
                  value={destCep}
                  onChange={(e) => setDestCep(e.target.value)}
                  className="sm:col-span-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Endereço Completo de Destino"
                  value={destAddress}
                  onChange={(e) => setDestAddress(e.target.value)}
                  className="sm:col-span-2 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nome do Destinatário no Local
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            {/* Carrier Selection */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Selecione a Opção de Frete:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {freightOptions.map((opt, idx) => {
                  const isSelected = selectedCarrier === opt.carrier.toLowerCase();
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedCarrier(opt.carrier.toLowerCase())}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500/80 ring-1 ring-emerald-500/40 shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{opt.carrier}</span>
                        {opt.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{opt.service}</p>
                      
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">
                          {opt.deliveryDays} {opt.deliveryDays === 1 ? 'dia útil' : 'dias úteis'}
                        </span>
                        <span className="text-sm font-black text-emerald-400 font-mono">
                          R$ {opt.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" />
              <span>Solicitar Despacho e Emitir Etiqueta</span>
            </button>

          </form>

        </div>

        {/* Right Column: Dispatch Status & Live Preview */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-400" />
              Resumo da Operação Logística
            </h4>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
              <p><span className="text-slate-500">Origem:</span> Hub Nômade Florianópolis (Box NH-042)</p>
              <p><span className="text-slate-500">Destino:</span> {destCep} - {destAddress}</p>
              <p><span className="text-slate-500">Destinatário:</span> {recipientName}</p>
              <p><span className="text-slate-500">Modalidade:</span> Jadlog / SEDEX Express</p>
              <p><span className="text-slate-500">Seguro de Carga:</span> Incluso até R$ 1.000,00</p>
            </div>

            {isDispatched ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Etiqueta Emitida! Despacho Programado.</span>
                </div>
                <p className="text-xs text-slate-300">
                  O pacote foi coletado da baia do Hub e a etiqueta <strong>BR-9842-JAD</strong> foi gerada. O código de rastreamento foi enviado para seu WhatsApp.
                </p>
                <button
                  onClick={() => setIsDispatched(false)}
                  className="text-xs text-emerald-400 hover:underline font-semibold"
                >
                  Fazer novo envio
                </button>
              </div>
            ) : (
              <div className="text-xs text-slate-400 flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span>Despacho no mesmo dia para solicitações feitas até as 15:00.</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
