import { loadStripe, Stripe } from '@stripe/stripe-js';

// Default demo public key (can be overridden via VITE_STRIPE_PUBLIC_KEY env var)
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51PTestHughGlassMockGlobalKey9928472910384';

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export type SupportedCurrency = 'BRL' | 'USD' | 'EUR';

export interface StripePlanPricing {
  id: 'residential' | 'commercial' | 'combo';
  title: string;
  badgePt: string;
  badgeEn: string;
  priceBrlMonthly: number;
  priceBrlYearly: number; // Monthly equivalent (e.g. 49)
  priceBrlYearlyTotal: number; // Full total charged (e.g. 588)
  priceUsdMonthly: number;
  priceUsdYearly: number;
  priceUsdYearlyTotal: number;
  stripePriceIdUsdMonthly: string;
  stripePriceIdUsdYearly: string;
  featuresEn: string[];
}

export const STRIPE_PLANS: Record<'residential' | 'commercial' | 'combo', StripePlanPricing> = {
  residential: {
    id: 'residential',
    title: 'Endereço Residencial Fixo / Fixed Residential Address',
    badgePt: 'PESSOA FÍSICA (CPF / PASSAPORTE)',
    badgeEn: 'DIGITAL NOMADS & EXPATS (CPF / PASSPORT)',
    priceBrlMonthly: 59,
    priceBrlYearly: 49,
    priceBrlYearlyTotal: 588, // 12x de R$ 49,00
    priceUsdMonthly: 12,
    priceUsdYearly: 10,
    priceUsdYearlyTotal: 120,
    stripePriceIdUsdMonthly: 'price_nomade_res_usd_m',
    stripePriceIdUsdYearly: 'price_nomade_res_usd_y',
    featuresEn: [
      'Official Brazilian residential proof of address (Law 7.115/83)',
      'High-security confidential OCR mail scanning with WhatsApp alerts',
      '24/7 Smart Lockers access in top Brazilian cities',
      'Accepted by Brazilian banks (Nubank, Itaú, Inter) & Federal Police (RNM/VITEM V)'
    ]
  },
  commercial: {
    id: 'commercial',
    title: 'Endereço Comercial & Domicílio Fiscal / Business & Tax Address',
    badgePt: 'PESSOA JURÍDICA (CNPJ BRASIL)',
    badgeEn: 'FOREIGN FOUNDERS & NON-RESIDENT CNPJ',
    priceBrlMonthly: 99,
    priceBrlYearly: 89,
    priceBrlYearlyTotal: 1068, // 12x de R$ 89,00
    priceUsdMonthly: 20,
    priceUsdYearly: 18,
    priceUsdYearlyTotal: 216,
    stripePriceIdUsdMonthly: 'price_nomade_biz_usd_m',
    stripePriceIdUsdYearly: 'price_nomade_biz_usd_y',
    featuresEn: [
      'Approved municipal tax domicile for Brazilian company registration (CNPJ)',
      'Full compliance with Brazilian Federal Revenue (RFB) & Board of Trade (JUCESC/JUCESP)',
      'Suitable for non-resident foreign founders and local legal attorneys',
      'Official commercial IPTU & Municipal Business License (Alvará) support',
      'Confidential fiscal summons & legal correspondence handling'
    ]
  },
  combo: {
    id: 'combo',
    title: 'Combo Nômade Pro (Residencial + Comercial)',
    badgePt: 'COMBO COMPLETO GLOBAL',
    badgeEn: 'FULL ALL-IN-ONE GLOBAL BUNDLE',
    priceBrlMonthly: 139,
    priceBrlYearly: 119,
    priceBrlYearlyTotal: 1428, // 12x de R$ 119,00
    priceUsdMonthly: 28,
    priceUsdYearly: 24,
    priceUsdYearlyTotal: 288,
    stripePriceIdUsdMonthly: 'price_nomade_combo_usd_m',
    stripePriceIdUsdYearly: 'price_nomade_combo_usd_y',
    featuresEn: [
      'Both Personal Residential Address + Registered Business CNPJ Domicile',
      'Dedicated legal mailbox with real-time digital scanning',
      'Full nationwide parcel forwarding (DHL, FedEx, Correios Sedex)',
      'VIP onboarding with English & Spanish bilingual legal support'
    ]
  }
};

/**
 * Get total amount charged upfront for a plan
 */
export const getPlanTotalAmount = (
  plan: StripePlanPricing,
  billingCycle: 'monthly' | 'yearly',
  currency: SupportedCurrency = 'BRL'
): number => {
  if (currency === 'USD') {
    return billingCycle === 'yearly' ? plan.priceUsdYearlyTotal : plan.priceUsdMonthly;
  }
  return billingCycle === 'yearly' ? plan.priceBrlYearlyTotal : plan.priceBrlMonthly;
};

export interface InstallmentOption {
  count: number;
  installmentAmount: number;
  totalAmount: number;
  label: string;
}

/**
 * Generate installment options up to 12x for Brazilian credit cards
 */
export const getInstallmentOptions = (
  totalAmount: number,
  maxCount: number = 12,
  currency: SupportedCurrency = 'BRL'
): InstallmentOption[] => {
  const allowed = [1, 2, 3, 4, 5, 6, 10, 12].filter(c => c <= maxCount);
  return allowed.map(count => {
    const installmentAmount = Math.round((totalAmount / count) * 100) / 100;
    const formattedInstallment = currency === 'BRL' ? `R$ ${installmentAmount.toFixed(2).replace('.', ',')}` : `$${installmentAmount.toFixed(2)}`;
    const formattedTotal = currency === 'BRL' ? `R$ ${totalAmount.toFixed(2).replace('.', ',')}` : `$${totalAmount.toFixed(2)}`;
    
    return {
      count,
      installmentAmount,
      totalAmount,
      label: count === 1 
        ? `1x de ${formattedTotal} (à vista no cartão)` 
        : `${count}x de ${formattedInstallment} sem juros (Total: ${formattedTotal})`
    };
  });
};

/**
 * Format currency nicely for Brazilian and international clients
 */
export const formatPlanPrice = (
  amount: number, 
  currency: SupportedCurrency = 'BRL'
): string => {
  if (currency === 'USD') {
    return `$${amount} USD`;
  }
  if (currency === 'EUR') {
    return `€${amount} EUR`;
  }
  return `R$ ${amount}`;
};

/**
 * Foreign Founder Non-Resident Checklist Info
 */
export const FOREIGN_FOUNDER_BENEFITS = [
  {
    title: 'Non-Resident CNPJ Ready',
    description: 'Meets Brazilian Federal Revenue (IN RFB 2.119/2022) requirements for foreign natural/legal persons holding shares in Brazilian entities.'
  },
  {
    title: 'Global Payment Flexibility',
    description: 'Pay directly in USD, EUR or BRL using international Visa, Mastercard, American Express, Apple Pay, Google Pay or SEPA via Stripe.'
  },
  {
    title: 'Digital Nomad Visa (VITEM V)',
    description: 'Provides valid Brazilian proof of continuous domicile to support temporary residency renewal with the Federal Police.'
  },
  {
    title: 'Zero Bureaucracy Physical Presence',
    description: 'No physical lease, no guarantor (fiador), no security deposit. 100% digital contract signed online.'
  }
];
