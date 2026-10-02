import React, { useState } from 'react';
import { 
  Package, 
  Smartphone, 
  FileText, 
  Lock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  QrCode, 
  RotateCcw, 
  ArrowRight, 
  Shield, 
  Search,
  ExternalLink
} from 'lucide-react';

export const MailFlowSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [userChoice, setUserChoice] = useState<'scan' | 'locker' | 'forward' | null>(null);

  const handleReset = () => {
    setCurrentStep(1);
    setUserChoice(null);
  };

  return (
    <section id="como-funciona" className="py-16 lg:py-24 relative bg-slate-900/60 border-b border-slate-800">
      
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador Passo a Passo Interativo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Como Funciona o Ciclo da sua Correspondência
          </h2>
          <p className="mt-3 text-slate-400 text-base sm:text-lg">
            Teste na prática como uma carta ou pacote físico se transforma em documento digital ou retirada segura sem você ter endereço fixo.
          </p>
        </div>

        {/* Pipeline Stepper Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          
          {/* Step 1 */}
          <button
            onClick={() => setCurrentStep(1)}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              currentStep === 1
                ? 'bg-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                : currentStep > 1
                ? 'bg-slate-900/90 border-emerald-500/30 text-slate-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400">PASSO 01</span>
              <Package className={`w-4 h-4 ${currentStep >= 1 ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-bold text-sm text-white">Chegada ao Hub</h4>
            <p className="text-xs text-slate-400 mt-1">Recepção, triagem óptica e pesagem do envelope.</p>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => setCurrentStep(2)}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              currentStep === 2
                ? 'bg-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                : currentStep > 2
                ? 'bg-slate-900/90 border-emerald-500/30 text-slate-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400">PASSO 02</span>
              <Smartphone className={`w-4 h-4 ${currentStep >= 2 ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-bold text-sm text-white">Aviso no WhatsApp</h4>
            <p className="text-xs text-slate-400 mt-1">Foto em alta resolução e botões de decisão instantânea.</p>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => setCurrentStep(3)}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              currentStep === 3
                ? 'bg-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                : currentStep > 3
                ? 'bg-slate-900/90 border-emerald-500/30 text-slate-300'
                : 'bg-slate-950/60 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400">PASSO 03</span>
              <Sparkles className={`w-4 h-4 ${currentStep >= 3 ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-bold text-sm text-white">Sua Decisão</h4>
            <p className="text-xs text-slate-400 mt-1">Digitalizar PDF, guardar no locker ou despachar.</p>
          </button>

          {/* Step 4 */}
          <button
            onClick={() => setCurrentStep(4)}
            className={`p-4 rounded-2xl border text-left transition-all relative ${
              currentStep === 4
                ? 'bg-slate-800 border-emerald-500/60 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                : 'bg-slate-950/60 border-slate-800 text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-emerald-400">PASSO 04</span>
              <CheckCircle2 className={`w-4 h-4 ${currentStep === 4 ? 'text-emerald-400' : 'text-slate-600'}`} />
            </div>
            <h4 className="font-bold text-sm text-white">Conclusão Segura</h4>
            <p className="text-xs text-slate-400 mt-1">Armário destravado ou PDF no leitor com busca OCR.</p>
          </button>

        </div>

        {/* Interactive Simulator Stage Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Step 1 Display */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Etapa 1: Triagem e Recepção Física
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  O carteiro ou transportador entrega no seu Box ID exclusivo
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Mesmo que você esteja acampando na praia em Ubatuba ou viajando de motorhome pelo interior, nossa equipe automatizada no Hub Florianópolis recebe, pesa e fotografa a face externa da correspondência sem violar o lacre original.
                </p>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 space-y-1">
                  <p>• Pacote Registrado: <span className="text-emerald-400">NH-98421-BR</span></p>
                  <p>• Remetente Detectado: <span className="text-slate-200">Receita Federal do Brasil</span></p>
                  <p>• Dimensões / Peso: <span className="text-slate-200">Envelope A4 / 48g</span></p>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all"
                >
                  <span>Avançar para Notificação no WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-900 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=700&auto=format&fit=crop&q=80" 
                  alt="Envelope em Triagem" 
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-xs font-mono text-emerald-400">Sensor Óptico Ativo</span>
                  <span className="text-sm font-bold text-white">Foto do envelope capturada com sucesso</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 Display: WhatsApp Simulation */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                  Etapa 2: WhatsApp First sem atrito
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Você recebe um alerta no seu WhatsApp em segundos
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Não precisa baixar outro aplicativo pesado se não quiser. Você recebe a foto real da correspondência diretamente na conversa do WhatsApp oficial verificado, com botões para você decidir o destino com um só toque.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span>Simular Minha Resposta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Window Mockup */}
              <div className="rounded-2xl bg-[#0b141a] border border-slate-800 p-4 shadow-2xl text-xs space-y-3 font-sans max-w-sm mx-auto w-full">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800 text-slate-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c27839] via-[#d18242] to-[#e5985a] flex items-center justify-center font-bold text-slate-950">
                    HG
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-white">
                      <span>Hugh Glass Oficial</span>
                      <span className="text-[10px] text-emerald-400">✓</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Conta Comercial Oficial</span>
                  </div>
                </div>

                <div className="bg-[#202c33] p-3 rounded-xl text-slate-200 space-y-2">
                  <p className="text-[11px] text-emerald-400 font-bold">📬 Correspondência recebida para Box HG-042</p>
                  <p className="text-[11px]">Identificamos um envelope prioritário da <strong>Receita Federal</strong> no Hub Florianópolis.</p>
                  <div className="rounded-lg overflow-hidden border border-slate-700">
                    <img 
                      src="https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=500&auto=format&fit=crop&q=80" 
                      alt="Envelope" 
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">O que você gostaria de fazer com este documento?</p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <button 
                    onClick={() => { setUserChoice('scan'); setCurrentStep(3); }}
                    className="w-full py-2 px-3 rounded-lg bg-[#2a3942] hover:bg-emerald-600 hover:text-slate-950 text-cyan-300 font-bold text-left flex items-center justify-between text-[11px] transition-colors"
                  >
                    <span>📄 Digitalizar Conteúdo (PDF com OCR)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => { setUserChoice('locker'); setCurrentStep(3); }}
                    className="w-full py-2 px-3 rounded-lg bg-[#2a3942] hover:bg-emerald-600 hover:text-slate-950 text-emerald-400 font-bold text-left flex items-center justify-between text-[11px] transition-colors"
                  >
                    <span>🔐 Guardar no Locker 24h para Retirada</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => { setUserChoice('forward'); setCurrentStep(3); }}
                    className="w-full py-2 px-3 rounded-lg bg-[#2a3942] hover:bg-emerald-600 hover:text-slate-950 text-slate-300 font-bold text-left flex items-center justify-between text-[11px] transition-colors"
                  >
                    <span>🚚 Reencaminhar para Minha Nova Rota</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 Display: Choice confirmation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Etapa 3: Escolha a Ação Desejada
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Como você quer processar esta correspondência?
                </h3>
                <p className="text-slate-400 text-sm">
                  Selecione uma das 3 opções abaixo para simular o resultado em tempo real:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* Option 1: Digitalizar PDF */}
                <div 
                  onClick={() => { setUserChoice('scan'); setCurrentStep(4); }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    userChoice === 'scan'
                      ? 'bg-slate-800 border-cyan-400 ring-2 ring-cyan-400/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-white">Digitalizar Miolo (PDF OCR)</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Nossa cabine óptica segura com corte a laser abre o envelope confidencial, escaneia em 600 DPI e extrai todo o texto pesquisável para seu App.
                    </p>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">
                    Simular Digitalização Instantânea
                  </button>
                </div>

                {/* Option 2: Guardar no Locker */}
                <div 
                  onClick={() => { setUserChoice('locker'); setCurrentStep(4); }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    userChoice === 'locker'
                      ? 'bg-slate-800 border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-white">Guardar no Locker 24/7</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      O pacote é colocado em um compartimento blindado individual com tranca eletrônica. Você recebe um QR Code dinâmico para retirar a qualquer hora.
                    </p>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs">
                    Simular Chave de Locker 24h
                  </button>
                </div>

                {/* Option 3: Reencaminhar Rota Nômade */}
                <div 
                  onClick={() => { setUserChoice('forward'); setCurrentStep(4); }}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    userChoice === 'forward'
                      ? 'bg-slate-800 border-teal-400 ring-2 ring-teal-400/30'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                      <Send className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-white">Reencaminhar para Minha Rota</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Está em outra cidade? Cotação de frete automática e envio direto para o hotel, camping, Airbnb ou ponto de apoio parceiro onde você estiver.
                    </p>
                  </div>
                  <button className="mt-4 w-full py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs">
                    Simular Rota Nômade (Geo-Routing)
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Step 4 Display: Outcome Execution */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Ação Executada com Sucesso!</h3>
                    <p className="text-xs text-slate-400">
                      Resultado simulado do fluxo de correspondência inteligente
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Reiniciar Demonstração</span>
                </button>
              </div>

              {/* Dynamic Outcome Result based on User Choice */}
              {userChoice === 'scan' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      PDF DISPONÍVEL NA CAIXA POSTAL DIGITAL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      OCR Indexado
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    O documento da Receita Federal foi digitalizado e todo o conteúdo agora é pesquisável por palavra-chave na sua Área do Cliente.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                    <p className="text-emerald-400 font-bold">Trecho do OCR Localizado:</p>
                    <p className="text-slate-400">"...Certidão de Regularidade Fiscal MEI / CNPJ 49.812.304/0001-92 emitida regularmente para o Box NH-042..."</p>
                  </div>
                </div>
              )}

              {userChoice === 'locker' && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-300 font-mono flex items-center gap-1.5">
                      <Lock className="w-4 h-4" />
                      COMPARTIMENTO #14 PREPARADO NO HUB FLORIANÓPOLIS
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      Pronto para Coleta
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Sua encomenda já está guardada no armário 14. O QR Code dinâmico foi gerado e enviado para seu WhatsApp e App PWA.
                  </p>

                  <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="w-16 h-16 bg-white rounded-lg p-1 flex items-center justify-center">
                      <QrCode className="w-14 h-14 text-slate-950" />
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="font-mono text-white font-bold">Código de Abertura: 8392</p>
                      <p className="text-slate-400">Ou utilize a abertura por aproximação Web-Bluetooth no local.</p>
                    </div>
                  </div>
                </div>
              )}

              {(!userChoice || userChoice === 'forward') && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-300 font-mono flex items-center gap-1.5">
                      <Send className="w-4 h-4" />
                      PACOTE ROTEADO AUTOMATICAMENTE
                    </span>
                    <span className="px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30">
                      SEDEX Emissão Prévia
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Com base no seu Passaporte de Localização Nômade, o pacote foi roteado diretamente para a sua próxima parada cadastrada (Curitiba - Hub Batel).
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
