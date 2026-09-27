export type UserProfileType = 'nomad' | 'privacy' | 'business' | 'unhoused';

export interface HubLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  cep: string;
  lat: number;
  lng: number;
  totalLockers: number;
  availableLockers: number;
  is24h: boolean;
  hasVanlifeSupport: boolean; // tomadas, água, wifi
  hasHumanDesk: boolean;
  phone: string;
  statusText: string;
}

export type MailItemStatus = 'received' | 'scanned' | 'in_locker' | 'forwarded' | 'recycled';
export type MailItemType = 'letter' | 'package' | 'fiscal_notice' | 'card' | 'gov_official';

export interface MailItem {
  id: string;
  trackingCode: string;
  sender: string;
  senderDocument?: string;
  type: MailItemType;
  receivedAt: string;
  status: MailItemStatus;
  envelopePhotoUrl: string;
  weightKg?: number;
  dimensions?: string;
  scannedAt?: string;
  pdfPages?: number;
  ocrText?: string;
  ocrSnippet?: string;
  lockerNumber?: number;
  lockerPin?: string;
  qrToken?: string;
  lockerExpiresAt?: string;
  hubId: string;
  urgent?: boolean;
}

export interface FiscalDocument {
  id: string;
  title: string;
  category: 'certidao_fiscal' | 'contrato_social' | 'declaracao_residencia' | 'cartao_cnpj';
  code: string;
  issuedAt: string;
  validUntil: string;
  authHash: string;
  authority: string;
  fileSize: string;
  description: string;
}

export interface FreightOption {
  carrier: string;
  service: string;
  price: number;
  deliveryDays: number;
  trackingAvailable: boolean;
  badge?: string;
}

export interface NomadRouteStop {
  id: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  hubAssignedId: string;
  hubName: string;
  isActive: boolean;
}

export interface PrivacyProxyIdentity {
  id: string;
  label: string;
  proxyName: string;
  proxyCpfMasked: string;
  boxIdentifier: string;
  fullAddress: string;
  forwardToRealName: string;
  isShieldActive: boolean;
  totalDeliveriesFiltered: number;
}

export interface SharedHousingUnit {
  id: string;
  city: string;
  state: string;
  name: string;
  address: string;
  cep: string;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  baseMonthlyRent: number;
  quotaPrice: number;
  amenities: string[];
  complianceLegal: {
    fireDepartmentApproved: boolean;
    zoningClassification: string;
    maxAuthorizedOccupancy: number;
    sanitaryInspectionPassed: boolean;
  };
}

export interface BedInterchangeBooking {
  id: string;
  userId: string;
  userName: string;
  baseUnitCity: string;
  baseBedNumber: string;
  destinationCity: string;
  destinationBedNumber: string;
  destinationUnitName: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  status: 'active' | 'scheduled' | 'completed';
  isBaseBedInPool: boolean;
  qrAccessCode: string;
  bleLockKey: string;
}

export interface PropertyQuota {
  id: string;
  quotaCode: string;
  title: string;
  unitCity: string;
  unitState: string;
  fractionLabel: string; // Ex: "Cota 1/12 (Fração Ideal Registrada)"
  acquisitionValue: number;
  currentEstimatedValuation: number;
  monthlyGrossRent: number;
  managementFeePercent: number;
  netMonthlyYield: number;
  annualYieldPercent: number;
  occupancyRateAverage: number;
  isInManagementPool: boolean;
  lastPayoutDate: string;
  nextPayoutDate: string;
}

export interface MultiCompanyAddress {
  id: string;
  companyName: string;
  cnpj: string;
  unitCity: string;
  unitState: string;
  fiscalAddress: string;
  municipalLicenseStatus: 'homologado' | 'em_processamento';
  viabilityProtocol: string;
  activityCodeCnae: string;
  digitalMailboxId: string;
  unreadNoticesCount: number;
}

export interface ModularComplexSpec {
  id: string;
  title: string;
  totalAreaM2: number;
  modulesCount: number;
  maxResidents: number;
  areaPerPersonM2: number;
  dormitoryM2: number;
  bathroomsM2: number;
  kitchenRefectoryM2: number;
  coworkingLeisureM2: number;
  laundryTechnicalM2: number;
  estimatedIndustrialCapex: number;
  projectedMonthlyRevenue: number;
  recommendedStructure: string;
  fireSafetyFeatures: string[];
}

export type SiteMediaCategory = 
  | 'top_banner' 
  | 'housing_gallery' 
  | 'lockers_gallery' 
  | 'infrastructure' 
  | 'social_impact';

export interface SiteMediaItem {
  id: string;
  title: string;
  description?: string;
  category: SiteMediaCategory;
  imageUrl: string;
  targetUrl?: string;
  ctaText?: string;
  badge?: string;
  accentColor?: string;
  displayOrder: number;
  isActive: boolean;
  unitCity?: string;
  aspectRatio?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

