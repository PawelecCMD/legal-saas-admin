import { useState } from 'react';
import { Send } from 'lucide-react';

const conversations = [
    { id: 1, firm: 'Kancelaria Nowak', lawyer: 'mec. Robert Kamiński', caseId: 'SP001', lastMsg: 'Pismo gotowe do przeglądu', time: '10:32', unread: 2 },
    { id: 2, firm: 'Kancelaria Nowak', lawyer: 'mec. Katarzyna Nowicka', caseId: 'SP004', lastMsg: 'Proszę o uzupełnienie dokumentów', time: 'wczoraj', unread: 0 },
];

const messages = [
    { id: 1, sender: 'lawyer', name: 'mec. Robert Kamiński', text: 'Dzień dobry, otrzymałem Pani sprawę i przeanalizowałem dokumenty.', time: '09:15' },
    { id: 2, sender: 'lawyer', name: 'mec. Robert Kamiński', text: 'Na podstawie opisanej sytuacji przygotowałem wstępny projekt pisma. Proszę o przegląd i ewentualne uwagi.', time: '09:18' },
    { id: 3, sender: 'client', name: 'Maria Zielińska', text: 'Dziękuję! Przejrzę to dzisiaj wieczorem i dam znać.', time: '09:45' },
    { id: 4, sender: 'lawyer', name: 'mec. Robert Kamiński', text: 'Oczywiście, proszę się nie spieszyć. Dokument jest dostępny w zakładce "Dokumenty" sprawy SP001.', time: '09:47' },
    { id: 5, sender: 'lawyer', name: 'mec. Robert Kamiński', text: 'Pismo gotowe do przeglądu', time: '10:32' },
];

export default function ClientChat() {
    const [activeConv, setActiveConv] = useState(1);
    const [newMsg, setNewMsg] = useState('');

    return (
        <div className="animate-in" style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
            <h2 style={{ marginBottom: 24 }}>Wiadomości</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16, height: 'calc(100vh - 220px)', minHeight: 500 }}>
                {/* Conversations list */}
                <div className="card" style={{ overflow: 'auto' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-secondary)', fontWeight: 600, fontSize: 13, color: 'var(--text-tertiary)' }}>Konwersacje</div>
                    {conversations.map(c => (
                        <div
                            key={c.id}
                            onClick={() => setActiveConv(c.id)}
                            style={{
                                padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-secondary)',
                                background: activeConv === c.id ? 'rgba(99,102,241,0.08)' : 'transparent',
                                borderLeft: activeConv === c.id ? '3px solid var(--accent)' : '3px solid transparent',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontWeight: 600, fontSize: 13 }}>{c.lawyer}</span>
                                <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{c.time}</span>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{c.firm} • {c.caseId}</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {c.lastMsg}
                            </div>
                            {c.unread > 0 && (
                                <span className="badge badge-info" style={{ fontSize: 10, marginTop: 4, padding: '2px 8px' }}>{c.unread} nowe</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Chat area */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-secondary)', fontWeight: 600 }}>
                        {conversations.find(c => c.id === activeConv)?.lawyer} — sprawa {conversations.find(c => c.id === activeConv)?.caseId}
                    </div>
                    <div style={{ flex: 1, overflow: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {messages.map(m => (
                            <div key={m.id} style={{ display: 'flex', justifyContent: m.sender === 'client' ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    maxWidth: '70%', padding: '12px 16px', borderRadius: 12,
                                    background: m.sender === 'client' ? 'var(--accent)' : 'var(--bg-secondary)',
                                    color: m.sender === 'client' ? 'white' : 'var(--text-primary)',
                                }}>
                                    {m.sender === 'lawyer' && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-light)', marginBottom: 4 }}>{m.name}</div>}
                                    <div style={{ fontSize: 13, lineHeight: 1.5 }}>{m.text}</div>
                                    <div style={{ fontSize: 10, marginTop: 6, opacity: 0.6, textAlign: 'right' }}>{m.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-secondary)', display: 'flex', gap: 8 }}>
                        <input
                            value={newMsg}
                            onChange={e => setNewMsg(e.target.value)}
                            placeholder="Napisz wiadomość..."
                            style={{ flex: 1 }}
                            onKeyDown={e => e.key === 'Enter' && setNewMsg('')}
                        />
                        <button className="btn btn-primary" onClick={() => setNewMsg('')}><Send size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
