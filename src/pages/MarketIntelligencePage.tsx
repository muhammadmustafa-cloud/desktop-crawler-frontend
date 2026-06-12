import React, { useState } from 'react';
import { Search, Filter, Activity, TrendingUp, AlertCircle, ChevronDown, ChevronUp, Database } from 'lucide-react';

// Mock Data representing the Crawler's output for the UK Market
const mockDrugsData = [
  {
    id: '1',
    name: 'Tirzepatide (Mounjaro)',
    company: 'Eli Lilly',
    area: 'Endocrinology',
    status: 'MHRA Approved',
    market: 'UK',
    dateAdded: '2023-11-08',
    scenario: 'MHRA has authorized Mounjaro for weight management and weight loss in adult patients. The crawler detected significant supply chain ramping in the UK market. Initial NHS rollout expected by Q1 next year. Competitor Wegovy (Novo Nordisk) might face supply pressure.'
  },
  {
    id: '2',
    name: 'Donanemab',
    company: 'Eli Lilly',
    area: 'Neurology',
    status: 'Pending MHRA',
    market: 'UK',
    dateAdded: '2023-12-01',
    scenario: 'Currently under review by MHRA for early symptomatic Alzheimer’s disease. Clinical trials showed a 35% slowing of cognitive decline. NICE appraisal is scheduled for mid-2024. High probability of approval based on recent FDA trends.'
  },
  {
    id: '3',
    name: 'Casgevy (exa-cel)',
    company: 'Vertex / CRISPR Tx',
    area: 'Hematology',
    status: 'MHRA Approved',
    market: 'UK',
    dateAdded: '2023-11-16',
    scenario: 'World’s first CRISPR-based therapy approved by MHRA for Sickle Cell Disease and Transfusion-Dependent Beta Thalassemia. Represents a massive paradigm shift in genetic treatments in the UK. NHS funding negotiations are actively being monitored.'
  },
  {
    id: '4',
    name: 'Talvey (talquetamab)',
    company: 'Janssen',
    area: 'Oncology',
    status: 'Phase 3',
    market: 'UK',
    dateAdded: '2023-12-10',
    scenario: 'Bispecific antibody targeting GPRC5D for relapsed/refractory multiple myeloma. UK clinical trial sites are expanding. Early data shows 70%+ overall response rate. Competitors should monitor for early MHRA conditional approval.'
  }
];

export default function MarketIntelligencePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const filteredData = mockDrugsData.filter(drug => 
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    drug.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <Database className="text-primary" size={28} />
          Market Intelligence
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Real-time insights from the UK Pharmaceutical Crawler. Tracking MHRA approvals, clinical trials, and market scenarios.
        </p>
      </div>

      {/* High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Crawler Status</p>
            <p className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Active (UK Node)
            </p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent-foreground">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">New Approvals (This Month)</p>
            <p className="text-2xl font-bold text-foreground">24</p>
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center text-destructive">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending MHRA Review</p>
            <p className="text-2xl font-bold text-foreground">142</p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center z-20 relative">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input 
            type="text" 
            placeholder="Search by drug or company..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background/50 border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-muted/50 hover:bg-muted border border-border rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Expandable Data Table */}
      <div className="glass-card rounded-2xl overflow-hidden animate-slide-up">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Drug Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Therapeutic Area</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status (UK)</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date Tracked</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((drug) => (
                <React.Fragment key={drug.id}>
                  {/* Main Row */}
                  <tr 
                    onClick={() => toggleRow(drug.id)}
                    className="group hover:bg-muted/30 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
                      {drug.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {drug.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      <span className="px-2.5 py-1 rounded-md bg-muted border border-border text-xs">
                        {drug.area}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        drug.status.includes('Approved') 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : drug.status.includes('Pending')
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          drug.status.includes('Approved') ? 'bg-emerald-500' : 
                          drug.status.includes('Pending') ? 'bg-amber-500' : 'bg-blue-500'
                        }`}></span>
                        {drug.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {drug.dateAdded}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-muted-foreground">
                      {expandedRows.has(drug.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </td>
                  </tr>

                  {/* Expanded Scenario Row */}
                  {expandedRows.has(drug.id) && (
                    <tr className="bg-muted/10">
                      <td colSpan={6} className="px-6 py-6 border-l-2 border-primary">
                        <div className="flex flex-col gap-2 animate-fade-in">
                          <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Crawler Intelligence / Scenario</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                            {drug.scenario}
                          </p>
                          <div className="mt-4 flex gap-3">
                            <button className="text-xs font-medium text-primary hover:text-primary-foreground transition-colors">
                              View Full Report
                            </button>
                            <button className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                              Share Intelligence
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No intelligence data matches your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
