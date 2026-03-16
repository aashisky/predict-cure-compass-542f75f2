import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, ChevronUp, X, MapPin, Users, Calendar, Stethoscope } from "lucide-react";

interface AdvancedFiltersProps {
  sexFilter: string;
  onSexFilterChange: (v: string) => void;
  ageGroupFilter: string;
  onAgeGroupFilterChange: (v: string) => void;
  countryFilter: string;
  onCountryFilterChange: (v: string) => void;
  riskFilter: string;
  onRiskFilterChange: (v: string) => void;
  transmissionFilter: string;
  onTransmissionFilterChange: (v: string) => void;
  vaccineFilter: string;
  onVaccineFilterChange: (v: string) => void;
  availableCountries: string[];
  availableTransmissions: string[];
  onClearAll: () => void;
  activeCount: number;
}

const sexOptions = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male-dominant' },
  { value: 'female', label: 'Female-dominant' },
];

const ageOptions = [
  { value: 'all', label: 'All Ages' },
  { value: 'children', label: '0–14' },
  { value: 'youth', label: '15–24' },
  { value: 'adult', label: '25–64' },
  { value: 'elderly', label: '65+' },
];

const riskOptions = [
  { value: 'all', label: 'All' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'low', label: 'Low' },
];

const vaccineOptions = [
  { value: 'all', label: 'All' },
  { value: 'yes', label: 'Available' },
  { value: 'no', label: 'Unavailable' },
];

const FilterPill = ({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
    <div className="flex flex-wrap gap-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-2 py-1 rounded text-[10px] font-mono transition-all border ${
            value === opt.value
              ? 'border-primary/50 bg-primary/15 text-primary'
              : 'border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export const AdvancedFilters = ({
  sexFilter, onSexFilterChange,
  ageGroupFilter, onAgeGroupFilterChange,
  countryFilter, onCountryFilterChange,
  riskFilter, onRiskFilterChange,
  transmissionFilter, onTransmissionFilterChange,
  vaccineFilter, onVaccineFilterChange,
  availableCountries, availableTransmissions,
  onClearAll, activeCount,
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-primary" />
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Advanced Filters
          </span>
          {activeCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-mono font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp size={13} className="text-muted-foreground" /> : <ChevronDown size={13} className="text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-3 border-t border-border pt-3">
              {/* Sex filter */}
              <div className="flex items-start gap-2">
                <Users size={12} className="text-info mt-1 shrink-0" />
                <FilterPill label="Sex Distribution" value={sexFilter} onChange={onSexFilterChange} options={sexOptions} />
              </div>

              {/* Age group */}
              <div className="flex items-start gap-2">
                <Calendar size={12} className="text-warning mt-1 shrink-0" />
                <FilterPill label="Age Group Dominance" value={ageGroupFilter} onChange={onAgeGroupFilterChange} options={ageOptions} />
              </div>

              {/* Risk Level */}
              <div className="flex items-start gap-2">
                <Stethoscope size={12} className="text-critical mt-1 shrink-0" />
                <FilterPill label="Risk Level" value={riskFilter} onChange={onRiskFilterChange} options={riskOptions} />
              </div>

              {/* Vaccine */}
              <FilterPill label="Vaccine Status" value={vaccineFilter} onChange={onVaccineFilterChange} options={vaccineOptions} />

              {/* Country dropdown */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <MapPin size={10} /> Country
                </span>
                <select
                  value={countryFilter}
                  onChange={(e) => onCountryFilterChange(e.target.value)}
                  className="w-full bg-muted border border-border rounded-md px-2 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="all">All Countries</option>
                  {availableCountries.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Transmission dropdown */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">Transmission</span>
                <select
                  value={transmissionFilter}
                  onChange={(e) => onTransmissionFilterChange(e.target.value)}
                  className="w-full bg-muted border border-border rounded-md px-2 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="all">All Transmission Types</option>
                  {availableTransmissions.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {activeCount > 0 && (
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[10px] font-mono text-critical hover:bg-critical/10 transition-colors border border-critical/20"
                >
                  <X size={10} />
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
