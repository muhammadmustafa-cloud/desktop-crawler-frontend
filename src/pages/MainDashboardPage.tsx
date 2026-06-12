import { Activity, Cpu, HardDrive, Network, CheckCircle2, Clock, Zap } from 'lucide-react';

const recentActivities = [
  { id: 1, type: 'scrape', message: 'UK MHRA database scrape completed successfully', time: '2 mins ago', status: 'success' },
  { id: 2, type: 'update', message: 'New pipeline data detected for Eli Lilly', time: '15 mins ago', status: 'info' },
  { id: 3, type: 'system', message: 'Database backup completed', time: '1 hour ago', status: 'success' },
  { id: 4, type: 'alert', message: 'Rate limit warning on FDA endpoint', time: '3 hours ago', status: 'warning' },
];

export default function MainDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 animate-fade-in">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <LayoutDashboardIcon className="text-primary" size={28} />
          System Overview
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          High-level metrics and system health for the Intelligence Crawler network.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Active Crawlers" 
          value="4 / 5" 
          subtitle="Nodes Online" 
          icon={<Network size={20} />} 
          color="emerald" 
        />
        <MetricCard 
          title="API Requests" 
          value="1.2M" 
          subtitle="Past 24 hours" 
          icon={<Zap size={20} />} 
          color="blue" 
        />
        <MetricCard 
          title="Storage Usage" 
          value="45.2 GB" 
          subtitle="70% capacity" 
          icon={<HardDrive size={20} />} 
          color="indigo" 
        />
        <MetricCard 
          title="Server Load" 
          value="24%" 
          subtitle="CPU Utilization" 
          icon={<Cpu size={20} />} 
          color="amber" 
        />
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Activity Log */}
        <div className="glass-card rounded-2xl p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Recent Activity Log
          </h2>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 items-start relative before:absolute before:left-[11px] before:top-8 before:bottom-[-24px] before:w-px before:bg-border last:before:hidden">
                <div className={`mt-1 relative z-10 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-background bg-background`}>
                  {activity.status === 'success' && <CheckCircle2 size={16} className="text-emerald-500" />}
                  {activity.status === 'info' && <Activity size={16} className="text-blue-500" />}
                  {activity.status === 'warning' && <Clock size={16} className="text-amber-500" />}
                </div>
                <div className="flex-1 bg-muted/30 p-3 rounded-lg border border-border/50">
                  <p className="text-sm text-foreground font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="glass-card rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Cpu size={20} className="text-primary" />
            Crawler Nodes
          </h2>
          
          <div className="space-y-4">
            <NodeStatus name="UK MHRA Node" status="active" ping="45ms" />
            <NodeStatus name="US FDA Node" status="active" ping="120ms" />
            <NodeStatus name="EMA Node" status="syncing" ping="--ms" />
            <NodeStatus name="ClinicalTrials Node" status="offline" ping="offline" />
          </div>

          <div className="mt-auto pt-6 border-t border-border">
            <button className="w-full py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 text-sm font-medium transition-colors">
              Restart Offline Nodes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-components for cleaner code
function LayoutDashboardIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function MetricCard({ title, value, subtitle, icon, color }: any) {
  const colorMap: any = {
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    indigo: 'text-primary bg-primary/10 border-primary/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
  };

  return (
    <div className="glass-card p-6 rounded-2xl flex items-start gap-4 transition-transform hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function NodeStatus({ name, status, ping }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
      <div className="flex items-center gap-3">
        <span className="flex h-2.5 w-2.5 relative">
          {status === 'active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            status === 'active' ? 'bg-emerald-500' : status === 'syncing' ? 'bg-amber-500' : 'bg-destructive'
          }`}></span>
        </span>
        <span className="text-sm font-medium text-foreground">{name}</span>
      </div>
      <span className="text-xs text-muted-foreground font-mono">{ping}</span>
    </div>
  );
}
