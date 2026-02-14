import { plans } from '../data/mockData';
import { Check, Plus, Edit } from 'lucide-react';

export default function PlansPage() {
    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Plany i produkty</h2><p className="page-header-sub">Zarządzanie planami subskrypcyjnymi</p></div>
                <button className="btn btn-primary"><Plus size={15} /> Nowy plan</button>
            </div>
            <div className="grid-4">
                {plans.map(p => (
                    <div key={p.id} className="card" style={{ position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                            <div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-heading)' }}>{p.name}</h3>
                                <span className={`badge ${p.active ? 'badge-success' : 'badge-neutral'}`} style={{ marginTop: 4 }}>{p.active ? 'Aktywny' : 'Nieaktywny'}</span>
                            </div>
                            <button className="btn btn-ghost btn-sm"><Edit size={13} /></button>
                        </div>
                        <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-heading)', marginBottom: 4 }}>
                            {p.price > 0 ? `${p.price} zł` : 'Darmowy'}
                            {p.price > 0 && <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-tertiary)' }}> / mies.</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 20 }}>
                            Rozliczenie: {p.billing === 'monthly' ? 'miesięczne' : p.billing === 'yearly' ? 'roczne' : 'za użycie'}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16, display: 'flex', gap: 16 }}>
                            <span>👥 max {p.userLimit}</span>
                            <span>🤖 {p.aiLimit > 0 ? p.aiLimit.toLocaleString() : '∞'} AI</span>
                            {p.trial && <span>🎁 {p.trialDays} dni próby</span>}
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {p.features.map(f => (
                                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 13, color: 'var(--text-secondary)' }}>
                                    <Check size={14} style={{ color: 'var(--success)' }} /> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
