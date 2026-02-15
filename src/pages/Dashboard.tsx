import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Building2, Users, Scale, Briefcase, TrendingUp, Zap, ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { revenueData, caseStatusData, lawFirms, lawyers } from '../data/mockData';

const stats = [
    { label: 'Kancelarie', value: '8', change: '+2', up: true, icon: Building2 },
    { label: 'Prawnicy', value: '53', change: '+5', up: true, icon: Scale },
    { label: 'Użytkownicy', value: '1,247', change: '+89', up: true, icon: Users },
    { label: 'Aktywne sprawy', value: '158', change: '+12', up: true, icon: Briefcase },
    { label: 'MRR', value: '16 100 zł', change: '+8.2%', up: true, icon: TrendingUp },
    { label: 'Konwersja trial→płatny', value: '34%', change: '-2.1%', up: false, icon: TrendingUp },
    { label: 'Śr. wartość sprawy', value: '6 420 zł', change: '+340 zł', up: true, icon: Briefcase },
    { label: 'Zużycie AI', value: '27,460', change: '+18%', up: true, icon: Zap },
];

const topFirms = lawFirms
    .filter(f => f.status === 'active')
    .sort((a, b) => b.mrr - a.mrr)
    .slice(0, 5);

const topLawyers = lawyers
    .filter(l => l.status === 'active')
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: 'rgba(18,18,26,0.95)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 8,
            padding: '10px 14px',
            fontSize: 12
        }}>
            <p style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</p>
            {payload.map((p: any, i: number) => (
                <p key={i} style={{ color: p.color, fontWeight: 600 }}>
                    {p.name}: {p.value.toLocaleString('pl-PL')} {p.name === 'Przychody' ? 'zł' : ''}
                </p>
            ))}
        </div>
    );
};

export default function Dashboard() {
    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Panel główny</h2>
                    <p className="page-header-sub">Przegląd systemu Legal SaaS • Luty 2026</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-0">
                {stats.map(s => (
                    <div key={s.label} className="stat-card border border-white/5 bg-[#12121a]/60 backdrop-blur-sm p-6 rounded-2xl hover:border-indigo-500/30 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-slate-400 text-sm font-medium">{s.label}</span>
                            <s.icon size={18} className="text-indigo-400" />
                        </div>
                        <div className="text-2xl font-bold text-slate-100 mb-2">{s.value}</div>
                        <div className={`flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {s.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                            {s.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="charts-grid">
                <div className="card chart-card">
                    <div className="card-header">
                        <span className="card-title">Przychody (MRR) – 12 miesięcy</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" name="Przychody" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="card chart-card">
                    <div className="card-header">
                        <span className="card-title">Sprawy wg statusu</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie data={caseStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="value" paddingAngle={3} stroke="none">
                                {caseStatusData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: -8 }}>
                        {caseStatusData.map(d => (
                            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94a3b8' }}>
                                <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
                                {d.name} ({d.value})
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Top 5 kancelarii</span>
                        <span className="badge badge-info">wg MRR</span>
                    </div>
                    {topFirms.map((f, i) => (
                        <div key={f.id} className="list-item">
                            <div className="list-item-left">
                                <div className="list-item-avatar">{i + 1}</div>
                                <div className="list-item-info">
                                    <h4>{f.name}</h4>
                                    <p>{f.plan} • {f.lawyerCount} prawników</p>
                                </div>
                            </div>
                            <div className="list-item-value">{f.mrr.toLocaleString('pl-PL')} zł</div>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Top 5 prawników</span>
                        <span className="badge badge-purple">wg oceny</span>
                    </div>
                    {topLawyers.map((l, i) => (
                        <div key={l.id} className="list-item">
                            <div className="list-item-left">
                                <div className="list-item-avatar">{i + 1}</div>
                                <div className="list-item-info">
                                    <h4>{l.name}</h4>
                                    <p>{l.lawFirm} • {l.caseCount} spraw</p>
                                </div>
                            </div>
                            <div className="rating"><Star size={14} /> {l.rating}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
