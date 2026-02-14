import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { cases } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const daysOfWeek = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

const publicHolidays: Record<string, string> = {
    '0-1': 'Nowy Rok',
    '0-6': 'Trzech Króli',
    '3-5': 'Wielkanoc',
    '3-6': 'Poniedziałek Wielkanocny',
    '4-1': 'Święto Pracy',
    '4-3': 'Święto Konstytucji 3 Maja',
    '4-24': 'Zielone Świątki',
    '5-4': 'Boże Ciało',
    '7-15': 'Wniebowzięcie NMP',
    '10-1': 'Wszystkich Świętych',
    '10-11': 'Święto Niepodległości',
    '11-25': 'Boże Narodzenie (I)',
    '11-26': 'Boże Narodzenie (II)',
};

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDayOfMonth(y: number, m: number) { return (new Date(y, m, 1).getDay() + 6) % 7; }

export default function FirmCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date(2026, 1)); // Feb 2026
    const { user } = useAuth();
    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(y, m);
    const firstDay = getFirstDayOfMonth(y, m);
    const today = new Date();

    const firmCases = cases.filter(c => c.lawFirm === (user?.firmName || 'Kancelaria Nowak'));
    const deadlineMap: Record<number, typeof firmCases> = {};
    firmCases.forEach(c => {
        const d = new Date(c.deadline);
        if (d.getFullYear() === y && d.getMonth() === m) {
            const day = d.getDate();
            if (!deadlineMap[day]) deadlineMap[day] = [];
            deadlineMap[day].push(c);
        }
    });

    const prev = () => setCurrentDate(new Date(y, m - 1));
    const next = () => setCurrentDate(new Date(y, m + 1));

    return (
        <div className="animate-in">
            <div className="page-header">
                <div>
                    <h2>Kalendarz spraw</h2>
                    <p className="page-header-sub">Terminy i deadline'y kancelarii</p>
                </div>
            </div>

            <div className="card">
                <div className="card-header" style={{ justifyContent: 'space-between' }}>
                    <button className="btn btn-ghost btn-sm" onClick={prev}><ChevronLeft size={16} /></button>
                    <span className="card-title" style={{ fontSize: 18 }}>{monthNames[m]} {y}</span>
                    <button className="btn btn-ghost btn-sm" onClick={next}><ChevronRight size={16} /></button>
                </div>
                <div style={{ padding: '0 16px 16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, textAlign: 'center', marginBottom: 8 }}>
                        {daysOfWeek.map(d => (
                            <div key={d} style={{ padding: '8px', fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>{d}</div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                        {Array.from({ length: firstDay }, (_, i) => (
                            <div key={`empty-${i}`} style={{ minHeight: 80 }} />
                        ))}
                        {Array.from({ length: daysInMonth }, (_, i) => {
                            const day = i + 1;
                            const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === day;
                            const holidayName = publicHolidays[`${m}-${day}`];
                            const events = deadlineMap[day] || [];
                            
                            return (
                                <div key={day} style={{
                                    minHeight: 100, borderRadius: 8, padding: '8px',
                                    background: holidayName ? 'rgba(239, 68, 68, 0.08)' : (isToday ? 'rgba(99,102,241,0.1)' : 'var(--bg-secondary)'),
                                    border: holidayName ? '1px solid rgba(239, 68, 68, 0.2)' : (isToday ? '2px solid var(--accent)' : '1px solid var(--border-secondary)'),
                                    position: 'relative'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <div style={{ 
                                            fontWeight: (isToday || holidayName) ? 700 : 400, 
                                            fontSize: 12, 
                                            color: holidayName ? '#ef4444' : (isToday ? 'var(--accent-light)' : 'var(--text-secondary)')
                                        }}>
                                            {day}
                                        </div>
                                        {holidayName && (
                                            <span style={{ 
                                                fontSize: 8, 
                                                padding: '2px 4px', 
                                                background: '#ef4444', 
                                                color: 'white', 
                                                borderRadius: 4, 
                                                textTransform: 'uppercase',
                                                fontWeight: 800
                                            }}>Wolne</span>
                                        )}
                                    </div>

                                    {holidayName && (
                                        <div style={{
                                            fontSize: 10,
                                            color: '#b91c1c',
                                            marginBottom: 4,
                                            fontWeight: 600,
                                            lineHeight: 1.1
                                        }}>
                                            {holidayName}
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {events.map(e => (
                                            <div key={e.id} style={{
                                                fontSize: 10, padding: '2px 6px', borderRadius: 4,
                                                background: 'rgba(239,68,68,0.15)', color: '#f87171',
                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                                border: '1px solid rgba(239,68,68,0.2)'
                                            }}>
                                                <Clock size={8} style={{ marginRight: 2 }} />{e.description || e.id}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Upcoming deadlines */}
            <div className="card" style={{ marginTop: 24 }}>
                <div className="card-header"><span className="card-title">Nadchodzące terminy</span></div>
                {firmCases.filter(c => !['Zakończona', 'Zamknięta', 'Anulowana'].includes(c.status)).slice(0, 5).map(c => (
                    <div key={c.id} className="list-item">
                        <div className="list-item-left">
                            <div className="list-item-avatar" style={{ background: 'var(--error)', fontSize: 10 }}><Clock size={16} /></div>
                            <div className="list-item-info">
                                <h4>{c.description}</h4>
                                <p>{c.client} • {c.lawyer}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span className="badge badge-warning" style={{ fontSize: 11 }}>{c.deadline}</span>
                            <span className="badge badge-info" style={{ fontSize: 11 }}>{c.status}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
