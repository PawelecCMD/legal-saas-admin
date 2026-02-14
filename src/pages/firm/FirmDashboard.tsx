import { Briefcase, Scale, Zap, TrendingUp, CreditCard, Star } from 'lucide-react';
import { cases, lawyers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function FirmDashboard() {
    const { user } = useAuth();
    const isMobile = useIsMobile();
    const firmCases = cases.filter(c => c.lawFirm === (user?.firmName || 'Kancelaria Nowak'));
    const firmLawyers = lawyers.filter(l => l.lawFirm === (user?.firmName || 'Kancelaria Nowak'));
    const revenue = firmCases.reduce((s, c) => s + c.value, 0);
    const activeCases = firmCases.filter(c => !['Zakończona', 'Zamknięta', 'Anulowana'].includes(c.status));

    const statusData = [
        { name: 'W realizacji', value: firmCases.filter(c => c.status === 'W trakcie realizacji').length, color: '#3b82f6' },
        { name: 'Nowe', value: firmCases.filter(c => c.status === 'Nowa').length, color: '#6366f1' },
        { name: 'Zakończone', value: firmCases.filter(c => c.status === 'Zakończona').length, color: '#10b981' },
        { name: 'Oczekujące', value: firmCases.filter(c => c.status === 'Oczekuje na płatność' || c.status === 'Oczekuje na akceptację').length, color: '#f59e0b' },
    ].filter(d => d.value > 0);

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Panel kancelarii</h2>
                    <p className="page-header-sub">{user?.firmName || 'Kancelaria Nowak'} — przegląd operacyjny</p>
                </div>
            </div>

            <div className="stats-grid">
                {[
                    { label: 'Aktywne sprawy', value: activeCases.length.toString(), icon: Briefcase, change: `${firmCases.length} łącznie` },
                    { label: 'Prawnicy', value: firmLawyers.length.toString(), icon: Scale, change: `akt. ${firmLawyers.filter(l => l.status === 'active').length}` },
                    { label: 'Przychód (brutto)', value: `${(revenue / 1000).toFixed(0)}k zł`, icon: CreditCard, change: '+12%' },
                    { label: 'Zużycie AI', value: '1,240', icon: Zap, change: 'tokenów / mies.' },
                    { label: 'Śr. ocena', value: (firmLawyers.reduce((s, l) => s + l.rating, 0) / Math.max(firmLawyers.length, 1)).toFixed(1), icon: Star, change: '/ 5.0' },
                    { label: 'Konwersja', value: '68%', icon: TrendingUp, change: 'ofert → spraw' },
                ].map((s, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-card-header"><span className="stat-card-label">{s.label}</span><s.icon size={16} className="stat-card-icon" /></div>
                        <div className="stat-card-value">{s.value}</div>
                        <div className="stat-card-change">{s.change}</div>
                    </div>
                ))}
            </div>

            {/* Mobile: Stack layout, Desktop: Side by side */}
            <div className={`grid gap-x-6 gap-y-0 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-[1fr_300px]'}`}>
                <div className="card">
                    <div className="card-header"><span className="card-title">Ostatnie sprawy</span></div>
                    {firmCases.slice(0, 5).map(c => (
                        <div key={c.id} className="list-item">
                            <div className="list-item-left">
                                <div className="list-item-avatar">{c.id.slice(-3)}</div>
                                <div className="list-item-info">
                                    <h4>{c.description}</h4>
                                    <p>{c.client} • {c.lawyer} • {c.deadline}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                <span className="badge badge-info" style={{ fontSize: 11 }}>{c.status}</span>
                                <span style={{ fontWeight: 600, fontSize: 13 }}>{c.value.toLocaleString('pl-PL')} zł</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header"><span className="card-title">Sprawy wg statusu</span></div>
                    <div style={{ flex: 1, minHeight: isMobile ? 220 : 200, position: 'relative' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                                    {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
                                </Pie>
                                <Tooltip formatter={(v: any, n?: string) => [`${v} spraw`, n || '']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                        {statusData.map(d => (
                            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
                                {d.name} ({d.value})
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
