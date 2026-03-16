// WHO-style disease surveillance mock data — expanded dataset
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
  incubationDays: [number, number]; // min, max
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
  // Viral
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
  // Bacterial
  { id: 'cholera', name: 'Cholera', cases: 535321, deaths: 4187, recovered: 520000, activeCases: 11134, cfr: 0.78, trend: 'rising', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Waterborne / Fecal-oral', vaccineAvailable: true, incubationDays: [1, 5] },
  { id: 'tuberculosis', name: 'Tuberculosis', cases: 10600000, deaths: 1300000, recovered: 8500000, activeCases: 800000, cfr: 12.3, trend: 'falling', riskLevel: 'high', region: 'Global', pathogen: 'bacteria', transmission: 'Airborne', vaccineAvailable: true, incubationDays: [14, 84] },
  { id: 'plague', name: 'Plague', cases: 3248, deaths: 584, recovered: 2664, activeCases: 0, cfr: 18.0, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'bacteria', transmission: 'Vector-borne (Flea) / Droplet', vaccineAvailable: false, incubationDays: [1, 7] },
  { id: 'diphtheria', name: 'Diphtheria', cases: 18230, deaths: 1640, recovered: 16590, activeCases: 0, cfr: 9.0, trend: 'rising', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'bacteria', transmission: 'Droplet', vaccineAvailable: true, incubationDays: [2, 5] },
  { id: 'typhoid', name: 'Typhoid Fever', cases: 11000000, deaths: 116800, recovered: 10800000, activeCases: 83200, cfr: 1.06, trend: 'stable', riskLevel: 'moderate', region: 'South-East Asia', pathogen: 'bacteria', transmission: 'Fecal-oral / Waterborne', vaccineAvailable: true, incubationDays: [6, 30] },
  // Parasitic
  { id: 'malaria', name: 'Malaria', cases: 249000000, deaths: 608000, recovered: 247000000, activeCases: 1392000, cfr: 0.24, trend: 'stable', riskLevel: 'high', region: 'Africa', pathogen: 'parasite', transmission: 'Vector-borne (Anopheles)', vaccineAvailable: true, incubationDays: [7, 30] },
  { id: 'leishmaniasis', name: 'Leishmaniasis', cases: 1200000, deaths: 26000, recovered: 1100000, activeCases: 74000, cfr: 2.17, trend: 'stable', riskLevel: 'moderate', region: 'Eastern Mediterranean', pathogen: 'parasite', transmission: 'Vector-borne (Sandfly)', vaccineAvailable: false, incubationDays: [14, 180] },
  // Fungal
  { id: 'candidaauris', name: 'Candida auris', cases: 48200, deaths: 14460, recovered: 28920, activeCases: 4820, cfr: 30.0, trend: 'rising', riskLevel: 'high', region: 'Global', pathogen: 'fungus', transmission: 'Contact / Nosocomial', vaccineAvailable: false, incubationDays: [1, 14] },
  // Prion
  { id: 'cjd', name: 'Creutzfeldt-Jakob Disease', cases: 6800, deaths: 6780, recovered: 0, activeCases: 20, cfr: 99.7, trend: 'stable', riskLevel: 'low', region: 'Europe', pathogen: 'prion', transmission: 'Contaminated tissue', vaccineAvailable: false, incubationDays: [365, 5475] },
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
