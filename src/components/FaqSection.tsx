import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Compass } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'O comprovante de endereço residencial é aceito em bancos e órgãos oficiais?',
      a: 'Sim, 100%! O comprovante emitido pela Hugh Glass é estritamente amparado pela Lei Federal nº 7.115/1983, que garante a validade jurídica de declarações de domicílio e residência em todo o território nacional. Você pode utilizar para abrir contas bancárias (Itaú, Nubank, Bradesco, Inter), emitir ou renovar CNH, passaporte, solicitar cartões de crédito e cadastros em concursos e órgãos públicos.'
    },
    {
      q: 'Qual é a diferença entre o endereço residencial e o endereço comercial/fiscal?',
      a: 'O Endereço Residencial é destinado à Pessoa Física (CPF), servindo para documentos pessoais, bancos, faturas e recebimento de compras em armários lockers 24h. Já o Endereço Comercial & Domicílio Fiscal é destinado à Pessoa Jurídica (CNPJ / MEI), servindo para registro na Junta Comercial, obtenção de alvará municipal na Prefeitura e emissão legal de notas fiscais (NF-e), protegendo sua residência pessoal de exposição pública na internet.'
    },
    {
      q: 'Posso contratar os dois endereços juntos (Residencial + Comercial)?',
      a: 'Com certeza! Essa é a opção mais contratada: o Combo Nômade Pro. Nele, você regulariza sua vida pessoal de viajante ou nômade com um endereço residencial fixo permanente e, simultaneamente, vincula seu MEI ou empresa ao domicílio fiscal com alvará, economizando mais de R$ 220 por ano.'
    },
    {
      q: 'Como funciona a retirada de encomendas nos armários lockers 24/7?',
      a: 'Quando sua encomenda chega (enviada por Correios, Mercado Livre, Amazon, etc.), nossa equipe armazena em um compartimento inteligente e você recebe um aviso no WhatsApp com um QR Code dinâmico criptografado. Você pode retirar 24 horas por dia, 7 dias por semana, sem precisar de chaves ou contato humano.'
    },
    {
      q: 'Como recebo minhas cartas se estiver viajando ou em outra cidade?',
      a: 'Assim que uma correspondência física chega ao seu Box, realizamos a digitalização do envelope e, se autorizado, o escaneamento OCR do conteúdo interno em alta resolução, enviando o documento legível e pesquisável diretamente no seu WhatsApp e painel online. Se desejar a carta física original, nós reenviamos para o local onde você estiver hospedado.'
    },
    {
      q: 'Existe período de carência ou fidelidade obrigatória?',
      a: 'Não. Os planos mensais não possuem carência nem multas rescisórias: você contrata enquanto precisar e pode cancelar a qualquer momento diretamente pelo seu painel com 1 clique.'
    },
    {
      q: 'Sou estrangeiro ou não resido no Brasil. Posso contratar para abrir meu CNPJ e pagar via Stripe?',
      a: 'Sim! Atendemos fundadores estrangeiros, expatriados e nômades globais que desejam abrir ou manter empresa no Brasil (CNPJ de Sócio Não-Residente, conforme Instrução Normativa RFB nº 2.119/2022). Nosso domicílio fiscal em Florianópolis e São Paulo é homologado na Junta Comercial e Prefeitura para sócios não-residentes com procurador legal no Brasil. Você pode contratar e pagar diretamente em Dólares (USD), Euros (EUR) ou Reais (BRL) via Stripe com cartões internacionais, Apple Pay ou Google Pay.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#0c0d12] border-b border-[#3d3428]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1711] border border-[#c27839]/40 text-[#e5985a] text-xs sm:text-sm font-semibold tracking-wider font-mono uppercase">
            <Compass className="w-3.5 h-3.5 text-[#e5985a]" />
            <span>TIRE SUAS DÚVIDAS ANTES DE CONTRATAR</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5efe6] tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-base sm:text-lg text-[#d4c5b0] leading-relaxed">
            Tudo o que você precisa saber sobre a validade legal da Lei 7.115/83, lockers 24h e domicílio fiscal.
          </p>
        </div>

        {/* ACCORDION LIST */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen 
                    ? 'bg-[#141724] border-[#c27839]/60 shadow-xl' 
                    : 'bg-[#12151e] border-[#3d3428] hover:border-[#3d3428]/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-[#f5efe6] leading-snug">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#c27839]/20 text-[#e5985a] rotate-180' : 'bg-[#1a1f30] text-[#9e8e78]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#d4c5b0] leading-relaxed border-t border-[#3d3428]">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
