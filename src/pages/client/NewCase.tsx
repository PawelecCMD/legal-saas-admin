import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, FileText, Scale, CreditCard } from 'lucide-react';

const categories = [
    { id: 'cywilne', label: 'Prawo cywilne', desc: 'Odszkodowania, umowy, nieruchomości', icon: FileText },
    { id: 'rodzinne', label: 'Prawo rodzinne', desc: 'Rozwód, alimenty, opieka nad dzieckiem', icon: Scale },
    { id: 'karne', label: 'Prawo karne', desc: 'Obrona w sprawach karnych', icon: Scale },
    { id: 'pracy', label: 'Prawo pracy', desc: 'Wypowiedzenie, mobbing, wynagrodzenie', icon: FileText },
    { id: 'gospodarcze', label: 'Prawo gospodarcze', desc: 'Spory handlowe, windykacja, fuzje', icon: CreditCard },
    { id: 'administracyjne', label: 'Prawo administracyjne', desc: 'Odwołania od decyzji, pozwolenia', icon: FileText },
];

export default function NewCase() {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const canProceed = step === 1 ? !!category : step === 2 ? description.length >= 200 : true;

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => navigate('/klient/sprawy'), 2000);
    };

    if (submitted) {
        return (
            <div className="animate-in" style={{ maxWidth: 600, margin: '80px auto', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <Check size={32} color="white" />
                </div>
                <h2 style={{ marginBottom: 8 }}>Sprawa została utworzona!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Twoje zgłoszenie zostało przesłane. Kancelaria skontaktuje się z Tobą wkrótce.</p>
                <div className="badge badge-success" style={{ fontSize: 13, padding: '6px 16px' }}>Przekierowanie do listy spraw...</div>
            </div>
        );
    }

    return (
        <div className="animate-in" style={{ maxWidth: 700, margin: '0 auto', padding: '32px 24px' }}>
            <h2 style={{ marginBottom: 4 }}>Nowa sprawa</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Opisz swoją sytuację – pomożemy znaleźć najlepsze rozwiązanie</p>

            {/* Progress */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
                {[1, 2, 3].map(s => (
                    <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? 'var(--accent)' : 'var(--border-secondary)', transition: 'background 0.3s' }} />
                ))}
            </div>

            {step === 1 && (
                <div>
                    <h3 style={{ marginBottom: 16 }}>Krok 1: Wybierz kategorię sprawy</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {categories.map(cat => (
                            <div
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                style={{
                                    padding: '20px 16px', borderRadius: 'var(--radius-lg)',
                                    border: `2px solid ${category === cat.id ? 'var(--accent)' : 'var(--border-secondary)'}`,
                                    background: category === cat.id ? 'rgba(99,102,241,0.08)' : 'var(--bg-secondary)',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                <cat.icon size={20} style={{ color: 'var(--accent-light)', marginBottom: 8 }} />
                                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{cat.label}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{cat.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3 style={{ marginBottom: 16 }}>Krok 2: Opisz swoją sytuację</h3>
                    <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 12 }}>Im więcej szczegółów podasz, tym szybciej kancelaria będzie mogła Ci pomóc. Minimum 200 znaków.</p>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Opisz swoją sprawę szczegółowo. Uwzględnij daty, kwoty, okoliczności i czego oczekujesz..."
                        rows={8}
                        style={{ width: '100%', resize: 'vertical', minHeight: 200 }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: description.length >= 200 ? 'var(--success)' : 'var(--text-tertiary)' }}>
                        <span>{description.length} / 200 znaków (min.)</span>
                        {description.length >= 200 && <span>✓ Wystarczająco szczegółowy opis</span>}
                    </div>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3 style={{ marginBottom: 16 }}>Krok 3: Podsumowanie</h3>
                    <div className="card" style={{ marginBottom: 16 }}>
                        <div style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>Kategoria:</span>
                                <span style={{ fontWeight: 600 }}>{categories.find(c => c.id === category)?.label}</span>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                <strong style={{ color: 'var(--text-primary)' }}>Opis sprawy:</strong><br />
                                {description}
                            </div>
                        </div>
                    </div>
                    <div className="card" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <div style={{ padding: '16px', fontSize: 13, color: 'var(--text-secondary)' }}>
                            💡 Po złożeniu zgłoszenia AI przeanalizuje Twoją sprawę i zaproponuje najlepsze kancelarie. Płatność za usługę nastąpi dopiero po wyborze kancelarii (system escrow).
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                <button className="btn btn-secondary" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>
                    <ArrowLeft size={16} /> Wstecz
                </button>
                {step < 3 ? (
                    <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canProceed}>
                        Dalej <ArrowRight size={16} />
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        <Check size={16} /> Złóż sprawę
                    </button>
                )}
            </div>
        </div>
    );
}
