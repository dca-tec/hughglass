import { SiteMediaItem } from '../types';
import heroEgyptianImg from '../assets/images/hero_egyptian_copper_hub_1790445226601.jpg';
import copperLockersImg from '../assets/images/modern_copper_lockers_hub_1790445237611.jpg';

export const DEFAULT_SITE_MEDIA: SiteMediaItem[] = [
  // 1. FULLBANNERS PROMOCIONAIS NO TOPO DA HOME
  {
    id: 'banner-01-nacional',
    title: 'Seu Endereço Fixo Oficial & Lockers 24/7 em Todas as Capitais',
    description: 'Privacidade total, digitalização OCR de correspondências e lockers autônomos sem precisar de comprovante em papel. Válido sob a Lei 7.115/1983.',
    category: 'top_banner',
    imageUrl: heroEgyptianImg,
    targetUrl: '#como-funciona',
    ctaText: 'Ver Como Funciona',
    badge: '★ TRADIÇÃO NÔMADE & COBRE',
    accentColor: 'copper',
    displayOrder: 1,
    isActive: true,
    aspectRatio: '21:9',
    tags: ['Lockers', 'Endereço', 'OCR', 'Gov.br'],
    createdAt: '2026-09-26T10:00:00Z'
  },
  {
    id: 'banner-02-lockers-cobre',
    title: 'Armários Autônomos em Cobre Escovado & Lápis-Lazúli 24h',
    description: 'Guarda de encomendas com abertura por QR Code dinâmico, sensor de violação e apoio operacional para viajantes e nômades.',
    category: 'top_banner',
    imageUrl: copperLockersImg,
    targetUrl: '#como-funciona',
    ctaText: 'Conhecer Lockers',
    badge: 'ESTRUTURA EM COBRE 24/7',
    accentColor: 'cobalt',
    displayOrder: 2,
    isActive: true,
    aspectRatio: '21:9',
    tags: ['Cobre', 'Cobalto', 'Lockers'],
    createdAt: '2026-09-26T10:05:00Z'
  },
  {
    id: 'banner-03-cnpj',
    title: 'Abra seu MEI ou Empresa com Domicílio Fiscal Instantâneo',
    description: 'Registro de contrato social, certidões negativas e alvará municipal aprovado sem expor o endereço da sua residência.',
    category: 'top_banner',
    imageUrl: heroEgyptianImg,
    targetUrl: '#planos',
    ctaText: 'Ver Planos Fiscais',
    badge: '100% REGULARIZADO',
    accentColor: 'copper',
    displayOrder: 3,
    isActive: true,
    aspectRatio: '21:9',
    tags: ['MEI', 'CNPJ', 'Fiscal'],
    createdAt: '2026-09-26T10:10:00Z'
  },

  // 2. GALERIA DE MORADIA & COTAS
  {
    id: 'housing-01-suite',
    title: 'Suíte Individual Modular Confort',
    description: 'Módulo privativo com cama retrátil ortopédica, bancada ergonômica de trabalho, isolamento termoacústico e fechadura eletrônica por app.',
    category: 'housing_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Florianópolis',
    badge: 'Quarto Privativo',
    displayOrder: 1,
    isActive: true,
    tags: ['Quarto', 'Acústico', 'Smart Lock'],
    createdAt: '2026-09-26T10:12:00Z'
  },
  {
    id: 'housing-02-coworking',
    title: 'Espaço Coworking & Salas de Reunião 24/7',
    description: 'Internet com fibra redundante 1Gbps, cabines privativas para chamadas de vídeo, cafeteria de autoatendimento e estações de alta produtividade.',
    category: 'housing_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'São Paulo',
    badge: 'Produtividade',
    displayOrder: 2,
    isActive: true,
    tags: ['Coworking', 'Fibra Óptica', 'Cabines'],
    createdAt: '2026-09-26T10:14:00Z'
  },
  {
    id: 'housing-03-kitchen',
    title: 'Cozinha Industrial Coletiva & Refeitório Gourmet',
    description: 'Bancadas em aço inox sanitário, refrigeradores individuais setorizados por QR Code, fornos combinados e central de reciclagem de resíduos.',
    category: 'housing_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Curitiba',
    badge: 'Área Comum',
    displayOrder: 3,
    isActive: true,
    tags: ['Cozinha', 'Inox', 'Sustentabilidade'],
    createdAt: '2026-09-26T10:16:00Z'
  },
  {
    id: 'housing-04-rooftop',
    title: 'Rooftop Panorâmico & Área de Descompressão',
    description: 'Área aberta com vista para a natureza, lounges com sofás modulares, telão para exibição de filmes comunitários e espaço para ioga matinal.',
    category: 'housing_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Florianópolis',
    badge: 'Lazer & Convivência',
    displayOrder: 4,
    isActive: true,
    tags: ['Rooftop', 'Bem-Estar', 'Comunidade'],
    createdAt: '2026-09-26T10:18:00Z'
  },
  {
    id: 'housing-05-laundry',
    title: 'Lavanderia Inteligente Compartilhada OMO',
    description: 'Lavadoras e secadoras industriais de alta eficiência com dosagem automática de sabão ecológico e agendamento de ciclos pelo celular.',
    category: 'housing_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'São Paulo',
    badge: 'Facilidade 24h',
    displayOrder: 5,
    isActive: true,
    tags: ['Lavanderia', 'Automação', 'Sustentabilidade'],
    createdAt: '2026-09-26T10:20:00Z'
  },
  {
    id: 'housing-06-complex',
    title: 'Fachada Arquitetônica do Complexo Modular',
    description: 'Construção modular em estrutura de aço galvanizado sustentável, placas solares no telhado e jardins verticais integrados à paisagem urbana.',
    category: 'housing_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Belo Horizonte',
    badge: 'Arquitetura',
    displayOrder: 6,
    isActive: true,
    tags: ['Estrutura Modular', 'Placas Solares', 'Biofilia'],
    createdAt: '2026-09-26T10:22:00Z'
  },

  // 3. ESTRUTURA DOS LOCKERS E HUBS FÍSICOS
  {
    id: 'lockers-01-totem',
    title: 'Armários Lockers Autônomos de Alta Densidade',
    description: 'Módulos em chapa de aço com blindagem antivandalismo, travas solenoide digitais e leitor de QR Code criptografado dinâmico com expiração a cada 60s.',
    category: 'lockers_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Florianópolis',
    badge: 'Acesso 24/7',
    displayOrder: 1,
    isActive: true,
    tags: ['Lockers', 'Aço Blindado', 'Segurança'],
    createdAt: '2026-09-26T10:24:00Z'
  },
  {
    id: 'lockers-02-vanlife',
    title: 'Estação de Apoio Vanlife & Motorhomes',
    description: 'Pontos de recarga elétrica com tomadas industriais 220V/110V, abastecimento de água potável pressurizada e descarte sanitário ecológico.',
    category: 'lockers_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Ubatuba',
    badge: 'Vanlife Station',
    displayOrder: 2,
    isActive: true,
    tags: ['Vanlife', 'Energia Solar', 'Água Limpa'],
    createdAt: '2026-09-26T10:26:00Z'
  },
  {
    id: 'lockers-03-scanner',
    title: 'Scanner OCR Automatizado com Validação de Lacre',
    description: 'Equipamento de esteira plana de alta resolução para abertura assistida sob custódia e digitalização frente e verso em PDF pesquisável.',
    category: 'lockers_gallery',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    unitCity: 'Curitiba',
    badge: 'Tecnologia OCR',
    displayOrder: 3,
    isActive: true,
    tags: ['OCR', 'Digitalização', 'Privacidade'],
    createdAt: '2026-09-26T10:28:00Z'
  },

  // 4. INFRAESTRUTURA & ENGENHARIA DE SEGURANÇA
  {
    id: 'infra-01-fire-safety',
    title: 'Central de Combate a Incêndio & Sprinklers IT-CB',
    description: 'Rede de hidrantes pressurizada, bombas redundantes, reservatório técnico de 50.000 litros e portas corta-fogo P90 nos acessos principais.',
    category: 'infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
    badge: 'Segurança Máxima',
    displayOrder: 1,
    isActive: true,
    tags: ['Bombeiros', 'Sprinklers', 'P90'],
    createdAt: '2026-09-26T10:30:00Z'
  }
];
