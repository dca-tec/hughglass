import React, { useState } from 'react';
import { MailItem, MailItemType } from '../../types';
import { 
  FileText, 
  Package, 
  Search, 
  Eye, 
  Lock, 
  Truck, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Download, 
  Filter,
  CreditCard,
  Building
} from 'lucide-react';

interface PostalInboxTabProps {
  mailItems: MailItem[];
  onOpenLockerTab: (mailItem: MailItem) => void;
  onOpenForwardTab: (mailItem: MailItem) => void;
}

export const PostalInboxTab: React.FC<PostalInboxTabProps> = ({
  mailItems,
  onOpenLockerTab,
  onOpenForwardTab
}) => {
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  
  // OCR In-Document search term inside the PDF reader modal
  const [ocrSearchTerm, setOcrSearchTerm] = useState<string>('');

  const filteredItems = mailItems.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      const matchSender = item.sender.toLowerCase().includes(q);
      const matchOcr = item.ocrText?.toLowerCase().includes(q) || false;
      const matchTrack = item.trackingCode.toLowerCase().includes(q);
      if (!matchSender && !matchOcr && !matchTrack) return false;
    }
    return true;
  });

  const getItemTypeBadge = (type: MailItemType) => {
    switch (type) {
      case 'fiscal_notice':
        return { label: 'Aviso Fiscal / Receita', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
      case 'gov_official':
        return { label: 'Junta Comercial', color: 'bg-teal-500/15 text-teal-300 border-teal-500/30' };
      case 'card':
        return { label: 'Cartão Bancário', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'package':
        return { label: 'Pacote / E-commerce', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' };
      default:
        return { label: 'Carta Simples', color: 'bg-slate-700/30 text-slate-300 border-slate-600' };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Controls: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por remetente, código ou texto OCR..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todas ({mailItems.length})
          </button>
          <button
            onClick={() => setFilterType('fiscal_notice')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'fiscal_notice'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Fiscais & Receita
          </button>
          <button
            onClick={() => setFilterType('package')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'package'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Pacotes & Lockers
          </button>
          <button
            onClick={() => setFilterType('card')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'card'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Cartões
          </button>
        </div>

      </div>

      {/* Mail Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const badge = getItemTypeBadge(item.type);
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                    {badge.label}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{item.receivedAt}</span>
                </div>

                <h3 className="font-bold text-base text-white">{item.sender}</h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">Rastreio: {item.trackingCode}</p>

                {/* Envelope preview thumbnail */}
                <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 group">
                  <img
                    src={item.envelopePhotoUrl}
                    alt="Foto do Envelope"
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-2.5 justify-between">
                    <span className="text-[10px] text-emerald-300 font-mono">Scan Óptico Verificado</span>
                    <button
                      onClick={() => setSelectedMail(item)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-emerald-500 hover:text-slate-950 text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                    >
                      <Eye className="w-3 h-3 text-cyan-400" />
                      <span>Abrir Leitor OCR</span>
                    </button>
                  </div>
                </div>

                {/* OCR snippet if available */}
                {item.ocrSnippet && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 font-mono flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{item.ocrSnippet}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons Toolbar */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setSelectedMail(item)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Ver PDF OCR</span>
                </button>

                <button
                  onClick={() => onOpenLockerTab(item)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-500/40 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.lockerNumber ? `Locker #${item.lockerNumber}` : 'Armazenar Locker'}</span>
                </button>

                <button
                  onClick={() => onOpenForwardTab(item)}
                  title="Reencaminhar Pacote via Correios/Jadlog"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <Truck className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated PDF Reader Modal with Live OCR Text Search */}
      {selectedMail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[92vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{selectedMail.sender}</h3>
                  <p className="text-xs text-slate-400 font-mono">Protocolo: {selectedMail.trackingCode}</p>
                </div>
              </div>

              <button
                onClick={() => { setSelectedMail(null); setOcrSearchTerm(''); }}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* In-Document OCR Search Bar */}
            <div className="py-3">
              <div className="relative">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar palavras dentro do documento OCR (ex: tributos, CNPJ, certidão)..."
                  value={ocrSearchTerm}
                  onChange={(e) => setOcrSearchTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
              {ocrSearchTerm && (
                <span className="text-[10px] text-cyan-400 font-mono mt-1 block">
                  Filtrando linhas com: "{ocrSearchTerm}"
                </span>
              )}
            </div>

            {/* Document Digital Reader Body */}
            <div className="flex-1 overflow-y-auto bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs leading-relaxed text-slate-300 space-y-2">
              <div className="text-[10px] uppercase text-emerald-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span>DIGITALIZAÇÃO ÓPTICA SEGURA • CABINE 600 DPI</span>
                <span>PÁGINAS: {selectedMail.pdfPages || 1}</span>
              </div>

              {selectedMail.ocrText?.split('\n').map((line, idx) => {
                const isMatch = ocrSearchTerm && line.toLowerCase().includes(ocrSearchTerm.toLowerCase());
                return (
                  <p
                    key={idx}
                    className={`py-0.5 px-1 rounded transition-colors ${
                      isMatch ? 'bg-cyan-500/30 text-cyan-200 font-bold ring-1 ring-cyan-400' : ''
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  const blob = new Blob([selectedMail.ocrText || ''], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedMail.trackingCode}-documento-ocr.txt`;
                  a.click();
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Transcrição OCR</span>
              </button>

              <button
                onClick={() => {
                  setSelectedMail(null);
                  onOpenLockerTab(selectedMail);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acessar Locker Físico</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
