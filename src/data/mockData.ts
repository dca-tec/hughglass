import { HubLocation, MailItem, FiscalDocument, NomadRouteStop, PrivacyProxyIdentity } from '../types';

export const HUBS_DATA: HubLocation[] = [
  {
    id: 'hub-florianopolis',
    name: 'Hub Nômade Florianópolis',
    city: 'Florianópolis',
    state: 'SC',
    address: 'Rodovia Francisco Magno Vieira, 1420 - Campeche',
    cep: '88063-700',
    lat: -27.6835,
    lng: -48.4912,
    totalLockers: 48,
    availableLockers: 14,
    is24h: true,
    hasVanlifeSupport: true,
    hasHumanDesk: true,
    phone: '(48) 3998-1020',
    statusText: 'Hub Florianópolis: 14 lockers disponíveis hoje'
  },
  {
    id: 'hub-saopaulo-madalena',
    name: 'Hub Central SP - Vila Madalena',
    city: 'São Paulo',
    state: 'SP',
    address: 'Rua Harmonia, 842 - Vila Madalena',
    cep: '05435-001',
    lat: -23.5539,
    lng: -46.6917,
    totalLockers: 96,
    availableLockers: 28,
    is24h: true,
    hasVanlifeSupport: false,
    hasHumanDesk: true,
    phone: '(11) 3214-7700',
    statusText: 'Hub SP Vila Madalena: 28 lockers disponíveis hoje'
  },
  {
    id: 'hub-curitiba-batel',
    name: 'Hub Conexão Sul - Curitiba',
    city: 'Curitiba',
    state: 'PR',
    address: 'Av. do Batel, 1750 - Batel',
    cep: '80420-090',
    lat: -25.4431,
    lng: -49.2922,
    totalLockers: 64,
    availableLockers: 19,
    is24h: true,
    hasVanlifeSupport: true,
    hasHumanDesk: true,
    phone: '(41) 3088-2911',
    statusText: 'Hub Curitiba Batel: 19 lockers disponíveis hoje'
  },
  {
    id: 'hub-riodejaneiro-porto',
    name: 'Hub Porto Maravilha - Rio',
    city: 'Rio de Janeiro',
    state: 'RJ',
    address: 'Av. Rodrigues Alves, 335 - Santo Cristo',
    cep: '20220-360',
    lat: -22.8988,
    lng: -43.1932,
    totalLockers: 50,
    availableLockers: 11,
    is24h: true,
    hasVanlifeSupport: false,
    hasHumanDesk: true,
    phone: '(21) 3901-4450',
    statusText: 'Hub Rio Porto: 11 lockers disponíveis hoje'
  },
  {
    id: 'hub-ubatuba-vanlife',
    name: 'Hub Ecoturismo & Vanlife Ubatuba',
    city: 'Ubatuba',
    state: 'SP',
    address: 'Rua das Palmeiras, 110 - Itaguá',
    cep: '11680-000',
    lat: -23.4542,
    lng: -45.0712,
    totalLockers: 32,
    availableLockers: 8,
    is24h: true,
    hasVanlifeSupport: true,
    hasHumanDesk: false,
    phone: '(12) 3832-9014',
    statusText: 'Hub Ubatuba (Vanlife & lock 24/7): 8 lockers disponíveis hoje'
  },
  {
    id: 'hub-chapada-veadeiros',
    name: 'Hub Nômade Chapada dos Veadeiros',
    city: 'Alto Paraíso de Goiás',
    state: 'GO',
    address: 'Av. Ary Valadão Filho, 780 - Centro',
    cep: '73770-000',
    lat: -14.1319,
    lng: -47.5146,
    totalLockers: 24,
    availableLockers: 7,
    is24h: true,
    hasVanlifeSupport: true,
    hasHumanDesk: false,
    phone: '(62) 3446-1212',
    statusText: 'Hub Chapada dos Veadeiros: 7 lockers disponíveis hoje'
  }
];

export const INITIAL_MAIL_ITEMS: MailItem[] = [
  {
    id: 'mail-001',
    trackingCode: 'NH-98421-BR',
    sender: 'Receita Federal do Brasil',
    senderDocument: '00.394.460/0058-87',
    type: 'fiscal_notice',
    receivedAt: 'Hoje, às 10:14',
    status: 'scanned',
    envelopePhotoUrl: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80',
    scannedAt: 'Hoje, às 10:22',
    pdfPages: 2,
    weightKg: 0.05,
    urgent: true,
    hubId: 'hub-florianopolis',
    ocrSnippet: 'Certidão Negativa de Débitos e Validação Cadastral CNPJ MEI...',
    ocrText: `MINISTÉRIO DA FAZENDA
SECRETARIA DA RECEITA FEDERAL DO BRASIL
PROCURADORIA-GERAL DA FAZENDA NACIONAL

CERTIDÃO POSITIVA COM EFEITOS DE NEGATIVA DE DÉBITOS RELATIVOS AOS TRIBUTOS FEDERAIS E À DÍVIDA ATIVA DA UNIÃO

Nome: NÔMADE DIGITAL TECNOLOGIA E SERVIÇOS DIGITAIS
CNPJ: 49.812.304/0001-92
Endereço Registrado: Rod. Francisco Magno Vieira, 1420 - Box NH-042 - Florianópolis/SC - CEP 88063-700

Ressalvado o direito de a Fazenda Nacional cobrar quaisquer dívidas de responsabilidade do sujeito passivo acima identificado que vierem a ser apuradas, é certificado que não constam pendências em seu nome relativas a créditos tributários administrados pela RFB.

Esta certidão é válida para a matriz e suas filiais pelo prazo de 180 dias.
Código de Autenticação Digital: RFB-8831-9920-AA71
Emitido em conformidade com o Decreto 7.574/2011.`
  },
  {
    id: 'mail-002',
    trackingCode: 'NL-410882104BR',
    sender: 'Mercado Livre / Logística FulFillment',
    senderDocument: '03.007.331/0001-41',
    type: 'package',
    receivedAt: 'Ontem, às 16:40',
    status: 'in_locker',
    envelopePhotoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80',
    dimensions: '22 x 18 x 10 cm',
    weightKg: 0.85,
    lockerNumber: 14,
    lockerPin: '8392',
    qrToken: 'NH-LK14-TOKEN-8392-VERIFIED',
    lockerExpiresAt: '2 dias restantes',
    hubId: 'hub-florianopolis',
    urgent: false,
    ocrSnippet: 'Item: Roteador Portátil 4G/5G com Bateria 10.000mAh para Nômades...',
    ocrText: `DANFE SIMPLIFICADO - DOCUMENTO AUXILIAR DE NOTA FISCAL ELETRÔNICA
Chave de Acesso: 3524 0903 0073 3100 0141 5500 1004 8921 8812
Destinatário: Lucas M. (Hugh Glass Box Campeche)
Conteúdo: Kit Conectividade Satelital & Cabo USB-C Reforçado.
Transportador: Jadlog Logística Expressa`
  },
  {
    id: 'mail-003',
    trackingCode: 'NB-2026-CARD',
    sender: 'Banco Inter S.A.',
    senderDocument: '00.416.968/0001-01',
    type: 'card',
    receivedAt: '18 Set, às 14:15',
    status: 'scanned',
    envelopePhotoUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&auto=format&fit=crop&q=80',
    scannedAt: '18 Set, às 14:30',
    pdfPages: 1,
    weightKg: 0.04,
    hubId: 'hub-florianopolis',
    urgent: false,
    ocrSnippet: 'Seu novo cartão físico Mastercard Black Global Account chegou...',
    ocrText: `BANCO INTER S.A. - BANCO DIGITAL GLOBAL
Olá, Lucas!
Aqui está o seu novo cartão físico Mastercard Contactless para suas viagens e compras internacionais sem IOF abusivo.
Lembre-se de desbloquear pelo aplicativo do Inter utilizando o código de segurança impresso no verso do cartão.
Endereço de entrega seguro via Hugh Glass Locker Florianópolis.`
  },
  {
    id: 'mail-004',
    trackingCode: 'GOV-JUCESC-991',
    sender: 'Junta Comercial de Santa Catarina - JUCESC',
    senderDocument: '82.951.310/0001-85',
    type: 'gov_official',
    receivedAt: '16 Set, às 09:05',
    status: 'scanned',
    envelopePhotoUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    scannedAt: '16 Set, às 09:20',
    pdfPages: 3,
    weightKg: 0.08,
    hubId: 'hub-florianopolis',
    urgent: true,
    ocrSnippet: 'Homologação do Endereço de Domicílio Fiscal para Atividade Econômica MEI/SLU...',
    ocrText: `ESTADO DE SANTA CATARINA
JUNTA COMERCIAL DO ESTADO DE SANTA CATARINA - JUCESC
CERTIDÃO SIMPLIFICADA DE CONSTITUIÇÃO EMPRESARIAL

A JUCESC certifica que a empresa com CNPJ 49.812.304/0001-92 encontra-se devidamente registrada, com Domicílio Fiscal e Ponto de Contato Virtual estabelecido no Hub Hugh Glass Florianópolis, em conformidade com a Resolução CGSIM nº 61/2020 e a Lei da Liberdade Econômica (Lei nº 13.874/2019).
Atividades autorizadas: Desenvolvimento de Software, Design UX, Consultoria em TI e Produção Audiovisual Digital.`
  }
];

export const FISCAL_DOCS: FiscalDocument[] = [
  {
    id: 'doc-01',
    title: 'Certidão de Endereço Fiscal & Domicílio Comercial',
    category: 'certidao_fiscal',
    code: 'CERT-HG-2026-89421',
    issuedAt: '01/01/2026',
    validUntil: '31/12/2026',
    authority: 'Prefeitura de Florianópolis & Receita Federal',
    authHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    fileSize: '420 KB',
    description: 'Documento obrigatório para protocolo na Junta Comercial, Alvará de Funcionamento e abertura de conta jurídica (PJ).'
  },
  {
    id: 'doc-02',
    title: 'Contrato de Cessão de Endereço Virtual & Gestão Logística',
    category: 'contrato_social',
    code: 'CONTR-HG-FLN-042',
    issuedAt: '12/01/2026',
    validUntil: 'Indeterminado',
    authority: 'Hugh Glass Tecnologia & Infraestrutura Ltda.',
    authHash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    fileSize: '680 KB',
    description: 'Contrato assinado digitalmente com validade jurídica (ICP-Brasil) para comprovação perante bancos, embaixadas e fornecedores.'
  },
  {
    id: 'doc-03',
    title: 'Declaração de Residência nos Termos da Lei Federal 7.115/1983',
    category: 'declaracao_residencia',
    code: 'DECL-GOVBR-LEI7115',
    issuedAt: '15/02/2026',
    validUntil: '15/02/2027',
    authority: 'Portal Gov.br & Sistema Nacional de Trânsito / Receita Federal',
    authHash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    fileSize: '310 KB',
    description: 'Declaração formal autenticada via Gov.br Prata/Ouro que substitui legalmente conta de luz ou contrato de aluguel fixo.'
  },
  {
    id: 'doc-04',
    title: 'Cartão CNPJ / Comprovante de Inscrição e Situação Cadastral',
    category: 'cartao_cnpj',
    code: 'CNPJ-49.812.304/0001-92',
    issuedAt: '20/09/2026',
    validUntil: 'Ativo e Regular',
    authority: 'Receita Federal do Brasil',
    authHash: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    fileSize: '240 KB',
    description: 'Espelho oficial da situação cadastral do CNPJ com o endereço virtual do Hub associado como matriz operacional.'
  }
];

export const INITIAL_NOMAD_STOPS: NomadRouteStop[] = [
  {
    id: 'stop-1',
    city: 'Florianópolis',
    state: 'SC',
    startDate: '01/09/2026',
    endDate: '28/09/2026',
    hubAssignedId: 'hub-florianopolis',
    hubName: 'Hub Nômade Florianópolis (Campeche)',
    isActive: true
  },
  {
    id: 'stop-2',
    city: 'Curitiba',
    state: 'PR',
    startDate: '29/09/2026',
    endDate: '18/10/2026',
    hubAssignedId: 'hub-curitiba-batel',
    hubName: 'Hub Conexão Sul - Curitiba (Batel)',
    isActive: false
  },
  {
    id: 'stop-3',
    city: 'Ubatuba',
    state: 'SP',
    startDate: '19/10/2026',
    endDate: '10/11/2026',
    hubAssignedId: 'hub-ubatuba-vanlife',
    hubName: 'Hub Ecoturismo & Vanlife Ubatuba',
    isActive: false
  }
];

export const PRIVACY_PROXIES: PrivacyProxyIdentity[] = [
  {
    id: 'proxy-01',
    label: 'Vendas Mercado Livre & Envio Correios',
    proxyName: 'Lucas M. - Depto Logístico Express',
    proxyCpfMasked: '***.721.904-** (Proxy Seguro Ativo)',
    boxIdentifier: 'BOX-PROX-4911',
    fullAddress: 'Rod. Francisco Magno Vieira, 1420 - Box 4911 - Florianópolis/SC - CEP 88063-700',
    forwardToRealName: 'Lucas Mendes Ferreira',
    isShieldActive: true,
    totalDeliveriesFiltered: 38
  },
  {
    id: 'proxy-02',
    label: 'Remetente Shopee & E-commerce Pessoal',
    proxyName: 'L. M. Studio Digital',
    proxyCpfMasked: '***.721.904-** (Proxy Seguro Ativo)',
    boxIdentifier: 'BOX-PROX-8802',
    fullAddress: 'Rua Harmonia, 842 - Box 8802 - Vila Madalena - São Paulo/SP - CEP 05435-001',
    forwardToRealName: 'Lucas Mendes Ferreira',
    isShieldActive: true,
    totalDeliveriesFiltered: 19
  }
];

export const SHARED_HOUSING_UNITS: import('../types').SharedHousingUnit[] = [
  {
    id: 'unit-sp-capital',
    city: 'São Paulo',
    state: 'SP',
    name: 'Mega Hub Coliving São Paulo (Vila Madalena)',
    address: 'Rua Harmonia, 842 - Complexo Modular ZEU',
    cep: '05435-001',
    totalBeds: 1000,
    occupiedBeds: 820,
    availableBeds: 180,
    baseMonthlyRent: 790,
    quotaPrice: 28000,
    amenities: [
      'Cozinha Industrial Compartilhada',
      'Lavanderia Autônoma OMO',
      'Coworking 24/7 com Fibra 1Gbps',
      'Lockers Inteligentes',
      'Armários com Chave Biométrica',
      'Segurança e AVCB Bombeiros'
    ],
    complianceLegal: {
      fireDepartmentApproved: true,
      zoningClassification: 'ZEU (Zona Eixo de Estruturação da Transformação Urbana)',
      maxAuthorizedOccupancy: 1000,
      sanitaryInspectionPassed: true
    }
  },
  {
    id: 'unit-curitiba-batel',
    city: 'Curitiba',
    state: 'PR',
    name: 'Hub Residencial & Mobilidade Curitiba (Batel)',
    address: 'Av. do Batel, 1750',
    cep: '80420-090',
    totalBeds: 500,
    occupiedBeds: 330,
    availableBeds: 170,
    baseMonthlyRent: 690,
    quotaPrice: 24000,
    amenities: [
      'Refeitório Coletivo',
      'Bicicletário & Oficina',
      'Salas de Reunião com Isolamento Acústico',
      'Lavanderia',
      'AVCB Vigente'
    ],
    complianceLegal: {
      fireDepartmentApproved: true,
      zoningClassification: 'ZR-4 (Zona Residencial de Alta Densidade)',
      maxAuthorizedOccupancy: 500,
      sanitaryInspectionPassed: true
    }
  },
  {
    id: 'unit-florianopolis-campeche',
    city: 'Florianópolis',
    state: 'SC',
    name: 'Eco-Complexo Nômade Floripa (Campeche Sul)',
    address: 'Rod. Francisco Magno Vieira, 1420',
    cep: '88063-700',
    totalBeds: 500,
    occupiedBeds: 410,
    availableBeds: 90,
    baseMonthlyRent: 750,
    quotaPrice: 26000,
    amenities: [
      'Pátio Vanlife com Água e Energia',
      'Deck de Convivência & Yoga',
      'Cozinhas Modulares',
      'Lockers 24/7 com Retirada BLE',
      'Vestiários Sanitários Coletivos'
    ],
    complianceLegal: {
      fireDepartmentApproved: true,
      zoningClassification: 'ARM (Área Residencial Mista)',
      maxAuthorizedOccupancy: 500,
      sanitaryInspectionPassed: true
    }
  },
  {
    id: 'unit-bc-litoral',
    city: 'Balneário Camboriú',
    state: 'SC',
    name: 'Tower Coliving Balneário Camboriú (Centro)',
    address: 'Avenida Brasil, 2200',
    cep: '88330-053',
    totalBeds: 500,
    occupiedBeds: 460,
    availableBeds: 40,
    baseMonthlyRent: 890,
    quotaPrice: 32000,
    amenities: [
      'Rooftop Coworking',
      'Cozinha Gourmet Compartilhada',
      'Chuveiros com Aquecimento Solar',
      'Armários Blindados',
      'Alvará Definitivo'
    ],
    complianceLegal: {
      fireDepartmentApproved: true,
      zoningClassification: 'ZIR (Zona de Intervenção e Requalificação)',
      maxAuthorizedOccupancy: 500,
      sanitaryInspectionPassed: true
    }
  },
  {
    id: 'unit-bh-savassi',
    city: 'Belo Horizonte',
    state: 'MG',
    name: 'Hub Mineiro de Inovação & Moradia (Savassi)',
    address: 'Rua Pernambuco, 1100',
    cep: '30130-151',
    totalBeds: 600,
    occupiedBeds: 420,
    availableBeds: 180,
    baseMonthlyRent: 680,
    quotaPrice: 23500,
    amenities: [
      'Espaço Café & Convivência',
      'Cozinha Comunitária',
      'Estações Ergonômicas',
      'Acesso 24/7 por Biometria Facial'
    ],
    complianceLegal: {
      fireDepartmentApproved: true,
      zoningClassification: 'ZAP (Zona de Adensamento Preferencial)',
      maxAuthorizedOccupancy: 600,
      sanitaryInspectionPassed: true
    }
  },
  {
    id: 'unit-rio-porto',
    city: 'Rio de Janeiro',
    state: 'RJ',
    name: 'Porto Maravilha Hub Residencial (Centro)',
    address: 'Av. Rodrigues Alves, 435',
    cep: '20081-250',
    totalBeds: 1000,
    occupiedBeds: 720,
    availableBeds: 280,
    baseMonthlyRent: 850,
    quotaPrice: 31000,
    amenities: [
      'Auditório Multiuso',
      'Cozinha Central de Alta Capacidade',
      'Lavanderias em Cada Pavimento',
      'Saídas de Emergência com Pressurização'
    ],
    complianceLegal: {
      fireDepartmentApproved: true,
      zoningClassification: 'Operação Urbana Consorciada Porto Maravilha',
      maxAuthorizedOccupancy: 1000,
      sanitaryInspectionPassed: true
    }
  }
];

export const INITIAL_BED_INTERCHANGE: import('../types').BedInterchangeBooking = {
  id: 'inter-8821',
  userId: 'usr-lucas-01',
  userName: 'Lucas Mendes Ferreira',
  baseUnitCity: 'Florianópolis (Campeche)',
  baseBedNumber: 'Quarto 12 - Leito B',
  destinationCity: 'Curitiba (Batel)',
  destinationBedNumber: 'Quarto 04 - Leito A',
  destinationUnitName: 'Hub Residencial & Mobilidade Curitiba',
  startDate: '01/10/2026',
  endDate: '25/10/2026',
  daysRemaining: 24,
  status: 'active',
  isBaseBedInPool: true,
  qrAccessCode: 'INTER-FLN-CWB-2026-TOKEN-994',
  bleLockKey: 'BLE-DOOR-CWB-Q04-LA'
};

export const INITIAL_PROPERTY_QUOTAS: import('../types').PropertyQuota[] = [
  {
    id: 'quota-001',
    quotaCode: 'NH-COT-SP-014',
    title: 'Cota Imobiliária Modular - Hub São Paulo (Vila Madalena)',
    unitCity: 'São Paulo',
    unitState: 'SP',
    fractionLabel: 'Fração 1/24 Registrada em Cartório',
    acquisitionValue: 28000,
    currentEstimatedValuation: 32500,
    monthlyGrossRent: 790,
    managementFeePercent: 15,
    netMonthlyYield: 671.50,
    annualYieldPercent: 14.8,
    occupancyRateAverage: 91.5,
    isInManagementPool: true,
    lastPayoutDate: '10/09/2026',
    nextPayoutDate: '10/10/2026'
  },
  {
    id: 'quota-002',
    quotaCode: 'NH-COT-SC-089',
    title: 'Cota Imobiliária Modular - Hub Florianópolis (Campeche)',
    unitCity: 'Florianópolis',
    unitState: 'SC',
    fractionLabel: 'Fração 1/24 Registrada em Cartório',
    acquisitionValue: 26000,
    currentEstimatedValuation: 29800,
    monthlyGrossRent: 750,
    managementFeePercent: 15,
    netMonthlyYield: 637.50,
    annualYieldPercent: 14.2,
    occupancyRateAverage: 88.0,
    isInManagementPool: true,
    lastPayoutDate: '10/09/2026',
    nextPayoutDate: '10/10/2026'
  }
];

export const INITIAL_MULTI_COMPANIES: import('../types').MultiCompanyAddress[] = [
  {
    id: 'comp-01',
    companyName: 'LUCAS MENDES FERREIRA - SERVIÇOS DIGITAIS MEI',
    cnpj: '49.812.304/0001-92',
    unitCity: 'Florianópolis',
    unitState: 'SC',
    fiscalAddress: 'Rodovia Francisco Magno Vieira, 1420 - Box NH-042 - Campeche, Florianópolis/SC - CEP 88063-700',
    municipalLicenseStatus: 'homologado',
    viabilityProtocol: 'PMF-VIAB-2026-8812',
    activityCodeCnae: '6201-5/01 - Desenvolvimento de Softwares',
    digitalMailboxId: 'BOX-NH-042',
    unreadNoticesCount: 1
  },
  {
    id: 'comp-02',
    companyName: 'NÔMADE EXPEDITIONS E-COMMERCE & DISTRIBUIÇÃO LTDA',
    cnpj: '53.119.802/0001-14',
    unitCity: 'São Paulo',
    unitState: 'SP',
    fiscalAddress: 'Rua Harmonia, 842 - Box NH-SP-108 - Vila Madalena, São Paulo/SP - CEP 05435-001',
    municipalLicenseStatus: 'homologado',
    viabilityProtocol: 'PMSP-VIAB-2026-9041',
    activityCodeCnae: '4791-4/00 - Comércio Varejista via Internet',
    digitalMailboxId: 'BOX-NH-SP-108',
    unreadNoticesCount: 2
  }
];

export const MODULAR_COMPLEX_PRESETS: import('../types').ModularComplexSpec[] = [
  {
    id: 'spec-1000',
    title: 'Módulo Piloto Urbano (1.000 m²)',
    totalAreaM2: 1000,
    modulesCount: 1,
    maxResidents: 160,
    areaPerPersonM2: 6.25,
    dormitoryM2: 500,
    bathroomsM2: 150,
    kitchenRefectoryM2: 120,
    coworkingLeisureM2: 100,
    laundryTechnicalM2: 130,
    estimatedIndustrialCapex: 4200000,
    projectedMonthlyRevenue: 126400,
    recommendedStructure: 'Galpão Pré-Fabricado de Concreto com Mezaninos em Estrutura Metálica Leve',
    fireSafetyFeatures: [
      'Saídas de emergência duplas com barra antipânico',
      'Sistema de hidrantes e sprinklers automatizados',
      'Rotas de fuga sinalizadas com iluminação de emergência autônoma',
      'Portas corta-fogo P90 nos acessos aos dormitórios'
    ]
  },
  {
    id: 'spec-2000',
    title: 'Hub Modular Integrado (2.000 m²)',
    totalAreaM2: 2000,
    modulesCount: 2,
    maxResidents: 350,
    areaPerPersonM2: 5.71,
    dormitoryM2: 1050,
    bathroomsM2: 300,
    kitchenRefectoryM2: 250,
    coworkingLeisureM2: 220,
    laundryTechnicalM2: 180,
    estimatedIndustrialCapex: 7800000,
    projectedMonthlyRevenue: 276500,
    recommendedStructure: 'Dois Pavilhões Modulares Conectados por Passarela Coberta de Aço e Vidro',
    fireSafetyFeatures: [
      'Alarme de incêndio com detecção ótica e térmica de fumaça',
      'Escadas enclausuradas à prova de fumaça',
      'Central de GLP externa para cozinhas comunitárias com corte automático',
      'Conformidade integral com IT-Corpo de Bombeiros'
    ]
  },
  {
    id: 'spec-4000',
    title: 'Complexo de Alta Capacidade (4.000 m²)',
    totalAreaM2: 4000,
    modulesCount: 4,
    maxResidents: 720,
    areaPerPersonM2: 5.55,
    dormitoryM2: 2100,
    bathroomsM2: 600,
    kitchenRefectoryM2: 480,
    coworkingLeisureM2: 440,
    laundryTechnicalM2: 380,
    estimatedIndustrialCapex: 14900000,
    projectedMonthlyRevenue: 568800,
    recommendedStructure: 'Quadra de 4 Galpões Industriais Pré-Moldados com Pátio Central de Convivência',
    fireSafetyFeatures: [
      'Reservatório dedicado de combate a incêndio (RTI) de 50.000L',
      'Sistema de despressurização e exaustão mecânica de fumaça',
      'Brigada de incêndio interna com operador 24h',
      'Acessibilidade NBR 9050 em 100% das áreas comuns'
    ]
  },
  {
    id: 'spec-6000',
    title: 'Mega Cidade Modular para 1.000 Moradores (6.000 m²)',
    totalAreaM2: 6000,
    modulesCount: 6,
    maxResidents: 1050,
    areaPerPersonM2: 5.71,
    dormitoryM2: 3200,
    bathroomsM2: 900,
    kitchenRefectoryM2: 700,
    coworkingLeisureM2: 650,
    laundryTechnicalM2: 550,
    estimatedIndustrialCapex: 21500000,
    projectedMonthlyRevenue: 829500,
    recommendedStructure: 'Complexo de 6 Módulos Especializados: 4 Módulos Dormitórios + 1 Módulo Gastronomia/Lavanderia + 1 Módulo Coworking/Lazer/Auditório',
    fireSafetyFeatures: [
      'Setorização compartimentada por paredes corta-fogo entre os 6 blocos',
      'Sistema de controle de fumaça automatizado em átrios centrais',
      'Rotas de fuga para escoamento rápido de 1.050 pessoas em até 3 minutos',
      'Central de monitoramento com câmeras térmicas e sensores IoT 24/7'
    ]
  }
];

