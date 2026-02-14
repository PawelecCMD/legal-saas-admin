import { useState } from 'react';
import { Search, Plus, MoreVertical, Shield, Key, History, X, Mail, Building2 } from 'lucide-react';
import { users as initialUsers } from '../data/mockData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useIsMobile } from '../hooks/useMediaQuery';

const userSchema = z.object({
    name: z.string().min(3, 'Imię i nazwisko musi mieć min. 3 znaki'),
    email: z.string().email('Niepoprawny adres email'),
    role: z.string()
});

type UserFormValues = z.infer<typeof userSchema>;

const statusBadge = (s: string) => {
    const m: Record<string, string> = { active: 'badge-success', inactive: 'badge-neutral', suspended: 'badge-error' };
    const l: Record<string, string> = { active: 'Aktywny', inactive: 'Nieaktywny', suspended: 'Zawieszony' };
    return <span className={`badge ${m[s]}`}><span className={`badge-dot ${s === 'active' ? 'green' : s === 'suspended' ? 'red' : 'gray'}`}></span>{l[s]}</span>;
};

export default function UsersPage() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [users, setUsers] = useState(initialUsers);
    const isMobile = useIsMobile();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: 'Prawnik'
        }
    });

    const filtered = users.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || (u.email && u.email.toLowerCase().includes(search.toLowerCase()));
        const matchRole = roleFilter === 'all' || u.role === roleFilter;
        return matchSearch && matchRole;
    });

    const onSubmit = (data: UserFormValues) => {
        const newUser: any = {
            id: `U00${users.length + 1}`,
            name: data.name,
            email: data.email,
            role: data.role,
            status: 'active',
            lastLogin: 'Never',
            twoFA: false,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setUsers([newUser, ...users]);
        setShowAddModal(false);
        reset();
    };

    // Mobile card view dla użytkowników
    const renderUserCard = (u: any) => (
        <div key={u.id} className="responsive-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="list-item-avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
                        {u.name.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Mail size={12} /> {u.email}
                        </div>
                    </div>
                </div>
                {statusBadge(u.status)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '12px 0', borderTop: '1px solid var(--border-secondary)', borderBottom: '1px solid var(--border-secondary)' }}>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Rola</div>
                    <span className="badge badge-purple" style={{ fontSize: 11 }}>{u.role}</span>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Kancelaria</div>
                    <div style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Building2 size={12} /> {u.lawFirm || '—'}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>2FA</div>
                    <div style={{ fontSize: 13 }}>
                        {u.twoFA ? <Shield size={14} style={{ color: 'var(--success)' }} /> : <span style={{ color: 'var(--text-tertiary)' }}>Brak</span>}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 2 }}>Ostatnie logowanie</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{u.lastLogin}</div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1, minHeight: 44 }} title="Reset hasła">
                    <Key size={14} /> Reset hasła
                </button>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1, minHeight: 44 }} title="Historia">
                    <History size={14} /> Historia
                </button>
                <button className="btn btn-ghost btn-sm" style={{ minHeight: 44, minWidth: 44 }}>
                    <MoreVertical size={14} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Użytkownicy</h2>
                    <p className="page-header-sub">
                        Zarządzanie wszystkimi użytkownikami systemu
                        <span style={{ marginLeft: 6, cursor: 'help', color: 'var(--accent)' }} data-tooltip="Moduł do zarządzania dostępem, rolami i bezpieczeństwem (RBAC)">
                            <Shield size={14} style={{ verticalAlign: 'middle' }} />
                        </span>
                    </p>
                </div>
                <div className="page-header-actions">
                    <button className="btn btn-primary" onClick={() => setShowAddModal(true)}><Plus size={15} /> Dodaj użytkownika</button>
                </div>
            </div>

            <div className="data-table-wrapper">
                <div className="data-table-toolbar">
                    <div className="data-table-search"><Search size={15} style={{ color: 'var(--text-tertiary)' }} /><input placeholder="Szukaj użytkownika..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                    <div className="data-table-filters">
                        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                            <option value="all">Wszystkie role</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="Kancelaria Admin">Kancelaria Admin</option>
                            <option value="Prawnik">Prawnik</option>
                            <option value="Klient">Klient</option>
                        </select>
                    </div>
                </div>

                {/* Mobile: Card view */}
                {isMobile ? (
                    <div className="responsive-cards">
                        {filtered.map(u => renderUserCard(u))}
                    </div>
                ) : (
                    /* Desktop: Table view */
                    <table>
                        <thead><tr><th>Użytkownik</th><th>Rola</th><th>Kancelaria</th><th>Status</th><th>2FA</th><th>Ostatnie logowanie</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(u => (
                                <tr key={u.id}>
                                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div className="list-item-avatar" style={{ width: 32, height: 32, fontSize: 12 }}>{u.name.split(' ').map(n => n[0]).join('')}</div>
                                        <div><div style={{ fontWeight: 500 }}>{u.name}</div><div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{u.email}</div></div>
                                    </div></td>
                                    <td><span className="badge badge-purple">{u.role}</span></td>
                                    <td style={{ color: u.lawFirm ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{u.lawFirm || '—'}</td>
                                    <td>{statusBadge(u.status)}</td>
                                    <td>{u.twoFA ? <Shield size={15} style={{ color: 'var(--success)' }} /> : <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>Brak</span>}</td>
                                    <td style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{u.lastLogin}</td>
                                    <td><div style={{ display: 'flex', gap: 4 }}>
                                        <button className="btn btn-ghost btn-sm" title="Reset hasła"><Key size={13} /></button>
                                        <button className="btn btn-ghost btn-sm" title="Historia"><History size={13} /></button>
                                        <button className="btn btn-ghost btn-sm"><MoreVertical size={13} /></button>
                                    </div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3 className="modal-title">Dodaj nowego użytkownika</h3>
                            <button className="modal-close" onClick={() => { setShowAddModal(false); reset(); }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Imię i nazwisko</label>
                                <input
                                    {...register('name')}
                                    type="text"
                                    placeholder="np. Jan Kowalski"
                                    className={errors.name ? 'input-error' : ''}
                                />
                                {errors.name && <span className="form-error-msg">{errors.name.message}</span>}
                            </div>
                            <div className="form-group">
                                <label>Adres email</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    placeholder="np. jan@kancelaria.pl"
                                    className={errors.email ? 'input-error' : ''}
                                />
                                {errors.email && <span className="form-error-msg">{errors.email.message}</span>}
                            </div>
                            <div className="form-group">
                                <label data-tooltip="Wybierz poziom uprawnień dla użytkownika (zgodnie z RBAC)">Rola systemowa</label>
                                <select {...register('role')}>
                                    <option value="Admin">Admin</option>
                                    <option value="Kancelaria Admin">Kancelaria Admin</option>
                                    <option value="Prawnik">Prawnik</option>
                                    <option value="Klient">Klient</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => { setShowAddModal(false); reset(); }}>Anuluj</button>
                                <button type="submit" className="btn btn-primary">Mianuj użytkownikiem</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
