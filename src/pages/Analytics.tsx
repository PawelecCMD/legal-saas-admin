import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Calendar, Filter, Download, RefreshCw } from 'lucide-react';
import { revenueData } from '../data/mockData';

const pieData = [
    { name: 'Kancelaria Nowak', value: 400 },
    { name: 'Kancelaria Wiśniewski', value: 300 },
    { name: 'LEX', value: 200 },
    { name: 'Pozostali', value: 150 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981'];

const heatmapData = Array.from({ length: 7 * 52 }, (_, i) => ({
    value: Math.floor(Math.random() * 5),
    day: i
}));

export default function AnalyticsPage() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert('Raport został wygenerowany i pobrany (analytics_report_2026.pdf)');
        }, 2000);
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Analityka i raporty</h2><p className="page-header-sub">Kompleksowa analityka platformy</p></div>
                <div className="page-header-actions">
                    <div className="dropdown" style={{ background: 'var(--bg-secondary)', padding: '6px 12px', borderRadius: 8, fontSize: 13, border: '1px solid var(--border-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Calendar size={14} /> Ostatnie 6 miesięcy <Filter size={14} />
                    </div>
                    <button
                        className="btn btn-secondary"
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? <RefreshCw size={14} className="spin" /> : <Download size={14} />}
                        {isExporting ? 'Generowanie...' : 'Eksport'}
                    </button>
                </div>
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Śr. czas realizacji</span><Clock size={16} className="stat-card-icon" /></div><div className="stat-card-value">12.4 dni</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">% akceptacji bez poprawek</span><CheckCircle size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ color: 'var(--success)' }}>67%</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Churn rate</span><AlertTriangle size={16} className="stat-card-icon" /></div><div className="stat-card-value" style={{ color: 'var(--warning)' }}>4.2%</div></div>
                <div className="stat-card"><div className="stat-card-header"><span className="stat-card-label">Konwersja → płatność</span><TrendingUp size={16} className="stat-card-icon" /></div><div className="stat-card-value">34%</div></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="card-header"><span className="card-title">Przychody vs Sprawy (Miesiące)</span></div>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={revenueData}>
                            <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
                            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12 }} />
                            <Bar yAxisId="left" dataKey="revenue" fill="#6366f1" radius={[3, 3, 0, 0]} name="Przychody (zł)" />
                            <Bar yAxisId="right" dataKey="cases" fill="#8b5cf6" radius={[3, 3, 0, 0]} opacity={0.5} name="Sprawy" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="card">
                    <div className="card-header"><span className="card-title">Udział Kancelarii w Przychód</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
                        <ResponsiveContainer width="60%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: 'rgba(18,18,26,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ width: '40%', paddingLeft: 20 }}>
                            {pieData.map((item, i) => (
                                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i % COLORS.length] }} />
                                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: 24 }}>
                <div className="card-header"><span className="card-title">Aktywność systemowa ( Heatmapa - 1 rok )</span></div>
                <div className="activity-heatmap" style={{ display: 'grid', gridTemplateColumns: 'repeat(52, 1fr)', gap: 3, marginTop: 10 }}>
                    {heatmapData.map((d, i) => (
                        <div
                            key={i}
                            style={{
                                width: '100%',
                                paddingTop: '100%',
                                borderRadius: 2,
                                background: d.value === 0 ? 'rgba(255,255,255,0.03)' : `rgba(16, 185, 129, ${0.2 * d.value + 0.2})`
                            }}
                            title={`Dzień ${i}: ${d.value} akcji`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
