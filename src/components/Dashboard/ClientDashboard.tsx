import React, { useState } from 'react';
import { MailItem } from '../../types';
import { INITIAL_MAIL_ITEMS } from '../../data/mockData';
import { PostalInboxTab } from './PostalInboxTab';
import { LockersRetiradasTab } from './LockersRetiradasTab';
import { FiscalDocsTab } from './FiscalDocsTab';
import { LogisticsFreightTab } from './LogisticsFreightTab';
import { NomadPassportPrivacyTab } from './NomadPassportPrivacyTab';
import { BedInterchangeTab } from './BedInterchangeTab';
import { 
  Inbox, 
  Key, 
  Building2, 
  Truck, 
  Compass, 
  Bell, 
  ShieldCheck, 
  ArrowLeft,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  Repeat
} from 'lucide-react';

interface ClientDashboardProps {
  onBackToLanding: () => void;
  onOpenGovBr: () => void;
  isGovBrVerified: boolean;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({
  onBackToLanding,
  onOpenGovBr,
  isGovBrVerified
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'lockers' | 'fiscal' | 'freight' | 'passport' | 'housing'>('inbox');
  const [mailItems, setMailItems] = useState<MailItem[]>(INITIAL_MAIL_ITEMS);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const handleOpenLockerForMail = (item: MailItem) => {
    setActiveTab('lockers');
  };

  const handleOpenForwardForMail = (item: MailItem) => {
    setActiveTab('freight');
  };

  const simulateIncomingLetter = () => {
    const newItem: MailItem = {
      id: `mail-${Date.now()}`,
      trackingCode: `NH-${Math.floor(10000 + Math.random() * 90000)}-BR`,
      sender: 'Notificação Cartorial de Santa Catarina',
      type: 'letter',
      receivedAt: 'Agora mesmo',
      status: 'scanned',
      envelopePhotoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
      scannedAt: 'Agora',
      pdfPages: 1,
      weightKg: 0.03,
      hubId: 'hub-florianopolis',
      ocrSnippet: 'Comunicado formal de homologação e certidão emitida com sucesso...',
      ocrText: `CARTÓRIO DE REGISTRO CIVIL E NOTAS - FLORIANÓPOLIS
Comunicação de Registro e Protocolo Digital
Destinatário: Box NH-042 - Hub Campeche
Situação: Válido e arquivado digitalmente no cofre de dados seguro NômadeHub.`
    };

    setMailItems([newItem, ...mailItems]);
    setNotificationToast('📬 Nova carta recebida e digitalizada no Box NH-042!');
    setTimeout(() => setNotificationToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      
      {/* Toast Notification Simulation */}
      {notificationToast && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 p-4 rounded-2xl bg-emerald-950 border-2 border-emerald-500 shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-bold text-emerald-200">{notificationToast}</span>
        </div>
      )}

      {/* Top Bar for Client Area */}
      <div className="bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToLanding}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Voltar para a Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">Área do Cliente • Web App PWA</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  BOX NH-042
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Lucas Mendes Ferreira • Hub Campeche (Florianópolis/SC)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={simulateIncomingLetter}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              title="Simular recebimento de nova carta em tempo real"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simular Chegada de Carta</span>
            </button>

            <button
              onClick={onOpenGovBr}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isGovBrVerified
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isGovBrVerified ? 'Gov.br Ouro Verificado' : 'Validar Gov.br'}</span>
            </button>
          </div>

        </div>

        {/* Quick Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <Inbox className="w-3.5 h-3.5 text-cyan-400" />
            <span>Correspondências: <strong className="text-white">{mailItems.length} recebidas</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lockers Ativos: <strong className="text-emerald-400">#14 (Liberado)</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Building2 className="w-3.5 h-3.5 text-teal-400" />
            <span>Endereço Fiscal: <strong className="text-white">Homologado</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Geo-Routing: <strong className="text-white">SC ➔ PR</strong></span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-800">
          
          <button
            id="tab-inbox"
            onClick={() => setActiveTab('inbox')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'inbox'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>1. Caixa Postal Digital ({mailItems.length})</span>
          </button>

          <button
            id="tab-lockers"
            onClick={() => setActiveTab('lockers')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'lockers'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>2. Lockers e Retiradas (Armário #14)</span>
          </button>

          <button
            id="tab-fiscal"
            onClick={() => setActiveTab('fiscal')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'fiscal'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>3. Endereço Fiscal & Documentos</span>
          </button>

          <button
            id="tab-freight"
            onClick={() => setActiveTab('freight')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'freight'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>4. Encaminhamento & Logística</span>
          </button>

          <button
            id="tab-passport"
            onClick={() => setActiveTab('passport')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'passport'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>5. Passaporte Nômade & Privacy</span>
          </button>

          <button
            id="tab-housing"
            onClick={() => setActiveTab('housing')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'housing'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 ring-2 ring-emerald-400/40'
                : 'bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>6. Moradia & Leitos (Intercâmbio / Cotas / Multi-Empresa)</span>
          </button>

        </div>

        {/* Tab Content Rendering */}
        <div className="mt-4">
          {activeTab === 'inbox' && (
            <PostalInboxTab
              mailItems={mailItems}
              onOpenLockerTab={handleOpenLockerForMail}
              onOpenForwardTab={handleOpenForwardForMail}
            />
          )}

          {activeTab === 'lockers' && <LockersRetiradasTab />}

          {activeTab === 'fiscal' && <FiscalDocsTab />}

          {activeTab === 'freight' && <LogisticsFreightTab />}

          {activeTab === 'passport' && <NomadPassportPrivacyTab />}

          {activeTab === 'housing' && <BedInterchangeTab />}
        </div>

      </div>

    </div>
  );
};
