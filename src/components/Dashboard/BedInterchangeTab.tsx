import React, { useState } from 'react';
import { 
  SHARED_HOUSING_UNITS, 
  INITIAL_BED_INTERCHANGE, 
  INITIAL_PROPERTY_QUOTAS, 
  INITIAL_MULTI_COMPANIES 
} from '../../data/mockData';
import { BedInterchangeBooking, PropertyQuota, MultiCompanyAddress } from '../../types';
import { 
  Repeat, 
  Bed, 
  MapPin, 
  Calendar, 
  QrCode, 
  Bluetooth, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  TrendingUp, 
  Plus, 
  Coins, 
  ArrowRight,
  ShieldCheck,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const BedInterchangeTab: React.FC = () => {
  const [activeInterchange, setActiveInterchange] = useState<BedInterchangeBooking>(INITIAL_BED_INTERCHANGE);
  const [quotas, setQuotas] = useState<PropertyQuota[]>(INITIAL_PROPERTY_QUOTAS);
  const [companies, setCompanies] = useState<MultiCompanyAddress[]>(INITIAL_MULTI_COMPANIES);

  // New interchange form state
  const [targetCity, setTargetCity] = useState<string>('São Paulo');
  const [targetDays, setTargetDays] = useState<number>(20);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);

  // Multi-company form
  const [newCompanyName, setNewCompanyName] = useState<string>('');
  const [newCompanyCity, setNewCompanyCity] = useState<string>('Belo Horizonte');
  const [companyAddedMsg, setCompanyAddedMsg] = useState<boolean>(false);

  const handleRequestInterchange = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Confetti fallback
    }

    const updatedInterchange: BedInterchangeBooking = {
      id: `inter-${Date.now()}`,
      userId: 'usr-lucas-01',
      userName: 'Lucas Mendes Ferreira',
      baseUnitCity: 'Florianópolis (Campeche)',
      baseBedNumber: 'Quarto 12 - Leito B',
      destinationCity: targetCity,
      destinationBedNumber: `Quarto ${Math.floor(1 + Math.random() * 20)} - Leito ${Math.random() > 0.5 ? 'A' : 'B'}`,
      destinationUnitName: `Hub Residencial Nômade ${targetCity}`,
      startDate: 'Amanhã',
      endDate: `Em ${targetDays} dias`,
      daysRemaining: targetDays,
      status: 'active',
      isBaseBedInPool: true,
      qrAccessCode: `INTER-${targetCity.toUpperCase().slice(0,3)}-TOKEN-${Math.floor(1000 + Math.random() * 9000)}`,
      bleLockKey: `BLE-DOOR-${targetCity.toUpperCase().slice(0,3)}-AUTH`
    };

    setActiveInterchange(updatedInterchange);
    setIsSuccessModal(true);
    setTimeout(() => setIsSuccessModal(false), 4500);
  };

  const handleToggleQuotaPool = (quotaId: string) => {
    setQuotas(quotas.map((q) => q.id === quotaId ? { ...q, isInManagementPool: !q.isInManagementPool } : q));
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;

    const newComp: MultiCompanyAddress = {
      id: `comp-${Date.now()}`,
      companyName: newCompanyName,
      cnpj: '58.910.442/0001-30 (Em Emissão)',
      unitCity: newCompanyCity,
      unitState: newCompanyCity === 'Belo Horizonte' ? 'MG' : 'SC',
      fiscalAddress: `Hub Nômade ${newCompanyCity} - Box Corporativo NH-${Math.floor(100 + Math.random() * 900)}`,
      municipalLicenseStatus: 'em_processamento',
      viabilityProtocol: `VIAB-${newCompanyCity.toUpperCase().slice(0,3)}-2026-9901`,
      activityCodeCnae: '7319-0/02 - Promoção de Vendas e E-commerce',
      digitalMailboxId: `BOX-CORP-${Math.floor(100 + Math.random() * 900)}`,
      unreadNoticesCount: 0
    };

    setCompanies([...companies, newComp]);
    setNewCompanyName('');
    setCompanyAddedMsg(true);
    setTimeout(() => setCompanyAddedMsg(false), 3500);
  };

  const totalMonthlyYield = quotas
    .filter((q) => q.isInManagementPool)
    .reduce((acc, q) => acc + q.netMonthlyYield, 0);

  return (
    <div className="space-y-10">
      
      {/* SECTION 1: MINHA CAMA-BASE & INTERCÂMBIO ATIVO */}
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Repeat className="w-3.5 h-3.5" />
              <span>Gestão de Moradia & Intercâmbio de Leitos</span>
            </div>
            <h3 className="text-xl font-bold text-white">Minha Residência & Mobilidade Nacional</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Você possui direito de uso de toda a rede. Quando viaja, seu leito base é disponibilizado para outro membro e você ocupa uma vaga livre no seu destino.
            </p>
          </div>
        </div>

        {/* Active Bed Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Base Bed Card */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                RESIDÊNCIA-BASE CONTRATADA (CONTRATO 24 MESES)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Ativo até 2028
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">Hub Florianópolis (Campeche Sul)</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeInterchange.baseBedNumber} • Rod. Francisco Magno Vieira, 1420
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span>Status Atual do Leito Base:</span>
                <span className="text-cyan-400 font-bold">Na Pool da Rede (Em Viagem)</span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans">
                Seu leito em Floripa está sendo utilizado temporariamente por um membro da rede vindo de SP, reduzindo a pegada ociosa e mantendo a taxa da rede acessível.
              </p>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Seu armário privativo com biometria permanece 100% trancado e seguro.</span>
            </div>
          </div>

          {/* Active Travel Destination Bed */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-emerald-500/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                INTERCÂMBIO ATIVO NO MOMENTO
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                {activeInterchange.daysRemaining} Dias Restantes
              </span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white">{activeInterchange.destinationCity}</h4>
              <p className="text-xs text-emerald-300 font-mono mt-0.5">
                {activeInterchange.destinationUnitName} • {activeInterchange.destinationBedNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Acesso Digital</span>
                <span className="text-white font-bold">{activeInterchange.qrAccessCode}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Tranca Bluetooth</span>
                <span className="text-emerald-400 font-bold">Chave Sincronizada</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  try {
                    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
                    osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
                    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start();
                    osc.stop(audioCtx.currentTime + 0.45);
                  } catch {
                    // Audio optional
                  }
                  alert(`Porta destravada via Bluetooth para o ${activeInterchange.destinationBedNumber}!`);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
              >
                <Bluetooth className="w-4 h-4" />
                <span>Destravar Quarto {activeInterchange.destinationCity}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Request New Interchange Form */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Solicitar Próximo Intercâmbio de Leito na Rede</span>
              </h4>
              <p className="text-xs text-slate-400">
                Escolha a cidade para onde você vai viajar. Sem taxa de diária extra: apenas a transferência temporária da sua vaga.
              </p>
            </div>
          </div>

          <form onSubmit={handleRequestInterchange} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cidade de Destino</label>
              <select
                value={targetCity}
                onChange={(e) => setTargetCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {SHARED_HOUSING_UNITS.map((u) => (
                  <option key={u.id} value={u.city}>
                    {u.city} ({u.availableBeds} leitos livres na rede)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Período de Permanência</label>
              <select
                value={targetDays}
                onChange={(e) => setTargetDays(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                <option value={7}>7 Dias (Trabalho Rápido)</option>
                <option value={15}>15 Dias (Duas Semanas)</option>
                <option value={20}>20 Dias (Ideal para Viagem)</option>
                <option value={30}>30 Dias (Mês Completo)</option>
                <option value={45}>45 Dias (Temporada de Estudo)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <Repeat className="w-4 h-4" />
                <span>Confirmar Intercâmbio para {targetCity}</span>
              </button>
            </div>
          </form>

          {isSuccessModal && (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 font-mono space-y-1">
              <p className="font-bold flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Intercâmbio Aprovado e Sincronizado com Sucesso!
              </p>
              <p className="text-slate-300 text-[11px]">
                Seu novo leito em <strong>{targetCity}</strong> foi reservado para os próximos {targetDays} dias. O QR Code e chave de acesso já estão ativos no seu aplicativo.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* SECTION 2: MINHAS COTAS IMOBILIÁRIAS & POOL DE GESTÃO */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>Painel do Co-Proprietário & Investidor</span>
            </div>
            <h3 className="text-xl font-bold text-white">Minhas Cotas & Rendimentos da Pool</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Acompanhe a rentabilidade líquida das suas cotas imobiliárias colocadas sob a gestão centralizada da NômadeHub.
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-right font-mono">
            <span className="text-[10px] text-slate-500 block">Rendimento Líquido Mensal</span>
            <span className="text-xl font-black text-emerald-400">R$ {totalMonthlyYield.toFixed(2)}/mês</span>
          </div>
        </div>

        {/* Quotas List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotas.map((quota) => (
            <div
              key={quota.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">{quota.quotaCode}</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{quota.title}</h4>
                  <p className="text-xs text-slate-400">{quota.fractionLabel}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold border ${
                  quota.isInManagementPool
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  {quota.isInManagementPool ? 'POOL DE GESTÃO ATIVA' : 'USO PRÓPRIO'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Valor Aquisição</span>
                  <span className="text-white font-bold">R$ {quota.acquisitionValue.toLocaleString('pt-BR')}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Ocupação Média</span>
                  <span className="text-emerald-400 font-bold">{quota.occupancyRateAverage}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Yield Líquido</span>
                  <span className="text-cyan-400 font-bold">R$ {quota.netMonthlyYield.toFixed(2)}/mês</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 font-mono">
                  Próximo crédito: {quota.nextPayoutDate} (Via PIX)
                </span>

                <button
                  onClick={() => handleToggleQuotaPool(quota.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  {quota.isInManagementPool ? 'Mudar para Uso Próprio' : 'Colocar na Pool'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SECTION 3: MULTI-EMPRESA & DOMICÍLIO FISCAL CORPORATIVO */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Expansão de Negócios Multi-Estados</span>
            </div>
            <h3 className="text-xl font-bold text-white">Minhas Empresas em Múltiplas Unidades</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Abra ou mantenha filiais e CNPJs em diferentes cidades da rede (ex: MEI em Santa Catarina e Comércio em São Paulo) com gestão postal centralizada.
            </p>
          </div>
        </div>

        {/* Company Addresses Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((comp) => (
            <div
              key={comp.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-teal-400 font-bold uppercase">{comp.unitCity} - {comp.unitState}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{comp.companyName}</h4>
                  <p className="text-xs text-slate-400 font-mono">CNPJ: {comp.cnpj}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  comp.municipalLicenseStatus === 'homologado'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {comp.municipalLicenseStatus === 'homologado' ? 'ALVARÁ HOMOLOGADO' : 'EM ANÁLISE'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                <p><span className="text-slate-500">Endereço Fiscal:</span> {comp.fiscalAddress}</p>
                <p><span className="text-slate-500">CNAE:</span> {comp.activityCodeCnae}</p>
                <p><span className="text-slate-500">Protocolo Viabilidade:</span> {comp.viabilityProtocol}</p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span>Caixa Postal: <strong className="text-white">{comp.digitalMailboxId}</strong></span>
                <span className="text-emerald-400 font-bold font-mono">{comp.unreadNoticesCount} aviso fiscal</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Company Form */}
        <form onSubmit={handleAddCompany} className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Nome da Nova Empresa ou Filial (ex: Tech Nômade Minas Consultoria)"
            value={newCompanyName}
            onChange={(e) => setNewCompanyName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 w-full"
            required
          />
          <select
            value={newCompanyCity}
            onChange={(e) => setNewCompanyCity(e.target.value)}
            className="w-full sm:w-56 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400"
          >
            <option value="Belo Horizonte">Belo Horizonte (MG)</option>
            <option value="São Paulo">São Paulo (SP)</option>
            <option value="Curitiba">Curitiba (PR)</option>
            <option value="Balneário Camboriú">Balneário Camboriú (SC)</option>
            <option value="Rio de Janeiro">Rio de Janeiro (RJ)</option>
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Filial na Rede</span>
          </button>
        </form>

        {companyAddedMsg && (
          <div className="p-3 rounded-xl bg-teal-950/60 border border-teal-500/40 text-xs text-teal-300 font-mono">
            ✨ Processo de viabilidade de endereço iniciado para a nova filial! Protocolo municipal emitido.
          </div>
        )}

      </div>

    </div>
  );
};
