import React, { useState } from 'react';
import { 
  Smartphone, 
  CheckCheck, 
  Send, 
  FileText, 
  Lock, 
  Truck, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  photoUrl?: string;
  time: string;
  hasActions?: boolean;
}

export const WhatsAppFirstDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Olá, Lucas! 👋 Identificamos uma nova correspondência urgente recebida para o seu Box NH-042 no Hub Nômade Florianópolis.',
      time: '14:22'
    },
    {
      id: 'm2',
      sender: 'bot',
      text: '📸 Foto do envelope externo capturada pelo sensor óptico:',
      photoUrl: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80',
      time: '14:22',
      hasActions: true
    }
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleActionClick = (actionName: string, botResponseText: string) => {
    if (isProcessing) return;
    setIsProcessing(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // User message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: actionName,
      time: now
    };

    setMessages((prev) => [...prev, userMsg]);

    // Bot response after short realistic typing delay
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsProcessing(false);
    }, 700);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isProcessing) return;

    const userText = inputVal.trim();
    setInputVal('');
    setIsProcessing(true);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, sender: 'user', text: userText, time: now }
    ]);

    setTimeout(() => {
      let botAnswer = 'Entendido! Seu pedido foi registrado no seu painel NômadeHub.';
      const lower = userText.toLowerCase();

      if (lower.includes('lock') || lower.includes('armário') || lower.includes('retirar')) {
        botAnswer = '🔒 Seu armário é o #14 no Hub Florianópolis. O código de acesso gerado é 8392. Válido por 48 horas!';
      } else if (lower.includes('pdf') || lower.includes('digital') || lower.includes('carta')) {
        botAnswer = '📄 Miolo escaneado em alta definição! Já está indexado com busca OCR em nomadehub.com.br/app.';
      } else if (lower.includes('onde') || lower.includes('endereço')) {
        botAnswer = '📍 Seu endereço oficial ativo: Rodovia Francisco Magno Vieira, 1420 - Box NH-042 - Campeche, Florianópolis/SC - CEP 88063-700.';
      }

      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: 'bot', text: botAnswer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <section id="whatsapp-first" className="py-16 lg:py-24 relative bg-slate-950/90 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Product Explanation */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-3.5 h-3.5" />
              <span>WhatsApp First Experience</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Gestão Total de Encomendas Direto no seu WhatsApp
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Você não precisa se preocupar em checar outro app todos os dias. Nossa API oficial envia a foto nítida do envelope ou caixa assim que chega no hub, acompanhada de botões de ação interativos.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">[Digitalizar Conteúdo]</h4>
                  <p className="text-xs text-slate-400">Nossa cabine robotizada corta e escaneia o miolo em PDF pesquisável por OCR e envia de volta na conversa.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">[Guardar no Locker]</h4>
                  <p className="text-xs text-slate-400">Armazena em locker físico climatizado 24/7 com geração de senha e QR Code dinâmico temporário.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">[Reencaminhar]</h4>
                  <p className="text-xs text-slate-400">Reenvio instantâneo para qualquer CEP no Brasil com desconto corporativo em transportadoras.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Número verificado pela Meta com selo verde e criptografia de ponta a ponta.</span>
            </div>
          </div>

          {/* Right Column: Realistic WhatsApp Phone Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-[#0b141a] border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[560px]">
              
              {/* WhatsApp Top Bar */}
              <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between text-white border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm">
                      NH
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#202c33]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-sm">
                      <span>NômadeHub Oficial</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-400/20 px-1 rounded-full font-bold">✓</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">online agora</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Z-API / Meta
                </div>
              </div>

              {/* Chat Bubble Area */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#0b141a]">
                
                {/* Security encryption banner */}
                <div className="text-center">
                  <span className="text-[10px] bg-[#182229] text-amber-300/80 px-3 py-1 rounded-lg border border-amber-500/10 inline-block font-sans">
                    🔒 Mensagens protegidas com criptografia de ponta a ponta.
                  </span>
                </div>

                {messages.map((m) => {
                  const isBot = m.sender === 'bot';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                          isBot
                            ? 'bg-[#202c33] text-slate-200 rounded-tl-none border border-slate-700/40'
                            : 'bg-[#005c4b] text-white rounded-tr-none'
                        }`}
                      >
                        <p>{m.text}</p>

                        {/* Optional envelope photo inside bot message */}
                        {m.photoUrl && (
                          <div className="mt-2 rounded-xl overflow-hidden border border-slate-700">
                            <img 
                              src={m.photoUrl} 
                              alt="Foto Envelope" 
                              className="w-full h-28 object-cover"
                            />
                            <div className="p-1.5 bg-[#111b21] flex items-center justify-between text-[10px] text-slate-400">
                              <span>Envelope_Scan_NH042.jpg</span>
                              <span>640 KB</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive WhatsApp action buttons */}
                        {m.hasActions && (
                          <div className="mt-3 pt-2 border-t border-slate-700/60 space-y-1.5">
                            <button
                              onClick={() => handleActionClick(
                                '📄 Digitalizar Conteúdo',
                                '✅ Solicitação confirmada! O envelope foi digitalizado em 600 DPI. O PDF com busca OCR já está liberado na sua Caixa Postal Digital!'
                              )}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-[#2a3942] hover:bg-emerald-600 hover:text-slate-950 text-cyan-300 font-bold text-left flex items-center justify-between text-[11px] transition-all"
                            >
                              <span>📄 Digitalizar Conteúdo</span>
                              <span className="text-[10px] opacity-75">PDF OCR</span>
                            </button>

                            <button
                              onClick={() => handleActionClick(
                                '🔐 Guardar no Locker',
                                '🔐 Pacote armazenado com segurança no Locker #14 (Hub Florianópolis). Código de liberação: 8392. Válido por 48h!'
                              )}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-[#2a3942] hover:bg-emerald-600 hover:text-slate-950 text-emerald-400 font-bold text-left flex items-center justify-between text-[11px] transition-all"
                            >
                              <span>🔐 Guardar no Locker</span>
                              <span className="text-[10px] opacity-75">Armário 24/7</span>
                            </button>

                            <button
                              onClick={() => handleActionClick(
                                '🚚 Reencaminhar',
                                '🚚 Iniciando cotação de frete para a sua rota atual. Selecionamos o melhor custo via Jadlog ou SEDEX com envio no mesmo dia.'
                              )}
                              className="w-full py-1.5 px-2.5 rounded-lg bg-[#2a3942] hover:bg-emerald-600 hover:text-slate-950 text-slate-300 font-bold text-left flex items-center justify-between text-[11px] transition-all"
                            >
                              <span>🚚 Reencaminhar Pacote</span>
                              <span className="text-[10px] opacity-75">Geo-Routing</span>
                            </button>
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                          <span>{m.time}</span>
                          {!isBot && <CheckCheck className="w-3 h-3 text-cyan-400" />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isProcessing && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 p-2 bg-[#202c33] rounded-xl w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                    <span className="text-[10px] text-slate-300 font-mono ml-1">NômadeHub digitando...</span>
                  </div>
                )}

              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSendMessage} className="p-2.5 bg-[#202c33] border-t border-slate-700/50 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Digite uma mensagem ou comando..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
