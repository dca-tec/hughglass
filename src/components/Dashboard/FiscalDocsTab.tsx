import React, { useState } from 'react';
import { FISCAL_DOCS } from '../../data/mockData';
import { FiscalDocument } from '../../types';
import { 
  Building2, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  ShieldCheck, 
  QrCode, 
  Eye, 
  X, 
  ExternalLink,
  Award
} from 'lucide-react';

export const FiscalDocsTab: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activePreviewDoc, setActivePreviewDoc] = useState<FiscalDocument | null>(null);

  const copyToClipboard = (text: string, fieldKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const addressData = {
    full: 'Rodovia Francisco Magno Vieira, 1420 - Box NH-042 - Campeche, Florianópolis/SC - CEP 88063-700',
    street: 'Rodovia Francisco Magno Vieira, 1420',
    complement: 'Box Postal & Domicílio Fiscal NH-042',
    district: 'Campeche',
    cityState: 'Florianópolis / SC',
    cep: '88063-700',
    cnpj: '49.812.304/0001-92',
    companyName: 'LUCAS MENDES FERREIRA - SERVIÇOS DIGITAIS MEI'
  };

  const handleDownloadDoc = (doc: FiscalDocument) => {
    const fakeContent = `=======================================================
${doc.title.toUpperCase()}
Emissor Oficial: ${doc.authority}
Código de Autenticação Digital: ${doc.code}
Hash SHA-256: ${doc.authHash}
Data de Emissão: ${doc.issuedAt} | Validade: ${doc.validUntil}
=======================================================
Documento emitido em conformidade com as normas da Junta Comercial e Receita Federal.
Domicílio Fiscal: ${addressData.full}
Titular Vinculado: ${addressData.companyName}
CNPJ: ${addressData.cnpj}
=======================================================`;

    const blob = new Blob([fakeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.code}-${doc.category}.txt`;
    a.click();
  };

  return (
    <div className="space-y-8">
      
      {/* Address Highlight Box for Copying */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Seu Endereço Fiscal Contratado</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold font-mono">
                  ATIVO & HOMOLOGADO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Utilize este endereço na Junta Comercial, Receita Federal, bancos e cadastros de fornecedores.
              </p>
            </div>
          </div>

          <button
            onClick={() => copyToClipboard(addressData.full, 'full')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all border border-slate-700"
          >
            {copiedField === 'full' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Endereço Completo Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Endereço Completo</span>
              </>
            )}
          </button>
        </div>

        {/* Structured address fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
          
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Logradouro / Número</span>
              <span className="text-slate-200 font-bold">{addressData.street}</span>
            </div>
            <button 
              onClick={() => copyToClipboard(addressData.street, 'street')}
              className="text-slate-500 hover:text-white p-1"
            >
              {copiedField === 'street' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Complemento / Box ID</span>
              <span className="text-emerald-400 font-bold">{addressData.complement}</span>
            </div>
            <button 
              onClick={() => copyToClipboard(addressData.complement, 'complement')}
              className="text-slate-500 hover:text-white p-1"
            >
              {copiedField === 'complement' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">Bairro / Cidade</span>
              <span className="text-slate-200 font-bold">{addressData.district} - {addressData.cityState}</span>
            </div>
            <button 
              onClick={() => copyToClipboard(`${addressData.district}, ${addressData.cityState}`, 'city')}
              className="text-slate-500 hover:text-white p-1"
            >
              {copiedField === 'city' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-[10px] block font-sans">CEP Oficial</span>
              <span className="text-cyan-300 font-bold">{addressData.cep}</span>
            </div>
            <button 
              onClick={() => copyToClipboard(addressData.cep, 'cep')}
              className="text-slate-500 hover:text-white p-1"
            >
              {copiedField === 'cep' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

        </div>

      </div>

      {/* Official Documents List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Documentos e Certidões para Download</h3>
            <p className="text-xs text-slate-400">
              Certidões assinadas digitalmente com validade jurídica perante todos os órgãos públicos do Brasil
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FISCAL_DOCS.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 font-bold">
                    {doc.code}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{doc.fileSize}</span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">{doc.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{doc.description}</p>

                <div className="pt-2 text-[10px] font-mono text-slate-500 space-y-0.5">
                  <p>Órgão emissor: <span className="text-slate-300">{doc.authority}</span></p>
                  <p>Validade: <span className="text-emerald-400 font-bold">{doc.validUntil}</span></p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setActivePreviewDoc(doc)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Visualizar</span>
                </button>

                <button
                  onClick={() => handleDownloadDoc(doc)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {activePreviewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            <button
              onClick={() => setActivePreviewDoc(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">{activePreviewDoc.title}</h3>
                <p className="text-xs text-slate-400 font-mono">{activePreviewDoc.code}</p>
              </div>
            </div>

            {/* Document Digital Paper View */}
            <div className="my-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-3 leading-relaxed overflow-y-auto">
              <div className="text-center pb-2 border-b border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-emerald-400">REPÚBLICA FEDERATIVA DO BRASIL</span>
                <p className="text-slate-400 text-[10px]">{activePreviewDoc.authority}</p>
              </div>

              <div className="space-y-1.5">
                <p><strong>DOCUMENTO:</strong> {activePreviewDoc.title}</p>
                <p><strong>BENEFICIÁRIO:</strong> {addressData.companyName}</p>
                <p><strong>CNPJ VINCULADO:</strong> {addressData.cnpj}</p>
                <p><strong>ENDEREÇO FISCAL:</strong> {addressData.full}</p>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                <p className="italic">
                  "Certificamos para todos os fins de direito e comprovação perante a Junta Comercial, Receita Federal e Instituições Financeiras que o endereço acima está legalmente constituído e apto ao exercício de atividades econômicas e domicílio postal."
                </p>
              </div>

              <div className="pt-2 text-[10px] text-slate-500 space-y-1">
                <p>Código Hash SHA-256: {activePreviewDoc.authHash}</p>
                <p>Assinatura Digital ICP-Brasil: VÁLIDA E REGULAR</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-mono">
                Validade: {activePreviewDoc.validUntil}
              </span>
              <button
                onClick={() => handleDownloadDoc(activePreviewDoc)}
                className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certidão</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
