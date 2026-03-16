// WHO-style disease surveillance mock data — expanded dataset
export interface DemographicBreakdown {
  male: number;   // percentage
  female: number;
  children: number; // 0-14
  youth: number;    // 15-24
  adult: number;    // 25-64
  elderly: number;  // 65+
}

export interface CountryData {
  country: string;
  iso: string;
  cases: number;
  deaths: number;
}

export interface DiseaseData {
  id: string;
  name: string;
  cases: number;
  deaths: number;
  recovered: number;
  activeCases: number;
  cfr: number;
  trend: 'rising' | 'falling' | 'stable';
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  region: string;
  pathogen: 'virus' | 'bacteria' | 'parasite' | 'fungus' | 'prion';
  transmission: string;
  vaccineAvailable: boolean;
  incubationDays: [number, number];
  demographics: DemographicBreakdown;
  topCountries: CountryData[];
}

export interface TimeSeriesPoint {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

export interface AlertItem {
  id: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  region: string;
}

export interface RegionData {
  region: string;
  code: string;
  totalCases: number;
  activeCases: number;
  deaths: number;
  riskScore: number;
  subRegions?: { name: string; cases: number; riskScore: number }[];
}

export interface GenomicVariant {
  id: string;
  diseaseId: string;
  name: string;
  lineage: string;
  firstDetected: string;
  countriesAffected: number;
  transmissibility: number; // relative to wildtype, 1.0 = same
  severity: number; // relative
  immuneEvasion: number; // 0-1
  prevalence: number; // 0-100%
  status: 'monitoring' | 'interest' | 'concern' | 'high-consequence';
}

export interface OutbreakEvent {
  id: string;
  diseaseId: string;
  date: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  region: string;
}

export const diseases: DiseaseData[] = [
  // ═══════════════════════ VIRAL ═══════════════════════
  { id: 'covid19', name: 'COVID-19', cases: 776907682, deaths: 7076084, recovered: 768430000, activeCases: 1401598, cfr: 0.91, trend: 'falling', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Droplet', vaccineAvailable: true, incubationDays: [2, 14] },
  { id: 'mpox', name: 'Mpox', cases: 99465, deaths: 208, recovered: 89200, activeCases: 10057, cfr: 0.21, trend: 'rising', riskLevel: 'high', region: 'Africa', pathogen: 'virus', transmission: 'Contact / Droplet', vaccineAvailable: true, incubationDays: [5, 21] },
  { id: 'dengue', name: 'Dengue', cases: 12788420, deaths: 7905, recovered: 12500000, activeCases: 280515, cfr: 0.06, trend: 'stable', riskLevel: 'moderate', region: 'Americas', pathogen: 'virus', transmission: 'Vector-borne (Aedes)', vaccineAvailable: true, incubationDays: [4, 10] },
  { id: 'measles', name: 'Measles', cases: 321582, deaths: 1287, recovered: 315000, activeCases: 5295, cfr: 0.4, trend: 'rising', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'virus', transmission: 'Airborne', vaccineAvailable: true, incubationDays: [10, 14] },
  { id: 'avianflu', name: 'Avian Influenza (H5N1)', cases: 912, deaths: 462, recovered: 450, activeCases: 0, cfr: 50.66, trend: 'stable', riskLevel: 'critical', region: 'Global', pathogen: 'virus', transmission: 'Zoonotic / Droplet', vaccineAvailable: false, incubationDays: [2, 8] },
  { id: 'ebola', name: 'Ebola Virus Disease', cases: 34356, deaths: 15227, recovered: 18200, activeCases: 929, cfr: 44.3, trend: 'stable', riskLevel: 'critical', region: 'Africa', pathogen: 'virus', transmission: 'Contact / Bodily fluids', vaccineAvailable: true, incubationDays: [2, 21] },
  { id: 'marburg', name: 'Marburg Virus Disease', cases: 612, deaths: 289, recovered: 323, activeCases: 0, cfr: 47.2, trend: 'stable', riskLevel: 'critical', region: 'Africa', pathogen: 'virus', transmission: 'Contact / Bodily fluids', vaccineAvailable: false, incubationDays: [2, 21] },
  { id: 'zika', name: 'Zika Virus', cases: 892340, deaths: 18, recovered: 890000, activeCases: 2322, cfr: 0.002, trend: 'falling', riskLevel: 'low', region: 'Americas', pathogen: 'virus', transmission: 'Vector-borne (Aedes)', vaccineAvailable: false, incubationDays: [3, 14] },
  { id: 'yellowfever', name: 'Yellow Fever', cases: 203000, deaths: 29000, recovered: 168000, activeCases: 6000, cfr: 14.3, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'virus', transmission: 'Vector-borne (Aedes)', vaccineAvailable: true, incubationDays: [3, 6] },
  { id: 'rabies', name: 'Rabies', cases: 59000, deaths: 58900, recovered: 100, activeCases: 0, cfr: 99.9, trend: 'stable', riskLevel: 'critical', region: 'Global', pathogen: 'virus', transmission: 'Zoonotic (bite)', vaccineAvailable: true, incubationDays: [20, 90] },
  { id: 'rsv', name: 'RSV', cases: 33000000, deaths: 101400, recovered: 32800000, activeCases: 98600, cfr: 0.31, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Droplet / Contact', vaccineAvailable: true, incubationDays: [4, 6] },
  { id: 'hepatitisb', name: 'Hepatitis B', cases: 296000000, deaths: 820000, recovered: 0, activeCases: 296000000, cfr: 0.28, trend: 'falling', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Blood / Sexual', vaccineAvailable: true, incubationDays: [30, 180] },
  { id: 'hiv', name: 'HIV/AIDS', cases: 85600000, deaths: 40400000, recovered: 0, activeCases: 39000000, cfr: 47.2, trend: 'falling', riskLevel: 'high', region: 'Global', pathogen: 'virus', transmission: 'Blood / Sexual', vaccineAvailable: false, incubationDays: [14, 30] },
  { id: 'nipah', name: 'Nipah Virus', cases: 714, deaths: 407, recovered: 307, activeCases: 0, cfr: 57.0, trend: 'stable', riskLevel: 'critical', region: 'South-East Asia', pathogen: 'virus', transmission: 'Zoonotic / Contact', vaccineAvailable: false, incubationDays: [4, 14] },
  { id: 'chikunguya', name: 'Chikungunya', cases: 5120000, deaths: 1750, recovered: 5050000, activeCases: 68250, cfr: 0.03, trend: 'rising', riskLevel: 'moderate', region: 'Americas', pathogen: 'virus', transmission: 'Vector-borne (Aedes)', vaccineAvailable: true, incubationDays: [3, 7] },
  { id: 'mers', name: 'MERS-CoV', cases: 2613, deaths: 945, recovered: 1668, activeCases: 0, cfr: 36.2, trend: 'stable', riskLevel: 'high', region: 'Eastern Mediterranean', pathogen: 'virus', transmission: 'Zoonotic / Droplet', vaccineAvailable: false, incubationDays: [2, 14] },
  { id: 'influenzaa', name: 'Influenza A (H1N1)', cases: 284000000, deaths: 284000, recovered: 283000000, activeCases: 716000, cfr: 0.1, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Droplet', vaccineAvailable: true, incubationDays: [1, 4] },
  { id: 'influenzab', name: 'Influenza B', cases: 142000000, deaths: 71000, recovered: 141500000, activeCases: 429000, cfr: 0.05, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Droplet', vaccineAvailable: true, incubationDays: [1, 4] },
  { id: 'hepatitisa', name: 'Hepatitis A', cases: 1400000, deaths: 7134, recovered: 1380000, activeCases: 12866, cfr: 0.51, trend: 'falling', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Fecal-oral', vaccineAvailable: true, incubationDays: [15, 50] },
  { id: 'hepatitisc', name: 'Hepatitis C', cases: 58000000, deaths: 290000, recovered: 0, activeCases: 58000000, cfr: 0.5, trend: 'falling', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Blood / Needlestick', vaccineAvailable: false, incubationDays: [14, 180] },
  { id: 'hepatitise', name: 'Hepatitis E', cases: 20000000, deaths: 44000, recovered: 19800000, activeCases: 156000, cfr: 0.22, trend: 'stable', riskLevel: 'low', region: 'South-East Asia', pathogen: 'virus', transmission: 'Fecal-oral / Waterborne', vaccineAvailable: false, incubationDays: [15, 60] },
  { id: 'norovirus', name: 'Norovirus', cases: 685000000, deaths: 200000, recovered: 684500000, activeCases: 300000, cfr: 0.03, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Fecal-oral / Contact', vaccineAvailable: false, incubationDays: [1, 2] },
  { id: 'rotavirus', name: 'Rotavirus', cases: 258000000, deaths: 128500, recovered: 257500000, activeCases: 371500, cfr: 0.05, trend: 'falling', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Fecal-oral', vaccineAvailable: true, incubationDays: [1, 3] },
  { id: 'polio', name: 'Poliomyelitis', cases: 652, deaths: 31, recovered: 600, activeCases: 21, cfr: 4.75, trend: 'falling', riskLevel: 'moderate', region: 'Eastern Mediterranean', pathogen: 'virus', transmission: 'Fecal-oral', vaccineAvailable: true, incubationDays: [7, 21] },
  { id: 'smallpox', name: 'Smallpox (Eradicated)', cases: 0, deaths: 0, recovered: 0, activeCases: 0, cfr: 30.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Contact', vaccineAvailable: true, incubationDays: [7, 19] },
  { id: 'rubella', name: 'Rubella', cases: 48700, deaths: 12, recovered: 48500, activeCases: 188, cfr: 0.02, trend: 'falling', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Droplet', vaccineAvailable: true, incubationDays: [14, 21] },
  { id: 'mumps', name: 'Mumps', cases: 620000, deaths: 310, recovered: 618000, activeCases: 1690, cfr: 0.05, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Droplet', vaccineAvailable: true, incubationDays: [12, 25] },
  { id: 'chickenpox', name: 'Varicella (Chickenpox)', cases: 140000000, deaths: 4200, recovered: 139900000, activeCases: 95800, cfr: 0.003, trend: 'falling', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Airborne / Contact', vaccineAvailable: true, incubationDays: [10, 21] },
  { id: 'hantavirus', name: 'Hantavirus', cases: 12400, deaths: 4464, recovered: 7200, activeCases: 736, cfr: 36.0, trend: 'stable', riskLevel: 'high', region: 'Americas', pathogen: 'virus', transmission: 'Zoonotic (rodent)', vaccineAvailable: false, incubationDays: [7, 42] },
  { id: 'lassa', name: 'Lassa Fever', cases: 300000, deaths: 5000, recovered: 290000, activeCases: 5000, cfr: 1.67, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'virus', transmission: 'Zoonotic (rodent) / Contact', vaccineAvailable: false, incubationDays: [6, 21] },
  { id: 'rift', name: 'Rift Valley Fever', cases: 4800, deaths: 912, recovered: 3600, activeCases: 288, cfr: 19.0, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'virus', transmission: 'Vector-borne / Zoonotic', vaccineAvailable: false, incubationDays: [2, 6] },
  { id: 'crimeanfever', name: 'Crimean-Congo Hemorrhagic Fever', cases: 18400, deaths: 2760, recovered: 15200, activeCases: 440, cfr: 15.0, trend: 'stable', riskLevel: 'high', region: 'Eastern Mediterranean', pathogen: 'virus', transmission: 'Vector-borne (Tick) / Contact', vaccineAvailable: false, incubationDays: [1, 13] },
  { id: 'westnile', name: 'West Nile Virus', cases: 52000, deaths: 2340, recovered: 49000, activeCases: 660, cfr: 4.5, trend: 'stable', riskLevel: 'moderate', region: 'Americas', pathogen: 'virus', transmission: 'Vector-borne (Culex mosquito)', vaccineAvailable: false, incubationDays: [2, 14] },
  { id: 'japanese_enc', name: 'Japanese Encephalitis', cases: 68000, deaths: 17000, recovered: 45000, activeCases: 6000, cfr: 25.0, trend: 'stable', riskLevel: 'high', region: 'Western Pacific', pathogen: 'virus', transmission: 'Vector-borne (Culex mosquito)', vaccineAvailable: true, incubationDays: [5, 15] },
  { id: 'tbe', name: 'Tick-Borne Encephalitis', cases: 13000, deaths: 260, recovered: 12400, activeCases: 340, cfr: 2.0, trend: 'rising', riskLevel: 'moderate', region: 'Europe', pathogen: 'virus', transmission: 'Vector-borne (Tick)', vaccineAvailable: true, incubationDays: [7, 14] },
  { id: 'ebv', name: 'Epstein-Barr Virus (Mono)', cases: 4500000000, deaths: 0, recovered: 4499000000, activeCases: 1000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Saliva / Contact', vaccineAvailable: false, incubationDays: [30, 50] },
  { id: 'cmv', name: 'Cytomegalovirus', cases: 3200000000, deaths: 0, recovered: 3199000000, activeCases: 1000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Contact / Bodily fluids', vaccineAvailable: false, incubationDays: [28, 60] },
  { id: 'enterovirus71', name: 'Enterovirus 71 (HFMD)', cases: 2800000, deaths: 560, recovered: 2790000, activeCases: 9440, cfr: 0.02, trend: 'stable', riskLevel: 'moderate', region: 'Western Pacific', pathogen: 'virus', transmission: 'Fecal-oral / Contact', vaccineAvailable: true, incubationDays: [3, 7] },
  { id: 'adenovirus', name: 'Adenovirus', cases: 48000000, deaths: 24000, recovered: 47800000, activeCases: 176000, cfr: 0.05, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Droplet / Contact / Fecal-oral', vaccineAvailable: false, incubationDays: [2, 14] },
  { id: 'parainfluenza', name: 'Parainfluenza', cases: 65000000, deaths: 32500, recovered: 64800000, activeCases: 167500, cfr: 0.05, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Droplet / Contact', vaccineAvailable: false, incubationDays: [2, 6] },
  { id: 'hmpv', name: 'Human Metapneumovirus', cases: 18000000, deaths: 18000, recovered: 17900000, activeCases: 82000, cfr: 0.1, trend: 'rising', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Droplet / Contact', vaccineAvailable: false, incubationDays: [3, 6] },
  { id: 'bocavirus', name: 'Human Bocavirus', cases: 9500000, deaths: 475, recovered: 9450000, activeCases: 49525, cfr: 0.005, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Droplet / Contact', vaccineAvailable: false, incubationDays: [2, 5] },
  { id: 'sars', name: 'SARS-CoV-1', cases: 8096, deaths: 774, recovered: 7322, activeCases: 0, cfr: 9.56, trend: 'stable', riskLevel: 'low', region: 'Western Pacific', pathogen: 'virus', transmission: 'Droplet / Contact', vaccineAvailable: false, incubationDays: [2, 10] },
  { id: 'oropouche', name: 'Oropouche Virus', cases: 11200, deaths: 4, recovered: 11000, activeCases: 196, cfr: 0.04, trend: 'rising', riskLevel: 'moderate', region: 'Americas', pathogen: 'virus', transmission: 'Vector-borne (Midge)', vaccineAvailable: false, incubationDays: [4, 8] },
  { id: 'htlv1', name: 'HTLV-1', cases: 10000000, deaths: 50000, recovered: 0, activeCases: 10000000, cfr: 0.5, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Blood / Sexual / Vertical', vaccineAvailable: false, incubationDays: [365, 7300] },
  { id: 'hpv', name: 'HPV (High-Risk)', cases: 600000000, deaths: 350000, recovered: 0, activeCases: 600000000, cfr: 0.06, trend: 'falling', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Sexual / Contact', vaccineAvailable: true, incubationDays: [30, 730] },
  { id: 'hepatitisd', name: 'Hepatitis D', cases: 12000000, deaths: 36000, recovered: 0, activeCases: 12000000, cfr: 0.3, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'virus', transmission: 'Blood / Sexual', vaccineAvailable: true, incubationDays: [30, 180] },
  { id: 'herpes_simplex1', name: 'Herpes Simplex Virus 1', cases: 3700000000, deaths: 0, recovered: 0, activeCases: 3700000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Contact / Saliva', vaccineAvailable: false, incubationDays: [2, 12] },
  { id: 'herpes_simplex2', name: 'Herpes Simplex Virus 2', cases: 491000000, deaths: 0, recovered: 0, activeCases: 491000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Sexual / Contact', vaccineAvailable: false, incubationDays: [2, 12] },
  { id: 'astrovirus', name: 'Astrovirus', cases: 42000000, deaths: 2100, recovered: 41900000, activeCases: 97900, cfr: 0.005, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Fecal-oral', vaccineAvailable: false, incubationDays: [1, 5] },
  { id: 'sapovirus', name: 'Sapovirus', cases: 31000000, deaths: 1550, recovered: 30900000, activeCases: 98450, cfr: 0.005, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'virus', transmission: 'Fecal-oral', vaccineAvailable: false, incubationDays: [1, 4] },

  // ═══════════════════════ BACTERIAL ═══════════════════════
  { id: 'cholera', name: 'Cholera', cases: 535321, deaths: 4187, recovered: 520000, activeCases: 11134, cfr: 0.78, trend: 'rising', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Waterborne / Fecal-oral', vaccineAvailable: true, incubationDays: [1, 5] },
  { id: 'tuberculosis', name: 'Tuberculosis', cases: 10600000, deaths: 1300000, recovered: 8500000, activeCases: 800000, cfr: 12.3, trend: 'falling', riskLevel: 'high', region: 'Global', pathogen: 'bacteria', transmission: 'Airborne', vaccineAvailable: true, incubationDays: [14, 84] },
  { id: 'plague', name: 'Plague', cases: 3248, deaths: 584, recovered: 2664, activeCases: 0, cfr: 18.0, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Vector-borne (Flea) / Droplet', vaccineAvailable: false, incubationDays: [1, 7] },
  { id: 'diphtheria', name: 'Diphtheria', cases: 18230, deaths: 1640, recovered: 16590, activeCases: 0, cfr: 9.0, trend: 'rising', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'bacteria', transmission: 'Droplet', vaccineAvailable: true, incubationDays: [2, 5] },
  { id: 'typhoid', name: 'Typhoid Fever', cases: 11000000, deaths: 116800, recovered: 10800000, activeCases: 83200, cfr: 1.06, trend: 'stable', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'bacteria', transmission: 'Fecal-oral / Waterborne', vaccineAvailable: true, incubationDays: [6, 30] },
  { id: 'pertussis', name: 'Pertussis (Whooping Cough)', cases: 24100000, deaths: 160000, recovered: 23800000, activeCases: 140000, cfr: 0.66, trend: 'rising', riskLevel: 'moderate', region: 'Global', pathogen: 'bacteria', transmission: 'Airborne / Droplet', vaccineAvailable: true, incubationDays: [7, 21] },
  { id: 'tetanus', name: 'Tetanus', cases: 14500, deaths: 6380, recovered: 8120, activeCases: 0, cfr: 44.0, trend: 'falling', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Wound contamination', vaccineAvailable: true, incubationDays: [3, 21] },
  { id: 'meningitis_bact', name: 'Bacterial Meningitis', cases: 2800000, deaths: 236000, recovered: 2500000, activeCases: 64000, cfr: 8.43, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Droplet / Contact', vaccineAvailable: true, incubationDays: [2, 10] },
  { id: 'syphilis', name: 'Syphilis', cases: 7100000, deaths: 3550, recovered: 6800000, activeCases: 296450, cfr: 0.05, trend: 'rising', riskLevel: 'moderate', region: 'Global', pathogen: 'bacteria', transmission: 'Sexual / Vertical', vaccineAvailable: false, incubationDays: [10, 90] },
  { id: 'gonorrhea', name: 'Gonorrhea', cases: 82400000, deaths: 0, recovered: 82000000, activeCases: 400000, cfr: 0.0, trend: 'rising', riskLevel: 'moderate', region: 'Global', pathogen: 'bacteria', transmission: 'Sexual', vaccineAvailable: false, incubationDays: [1, 14] },
  { id: 'chlamydia', name: 'Chlamydia', cases: 128900000, deaths: 0, recovered: 128500000, activeCases: 400000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'bacteria', transmission: 'Sexual', vaccineAvailable: false, incubationDays: [7, 21] },
  { id: 'leprosy', name: 'Leprosy (Hansen\'s Disease)', cases: 202000, deaths: 0, recovered: 198000, activeCases: 4000, cfr: 0.0, trend: 'falling', riskLevel: 'low', region: 'South-East Asia', pathogen: 'bacteria', transmission: 'Droplet / Prolonged contact', vaccineAvailable: true, incubationDays: [365, 7300] },
  { id: 'anthrax', name: 'Anthrax', cases: 2400, deaths: 480, recovered: 1800, activeCases: 120, cfr: 20.0, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Contact / Inhalation / Ingestion', vaccineAvailable: true, incubationDays: [1, 60] },
  { id: 'brucellosis', name: 'Brucellosis', cases: 500000, deaths: 250, recovered: 490000, activeCases: 9750, cfr: 0.05, trend: 'stable', riskLevel: 'moderate', region: 'Eastern Mediterranean', pathogen: 'bacteria', transmission: 'Zoonotic / Food', vaccineAvailable: false, incubationDays: [5, 60] },
  { id: 'leptospirosis', name: 'Leptospirosis', cases: 1000000, deaths: 58900, recovered: 920000, activeCases: 21100, cfr: 5.89, trend: 'rising', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'bacteria', transmission: 'Waterborne / Zoonotic', vaccineAvailable: false, incubationDays: [2, 30] },
  { id: 'trachoma', name: 'Trachoma', cases: 1900000, deaths: 0, recovered: 1800000, activeCases: 100000, cfr: 0.0, trend: 'falling', riskLevel: 'low', region: 'Africa', pathogen: 'bacteria', transmission: 'Contact / Flies', vaccineAvailable: false, incubationDays: [5, 14] },
  { id: 'qfever', name: 'Q Fever', cases: 28000, deaths: 140, recovered: 27500, activeCases: 360, cfr: 0.5, trend: 'stable', riskLevel: 'low', region: 'Europe', pathogen: 'bacteria', transmission: 'Zoonotic / Inhalation', vaccineAvailable: true, incubationDays: [14, 39] },
  { id: 'tularemia', name: 'Tularemia', cases: 3200, deaths: 64, recovered: 3000, activeCases: 136, cfr: 2.0, trend: 'stable', riskLevel: 'moderate', region: 'Europe', pathogen: 'bacteria', transmission: 'Vector-borne (Tick) / Zoonotic', vaccineAvailable: false, incubationDays: [3, 14] },
  { id: 'listeriosis', name: 'Listeriosis', cases: 23000, deaths: 5060, recovered: 17500, activeCases: 440, cfr: 22.0, trend: 'stable', riskLevel: 'high', region: 'Europe', pathogen: 'bacteria', transmission: 'Foodborne', vaccineAvailable: false, incubationDays: [3, 70] },
  { id: 'campylobacter', name: 'Campylobacteriosis', cases: 96000000, deaths: 37440, recovered: 95800000, activeCases: 162560, cfr: 0.04, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'bacteria', transmission: 'Foodborne', vaccineAvailable: false, incubationDays: [2, 5] },
  { id: 'salmonellosis', name: 'Salmonellosis (non-typhoidal)', cases: 93800000, deaths: 155000, recovered: 93400000, activeCases: 245000, cfr: 0.17, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'bacteria', transmission: 'Foodborne', vaccineAvailable: false, incubationDays: [1, 3] },
  { id: 'ecoli', name: 'E. coli O157:H7', cases: 265000, deaths: 3710, recovered: 258000, activeCases: 3290, cfr: 1.4, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'bacteria', transmission: 'Foodborne / Waterborne', vaccineAvailable: false, incubationDays: [1, 10] },
  { id: 'shigella', name: 'Shigellosis', cases: 165000000, deaths: 600000, recovered: 164000000, activeCases: 400000, cfr: 0.36, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'bacteria', transmission: 'Fecal-oral', vaccineAvailable: false, incubationDays: [1, 3] },
  { id: 'staph_aureus', name: 'MRSA', cases: 4800000, deaths: 192000, recovered: 4400000, activeCases: 208000, cfr: 4.0, trend: 'rising', riskLevel: 'high', region: 'Global', pathogen: 'bacteria', transmission: 'Contact / Nosocomial', vaccineAvailable: false, incubationDays: [1, 10] },
  { id: 'cdiff', name: 'Clostridioides difficile', cases: 12500000, deaths: 437500, recovered: 11800000, activeCases: 262500, cfr: 3.5, trend: 'rising', riskLevel: 'high', region: 'Global', pathogen: 'bacteria', transmission: 'Fecal-oral / Nosocomial', vaccineAvailable: false, incubationDays: [2, 10] },
  { id: 'scarletfever', name: 'Scarlet Fever', cases: 450000, deaths: 225, recovered: 448000, activeCases: 1775, cfr: 0.05, trend: 'rising', riskLevel: 'low', region: 'Europe', pathogen: 'bacteria', transmission: 'Droplet / Contact', vaccineAvailable: false, incubationDays: [1, 3] },
  { id: 'rickettsial', name: 'Rickettsial Diseases', cases: 820000, deaths: 16400, recovered: 790000, activeCases: 13600, cfr: 2.0, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'bacteria', transmission: 'Vector-borne (Tick/Flea/Mite)', vaccineAvailable: false, incubationDays: [5, 14] },
  { id: 'legionella', name: 'Legionnaires\' Disease', cases: 76000, deaths: 7600, recovered: 66000, activeCases: 2400, cfr: 10.0, trend: 'rising', riskLevel: 'moderate', region: 'Europe', pathogen: 'bacteria', transmission: 'Inhalation (water aerosol)', vaccineAvailable: false, incubationDays: [2, 14] },
  { id: 'helicobacter', name: 'Helicobacter pylori', cases: 4400000000, deaths: 810000, recovered: 0, activeCases: 4400000000, cfr: 0.02, trend: 'falling', riskLevel: 'low', region: 'Global', pathogen: 'bacteria', transmission: 'Fecal-oral / Oral-oral', vaccineAvailable: false, incubationDays: [14, 60] },
  { id: 'borrelia', name: 'Lyme Disease', cases: 14500000, deaths: 0, recovered: 14200000, activeCases: 300000, cfr: 0.0, trend: 'rising', riskLevel: 'moderate', region: 'Europe', pathogen: 'bacteria', transmission: 'Vector-borne (Tick)', vaccineAvailable: false, incubationDays: [3, 30] },
  { id: 'buruli', name: 'Buruli Ulcer', cases: 5200, deaths: 0, recovered: 4800, activeCases: 400, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Africa', pathogen: 'bacteria', transmission: 'Environmental / Unknown', vaccineAvailable: false, incubationDays: [14, 180] },
  { id: 'relapsing_fever', name: 'Relapsing Fever', cases: 48000, deaths: 4800, recovered: 42000, activeCases: 1200, cfr: 10.0, trend: 'stable', riskLevel: 'moderate', region: 'Africa', pathogen: 'bacteria', transmission: 'Vector-borne (Louse/Tick)', vaccineAvailable: false, incubationDays: [4, 18] },

  // ═══════════════════════ PARASITIC ═══════════════════════
  { id: 'malaria', name: 'Malaria', cases: 249000000, deaths: 608000, recovered: 247000000, activeCases: 1392000, cfr: 0.24, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'parasite', transmission: 'Vector-borne (Anopheles)', vaccineAvailable: true, incubationDays: [7, 30] },
  { id: 'leishmaniasis', name: 'Leishmaniasis', cases: 1200000, deaths: 26000, recovered: 1100000, activeCases: 74000, cfr: 2.17, trend: 'stable', riskLevel: 'moderate', region: 'Eastern Mediterranean', pathogen: 'parasite', transmission: 'Vector-borne (Sandfly)', vaccineAvailable: false, incubationDays: [14, 180] },
  { id: 'schistosomiasis', name: 'Schistosomiasis', cases: 240000000, deaths: 24000, recovered: 200000000, activeCases: 39976000, cfr: 0.01, trend: 'stable', riskLevel: 'moderate', region: 'Africa', pathogen: 'parasite', transmission: 'Waterborne (snail)', vaccineAvailable: false, incubationDays: [14, 84] },
  { id: 'chagas', name: 'Chagas Disease', cases: 6000000, deaths: 12000, recovered: 0, activeCases: 6000000, cfr: 0.2, trend: 'stable', riskLevel: 'moderate', region: 'Americas', pathogen: 'parasite', transmission: 'Vector-borne (Triatomine)', vaccineAvailable: false, incubationDays: [7, 14] },
  { id: 'sleeping_sickness', name: 'African Trypanosomiasis', cases: 992, deaths: 99, recovered: 850, activeCases: 43, cfr: 10.0, trend: 'falling', riskLevel: 'moderate', region: 'Africa', pathogen: 'parasite', transmission: 'Vector-borne (Tsetse fly)', vaccineAvailable: false, incubationDays: [14, 365] },
  { id: 'lymphatic_filariasis', name: 'Lymphatic Filariasis', cases: 51000000, deaths: 0, recovered: 0, activeCases: 51000000, cfr: 0.0, trend: 'falling', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'parasite', transmission: 'Vector-borne (Mosquito)', vaccineAvailable: false, incubationDays: [30, 365] },
  { id: 'onchocerciasis', name: 'Onchocerciasis (River Blindness)', cases: 21000000, deaths: 0, recovered: 0, activeCases: 21000000, cfr: 0.0, trend: 'falling', riskLevel: 'moderate', region: 'Africa', pathogen: 'parasite', transmission: 'Vector-borne (Blackfly)', vaccineAvailable: false, incubationDays: [90, 730] },
  { id: 'toxoplasmosis', name: 'Toxoplasmosis', cases: 2500000000, deaths: 12500, recovered: 2499000000, activeCases: 987500, cfr: 0.0005, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'parasite', transmission: 'Foodborne / Zoonotic (cat)', vaccineAvailable: false, incubationDays: [5, 23] },
  { id: 'giardiasis', name: 'Giardiasis', cases: 280000000, deaths: 0, recovered: 279000000, activeCases: 1000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'parasite', transmission: 'Fecal-oral / Waterborne', vaccineAvailable: false, incubationDays: [7, 21] },
  { id: 'cryptosporidiosis', name: 'Cryptosporidiosis', cases: 48000000, deaths: 57600, recovered: 47500000, activeCases: 442400, cfr: 0.12, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'parasite', transmission: 'Waterborne / Fecal-oral', vaccineAvailable: false, incubationDays: [2, 10] },
  { id: 'hookworm', name: 'Hookworm', cases: 472000000, deaths: 22600, recovered: 0, activeCases: 472000000, cfr: 0.005, trend: 'falling', riskLevel: 'low', region: 'Africa', pathogen: 'parasite', transmission: 'Soil contact', vaccineAvailable: false, incubationDays: [14, 56] },
  { id: 'ascariasis', name: 'Ascariasis (Roundworm)', cases: 807000000, deaths: 60000, recovered: 0, activeCases: 807000000, cfr: 0.007, trend: 'falling', riskLevel: 'low', region: 'Global', pathogen: 'parasite', transmission: 'Fecal-oral / Soil', vaccineAvailable: false, incubationDays: [14, 60] },
  { id: 'trichuriasis', name: 'Trichuriasis (Whipworm)', cases: 477000000, deaths: 10000, recovered: 0, activeCases: 477000000, cfr: 0.002, trend: 'falling', riskLevel: 'low', region: 'Global', pathogen: 'parasite', transmission: 'Fecal-oral / Soil', vaccineAvailable: false, incubationDays: [30, 90] },
  { id: 'strongyloides', name: 'Strongyloidiasis', cases: 370000000, deaths: 37000, recovered: 0, activeCases: 370000000, cfr: 0.01, trend: 'stable', riskLevel: 'low', region: 'South-East Asia', pathogen: 'parasite', transmission: 'Soil contact', vaccineAvailable: false, incubationDays: [14, 28] },
  { id: 'taeniasis', name: 'Taeniasis / Cysticercosis', cases: 50000000, deaths: 50000, recovered: 0, activeCases: 50000000, cfr: 0.1, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'parasite', transmission: 'Foodborne (undercooked meat)', vaccineAvailable: false, incubationDays: [56, 84] },
  { id: 'echinococcosis', name: 'Echinococcosis', cases: 1000000, deaths: 19000, recovered: 900000, activeCases: 81000, cfr: 1.9, trend: 'stable', riskLevel: 'moderate', region: 'Eastern Mediterranean', pathogen: 'parasite', transmission: 'Zoonotic / Fecal-oral (dogs)', vaccineAvailable: false, incubationDays: [365, 3650] },
  { id: 'dracunculiasis', name: 'Dracunculiasis (Guinea Worm)', cases: 14, deaths: 0, recovered: 14, activeCases: 0, cfr: 0.0, trend: 'falling', riskLevel: 'low', region: 'Africa', pathogen: 'parasite', transmission: 'Waterborne', vaccineAvailable: false, incubationDays: [300, 365] },
  { id: 'amebiasis', name: 'Amebiasis', cases: 50000000, deaths: 55000, recovered: 49500000, activeCases: 445000, cfr: 0.11, trend: 'stable', riskLevel: 'moderate', region: 'Global', pathogen: 'parasite', transmission: 'Fecal-oral / Waterborne', vaccineAvailable: false, incubationDays: [7, 28] },
  { id: 'babesiosis', name: 'Babesiosis', cases: 38000, deaths: 380, recovered: 37000, activeCases: 620, cfr: 1.0, trend: 'rising', riskLevel: 'moderate', region: 'Americas', pathogen: 'parasite', transmission: 'Vector-borne (Tick)', vaccineAvailable: false, incubationDays: [7, 28] },

  // ═══════════════════════ FUNGAL ═══════════════════════
  { id: 'candidaauris', name: 'Candida auris', cases: 48200, deaths: 14460, recovered: 28920, activeCases: 4820, cfr: 30.0, trend: 'rising', riskLevel: 'high', region: 'Global', pathogen: 'fungus', transmission: 'Contact / Nosocomial', vaccineAvailable: false, incubationDays: [1, 14] },
  { id: 'aspergillosis', name: 'Invasive Aspergillosis', cases: 300000, deaths: 99000, recovered: 180000, activeCases: 21000, cfr: 33.0, trend: 'rising', riskLevel: 'high', region: 'Global', pathogen: 'fungus', transmission: 'Inhalation (spores)', vaccineAvailable: false, incubationDays: [1, 14] },
  { id: 'cryptococcosis', name: 'Cryptococcal Meningitis', cases: 152000, deaths: 112000, recovered: 30000, activeCases: 10000, cfr: 73.7, trend: 'stable', riskLevel: 'critical', region: 'Africa', pathogen: 'fungus', transmission: 'Inhalation (spores)', vaccineAvailable: false, incubationDays: [14, 60] },
  { id: 'histoplasmosis', name: 'Histoplasmosis', cases: 500000, deaths: 55000, recovered: 420000, activeCases: 25000, cfr: 11.0, trend: 'stable', riskLevel: 'high', region: 'Americas', pathogen: 'fungus', transmission: 'Inhalation (soil/bat guano)', vaccineAvailable: false, incubationDays: [7, 21] },
  { id: 'coccidioidomycosis', name: 'Coccidioidomycosis (Valley Fever)', cases: 350000, deaths: 3500, recovered: 340000, activeCases: 6500, cfr: 1.0, trend: 'rising', riskLevel: 'moderate', region: 'Americas', pathogen: 'fungus', transmission: 'Inhalation (soil)', vaccineAvailable: false, incubationDays: [7, 21] },
  { id: 'blastomycosis', name: 'Blastomycosis', cases: 42000, deaths: 4200, recovered: 36000, activeCases: 1800, cfr: 10.0, trend: 'stable', riskLevel: 'moderate', region: 'Americas', pathogen: 'fungus', transmission: 'Inhalation (soil)', vaccineAvailable: false, incubationDays: [21, 90] },
  { id: 'mucormycosis', name: 'Mucormycosis (Black Fungus)', cases: 910000, deaths: 464000, recovered: 400000, activeCases: 46000, cfr: 51.0, trend: 'rising', riskLevel: 'critical', region: 'South-East Asia', pathogen: 'fungus', transmission: 'Inhalation / Wound', vaccineAvailable: false, incubationDays: [1, 14] },
  { id: 'pneumocystis', name: 'Pneumocystis Pneumonia', cases: 400000, deaths: 100000, recovered: 280000, activeCases: 20000, cfr: 25.0, trend: 'stable', riskLevel: 'high', region: 'Global', pathogen: 'fungus', transmission: 'Inhalation', vaccineAvailable: false, incubationDays: [14, 60] },
  { id: 'sporotrichosis', name: 'Sporotrichosis', cases: 125000, deaths: 625, recovered: 122000, activeCases: 2375, cfr: 0.5, trend: 'rising', riskLevel: 'moderate', region: 'Americas', pathogen: 'fungus', transmission: 'Wound (soil/plants) / Zoonotic (cat)', vaccineAvailable: false, incubationDays: [7, 30] },
  { id: 'dermatophytosis', name: 'Dermatophytosis (Ringworm)', cases: 1000000000, deaths: 0, recovered: 999000000, activeCases: 1000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'fungus', transmission: 'Contact / Fomites', vaccineAvailable: false, incubationDays: [4, 14] },
  { id: 'candidiasis', name: 'Invasive Candidiasis', cases: 750000, deaths: 337500, recovered: 370000, activeCases: 42500, cfr: 45.0, trend: 'rising', riskLevel: 'critical', region: 'Global', pathogen: 'fungus', transmission: 'Nosocomial / Endogenous', vaccineAvailable: false, incubationDays: [1, 14] },
  { id: 'tinea_capitis', name: 'Tinea Capitis', cases: 200000000, deaths: 0, recovered: 199000000, activeCases: 1000000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Africa', pathogen: 'fungus', transmission: 'Contact / Fomites', vaccineAvailable: false, incubationDays: [7, 14] },
  { id: 'chromoblastomycosis', name: 'Chromoblastomycosis', cases: 120000, deaths: 0, recovered: 100000, activeCases: 20000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Americas', pathogen: 'fungus', transmission: 'Wound (soil/plants)', vaccineAvailable: false, incubationDays: [30, 365] },
  { id: 'mycetoma', name: 'Mycetoma', cases: 86000, deaths: 0, recovered: 70000, activeCases: 16000, cfr: 0.0, trend: 'stable', riskLevel: 'low', region: 'Africa', pathogen: 'fungus', transmission: 'Wound (soil)', vaccineAvailable: false, incubationDays: [30, 365] },
  { id: 'paracoccidioidomycosis', name: 'Paracoccidioidomycosis', cases: 45000, deaths: 2250, recovered: 40000, activeCases: 2750, cfr: 5.0, trend: 'stable', riskLevel: 'moderate', region: 'Americas', pathogen: 'fungus', transmission: 'Inhalation (soil)', vaccineAvailable: false, incubationDays: [30, 365] },
  { id: 'talaromycosis', name: 'Talaromycosis', cases: 38000, deaths: 11400, recovered: 24000, activeCases: 2600, cfr: 30.0, trend: 'rising', riskLevel: 'high', region: 'South-East Asia', pathogen: 'fungus', transmission: 'Inhalation (soil)', vaccineAvailable: false, incubationDays: [14, 60] },

  // ═══════════════════════ PRION ═══════════════════════
  { id: 'cjd', name: 'Creutzfeldt-Jakob Disease', cases: 6800, deaths: 6780, recovered: 0, activeCases: 20, cfr: 99.7, trend: 'stable', riskLevel: 'low', region: 'Europe', pathogen: 'prion', transmission: 'Contaminated tissue', vaccineAvailable: false, incubationDays: [365, 5475] },
  { id: 'vcjd', name: 'Variant CJD (Mad Cow)', cases: 232, deaths: 232, recovered: 0, activeCases: 0, cfr: 100.0, trend: 'stable', riskLevel: 'low', region: 'Europe', pathogen: 'prion', transmission: 'Foodborne (BSE prions)', vaccineAvailable: false, incubationDays: [1825, 7300] },
  { id: 'gss', name: 'Gerstmann-Sträussler-Scheinker', cases: 120, deaths: 120, recovered: 0, activeCases: 0, cfr: 100.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'prion', transmission: 'Genetic / Sporadic', vaccineAvailable: false, incubationDays: [1825, 10950] },
  { id: 'ffi', name: 'Fatal Familial Insomnia', cases: 70, deaths: 70, recovered: 0, activeCases: 0, cfr: 100.0, trend: 'stable', riskLevel: 'low', region: 'Global', pathogen: 'prion', transmission: 'Genetic', vaccineAvailable: false, incubationDays: [7300, 18250] },
  { id: 'kuru', name: 'Kuru', cases: 2700, deaths: 2700, recovered: 0, activeCases: 0, cfr: 100.0, trend: 'falling', riskLevel: 'low', region: 'Western Pacific', pathogen: 'prion', transmission: 'Ritualistic cannibalism', vaccineAvailable: false, incubationDays: [3650, 14600] },
];

export const generateTimeSeries = (diseaseId: string, months: number = 24): TimeSeriesPoint[] => {
  const data: TimeSeriesPoint[] = [];
  const disease = diseases.find(d => d.id === diseaseId);
  if (!disease) return data;

  const baseCases = disease.cases / (months * 30);
  const now = new Date();

  for (let i = months * 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const seasonal = Math.sin((i / 365) * Math.PI * 2) * 0.3;
    const trend = disease.trend === 'rising' ? (months * 30 - i) / (months * 30) * 0.5 :
                  disease.trend === 'falling' ? i / (months * 30) * 0.5 : 0;
    const noise = (Math.random() - 0.5) * 0.4;

    const factor = 1 + seasonal + trend + noise;
    const dailyCases = Math.max(0, Math.round(baseCases * factor));
    const dailyDeaths = Math.round(dailyCases * (disease.cfr / 100) * (0.8 + Math.random() * 0.4));
    const dailyRecovered = Math.round(dailyCases * 0.85 * (0.7 + Math.random() * 0.6));

    if (i % 7 === 0) {
      data.push({
        date: date.toISOString().split('T')[0],
        cases: dailyCases * 7,
        deaths: dailyDeaths * 7,
        recovered: dailyRecovered * 7,
      });
    }
  }
  return data;
};

export const alerts: AlertItem[] = [
  { id: '1', timestamp: '2026-03-16T08:30:00Z', severity: 'critical', title: 'Mpox Clade Ib Spread', description: 'WHO confirms new clade Ib cases in 3 additional countries in Eastern Africa. Emergency committee convened.', region: 'Africa' },
  { id: '2', timestamp: '2026-03-16T07:00:00Z', severity: 'critical', title: 'Marburg Outbreak — Rwanda', description: 'Rwanda reports 14 new Marburg cases. WHO deploys rapid response team.', region: 'Africa' },
  { id: '3', timestamp: '2026-03-16T06:15:00Z', severity: 'warning', title: 'Cholera Outbreak Expansion', description: 'Cholera cases surge 40% in Mozambique following cyclone damage to water infrastructure.', region: 'Africa' },
  { id: '4', timestamp: '2026-03-15T22:00:00Z', severity: 'warning', title: 'Dengue Season Alert', description: 'Brazil reports 2.3M cases YTD, exceeding 2024 record pace. Healthcare system strain reported.', region: 'Americas' },
  { id: '5', timestamp: '2026-03-15T20:30:00Z', severity: 'critical', title: 'Candida auris — Hospital Cluster', description: 'Multi-drug resistant C. auris outbreak in 4 US hospitals. 30% mortality in ICU patients.', region: 'Americas' },
  { id: '6', timestamp: '2026-03-15T18:45:00Z', severity: 'info', title: 'COVID-19 Variant Monitoring', description: 'New XEC.4 subvariant detected in wastewater surveillance across 12 countries. No increased severity observed.', region: 'Global' },
  { id: '7', timestamp: '2026-03-15T17:00:00Z', severity: 'warning', title: 'Nipah Virus — Kerala', description: 'India reports 3 suspected Nipah cases in Kerala. Contact tracing for 200+ individuals underway.', region: 'South-East Asia' },
  { id: '8', timestamp: '2026-03-15T14:00:00Z', severity: 'critical', title: 'H5N1 Human Case Confirmed', description: 'Cambodia reports fatal H5N1 case linked to poultry exposure. Contact tracing underway.', region: 'Western Pacific' },
  { id: '9', timestamp: '2026-03-15T12:30:00Z', severity: 'warning', title: 'TB Drug Resistance Surge', description: 'XDR-TB cases in South Africa up 25% YoY. WHO calls for enhanced surveillance and funding.', region: 'Africa' },
  { id: '10', timestamp: '2026-03-15T10:30:00Z', severity: 'warning', title: 'Measles Resurgence', description: 'India reports 45% increase in measles cases. Vaccination coverage gaps identified in 6 states.', region: 'South-East Asia' },
  { id: '11', timestamp: '2026-03-15T08:00:00Z', severity: 'info', title: 'Malaria Vaccine Rollout', description: 'WHO pre-qualifies second malaria vaccine R21/Matrix-M. 18 African countries begin deployment.', region: 'Africa' },
  { id: '12', timestamp: '2026-03-14T20:00:00Z', severity: 'info', title: 'Surveillance System Update', description: 'WHO EIOS platform integrated new data streams from 15 additional sentinel sites.', region: 'Global' },
  { id: '13', timestamp: '2026-03-14T16:00:00Z', severity: 'warning', title: 'Plague Cases — Madagascar', description: 'Pneumonic plague outbreak reported in Antsirabe. 12 confirmed cases, 3 deaths.', region: 'Africa' },
  { id: '14', timestamp: '2026-03-14T11:00:00Z', severity: 'info', title: 'Chikungunya Expansion', description: 'Chikungunya detected in new European vector populations. Risk assessment elevated for summer 2026.', region: 'Europe' },
];

export const regions: RegionData[] = [
  {
    region: 'Africa', code: 'AFR', totalCases: 12854000, activeCases: 345000, deaths: 178000, riskScore: 82,
    subRegions: [
      { name: 'East Africa', cases: 4200000, riskScore: 88 },
      { name: 'West Africa', cases: 3800000, riskScore: 79 },
      { name: 'Central Africa', cases: 2100000, riskScore: 75 },
      { name: 'Southern Africa', cases: 1900000, riskScore: 72 },
      { name: 'North Africa', cases: 854000, riskScore: 45 },
    ]
  },
  {
    region: 'Americas', code: 'AMR', totalCases: 195200000, activeCases: 520000, deaths: 2980000, riskScore: 45,
    subRegions: [
      { name: 'North America', cases: 108000000, riskScore: 35 },
      { name: 'Central America & Caribbean', cases: 24000000, riskScore: 52 },
      { name: 'South America', cases: 63200000, riskScore: 55 },
    ]
  },
  {
    region: 'South-East Asia', code: 'SEAR', totalCases: 61300000, activeCases: 180000, deaths: 810000, riskScore: 58,
    subRegions: [
      { name: 'Indian Subcontinent', cases: 45000000, riskScore: 62 },
      { name: 'Mainland SE Asia', cases: 9800000, riskScore: 48 },
      { name: 'Maritime SE Asia', cases: 6500000, riskScore: 50 },
    ]
  },
  {
    region: 'Europe', code: 'EUR', totalCases: 277400000, activeCases: 290000, deaths: 2280000, riskScore: 32,
    subRegions: [
      { name: 'Western Europe', cases: 120000000, riskScore: 25 },
      { name: 'Eastern Europe', cases: 88000000, riskScore: 38 },
      { name: 'Northern Europe', cases: 35000000, riskScore: 22 },
      { name: 'Southern Europe', cases: 34400000, riskScore: 30 },
    ]
  },
  {
    region: 'Eastern Mediterranean', code: 'EMR', totalCases: 23500000, activeCases: 95000, deaths: 350000, riskScore: 61,
    subRegions: [
      { name: 'Middle East', cases: 14000000, riskScore: 55 },
      { name: 'North Africa / Horn', cases: 6500000, riskScore: 68 },
      { name: 'Central Asia', cases: 3000000, riskScore: 48 },
    ]
  },
  {
    region: 'Western Pacific', code: 'WPR', totalCases: 207600000, activeCases: 410000, deaths: 480000, riskScore: 38,
    subRegions: [
      { name: 'East Asia', cases: 142000000, riskScore: 30 },
      { name: 'Oceania', cases: 12600000, riskScore: 28 },
      { name: 'Pacific Islands', cases: 3000000, riskScore: 52 },
      { name: 'SE Asia (WPR)', cases: 50000000, riskScore: 42 },
    ]
  },
];

// Genomic variant data
export const genomicVariants: GenomicVariant[] = [
  { id: 'v1', diseaseId: 'covid19', name: 'XEC.4', lineage: 'BA.2.86 → JN.1 → XEC', firstDetected: '2026-01-15', countriesAffected: 45, transmissibility: 1.25, severity: 0.85, immuneEvasion: 0.72, prevalence: 38, status: 'concern' },
  { id: 'v2', diseaseId: 'covid19', name: 'LB.1.3', lineage: 'BA.2.86 → JN.1 → LB.1', firstDetected: '2025-11-20', countriesAffected: 62, transmissibility: 1.15, severity: 0.80, immuneEvasion: 0.65, prevalence: 28, status: 'interest' },
  { id: 'v3', diseaseId: 'covid19', name: 'KP.3.2', lineage: 'BA.2.86 → JN.1 → KP.3', firstDetected: '2025-08-10', countriesAffected: 78, transmissibility: 1.08, severity: 0.78, immuneEvasion: 0.55, prevalence: 12, status: 'monitoring' },
  { id: 'v4', diseaseId: 'mpox', name: 'Clade Ib', lineage: 'Clade I → Ib', firstDetected: '2024-09-01', countriesAffected: 18, transmissibility: 1.40, severity: 1.2, immuneEvasion: 0.30, prevalence: 65, status: 'high-consequence' },
  { id: 'v5', diseaseId: 'mpox', name: 'Clade IIb', lineage: 'Clade II → IIb', firstDetected: '2022-05-01', countriesAffected: 116, transmissibility: 1.10, severity: 0.60, immuneEvasion: 0.15, prevalence: 30, status: 'monitoring' },
  { id: 'v6', diseaseId: 'avianflu', name: 'H5N1 2.3.4.4b', lineage: 'Goose/Guangdong → 2.3.4.4b', firstDetected: '2020-10-01', countriesAffected: 82, transmissibility: 0.45, severity: 1.5, immuneEvasion: 0.0, prevalence: 95, status: 'high-consequence' },
  { id: 'v7', diseaseId: 'tuberculosis', name: 'XDR-TB Beijing', lineage: 'Lineage 2 (Beijing)', firstDetected: '2006-01-01', countriesAffected: 49, transmissibility: 1.0, severity: 1.4, immuneEvasion: 0.9, prevalence: 8, status: 'concern' },
  { id: 'v8', diseaseId: 'candidaauris', name: 'Clade III (SAm)', lineage: 'South American Clade', firstDetected: '2012-01-01', countriesAffected: 28, transmissibility: 1.3, severity: 1.2, immuneEvasion: 0.85, prevalence: 45, status: 'concern' },
  { id: 'v9', diseaseId: 'malaria', name: 'PfKelch13 580Y', lineage: 'P. falciparum', firstDetected: '2018-06-01', countriesAffected: 12, transmissibility: 1.0, severity: 1.1, immuneEvasion: 0.0, prevalence: 15, status: 'concern' },
  { id: 'v10', diseaseId: 'cholera', name: 'O1 El Tor 7PET-T13', lineage: 'O1 El Tor → 7th pandemic', firstDetected: '2022-01-01', countriesAffected: 31, transmissibility: 1.2, severity: 1.0, immuneEvasion: 0.10, prevalence: 70, status: 'interest' },
];

// Outbreak timeline events
export const outbreakTimeline: OutbreakEvent[] = [
  { id: 'e1', diseaseId: 'mpox', date: '2024-08-14', title: 'WHO declares Mpox PHEIC', description: 'Public Health Emergency of International Concern declared for Clade Ib spread', impact: 'critical', region: 'Global' },
  { id: 'e2', diseaseId: 'avianflu', date: '2024-04-01', title: 'H5N1 in US dairy cattle', description: 'First confirmed H5N1 cases in US dairy herds, raising pandemic preparedness concerns', impact: 'high', region: 'Americas' },
  { id: 'e3', diseaseId: 'marburg', date: '2024-09-27', title: 'Rwanda Marburg outbreak', description: 'Rwanda declares Marburg outbreak — first major outbreak in the country', impact: 'critical', region: 'Africa' },
  { id: 'e4', diseaseId: 'cholera', date: '2025-01-15', title: 'Mozambique cholera surge', description: 'Post-cyclone cholera outbreak reaches 50,000 cases', impact: 'high', region: 'Africa' },
  { id: 'e5', diseaseId: 'dengue', date: '2024-02-01', title: 'Record Americas dengue', description: 'Americas region reports all-time record dengue cases, driven by El Niño', impact: 'high', region: 'Americas' },
  { id: 'e6', diseaseId: 'candidaauris', date: '2025-06-01', title: 'C. auris pan-resistant strain', description: 'Pan-resistant Candida auris strain detected in 4 US states', impact: 'critical', region: 'Americas' },
  { id: 'e7', diseaseId: 'nipah', date: '2025-09-15', title: 'Nipah cluster — Kerala', description: 'India reports Nipah cluster with suspected human-to-human transmission', impact: 'high', region: 'South-East Asia' },
  { id: 'e8', diseaseId: 'measles', date: '2025-03-01', title: 'Measles resurgence wave', description: 'Global measles cases up 80% vs 2023 due to pandemic-era vaccination gaps', impact: 'medium', region: 'Global' },
  { id: 'e9', diseaseId: 'plague', date: '2025-11-01', title: 'Pneumonic plague cluster', description: 'Madagascar reports pneumonic plague outbreak in urban setting', impact: 'high', region: 'Africa' },
  { id: 'e10', diseaseId: 'tuberculosis', date: '2026-01-20', title: 'XDR-TB surge in South Africa', description: 'Extensively drug-resistant TB cases up 25% year-over-year', impact: 'high', region: 'Africa' },
];

// Cross-disease correlation matrix data
export const correlationMatrix: { disease1: string; disease2: string; correlation: number; mechanism: string }[] = [
  { disease1: 'covid19', disease2: 'tuberculosis', correlation: 0.35, mechanism: 'Immune suppression / healthcare disruption' },
  { disease1: 'hiv', disease2: 'tuberculosis', correlation: 0.82, mechanism: 'Immune compromise co-infection' },
  { disease1: 'cholera', disease2: 'typhoid', correlation: 0.71, mechanism: 'Shared waterborne transmission' },
  { disease1: 'dengue', disease2: 'chikunguya', correlation: 0.88, mechanism: 'Same vector (Aedes aegypti)' },
  { disease1: 'dengue', disease2: 'zika', correlation: 0.79, mechanism: 'Same vector (Aedes aegypti)' },
  { disease1: 'measles', disease2: 'diphtheria', correlation: 0.64, mechanism: 'Vaccination coverage gaps' },
  { disease1: 'malaria', disease2: 'hiv', correlation: 0.45, mechanism: 'Geographic overlap / immune interaction' },
  { disease1: 'ebola', disease2: 'marburg', correlation: 0.52, mechanism: 'Same filovirus family / similar ecology' },
  { disease1: 'covid19', disease2: 'rsv', correlation: 0.42, mechanism: 'Respiratory co-circulation patterns' },
  { disease1: 'candidaauris', disease2: 'covid19', correlation: 0.38, mechanism: 'Nosocomial co-infection in ICU' },
];

// Prediction engine
export interface PredictionResult {
  historical: TimeSeriesPoint[];
  predicted: TimeSeriesPoint[];
  confidence: { upper: number[]; lower: number[] };
  peakDate: string;
  peakCases: number;
  r0Estimate: number;
}

export const generatePrediction = (
  diseaseId: string,
  daysAhead: number = 90,
  interventionLevel: number = 0.5
): PredictionResult => {
  const historical = generateTimeSeries(diseaseId, 12);
  const disease = diseases.find(d => d.id === diseaseId)!;

  const recentData = historical.slice(-8);
  let growthRate = 0;
  for (let i = 1; i < recentData.length; i++) {
    growthRate += (recentData[i].cases - recentData[i - 1].cases) / Math.max(recentData[i - 1].cases, 1);
  }
  growthRate /= recentData.length - 1;

  const baseR0 = disease.trend === 'rising' ? 1.3 + Math.random() * 0.5 :
                 disease.trend === 'falling' ? 0.7 + Math.random() * 0.2 : 0.95 + Math.random() * 0.1;

  const effectiveR0 = baseR0 * (1 - interventionLevel * 0.6);

  const lastPoint = historical[historical.length - 1];
  const predicted: TimeSeriesPoint[] = [];
  const upper: number[] = [];
  const lower: number[] = [];

  let currentCases = lastPoint.cases;
  let peakCases = currentCases;
  let peakDate = lastPoint.date;

  for (let i = 1; i <= daysAhead; i += 7) {
    const date = new Date(lastPoint.date);
    date.setDate(date.getDate() + i);

    const populationFraction = 1 - (i / (daysAhead * 3));
    const weeklyGrowth = (effectiveR0 - 1) * 0.1 * populationFraction;
    const seasonal = Math.sin((i / 365) * Math.PI * 2) * 0.1;

    currentCases = Math.max(0, Math.round(currentCases * (1 + weeklyGrowth + seasonal)));
    const weeklyDeaths = Math.round(currentCases * (disease.cfr / 100) * 0.7);
    const weeklyRecovered = Math.round(currentCases * 0.75);

    if (currentCases > peakCases) {
      peakCases = currentCases;
      peakDate = date.toISOString().split('T')[0];
    }

    const uncertainty = 1 + (i / daysAhead) * 0.8;
    upper.push(Math.round(currentCases * uncertainty));
    lower.push(Math.max(0, Math.round(currentCases / uncertainty)));

    predicted.push({
      date: date.toISOString().split('T')[0],
      cases: currentCases,
      deaths: weeklyDeaths,
      recovered: weeklyRecovered,
    });
  }

  return {
    historical: historical.slice(-26),
    predicted,
    confidence: { upper, lower },
    peakDate,
    peakCases,
    r0Estimate: Math.round(effectiveR0 * 100) / 100,
  };
};

export const formatNumber = (n: number): string => {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};
