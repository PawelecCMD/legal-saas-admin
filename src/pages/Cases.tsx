import { useState } from 'react';
import { cases as initialCases, lawFirms, lawyers } from '../data/mockData';
import type { CaseStatus } from '../types';
import { Search, LayoutGrid, List, Calendar, DollarSign, Plus, X, ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useIsMobile } from '../hooks/useMediaQuery';

const caseSchema = z.object({
    client: z.string().min(3, 'Nazwa klienta musi mieć min. 3 znaki'),
    description: z.string().min(5, 'Opis musi mieć min. 5 znaków'),
    type: z.string(),
    value: z.number().min(1, 'Wartość musi być większa od 0')
});

type CaseFormValues = z.infer<typeof caseSchema>;

const allStatuses: CaseStatus[] = ['Nowa', 'Oczekuje na płatność', 'W trakcie realizacji', 'Oczekuje na akceptację', 'Do poprawy', 'Zakończona', 'Zamknięta', 'Anulowana'];
const statusColors: Record<string, string> = {
    'Nowa': '#6366f1', 'Oczekuje na płatność': '#f59e0b', 'W trakcie realizacji': '#3b82f6',
    'Oczekuje na akceptację': '#8b5cf6', 'Do poprawy': '#f97316', 'Zakończona': '#10b981',
    'Anulowana': '#ef4444', 'Zamknięta': '#64748b'
};
const badgeClass: Record<string, string> = {
    'Nowa': 'badge-info', 'Oczekuje na płatność': 'badge-warning', 'W trakcie realizacji': 'badge-info',
    'Oczekuje na akceptację': 'badge-purple', 'Do poprawy': 'badge-warning', 'Zakończona': 'badge-success',
    'Anulowana': 'badge-error', 'Zamknięta': 'badge-neutral'
};

export default function CasesPage() {
    const [view, setView] = useState<'kanban' | 'table'>('kanban');
    const [search, setSearch] = useState('');
    const [cases, setCases] = useState(initialCases);
    const [showAddModal, setShowAddModal] = useState(false);
    const [expandedStatus, setExpandedStatus] = useState<string | null>(null);
    const isMobile = useIsMobile();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CaseFormValues>({
        resolver: zodResolver(caseSchema),
        defaultValues: {
            type: 'Porada',
            value: 0
        }
    });

    const filtered = cases.filter(c =>
        c.client.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase())
    );

    const onSubmit = (data: CaseFormValues) => {
        const newCase: any = {
            id: `CASE-2026-${cases.length + 101}`,
            client: data.client,
            description: data.description,
            type: data.type,
            status: 'Nowa',
            value: data.value,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            lawFirm: lawFirms[0].name,
            lawyer: lawyers[0].name
        };
        setCases([newCase, ...cases]);
        setShowAddModal(false);
        reset();
    };

    // Render case card dla mobile
    const renderCaseCard = (c: any) => (
        <div key={c.id} className="responsive-card" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 13 }}>{c.id}</div>
                <span className={`badge ${badgeClass[c.status]}`} style={{ fontSize: 10 }}>{c.status}</span>
            </div>
            <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>{c.description}</div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
                <span className="tag">{c.type}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div><strong>Klient:</strong> {c.client}</div>
                <div><strong>Prawnik:</strong> {c.lawyer}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <DollarSign size={12} /> {c.value.toLocaleString('pl-PL')} zł
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={12} /> {c.deadline}
                </div>
            </div>
        </div>
    );

    // Mobile: Accordion Kanban
    const renderMobileKanban = () => (
        <div className="kanban-accordion">
            {allStatuses.map(status => {
                const items = filtered.filter(c => c.status === status);
                const isExpanded = expandedStatus === status;
                
                return (
                    <div key={status} className="kanban-accordion-item" style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-secondary)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 8,
                        overflow: 'hidden'
                    }}>
                        <button
                            onClick={() => setExpandedStatus(isExpanded ? null : status)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '14px 16px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 10, height: 10, borderRadius: 3, background: statusColors[status] }} />
                                <span style={{ fontWeight: 600, fontSize: 14 }}>{status}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{
                                    background: 'rgba(99, 102, 241, 0.12)',
                                    color: 'var(--accent-light)',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    padding: '2px 8px',
                                    borderRadius: 10
                                }}>{items.length}</span>
                                <ChevronDown size={18} style={{
                                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.2s'
                                }} />
                            </div>
                        </button>
                        {isExpanded && (
                            <div style={{ padding: '0 12px 12px' }}>
                                {items.length > 0 ? (
                                    items.map(c => renderCaseCard(c))
                                ) : (
                                    <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-tertiary)', fontSize: 13 }}>
                                        Brak spraw w tym statusie
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Sprawy</h2><p className="page-header-sub">{cases.length} spraw w systemie</p></div>
                <div className="page-header-actions">
                    {!isMobile && (
                        <>
                            <div className="data-table-search" style={{ maxWidth: 240 }}>
                                <Search size={15} style={{ color: 'var(--text-tertiary)' }} />
                                <input placeholder="Szukaj sprawy..." value={search} onChange={e => setSearch(e.target.value)} />
                            </div>
                            <div style={{ width: 1, height: 24, background: 'var(--border-secondary)', margin: '0 8px' }} />
                            <button className={`btn ${view === 'kanban' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('kanban')}><LayoutGrid size={15} /></button>
                            <button className={`btn ${view === 'table' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('table')}><List size={15} /></button>
                        </>
                    )}
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}><Plus size={15} /> Nowa sprawa</button>
                </div>
            </div>

            {/* Mobile search */}
            {isMobile && (
                <div className="data-table-search" style={{ marginBottom: 16, maxWidth: '100%' }}>
                    <Search size={15} style={{ color: 'var(--text-tertiary)' }} />
                    <input placeholder="Szukaj sprawy..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
            )}

            {/* Mobile: Accordion Kanban */}
            {isMobile && view === 'kanban' && renderMobileKanban()}

            {/* Mobile: Card list for table view */}
            {isMobile && view === 'table' && (
                <div className="responsive-cards">
                    {filtered.map(c => renderCaseCard(c))}
                </div>
            )}

            {/* Desktop: Kanban board */}
            {!isMobile && view === 'kanban' && (
                <div className="kanban-board">
                    {allStatuses.map(status => {
                        const items = filtered.filter(c => c.status === status);
                        return (
                            <div key={status} className="kanban-column">
                                <div className="kanban-column-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: 2, background: statusColors[status] }} />
                                        <span className="kanban-column-title">{status}</span>
                                    </div>
                                    <span className="kanban-column-count">{items.length}</span>
                                </div>
                                <div className="kanban-column-body">
                                    {items.map(c => (
                                        <div key={c.id} className="kanban-card">
                                            <div className="kanban-card-id">{c.id}</div>
                                            <div className="kanban-card-title">{c.description}</div>
                                            <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
                                                <span className="tag">{c.type}</span>
                                            </div>
                                            <div className="kanban-card-meta">
                                                <span>{c.client}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><DollarSign size={11} />{c.value.toLocaleString('pl-PL')} zł</span>
                                            </div>
                                            <div className="kanban-card-meta" style={{ marginTop: 4 }}>
                                                <span>{c.lawyer}</span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Calendar size={11} />{c.deadline}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && <div style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center', padding: 20 }}>Brak spraw</div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Desktop: Table view */}
            {!isMobile && view === 'table' && (
                <div className="data-table-wrapper">
                    <table>
                        <thead><tr><th>ID</th><th>Klient</th><th>Opis</th><th>Typ</th><th>Kancelaria</th><th>Prawnik</th><th>Status</th><th>Kwota</th><th>Deadline</th></tr></thead>
                        <tbody>
                            {filtered.map(c => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 600, color: 'var(--accent-light)' }}>{c.id}</td>
                                    <td>{c.client}</td>
                                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.description}</td>
                                    <td><span className="tag">{c.type}</span></td>
                                    <td style={{ fontSize: 12 }}>{c.lawFirm}</td>
                                    <td style={{ fontSize: 12 }}>{c.lawyer}</td>
                                    <td><span className={`badge ${badgeClass[c.status]}`}>{c.status}</span></td>
                                    <td style={{ fontWeight: 600 }}>{c.value.toLocaleString('pl-PL')} zł</td>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{c.deadline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3 className="modal-title">Dodaj nową sprawę</h3>
                            <button className="modal-close" onClick={() => { setShowAddModal(false); reset(); }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Klient</label>
                                <input
                                    {...register('client')}
                                    type="text"
                                    placeholder="Imię i nazwisko"
                                    className={errors.client ? 'input-error' : ''}
                                />
                                {errors.client && <span className="form-error-msg">{errors.client.message}</span>}
                            </div>
                            <div className="form-group">
                                <label>Opis sprawy / usługi</label>
                                <textarea
                                    {...register('description')}
                                    placeholder="Czego dotyczy sprawa..."
                                    className={errors.description ? 'input-error' : ''}
                                />
                                {errors.description && <span className="form-error-msg">{errors.description.message}</span>}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Typ</label>
                                    <select {...register('type')}>
                                        <option value="Porada">Porada</option>
                                        <option value="Umowa">Umowa</option>
                                        <option value="Reprezentacja">Reprezentacja</option>
                                        <option value="Analiza">Analiza</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Wartość (PLN)</label>
                                    <input
                                        {...register('value', { valueAsNumber: true })}
                                        type="number"
                                        className={errors.value ? 'input-error' : ''}
                                    />
                                    {errors.value && <span className="form-error-msg">{errors.value.message}</span>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowAddModal(false); reset(); }}>Anuluj</button>
                                <button type="submit" className="btn btn-primary">Utwórz sprawę</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
