import { Fragment } from 'react';
import { Shield, CheckSquare, XSquare } from 'lucide-react';
import { useIsMobile } from '../hooks/useMediaQuery';

const roles = [
    { name: 'Super Admin', users: 1, permissions: ['all'] },
    { name: 'Admin', users: 2, permissions: ['users.read', 'users.write', 'firms.read', 'firms.write', 'cases.read', 'cases.write', 'payments.read', 'ai.read', 'logs.read', 'config.read'] },
    { name: 'Kancelaria Admin', users: 4, permissions: ['firm.manage', 'lawyers.manage', 'cases.read', 'cases.write', 'documents.manage', 'payments.read', 'ai.use'] },
    { name: 'Prawnik', users: 38, permissions: ['cases.own', 'documents.own', 'ai.use', 'calendar.manage'] },
    { name: 'Klient', users: 1202, permissions: ['cases.own.read', 'documents.own.read', 'payments.own', 'chat'] },
];

const allPerms = [
    { group: 'Użytkownicy', perms: ['users.read', 'users.write', 'users.delete'] },
    { group: 'Kancelarie', perms: ['firms.read', 'firms.write', 'firm.manage'] },
    { group: 'Prawnicy', perms: ['lawyers.manage', 'lawyers.read'] },
    { group: 'Sprawy', perms: ['cases.read', 'cases.write', 'cases.own', 'cases.own.read'] },
    { group: 'Dokumenty', perms: ['documents.manage', 'documents.own', 'documents.own.read'] },
    { group: 'Płatności', perms: ['payments.read', 'payments.write', 'payments.own'] },
    { group: 'AI', perms: ['ai.read', 'ai.use', 'ai.config'] },
    { group: 'System', perms: ['logs.read', 'config.read', 'config.write', 'backup.manage'] },
    { group: 'Inne', perms: ['chat', 'calendar.manage'] },
];

export default function RolesPage() {
    const isMobile = useIsMobile();

    const renderRoleCard = (role: typeof roles[number]) => {
        const isAll = role.permissions.includes('all');
        return (
            <div key={role.name} className="responsive-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{role.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{role.users} użytk.</div>
                    </div>
                    <Shield size={16} style={{ color: 'var(--accent-light)' }} />
                </div>
                {isAll ? (
                    <div style={{ fontSize: 12, color: 'var(--accent-light)', fontWeight: 600 }}>Pełny dostęp</div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {allPerms.map(group => {
                            const allowed = group.perms.filter(p => role.permissions.includes(p));
                            if (allowed.length === 0) return null;
                            return (
                                <div key={group.group}>
                                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>{group.group}</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                        {allowed.map(p => (
                                            <span key={p} className="tag">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="animate-in">
            <div className="page-header">
                <div><h2>Role i uprawnienia (RBAC)</h2><p className="page-header-sub">Zarządzanie rolami i granularnymi uprawnieniami</p></div>
                <button className="btn btn-primary"><Shield size={15} /> Nowa rola</button>
            </div>
            <div className="data-table-wrapper" style={{ overflow: 'auto' }}>
                {isMobile ? (
                    <div className="responsive-cards">
                        {roles.map(r => renderRoleCard(r))}
                    </div>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th style={{ position: 'sticky', left: 0, background: 'var(--bg-tertiary)', zIndex: 2, minWidth: 140 }}>Uprawnienie</th>
                                {roles.map(r => <th key={r.name} style={{ textAlign: 'center', minWidth: 110 }}>{r.name}<br /><span style={{ fontWeight: 400, fontSize: 10 }}>{r.users} użytk.</span></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {allPerms.map(group => (
                                <Fragment key={group.group}>
                                    <tr key={group.group}><td colSpan={roles.length + 1} style={{ fontWeight: 600, color: 'var(--accent-light)', fontSize: 12, padding: '10px 16px', background: 'rgba(99,102,241,0.04)' }}>{group.group}</td></tr>
                                    {group.perms.map(p => (
                                        <tr key={p}>
                                            <td style={{ position: 'sticky', left: 0, background: 'var(--bg-card)', zIndex: 1, fontSize: 12 }}>{p}</td>
                                            {roles.map(r => (
                                                <td key={r.name} style={{ textAlign: 'center' }}>
                                                    {r.permissions.includes('all') || r.permissions.includes(p)
                                                        ? <CheckSquare size={16} style={{ color: 'var(--success)' }} />
                                                        : <XSquare size={16} style={{ color: 'var(--text-tertiary)', opacity: 0.3 }} />}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
